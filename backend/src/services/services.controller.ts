import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ServicesService } from './services.service.js';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const service = this.servicesService.findOne(id);
    if (!service) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    return service;
  }
}