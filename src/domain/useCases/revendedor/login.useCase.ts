import { LoadLogin } from './loadLogin'

export interface LoginUseCase{

  login: (login: string, password: string) => Promise<LoadLogin>
}
