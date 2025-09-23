// CAMADA 3: LAYOUT - ORGANISM
// Header principal da aplicação com navegação e informações

import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Querido Diário: Tecnologias na Educação",
  subtitle = "Monitoramento inteligente de tecnologias educacionais em diários oficiais municipais. Transparência e dados públicos para uma educação mais conectada."
}) => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      
      <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        {subtitle}
      </p>
      
      {/* Indicadores de status */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>API Online</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Dados Públicos Oficiais</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Atualização em Tempo Real</span>
        </div>
      </div>
    </header>
  );
};