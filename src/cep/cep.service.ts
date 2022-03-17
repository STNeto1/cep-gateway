import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { SearchCepDto } from './dto/search-cep.dto'
import { Cep, CepDocument } from './entities/cep.entity'

type ViaCepResult = {
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

  async search(data: SearchCepDto): Promise<CepDocument> {
    const cep = await this.cepModel
      .findOne({
        cep: data.cep
      })
      .exec()

    if (cep) {
      return cep
    }

    await this.searchViaCep(data, (value) => {
      if (value) {
        const newCep = new this.cepModel(value)
        return newCep.save()
      }
    })

    return cep
  }

  async searchViaCep(
    search: SearchCepDto,
    cb: (value: ViaCepResult | null) => void
  ) {
    const observable = this.httpService.get(
      `https://viacep.com.br/ws/${search.cep}/json/`
    )

    observable.subscribe({
      next({ data }) {
        if (data.erro) {
          return cb(null)
        }

        if (!data.erro) {
          cb({
            cep: search.cep,
            uf: data.uf,
            cidade: data.localidade,
            bairro: data.bairro,
            rua: data.logradouro ?? ''
          })
        }
      },
      error: (e) => {
        this.logger.error(search)
        this.logger.error(e)

        cb(null)
      }
    })
  }
}
