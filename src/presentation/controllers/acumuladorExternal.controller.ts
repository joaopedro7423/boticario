import { Request, Response } from 'express'
import { AcumuladorCashBack } from '@/infra/external/acumuladorCashback'

export class AcumuladorController {
  async handle (request: Request, response: Response): Promise<Response> {
    const acumulador = new AcumuladorCashBack()
    const res = await acumulador.execute()
    return response.status(200).json(res)
  }
}
