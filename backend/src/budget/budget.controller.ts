import { Controller, Get, Post, Body } from '@nestjs/common';
import { BudgetService } from './budget.service.js';
import { CreateBudgetDto } from './budget.dto.js';

@Controller('budget')
export class BudgetController {
 constructor(private readonly budgetService: BudgetService) {}

 @Post()
 create(@Body() dto: CreateBudgetDto) {
 return this.budgetService.create(dto);
 }

 @Get()
 findAll() {
 return this.budgetService.findAll();
 }
}