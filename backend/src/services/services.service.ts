import { Injectable } from '@nestjs/common';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: 'Vigilância patrimonial',
    description: 'Empresas, indústrias e obras',
    icon: 'shield',
  },
  {
    id: 2,
    title: 'Portaria e acesso',
    description: 'Recepção e controle de entrada',
    icon: 'building',
  },
  {
    id: 3,
    title: 'Monitoramento',
    description: 'Câmeras e acompanhamento remoto',
    icon: 'camera',
  },
  {
    id: 4,
    title: 'Escolta',
    description: 'Deslocamentos e cargas seguras',
    icon: 'route',
  },
  {
    id: 5,
    title: 'Eventos',
    description: 'Controle de público e segurança',
    icon: 'users',
  },
  {
    id: 6,
    title: 'Segurança pessoal',
    description: 'Proteção para pessoas e famílias',
    icon: 'user-shield',
  },
];

@Injectable()
export class ServicesService {
  findAll(): ServiceItem[] {
    return SERVICES_DATA;
  }

  findOne(id: number): ServiceItem | undefined {
    return SERVICES_DATA.find((s) => s.id === id);
  }
}