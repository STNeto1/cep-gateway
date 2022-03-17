import { IsString, Matches } from 'class-validator'

export class SearchCepDto {
  @IsString()
  @Matches(/[0-9]{8}/)
  cep: string
}
