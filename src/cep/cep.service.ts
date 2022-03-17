import { Injectable } from '@nestjs/common'
import { SearchCepDto } from './dto/search-cep.dto'

@Injectable()
export class CepService {
  async search(data: SearchCepDto) {
    console.log('hello', data)
  }
}
