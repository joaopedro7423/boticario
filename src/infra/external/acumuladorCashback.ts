import axios from 'axios'

export class AcumuladorCashBack {
  private readonly baseUrl = 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323'
  private readonly token = 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'

  async execute (): Promise<any> {
    const res = await axios.get(this.baseUrl, {
      headers: {
        Authorizathion: 'Bearer ' + this.token
      }
    })

    return res.data
  }
}
