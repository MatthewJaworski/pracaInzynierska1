import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { UpdateUserDto } from '@app/common/dtos/update-user.dto';
import { Role } from '@app/common/types/role';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { BffUserService } from '../services/user.service';
import { GetUserParamsDto } from '@app/common/dtos/get-user-params.dto';

@Controller('/api/user')
export class BffUserController {
  constructor(private readonly bffUserService: BffUserService) {}

  @Post('/register')
  async register(@Body() request: CreateUserDto) {
    await this.bffUserService.createUser(request);
    return HttpStatus.ACCEPTED;
  }

  @Post('/register/many')
  @UseGuards(JwtAuthGuard)
  async registerMany(@Body() request: CreateUserDto[]) {
    return await this.bffUserService.createUserMany(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by/role/:role/')
  async getUsersByRole(
    @Param('role') role: Role,
    @Query('safeData') safeData: 'true',
  ) {
    return await this.bffUserService.getUsersByRole(role, safeData);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param() params: GetUserParamsDto) {
    return await this.bffUserService.getUser(params.id);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async patchUser(@Body() request: UpdateUserDto) {
    await this.bffUserService.updateUser(request);
    return HttpStatus.ACCEPTED;
  }
}
