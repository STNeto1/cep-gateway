import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CepModule } from './cep/cep.module'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CepModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
