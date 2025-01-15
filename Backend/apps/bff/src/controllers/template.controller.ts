import { CreateTemplateDto } from '@app/common/dtos/create-template.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTemplateDto } from '@app/common/dtos/update-template.dto';
import { FillTemplateDto } from '@app/common/dtos/fill-template.dto';
import { BffTemplateService } from '../services/template.service';
import { BffUserService } from '../services/user.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/api/template')
export class BffTemplateController {
  constructor(
    private readonly bffTemplateService: BffTemplateService,
    private readonly bffUserService: BffUserService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getTemplates() {
    return await this.bffTemplateService.getTemplates();
  }

  @Get('/for/student')
  @UseGuards(JwtAuthGuard)
  async getTemplatesForStudent() {
    return await this.bffTemplateService.getTemplatesForStudent();
  }
  @Get('/pdf')
  @UseGuards(JwtAuthGuard)
  async getTemplatePdf() {
    return await this.bffTemplateService.getTemplatePdfs();
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getTemplate(@Param('id') id: string) {
    return await this.bffTemplateService.getTemplate(id);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateTemplate(
    @Body() request: UpdateTemplateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.bffTemplateService.updateTemplate(request, file);
    return HttpStatus.ACCEPTED;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createTemplate(
    @Body() request: CreateTemplateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.bffTemplateService.createTemplate(request, file);
  }

  @Get('/pdf/fields/:templateId')
  @UseGuards(JwtAuthGuard)
  async getTemplateFields(
    @Param('templateId') templateId: string,
    @Query('for') userType: 'student' | 'dean',
  ) {
    return await this.bffTemplateService.getTemplateFields(
      templateId,
      userType,
    );
  }

  @Post('/fill')
  @UseGuards(JwtAuthGuard)
  async fillTemplate(@Body() request: FillTemplateDto) {
    const result = await this.bffUserService.getUser(request.userId);
    if (typeof result === 'number') {
      return result;
    }
    return await this.bffTemplateService.saveTemplateData(request, result);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTemplate(@Param('id') id: string) {
    await this.bffTemplateService.deleteTemplate(id);
    return HttpStatus.ACCEPTED;
  }
}
