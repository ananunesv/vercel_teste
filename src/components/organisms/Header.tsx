// CAMADA 3: LAYOUT - ORGANISM
// Header principal da aplicação com navegação e informações

import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "P.I.T.E.R",
  subtitle = "Procurador de Investimentos em Tecnologia na Educação"
}) => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {title}
        </h1>
      </div>

      <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-4">
        {subtitle}
      </p>

      <p className="text-gray-500 text-sm max-w-xl mx-auto">
        Procurador de Investimentos em Tecnologia na Educação
      </p>

      {/* Indicadores de status */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <span>API Online</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Dados Públicos Oficiais</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Tempo Real</span>
        </div>
      </div>
    </header>
  );
};