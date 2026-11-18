import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { NewsService } from './news.service.js';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const news = this.newsService.findOne(id);
    if (!news) {
      throw new NotFoundException(`Notícia com ID ${id} não encontrada`);
    }
    return news;
  }
}