import { VALID_CATEGORIES } from '@/lib/config'

export type Category = (typeof VALID_CATEGORIES)[number]

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface PaymentOrder {
  id: string
  userId: string
  courseId: string
  amount: number
  status: PaymentStatus
  createdAt: Date
  updatedAt: Date
}

export interface CheckoutInput {
  courseId: string
}

export interface CheckoutResult {
  success: true
  order: PaymentOrder
  courseName: string
}

export interface CheckoutError {
  success: false
  error: string
  message: string
}

export interface VerifyInput {
  orderId: string
}

export interface VerifyResult {
  success: true
  order: PaymentOrder
  enrollment: {
    userId: string
    courseId: string
  }
}

export interface VerifyError {
  success: false
  error: string
  message: string
}

export interface EnrollmentResult {
  success: true
  enrolledCourses: EnrolledCourse[]
}

export interface EnrollmentError {
  success: false
  error: string
  message: string
}

export interface EnrolledCourse {
  courseId: string
  courseDetails: {
    id: string
    title: string
    description: string
    instructor: string
    price: number
    category: Category
  }
}

export type CheckoutResponse = CheckoutResult | CheckoutError
export type VerifyResponse = VerifyResult | VerifyError
export type EnrollmentResponse = EnrollmentResult | EnrollmentError

// Types for dependency injection
export interface CourseInfo {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  category: Category
}

export type CourseFinder = (id: string) => CourseInfo | undefined
