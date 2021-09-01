import { Request, Response } from 'express'

import { createListaFactory } from '@/main/factories/useCase/listaCompra.factory'

export class ListaCompraController {
  async handle (request: Request, response: Response): Promise<Response> {
    const lista = createListaFactory()
    const dados = await lista.list()

    if (dados) {
      return response.status(200).json(dados)
    } else {
      return response.status(204).send()
    }
  }
}
