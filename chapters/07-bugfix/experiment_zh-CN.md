# 第七章：Bugfix — 修复架构违规

[English](experiment.md) | **中文**

---

## 背景

第五、六章分别完成了认证和支付功能，两章都通过了所有测试。但第六章引入了一个测试无法捕获的问题：支付模块直接导入了课程模块，违反了单向依赖规则（**features → lib only，feature 之间不能互相引用**）。

本章不同。我们不构建新功能，而是修复已有的问题。

## 任务

修复支付模块中的 6 个跨 feature 导入，并解决 1 个相关 bug（auth store 中 enrolledCourses 未初始化）。

## COO 流程

### 1. 回忆（RECALL）

阅读第五、六章的 Retain 条目。应用的关键教训：

- VERIFY 步骤必须 grep 检查跨 feature 导入（第六章没做，违规漏过去了）
- 明确指定函数签名（第五章的教训：模糊导致 bug）
- 文件权限：明确哪些文件可以修改、哪些不能

### 2. 审计（AUDIT）

对支付模块进行结构检查：

```
grep -r "@/features/courses" src/features/payment/
```

发现 **6 处违规** — 支付模块的每个文件都在直接导入课程模块。还发现 **1 个 bug**：`auth/store.ts` 中的 `enrolledCourses` 从未被初始化。

### 3. 架构决策（ARCHITECT DECISION）

考虑了三种方案：

| 方案 | 优点 | 缺点 |
|------|------|------|
| 外观模式 | 统一入口 | 多一层抽象 |
| 事件系统 | 完全解耦 | 复杂，难调试 |
| **依赖注入** | **改动最小，可测试性更好** | 参数略多 |

**决定：依赖注入。** 支付模块通过函数参数接收课程数据，而不是直接导入课程 store。

### 4. 精确规格（SPECIFY）

编写精确规格，包括：

- `createOrder`、`getEnrollment`、路由处理器的精确函数签名
- `PaymentRouteDeps` 接口（含 `getToken`、`getCurrentUser`、`findCourse`）
- 文件权限：支付文件不能导入课程模块；API 路由适配器可以（它们是胶水代码）
- VERIFY 步骤的 grep 验证条件

### 5. 执行（EXECUTE）

通过文件方式发送规格给 Claude Code（避免前几章遇到的 PowerShell 转义问题）。

### 6. 验证（VERIFY）

- ✅ `npm run build` — 零错误
- ✅ `npm test` — 94/94 通过
- ✅ `grep -r "@/features/courses" src/features/payment/` — 零结果
- ✅ `grep -r "TODO\|FIXME\|console\.log" src/features/payment/` — 零结果
- ✅ `grep -r ": any" src/features/payment/` — 零结果
- ✅ Bug 数量：**0**

## 关键变更

| 文件 | 变更 |
|------|------|
| `payment/types.ts` | `Category` 改为从 `@/lib/config` 导入，而非 `@/features/courses/types` |
| `payment/service.ts` | `createOrder`/`getEnrollment` 接受 `findCourse` 函数参数 |
| `payment/routes.ts` | 所有处理函数接受 `PaymentRouteDeps`，含 `getToken`/`getCurrentUser`/`findCourse` |
| `src/app/api/*/route.ts` | API 路由适配器导入真实 store 并传给处理函数（薄胶水层） |
| `payment.test.ts` | 使用 mock 替代真实 `courseStore`/`authStore` |
| `auth/store.ts` | 1 行修复：`enrolledCourses` 初始化 |
| `courses/*` | **零修改** |

## Bug 趋势

| 章节 | 功能 | Bug 数 |
|------|------|--------|
| 第五章 | 认证 | 1 |
| 第六章 | 支付 | 3 |
| **第七章** | **修复** | **0** |

## 关键洞察

1. **COO 做架构决策，工程师执行。** 第六章有违规是因为 COO 没有检查结果。第七章零违规是因为 COO 在指定之前就做了检查。

2. **结构检查能捕获功能测试漏掉的问题。** 第六章全部 94 个测试都通过了，但架构被违反了。现在每次 VERIFY 步骤都必须 grep 检查跨 feature 导入。

3. **规格精确就能实现零 bug。** COO 指定了函数签名、文件权限和验证命令，工程师没有犯错的空间。

4. **薄适配器模式。** `src/app/api/` 中的路由文件可以导入 features（它们是胶水代码），但 feature 模块本身不能。这个区分很关键。

5. **依赖注入提升了可测试性。** 测试现在使用 mock 课程数据而非真实 store — 更快、更独立。

## COO 质量评分

| 章节 | 质量 |
|------|------|
| 第五章 | 良好（1 bug） |
| 第六章 | 较差（3 bug） |
| **第七章** | **完美（0 bug）** |

