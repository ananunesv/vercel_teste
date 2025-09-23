// CAMADA 2: COMPORTAMENTO - MOLECULE
// Componente para exibir estatísticas da busca

import React from 'react';

interface SearchStatsProps {
  totalResults: number;
  isLoading: boolean;
  currentCategory?: string;
  searchTime?: number;
}

// Função para obter informações da categoria
const getCategoryInfo = (categoria?: string) => {
  const categoryMap = {
    'infraestrutura': { emoji: '🏗️', name: 'Infraestrutura', description: 'Laboratórios, equipamentos e instalações tecnológicas' },
    'conectividade': { emoji: '🌐', name: 'Conectividade', description: 'Internet, banda larga, WiFi e telecomunicações' },
    'robotica': { emoji: '🤖', name: 'Robótica', description: 'Kits de robótica, programação e pensamento computacional' },
    'software': { emoji: '💻', name: 'Software', description: 'Software educacional, aplicativos e plataformas digitais' },
    'servicos': { emoji: '🔧', name: 'Serviços', description: 'Consultoria, suporte técnico e capacitação digital' }
  };
  
  return categoria ? categoryMap[categoria as keyof typeof categoryMap] : null;
};

export const SearchStats: React.FC<SearchStatsProps> = ({
  totalResults,
  isLoading,
  currentCategory,
  searchTime
}) => {
  const categoryInfo = getCategoryInfo(currentCategory);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin text-2xl">⏳</div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Buscando...</h2>
            <p className="text-gray-600">Consultando diários oficiais do Querido Diário</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {totalResults.toLocaleString()} publicação{totalResults !== 1 ? 'ões' : ''} encontrada{totalResults !== 1 ? 's' : ''}
            </h2>
            <p className="text-gray-600">
              Tecnologias educacionais em diários oficiais municipais
              {searchTime && (
                <span className="text-sm text-gray-500 ml-2">
                  • Busca realizada em {searchTime.toFixed(2)}s
                </span>
              )}
            </p>
          </div>
        </div>
        
        {categoryInfo && (
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{categoryInfo.emoji}</span>
              <span className="text-lg font-semibold text-gray-800">{categoryInfo.name}</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              {categoryInfo.description}
            </p>
          </div>
        )}
      </div>

      {totalResults === 0 && (
        <div className="text-center py-6 border-t">
          <div className="mb-4">
            <span className="text-6xl opacity-50">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Nenhuma tecnologia educacional encontrada
          </h3>
          <p className="text-gray-500 mb-4">
            Não foram encontradas publicações sobre {categoryInfo?.name.toLowerCase()} nos diários oficiais do período selecionado.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">💡 Dicas para melhorar sua busca:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Experimente um período de tempo mais amplo</li>
              <li>• Teste outras categorias tecnológicas</li>
              <li>• Verifique se há publicações recentes no município</li>
            </ul>
          </div>
        </div>
      )}

      {totalResults > 0 && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>📄</span>
              <span>Contratos e licitações</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📋</span>
              <span>Regulamentações</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⚖️</span>
              <span>Decisões oficiais</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};