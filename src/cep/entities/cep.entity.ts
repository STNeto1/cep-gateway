import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CepDocument = Cep & Document

@Schema()
export class Cep {
  @Prop()
  cep: string

  @Prop()
  uf: string

  @Prop()
  cidade: string

  @Prop()
  bairro: string

  @Prop()
  rua: string
}

export const CepSchema = SchemaFactory.createForClass(Cep)
