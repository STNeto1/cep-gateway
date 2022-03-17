import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { SearchCepDto } from './dto/search-cep.dto'
import { Cep, CepDocument } from './entities/cep.entity'
@Injectable()
export class CepService {
  constructor(@InjectModel(Cep.name) private cepModel: Model<CepDocument>) {}

  async search(data: SearchCepDto): Promise<CepDocument> {
    return this.cepModel
      .findOne({
        cep: { $eq: data.cep }
      })
      .exec()
  }
}
