import EnrollStudent from '../EnrollStudent'
describe('-> Part 1 of project', () => {
  it('should not enroll without valid student name', function () {
    expect.assertions(1)
    const enrollStudent = new EnrollStudent()
    const enrollmentRequest = {
      student: {
        name: 'Ana'
      }
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid name'))
  })

  it('should not enroll without valid student cpf', function () {
    expect.assertions(1)
    const enrollStudent = new EnrollStudent()
    const enrollmentRequest = {
      student: {
        name: 'Ana Maria',
        cpf: '213.345.654-10'
      }
    }
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid cpf'))
  })

  it('should not enroll duplicated student', function () {
    expect.assertions(1)
    const enrollStudent = new EnrollStudent()
    const enrollmentRequest = {
      student: {
        name: 'Ana Maria',
        cpf: '864.464.227-84'
      }
    }
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Enrollment with duplicated student is not allowed'))
  })
})

describe('-> Part 2 of project', () => {
  const enrollStudent = new EnrollStudent()

  it('should generate enrollment code', () => {
    expect.assertions(1)

    const enrollmentRequest = {
      student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12'
      },
      level: 'EM',
      module: '1',
      class: 'A'
    }

    expect(enrollStudent.execute(enrollmentRequest).student.enrollmentCode)
      .toEqual("2021EM1A0001")
  })

  it('should not enroll student below minimum age', () => {
    expect.assertions(1)

    const enrollmentRequest = {
      student: {
        name: 'Maria Do Carmo',
        cpf: '146.985.630-11',
        birthDate: '2018-03-12'
      },
      level: 'EM',
      module: '1',
      class: 'A'
    }

    expect(() => enrollStudent.execute(enrollmentRequest))
      .toThrow(new Error('Student below minimum age'))
  })
})
