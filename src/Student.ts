import { Cpf } from './Cpf'
import { Name } from './Name'

export class Student {
  name: Name;
  cpf: Cpf;
  birthDate: string
  enrollmentCode: string

  constructor(name: string, cpf: string, birthDate: string, enrollmentCode: string) {
    this.name = new Name(name)
    this.cpf = new Cpf(cpf)
    this.birthDate = birthDate
    this.enrollmentCode = enrollmentCode
  }
}
