You are refactoring an existing module to fix architectural violations, NOT adding features.

## Context
The payment module (src/features/payment/) has 6 cross-feature imports that violate the one-way dependency rule (features → lib only). These MUST be fixed.

## Current Violations
1. payment/service.ts: imports courseStore from courses/store
2. payment/types.ts: imports Category from courses/types
3. payment/routes.ts: imports getTokenFromCookie from auth/routes and getCurrentUser from auth/service
4. payment/payment.test.ts: imports courseStore and authStore directly

## Fix Strategy: Dependency Injection

### For service.ts (courseStore dependency):
- Change service functions to accept dependencies as parameters
- createOrder(userId, courseId, courseFinder) where courseFinder has type: (id: string) then returns Course or undefined
- verifyPayment(orderId, userUpdater) where userUpdater has type: (userId: string, courseId: string) then returns void
- getEnrollment(userId, courseFinder) same pattern
- The API route handler (routes.ts) will pass the real store when calling service functions
- Tests will pass mock functions

### For routes.ts (auth dependency):
- Change route handlers to accept auth helpers via a config object parameter
- handleCheckout(request, options) where options.getToken and options.getUser
- handleVerify and handleGetEnrollment same pattern
- The API route files in src/app/api/payments/ will import and pass the real auth helpers
- API route THIN ADAPTERS can import from features/, but feature modules cannot

### For types.ts (Category import):
- Import Category from @/lib/types instead (move Category type there if not already present)
- OR duplicate the Category type in payment/types.ts

### For tests:
- Create mock implementations of courseFinder, userUpdater, getToken, getUser
- Test payment logic in isolation without real store imports

## Bug Fix: enrolledCourses initialization
- In src/features/auth/store.ts, ensure default users have enrolledCourses as empty array
- Check AuthUser type and initialize properly

## Acceptance Criteria (ZERO bugs tolerance)
1. npm run build — zero errors
2. npm test — ALL 94 tests pass (no tests removed or skipped)
3. grep cross-feature imports in service.ts, routes.ts, types.ts — ZERO matches
4. payment.test.ts must NOT import courseStore or authStore directly
5. courses/ and auth/ — ZERO modifications (EXCEPT auth/store.ts for enrolledCourses init)
6. No TODO/FIXME/console.log, no any types

## Constraint
- MAY modify: payment module, src/app/api/payments/ route adapters, src/lib/types
- MAY minimally modify: auth/store.ts (only enrolledCourses init)
- MUST NOT modify: courses module, auth service.ts, auth routes.ts, auth types.ts

Fix the violations, run build, run tests. Report results including exact bug count encountered.
