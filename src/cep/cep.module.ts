import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CepController } from './cep.controller'
import { CepService } from './cep.service'
import { Cep, CepSchema } from './entities/cep.entity'

@Module({
  imports: [MongooseModule.forFeature([{ name: Cep.name, schema: CepSchema }])],
  controllers: [CepController],
  providers: [CepService]
})
export class CepModule {}
