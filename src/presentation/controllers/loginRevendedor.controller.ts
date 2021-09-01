import { Request, Response } from 'express'
import { Validator } from '@/application/helpers/validation'
import { loginRevendedorFactory } from '@/main/factories/useCase/loginRevendedor.factory'

export class LoginRevendedorController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body

    const validator = new Validator()
    validator.setValue(login).setAlias('Login').isRequired().isString()
    validator.setValue(senha).setAlias('Senha').isRequired().isString()

    if (validator.validate()) {
      const loginRevendedor = loginRevendedorFactory()
      const data = await loginRevendedor.login(login, senha)
      return response.status(201).json(data)
    } else {
      return response.status(400).json({ error: validator.error })
    }
  }
}
