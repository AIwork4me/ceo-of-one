import { NextRequest } from 'next/server'
import { handleCheckout, PaymentRouteDeps } from '@/features/payment/routes'
import { getTokenFromCookie } from '@/features/auth/routes'
import { getCurrentUser } from '@/features/auth/service'
import { courseStore } from '@/features/courses/store'

const deps: PaymentRouteDeps = {
  getToken: getTokenFromCookie,
  getCurrentUser,
  findCourse: (id: string) => courseStore.findById(id),
}

export async function POST(request: NextRequest) {
  return handleCheckout(request, deps)
}
