import { onlyNumbers } from './utilString'

enum EtypeValue {Tstring, Tnumeric, Tboolean}

export class Validator {
  public error: string[]
  private isEmpty: boolean
  private fieldValue: any
  private fieldName?: string
  private isValidate: boolean
  private typeValue?: EtypeValue

  constructor () {
    this.error = new Array<string>()
    this.isEmpty = false
    this.isValidate = true
  }

  public setAlias (fieldName: string): Validator {
    this.fieldName = fieldName
    return this
  }

  public setValue (value: any): Validator {
    this.fieldValue = value
    this.isEmpty = this.fieldValue == null || this.fieldValue === undefined || this.fieldValue === ''
    return this
  }

  public isLength (len: number): Validator {
    if (!this.isEmpty) {
      if (typeof this.fieldValue === 'string') {
        if (this.fieldValue.trim().length !== len) {
          this.error.push(`Tamanho de ${this.fieldName} está incorreto`)
          this.isValidate = false
        }
      }
    }
    return this
  }

  public checkValue (value: any[]): Validator {
    if (!this.isEmpty) {
      const found = value.find((element) => element === this.fieldValue)

      if (!found) {
        this.error.push(`${this.fieldName} está com valor inválido.(Ex: [${value}])`)
        this.isValidate = false
      }
    }
    return this
  }

  public validate (): boolean {
    return this.isValidate
  }

  public isCPF (): Validator {
    if (!this.isEmpty) {
      const cpf = onlyNumbers(this.fieldValue)
      const regex: RegExp = /^\d{11}$/

      if (regex.test(cpf)) {
        let numero: number = 0
        let caracter: string = ''
        const numeros: string = '0123456789'
        let j: number = 10
        let somatorio: number = 0
        let resto: number = 0
        let digito1: number = 0
        let digito2: number = 0
        let cpfAux: string = ''

        cpfAux = cpf.substring(0, 9)
        for (let i: number = 0; i < 9; i++) {
          caracter = cpfAux.charAt(i)
          if (numeros.search(caracter) === -1) {
            this.error.push(`${this.fieldName} não é um cpf válido`)
            this.isValidate = false
            return this
          }
          numero = Number(caracter)
          somatorio = somatorio + (numero * j)
          j--
        }

        resto = somatorio % 11
        digito1 = 11 - resto
        if (digito1 > 9) {
          digito1 = 0
        }
        j = 11
        somatorio = 0
        cpfAux = cpfAux + digito1.toString()
        for (let i: number = 0; i < 10; i++) {
          caracter = cpfAux.charAt(i)
          numero = Number(caracter)
          somatorio = somatorio + (numero * j)
          j--
        }
        resto = somatorio % 11
        digito2 = 11 - resto
        if (digito2 > 9) {
          digito2 = 0
        }

        cpfAux = cpfAux + digito2.toString()
        if (cpf !== cpfAux) {
          this.error.push(`${this.fieldName} não é um cpf válido`)
          this.isValidate = false
          return this
        }
      }
    }

    return this
  }

  public isEmail (): Validator {
    if (!this.isEmpty) {
      const regex: RegExp = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/

      if (!regex.test(this.fieldValue)) {
        this.error.push(`${this.fieldName} não é um e-mail válido`)
        this.isValidate = false
      }
    }

    return this
  }

  public isRequired (): Validator {
    if (this.isEmpty) {
      this.error.push(`O Campo ${this.fieldName} é obrigatório`)
      this.isValidate = false
    }

    return this
  }

  public isDate (): Validator {
    if (!this.isEmpty) {
      if (isNaN(Date.parse(this.fieldValue))) {
        this.error.push(`O campo ${this.fieldName} não é uma Data válida`)
        this.isValidate = false
      }
    }
    return this
  }

  public isString (): Validator {
    this.typeValue = EtypeValue.Tstring

    if (!this.isEmpty) {
      if (typeof this.fieldValue !== 'string') {
        this.error.push(`O Campo ${this.fieldName} precisa ser uma String`)
        this.isValidate = false
      }
    }

    return this
  }

  public isNumber (): Validator {
    this.typeValue = EtypeValue.Tnumeric

    if (!this.isEmpty) {
      if (typeof this.fieldValue !== 'number') {
        this.error.push(`O Campo ${this.fieldName} precisa ser um valor númerico`)
        this.isValidate = false
      }
    }

    return this
  }

  public isBoolean (): Validator {
    this.typeValue = EtypeValue.Tboolean

    if (!this.isEmpty) {
      if (typeof this.fieldValue !== 'boolean') {
        this.error.push(`O Campo ${this.fieldName} precisa ser um valor booleano`)
        this.isValidate = false
      }
    }

    return this
  }

  public minValue (min: number): Validator {
    let value: number = 0
    let msg: string = ''

    if (!this.isEmpty) {
      if (typeof this.fieldValue === 'string' && this.typeValue === EtypeValue.Tnumeric) {
        value = min - 1
        msg = `O Campo ${this.fieldName} precisa ser maior ou igual à ${min}`
      } else if (typeof this.fieldValue === 'number' && this.typeValue === EtypeValue.Tstring) {
        value = min - 1
        msg = `O Campo ${this.fieldName} precisa ter no mínimo um valor de ${min} caracteres`
      } else if (typeof this.fieldValue === 'string') {
        value = this.fieldValue.trim().length
        msg = `O Campo ${this.fieldName} precisa ter no mínimo um valor de ${min} caracteres`
      } else if (typeof this.fieldValue === 'number') {
        value = this.fieldValue
        msg = `O Campo ${this.fieldName} precisa ser maior ou igual à ${min}`
      }

      if (value < min) {
        this.error.push(msg)
        this.isValidate = false
      }
    }
    return this
  }

  public maxValue (max: number): Validator {
    let value: number = 0
    let msg = ''

    if (!this.isEmpty) {
      if (typeof this.fieldValue === 'string' && this.typeValue === EtypeValue.Tnumeric) {
        value = max + 1
        msg = `O Campo ${this.fieldName} precisa ser Maior ou igual à ${max}`
      } else if (typeof this.fieldValue === 'number' && this.typeValue === EtypeValue.Tstring) {
        value = max + 1
        msg = `O Campo ${this.fieldName} precisa ter no máximo um valor de ${max} caracteres`
      } else if (typeof this.fieldValue === 'string') {
        value = this.fieldValue.trim().length
        msg = `O Campo ${this.fieldName} precisa ter no máximo um valor de ${max} caracteres`
      } else if (typeof this.fieldValue === 'number') {
        value = this.fieldValue
        msg = `O Campo ${this.fieldName} precisa ser maior ou igual à ${max}`
      }

      if (value > max) {
        this.error.push(msg)
        this.isValidate = false
      }
    }

    return this
  }
}
