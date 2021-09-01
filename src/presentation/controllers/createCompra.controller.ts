import { Request, Response } from 'express'
import { Validator } from '@/application/helpers/validation'
import { createCompraFactory } from '@/main/factories/useCase/createCompra.factory'

export class CompraController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { codigo, valor, data, cpf } = request.body

    const validator = new Validator()
    validator.setValue(codigo).setAlias('Código').isRequired().isNumber().minValue(1)
    validator.setValue(valor).setAlias('Valor').isRequired().isNumber().minValue(1)
    validator.setValue(data).setAlias('Data').isRequired().isDate()
    validator.setValue(cpf).setAlias('CPF').isCPF()

    if (validator.validate()) {
      const compra = createCompraFactory()
      const dados = await compra.create({ codigo, valor, data, cpf })
      return response.status(201).json({ id: dados })
    } else {
      return response.status(500).json({ error: validator.error })
    }
  }
}
