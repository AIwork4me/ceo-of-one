import { NextRequest, NextResponse } from 'next/server'
import { AuthUser } from '@/lib/types'
import { createOrder, verifyPayment, getEnrollment } from './service'
import { CourseFinder } from './types'

export interface AuthVerifyResult {
  success: true
  user: AuthUser
}

export interface AuthVerifyError {
  success: false
  error: string
  message: string
}

export type AuthVerifier = (token: string | undefined) => AuthVerifyResult | AuthVerifyError

export interface PaymentRouteDeps {
  getToken: (request: NextRequest) => string | undefined
  getCurrentUser: AuthVerifier
  findCourse: CourseFinder
}

export async function handleCheckout(
  request: NextRequest,
  deps: PaymentRouteDeps
): Promise<NextResponse> {
  const token = deps.getToken(request)
  const authResult = deps.getCurrentUser(token)

  if (!authResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: authResult.message,
      },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const result = createOrder(authResult.user.id, body, deps.findCourse)

    if (!result.success) {
      const statusCode = result.error === 'Not Found' ? 404
        : result.error === 'Conflict' ? 409
        : result.error === 'Validation Error' ? 400
        : 400

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: result.message,
        },
        { status: statusCode }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          orderId: result.order.id,
          amount: result.order.amount,
          courseName: result.courseName,
          status: result.order.status,
        },
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Bad Request', message: 'Invalid JSON body' },
      { status: 400 }
    )
  }
}

export async function handleVerify(
  request: NextRequest,
  deps: PaymentRouteDeps
): Promise<NextResponse> {
  const token = deps.getToken(request)
  const authResult = deps.getCurrentUser(token)

  if (!authResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: authResult.message,
      },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const result = verifyPayment(authResult.user.id, body)

    if (!result.success) {
      const statusCode = result.error === 'Not Found' ? 404
        : result.error === 'Forbidden' ? 403
        : result.error === 'Conflict' ? 409
        : result.error === 'Validation Error' ? 400
        : 400

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: result.message,
        },
        { status: statusCode }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          order: result.order,
          enrollment: result.enrollment,
        },
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Bad Request', message: 'Invalid JSON body' },
      { status: 400 }
    )
  }
}

export async function handleGetEnrollment(
  request: NextRequest,
  deps: PaymentRouteDeps
): Promise<NextResponse> {
  const token = deps.getToken(request)
  const authResult = deps.getCurrentUser(token)

  if (!authResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: authResult.message,
      },
      { status: 401 }
    )
  }

  const result = getEnrollment(authResult.user.id, deps.findCourse)

  if (result.success) {
    return NextResponse.json({
      success: true,
      data: result.enrolledCourses,
    })
  }

  return NextResponse.json(
    {
      success: false,
      error: result.error,
      message: result.message,
    },
    { status: 500 }
  )
}
