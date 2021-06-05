import { Student } from './Student'

interface enrollmentRequestProps {
  student: {
    name: string,
    cpf: string,
    birthDate: string
  },
  level: string,
  module: string,
  class: string
}
export default class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = []
  };
  execute(enrollmentRequest: any) {
    const sequencialStudentNumber = this.enrollments.length + 1
    const sequencialStudentNumberFormatted = sequencialStudentNumber < 10 ?
      String(sequencialStudentNumber).padStart(4, '0') : String(sequencialStudentNumber).padStart(3, '0')
    const enrollmentCode = `${new Date().getFullYear()}${enrollmentRequest.level + enrollmentRequest.module + enrollmentRequest.class + sequencialStudentNumberFormatted}`
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate,
      enrollmentCode
    )
    const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === enrollmentRequest.student.cpf)

    if (existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed')

    const MINIMUN_AGE = 18
    const studentBirthDate = new Date(student.birthDate)
    const todayIs = new Date()
    const studentAgeTime = Math.abs(studentBirthDate.getTime() - todayIs.getTime())
    const studentAge = Math.ceil((studentAgeTime / (1000 * 3600 * 24)) / 365);

    if (studentAge < MINIMUN_AGE) throw new Error('Student below minimum age')

    const enrollment = {
      student
    }

    this.enrollments.push(enrollment)
    return enrollment
  }
}
