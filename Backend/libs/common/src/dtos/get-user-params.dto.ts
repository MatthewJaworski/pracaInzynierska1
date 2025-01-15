import { IsUUID } from 'class-validator';

export class GetUserParamsDto {
  @IsUUID('all')
  id: string;
}
