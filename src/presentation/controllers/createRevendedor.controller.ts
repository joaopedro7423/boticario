import { Request, Response } from 'express'
import { Validator } from '@/application/helpers/validation'
import { createRevendedorFacotry } from '@/main/factories/useCase/createRevendedor.factory'
export class CreateRevendedorController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { nome, cpf, email, login, senha } = request.body

    const validator = new Validator()
    validator.setValue(nome).setAlias('Nome').isRequired().isString()
    validator.setValue(cpf).setAlias('CPF').isRequired().isString().isCPF()
    validator.setValue(email).setAlias('email').isRequired().isString()
    validator.setValue(login).setAlias('login').isRequired().isString()
    validator.setValue(senha).setAlias('senha').isRequired().isString()

    if (validator.validate()) {
      const createRevendedor = createRevendedorFacotry()
      const data = await createRevendedor.create({ nome, cpf, email, login, senha })
      return response.status(201).json(data)
    } else {
      return response.status(400).json({ error: validator.error })
    }
  }
}
