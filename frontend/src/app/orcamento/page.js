'use client';

import { useState } from 'react';

const SERVICOS = [
  'Vigilância Patrimonial',
  'Portaria e Controle de Acesso',
  'Monitoramento Eletrônico',
  'Escolta Armada',
  'Segurança para Eventos',
  'Segurança Pessoal',
  'Outro'
];

const SEGMENTOS = [
  'Condomínio Residencial',
  'Condomínio Comercial',
  'Empresa / Indústria',
  'Hospital / Clínica',
  'Embaixada / Consulado',
  'Evento Corporativo',
  'Evento Social',
  'Residência',
  'Outro'
];

export default function OrcamentoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    servico: '',
    segmento: '',
    urgencia: 'normal',
    mensagem: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = `*SOLICITAÇÃO DE ORÇAMENTO - SOBERANA*%0A%0A*Nome:* ${formData.nome}%0A*Empresa:* ${formData.empresa || '-'}%0A*Email:* ${formData.email}%0A*Telefone:* ${formData.telefone}%0A*Serviço:* ${formData.servico}%0A*Segmento:* ${formData.segmento}%0A*Urgência:* ${formData.urgencia === 'urgente' ? '🔴 URGENTE' : 'Normal'}%0A*Mensagem:* ${formData.mensagem || '-'}`;
    window.open(`https://wa.me/556133996013?text=${texto}`, '_blank');
  };

  return (
    <main className="orc-page">
      <div className="orc-container">
        <div className="orc-header">
          <p className="eyebrow">Fale com a Soberana</p>
          <h1>Solicite seu orçamento</h1>
          <p className="orc-sub">Preencha o formulário abaixo e receba uma proposta personalizada em até 24 horas. Para atendimentos urgentes, selecione a opção de urgência.</p>
        </div>

        <form className="orc-form" onSubmit={handleSubmit}>
          <div className="orc-grid">
            <div className="orc-field">
              <label htmlFor="nome">Nome completo *</label>
              <input id="nome" name="nome" type="text" required value={formData.nome} onChange={handleChange} placeholder="Seu nome" />
            </div>
            <div className="orc-field">
              <label htmlFor="empresa">Empresa / Condomínio</label>
              <input id="empresa" name="empresa" type="text" value={formData.empresa} onChange={handleChange} placeholder="Nome da empresa ou condomínio" />
            </div>
            <div className="orc-field">
              <label htmlFor="email">E-mail *</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="seu@email.com" />
            </div>
            <div className="orc-field">
              <label htmlFor="telefone">Telefone / WhatsApp *</label>
              <input id="telefone" name="telefone" type="tel" required value={formData.telefone} onChange={handleChange} placeholder="(61) 99999-9999" />
            </div>
          </div>

          <div className="orc-grid">
            <div className="orc-field">
              <label htmlFor="servico">Serviço desejado *</label>
              <select id="servico" name="servico" required value={formData.servico} onChange={handleChange}>
                <option value="">Selecione o serviço</option>
                {SERVICOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="orc-field">
              <label htmlFor="segmento">Segmento *</label>
              <select id="segmento" name="segmento" required value={formData.segmento} onChange={handleChange}>
                <option value="">Selecione o segmento</option>
                {SEGMENTOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="orc-field">
              <label htmlFor="urgencia">Nível de urgência *</label>
              <select id="urgencia" name="urgencia" required value={formData.urgencia} onChange={handleChange}>
                <option value="normal">Normal — resposta em até 24h</option>
                <option value="urgente">🔴 Urgente — preciso de resposta imediata</option>
              </select>
            </div>
          </div>

          <div className="orc-field full">
            <label htmlFor="mensagem">Detalhes adicionais</label>
            <textarea id="mensagem" name="mensagem" rows={4} value={formData.mensagem} onChange={handleChange} placeholder="Descreva o local, quantidade de postos, horários, datas de evento ou qualquer informação relevante..." />
          </div>

          <button type="submit" className={`btn orc-btn ${formData.urgencia === 'urgente' ? 'orc-btn--urgente' : ''}`}>
            {formData.urgencia === 'urgente' ? 'Enviar solicitação urgente' : 'Solicitar orçamento'}
          </button>
          <p className="orc-note">Ao enviar, você será redirecionado para o WhatsApp da Soberana com os dados preenchidos.</p>
        </form>
      </div>
    </main>
  );
}