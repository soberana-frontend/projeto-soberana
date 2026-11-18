import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { SegmentsService } from './segments.service.js';

@Controller('segments')
export class SegmentsController {
  constructor(private readonly segmentsService: SegmentsService) {}

  @Get()
  findAll() {
    return this.segmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const segment = this.segmentsService.findOne(id);
    if (!segment) {
      throw new NotFoundException(`Segmento com ID ${id} não encontrado`);
    }
    return segment;
  }
}