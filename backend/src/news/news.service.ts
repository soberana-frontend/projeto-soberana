import { Injectable } from '@nestjs/common';

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  featured: boolean;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    title: '[Título da notícia principal]',
    summary: 'Resumo da notícia em duas linhas.',
    date: '[dd de mês de aaaa]',
    featured: true,
  },
  {
    id: 2,
    title: '[Título da notícia]',
    summary: 'Resumo curto.',
    date: '[data]',
    featured: false,
  },
  {
    id: 3,
    title: '[Título da notícia]',
    summary: 'Resumo curto.',
    date: '[data]',
    featured: false,
  },
];

@Injectable()
export class NewsService {
  findAll(): NewsItem[] {
    return NEWS_DATA;
  }

  findOne(id: number): NewsItem | undefined {
    return NEWS_DATA.find((n) => n.id === id);
  }
}