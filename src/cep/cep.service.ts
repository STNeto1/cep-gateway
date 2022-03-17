import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { firstValueFrom } from 'rxjs'

import { SearchCepDto } from './dto/search-cep.dto'
import { Cep, CepDocument } from './entities/cep.entity'

type PublicCepDocument = {
  cep: string
  uf: string
  cidade: string
  bairro: string
  rua: string
}
@Injectable()
export class CepService {
  private readonly logger = new Logger(CepService.name)

  constructor(
    @InjectModel(Cep.name) private cepModel: Model<CepDocument>,
    private httpService: HttpService
  ) {}

  async search(data: SearchCepDto): Promise<PublicCepDocument> {
    const cep = await this.cepModel
      .findOne({
        cep: data.cep
      })
      .exec()

    if (cep) {
      return this.mapResult(cep)
    }

    const viaCepResult = await this.searchViaCep(data)

    if (viaCepResult) {
      return this.mapResult(viaCepResult)
    }

    throw new BadRequestException('No CEP was found')
  }

  async searchViaCep(search: SearchCepDto): Promise<CepDocument | null> {
    try {
      const observable = this.httpService.get(
        `https://viacep.com.br/ws/${search.cep}/json/`
      )

      const { data } = await firstValueFrom(observable)

      if (data.erro) {
        return null
      }

      const model = new this.cepModel({
        cep: search.cep,
        uf: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        rua: data.logradouro ?? ''
      })
      return model.save()
    } catch (error) {
      this.logger.error(error.message)
      return null
    }
  }

  mapResult(data: CepDocument): PublicCepDocument {
    return {
      cep: data.cep,
      uf: data.uf,
      cidade: data.cidade,
      bairro: data.bairro,
      rua: data.rua
    }
  }
}
