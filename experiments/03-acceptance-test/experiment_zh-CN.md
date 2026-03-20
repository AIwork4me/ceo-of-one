<p align="left">
<a href="experiment.md"><img src="https://img.shields.io/badge/Experiment-English-blue" alt="English" /></a>
</p>

# 实验 03：验收标准——真的有用吗？

## 实验设置

| | 对照组 A | 对照组 B |
|---|---|---|
| **任务** | 课程列表 API（Express + TypeScript） | 相同任务 |
| **提示词** | 功能描述 + "写测试，确保能用。" | 功能描述 + **13 条验收标准** |
| **代理** | Claude Code | Claude Code |
| **环境** | 相同 | 相同 |

## 13 条验收标准（仅 B 组）

| # | 标准 |
|---|------|
| 1 | TypeScript 编译零错误 |
| 2 | 所有测试通过，最少 20 个测试用例 |
| 3 | 输入验证：title/instructor 非空，price ≥ 0，category 枚举 |
| 4 | GET /api/courses 按 createdAt 降序排列 |
| 5 | ?category= 筛选 |
| 6 | ?published= 筛选 |
| 7 | GET /api/courses/:id 返回 404 + JSON 错误体 |
| 8 | POST 返回 400，包含具体错误信息 |
| 9 | PUT 对不存在的资源返回 404 |
| 10 | DELETE 返回 204，后续 GET 返回 404 |
| 11 | 错误格式：{ error, message, details? } |
| 12 | 无 TODO、FIXME、console.log |
| 13 | 代码组织在 src/types/、src/routes/、src/store/、src/controllers/ |

## 结果

| 指标 | A（无标准） | B（13 条标准） | 差异 |
|--------|:-:|:-:|:-:|
| 通过测试数 | 16/16 | 23/23 | +44% |
| 耗时 | ~5 分钟 | ~5.25 分钟 | +5% |
| 遇到 Bug 数 | 2 | 0 | — |
| 测试代码行数 | 259 | 342 | +32% |
| 筛选功能 | ❌ | ✅ | — |
| 按 createdAt 排序 | ❌ | ✅ | — |
| category 枚举验证 | ❌ | ✅ | — |
| 结构化错误格式 | ❌ | ✅ | — |
| MVC 结构（controllers/） | ❌ | ✅ | — |

### Bug 详情（仅 A 组）

1. **Express 5 params 类型错误** — 需要显式类型标注
2. **uuid ESM 兼容性问题** — 需要调整导入方式

两个 Bug 均在会话中修复。B 组从未遇到。

## 核心发现

### 1. 验收标准 = 更少 Bug

A 组遇到 2 个 Bug，B 组为 0。标准迫使 B 组提前考虑类型和导入问题。

### 2. "确保能用" ≠ 验收标准

A 组模糊的指令 → 先建后改。B 组明确的标准 → 一次做对。

### 3. 标准驱动完整性

没有标准，A 组跳过了筛选、排序、枚举验证、结构化错误。有了标准，B 组交付了全部 13 项。

### 4. 错误格式：原型 vs. 生产级

**A 组：**
```json
{ "error": "Course not found" }
```

**B 组：**
```json
{ "error": "NOT_FOUND", "message": "Course not found", "details": { "field": "id", "issue": "not_found" } }
```

### 5. 质量几乎是免费的

B 组仅多用 5% 时间，却多交付 44% 的测试和完整功能覆盖。

### 6. COO 的工作就是写验收标准

| 角色 | 职责 |
|------|------|
| **CEO** | "给我建一个课程列表 API" |
| **COO** | 写出那 13 条标准 |
| **工程师** | 按标准交付 |

## 结论

验收标准是最便宜的质量倍增器。写它们只需几分钟，却能消除 Bug、保证完整性，且几乎不增加执行时间。问题不是要不要写——而是谁来写。在一人公司里，那就是 COO 大脑：纪律性的提示工程，配合具体、可验证的标准。
