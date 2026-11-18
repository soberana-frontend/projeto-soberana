import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ServicesModule } from './services/services.module.js';
import { SegmentsModule } from './segments/segments.module.js';
import { NewsModule } from './news/news.module.js';
import { BudgetModule } from './budget/budget.module.js';

@Module({
  imports: [ServicesModule, SegmentsModule, NewsModule, BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
