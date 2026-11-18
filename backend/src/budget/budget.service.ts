import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './budget.dto.js';

export interface BudgetRequest extends CreateBudgetDto {
 id: number;
 createdAt: string;
 status: 'new' | 'contacted' | 'closed';
}

const budgets: BudgetRequest[] = [];

@Injectable()
export class BudgetService {
 create(dto: CreateBudgetDto): BudgetRequest {
 const budget: BudgetRequest = {
 ...dto,
 id: budgets.length + 1,
 createdAt: new Date().toISOString(),
 status: 'new',
 };
 budgets.push(budget);
 return budget;
 }

 findAll(): BudgetRequest[] {
 return budgets;
 }
}