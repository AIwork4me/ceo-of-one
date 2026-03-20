import { paymentStore } from './store'
import {
  CheckoutInput,
  CheckoutResponse,
  VerifyInput,
  VerifyResponse,
  EnrollmentResponse,
  EnrolledCourse,
  CourseFinder,
} from './types'

export function validateCheckoutInput(
  input: unknown
): { valid: true; data: CheckoutInput } | { valid: false; error: string; message: string } {
  if (typeof input !== 'object' || input === null) {
    return {
      valid: false,
      error: 'Bad Request',
      message: 'Request body must be a valid JSON object',
    }
  }

  const body = input as Record<string, unknown>

  if (body.courseId === undefined || body.courseId === null) {
    return {
      valid: false,
      error: 'Validation Error',
      message: 'courseId is required',
    }
  }

  if (typeof body.courseId !== 'string') {
    return {
      valid: false,
      error: 'Validation Error',
      message: 'courseId must be a string',
    }
  }

  if (body.courseId.trim() === '') {
    return {
      valid: false,
      error: 'Validation Error',
      message: 'courseId must be a non-empty string',
    }
  }

  return {
    valid: true,
    data: { courseId: body.courseId },
  }
}

export function createOrder(
  userId: string,
  input: unknown,
  findCourse: CourseFinder
): CheckoutResponse {
  const validation = validateCheckoutInput(input)

  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
      message: validation.message,
    }
  }

  const { courseId } = validation.data

  const course = findCourse(courseId)
  if (!course) {
    return {
      success: false,
      error: 'Not Found',
      message: `Course with ID ${courseId} not found`,
    }
  }

  if (paymentStore.isEnrolled(userId, courseId)) {
    return {
      success: false,
      error: 'Conflict',
      message: 'You are already enrolled in this course',
    }
  }

  const order = paymentStore.createOrder(userId, courseId, course.price)

  return {
    success: true,
    order,
    courseName: course.title,
  }
}

export function validateVerifyInput(
  input: unknown
): { valid: true; data: VerifyInput } | { valid: false; error: string; message: string } {
  if (typeof input !== 'object' || input === null) {
    return {
      valid: false,
      error: 'Bad Request',
      message: 'Request body must be a valid JSON object',
    }
  }

  const body = input as Record<string, unknown>

  if (body.orderId === undefined || body.orderId === null) {
    return {
      valid: false,
      error: 'Validation Error',
      message: 'orderId is required',
    }
  }

  if (typeof body.orderId !== 'string') {
    return {
      valid: false,
      error: 'Validation Error',
      message: 'orderId must be a string',
    }
  }

  if (body.orderId.trim() === '') {
    return {
      valid: false,
      error: 'Validation Error',
      message: 'orderId must be a non-empty string',
    }
  }

  return {
    valid: true,
    data: { orderId: body.orderId },
  }
}

export function verifyPayment(
  userId: string,
  input: unknown
): VerifyResponse {
  const validation = validateVerifyInput(input)

  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
      message: validation.message,
    }
  }

  const { orderId } = validation.data

  const order = paymentStore.findOrderById(orderId)
  if (!order) {
    return {
      success: false,
      error: 'Not Found',
      message: `Order with ID ${orderId} not found`,
    }
  }

  if (order.userId !== userId) {
    return {
      success: false,
      error: 'Forbidden',
      message: 'You are not authorized to verify this order',
    }
  }

  if (order.status !== 'pending') {
    return {
      success: false,
      error: 'Conflict',
      message: `Order already has status: ${order.status}`,
    }
  }

  const updatedOrder = paymentStore.updateOrderStatus(orderId, 'completed')
  if (!updatedOrder) {
    return {
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to update order status',
    }
  }

  paymentStore.enroll(userId, order.courseId)

  return {
    success: true,
    order: updatedOrder,
    enrollment: {
      userId,
      courseId: order.courseId,
    },
  }
}

export function getEnrollment(
  userId: string,
  findCourse: CourseFinder
): EnrollmentResponse {
  const enrolledCourseIds = paymentStore.getEnrolledCourseIds(userId)

  const enrolledCoursesWithNulls = enrolledCourseIds.map((courseId) => {
    const course = findCourse(courseId)
    if (!course) return null
    return {
      courseId,
      courseDetails: {
        id: course.id,
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        price: course.price,
        category: course.category,
      },
    }
  })

  const enrolledCourses = enrolledCoursesWithNulls.filter((item): item is EnrolledCourse => item !== null)

  return {
    success: true,
    enrolledCourses,
  }
}
