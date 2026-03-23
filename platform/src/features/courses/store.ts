import { v4 as uuidv4 } from 'uuid'
import { Course, CreateCourseInput, UpdateCourseInput, CourseFilters } from './types'

class CourseStore {
  private courses: Map<string, Course> = new Map()
  private seeded: boolean = false

  constructor() {
    this.seed()
  }

  private seed(): void {
    if (this.seeded) return
    this.seeded = true

    // 课程数据：根据语言选择显示
    const demoCourses: Array<Omit<CreateCourseInput, 'instructor'> & { instructor: string }> = [
      { 
        title: 'AI Prompt Engineering Masterclass', 
        description: 'Master the art of prompt engineering to get the best results from AI tools.', 
        instructor: 'Dr. Sarah Chen', 
        price: 199, 
        category: 'programming', 
        published: true 
      },
      { 
        title: 'One-Person Company Setup Guide', 
        description: 'Everything you need to know about setting up and running a one-person business.', 
        instructor: 'Mike Johnson', 
        price: 99, 
        category: 'business', 
        published: true 
      },
      { 
        title: 'Design with AI Tools', 
        description: 'Learn to create stunning designs using AI-powered design tools.', 
        instructor: 'Emma Wilson', 
        price: 149, 
        category: 'design', 
        published: true 
      },
      { 
        title: 'Content Marketing Automation', 
        description: 'Automate your content marketing workflow with AI and modern tools.', 
        instructor: 'Alex Turner', 
        price: 129, 
        category: 'marketing', 
        published: true 
      },
      { 
        title: 'Build Your First SaaS', 
        description: 'A complete guide to building and launching your first Software as a Service product.', 
        instructor: 'David Park', 
        price: 299, 
        category: 'programming', 
        published: true 
      },
      { 
        title: 'Personal Branding Strategy', 
        description: 'Build a powerful personal brand that attracts opportunities.', 
        instructor: 'Lisa Brown', 
        price: 79, 
        category: 'business', 
        published: true 
      },
    ]

    for (const courseData of demoCourses) {
      this.create(courseData)
    }
  }

  create(input: CreateCourseInput): Course {
    const now = new Date()
    const course: Course = {
      id: uuidv4(),
      title: input.title,
      description: input.description ?? '',
      instructor: input.instructor,
      price: input.price,
      category: input.category,
      published: input.published ?? false,
      createdAt: now,
      updatedAt: now,
    }
    this.courses.set(course.id, course)
    return course
  }

  findById(id: string): Course | undefined {
    return this.courses.get(id)
  }

  findAll(filters?: CourseFilters): Course[] {
    let courses = Array.from(this.courses.values())

    if (filters?.category !== undefined) {
      courses = courses.filter((c) => c.category === filters.category)
    }

    if (filters?.published !== undefined) {
      courses = courses.filter((c) => c.published === filters.published)
    }

    courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return courses
  }

  update(id: string, input: UpdateCourseInput): Course | undefined {
    const course = this.courses.get(id)
    if (!course) {
      return undefined
    }

    const updatedCourse: Course = {
      ...course,
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.instructor !== undefined && { instructor: input.instructor }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.published !== undefined && { published: input.published }),
      updatedAt: new Date(),
    }

    this.courses.set(id, updatedCourse)
    return updatedCourse
  }

  delete(id: string): boolean {
    return this.courses.delete(id)
  }

  clear(): void {
    this.courses.clear()
    this.seeded = false
  }
}

export const courseStore = new CourseStore()
