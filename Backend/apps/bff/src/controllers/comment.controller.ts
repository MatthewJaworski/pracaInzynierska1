import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from '@app/common/dtos/create-comment.dto';
import { BffCommentService } from '../services/comment.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/api/comment')
export class BffCommentController {
  constructor(private readonly bffCommentService: BffCommentService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async addComment(@Body() request: CreateCommentDto) {
    return await this.bffCommentService.addComment(request);
  }

  @Get('/:documentId')
  @UseGuards(JwtAuthGuard)
  async getComments(@Param('documentId') documentId: string) {
    return await this.bffCommentService.getCommentsByDocumentId(documentId);
  }
}
