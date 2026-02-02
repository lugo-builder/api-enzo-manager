import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(@Query('sortBy') sortBy: string) {
      return this.usersService.findAll(sortBy);
    }

    
    @Get('water')
    async getPaymentsByMonthAndYear(@Query('sortBy') sortBy: string) {
      return this.usersService.findWaterByFilter(sortBy);
    }
}
