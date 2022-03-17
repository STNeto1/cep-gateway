import { Body, Controller, Post } from '@nestjs/common'
import { CepService } from './cep.service'
import { SearchCepDto } from './dto/search-cep.dto'

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Post()
  create(@Body() data: SearchCepDto) {
    return this.cepService.search(data)
  }
}
