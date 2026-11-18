import { Injectable } from '@nestjs/common';

export interface SegmentItem {
  id: number;
  title: string;
  description: string;
}

const SEGMENTS_DATA: SegmentItem[] = [
  {
    id: 1,
    title: 'Empresas e indústrias',
    description: 'Proteção do patrimônio, controle de acesso e rondas para operações de qualquer porte.',
  },
  {
    id: 2,
    title: 'Condomínios',
    description: 'Portaria, controle de visitantes e monitoramento para moradores e administração.',
  },
  {
    id: 3,
    title: 'Eventos',
    description: 'Equipe dimensionada para o público e para o local, do planejamento ao encerramento.',
  },
];

@Injectable()
export class SegmentsService {
  findAll(): SegmentItem[] {
    return SEGMENTS_DATA;
  }

  findOne(id: number): SegmentItem | undefined {
    return SEGMENTS_DATA.find((s) => s.id === id);
  }
}