import { v4 as uuidv4 } from 'uuid'
import { AuthUser } from '@/lib/types'
import { StoredUser } from './types'

class AuthStore {
  private users: Map<string, StoredUser> = new Map()
  private emailIndex: Map<string, string> = new Map()

  create(name: string, email: string, passwordHash: string): AuthUser {
    const now = new Date()
    const id = uuidv4()

    const user: StoredUser = {
      id,
      email: email.toLowerCase(),
      name,
      passwordHash,
      createdAt: now,
      enrolledCourses: [],
    }

    this.users.set(id, user)
    this.emailIndex.set(email.toLowerCase(), id)

    const { passwordHash: _, ...authUser } = user
    return authUser
  }

  findById(id: string): StoredUser | undefined {
    return this.users.get(id)
  }

  findByEmail(email: string): StoredUser | undefined {
    const id = this.emailIndex.get(email.toLowerCase())
    if (!id) return undefined
    return this.users.get(id)
  }

  emailExists(email: string): boolean {
    return this.emailIndex.has(email.toLowerCase())
  }

  clear(): void {
    this.users.clear()
    this.emailIndex.clear()
  }
}

export const authStore = new AuthStore()
