import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePredefinedField } from '@app/common/dtos/create-predfefined-fields.dto';
import { BffFieldsService } from '../services/fields.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/api/fields')
export class BffFieldsController {
  constructor(private readonly bffFieldsService: BffFieldsService) {}

  @Get('/predefined')
  @UseGuards(JwtAuthGuard)
  async getFields(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.bffFieldsService.getFields({ page, pageSize });
  }

  @Delete('/predefined')
  @UseGuards(JwtAuthGuard)
  async deleteField(@Query('fieldName') fieldName: string) {
    await this.bffFieldsService.deletePredefinedField(fieldName);
    return HttpStatus.ACCEPTED;
  }

  @Patch('/predefined')
  @UseGuards(JwtAuthGuard)
  async updateField(@Body() request: CreatePredefinedField) {
    await this.bffFieldsService.updatePredefinedField(request);
    return HttpStatus.ACCEPTED;
  }

  @Post('/predefined-field')
  @UseGuards(JwtAuthGuard)
  async createPredefinedField(@Body() request: CreatePredefinedField) {
    await this.bffFieldsService.createPredefinedField(request);
    return HttpStatus.ACCEPTED;
  }
}
