// CAMADA 2: COMPORTAMENTO - MOLECULE
// Componente para exibir um resultado de diário oficial

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { cleanGazetteText } from '@/utils/textCleaner';

interface GazetteResult {
  id?: string;
  territory_name: string;
  state_code: string;
  date: string;
  edition?: string;
  is_extra_edition?: boolean;
  excerpts?: string[];
  url?: string;
  txt_url?: string;
}

interface ResultCardProps {
  gazette: GazetteResult;
  index: number;
  isExpanded: boolean;
  content?: string;
  onToggleExpand: (index: number) => void;
  onLoadContent: (gazette: GazetteResult, index: number) => void;
}

// Função para identificar o tipo de ato público
const identifyActType = (excerpt: string) => {
  const contractKeywords = ['contrato', 'licitação', 'pregão', 'dispensa', 'inexigibilidade', 'aquisição'];
  const regulationKeywords = ['decreto', 'portaria', 'resolução', 'lei', 'regulamento', 'normativa'];
  const decisionKeywords = ['autoriza', 'aprova', 'homologa', 'ratifica', 'designa', 'nomeia'];

  const text = excerpt.toLowerCase();

  if (contractKeywords.some(keyword => text.includes(keyword))) {
    return { type: 'Contrato', color: 'bg-gray-100 text-gray-700' };
  }
  if (regulationKeywords.some(keyword => text.includes(keyword))) {
    return { type: 'Regulamentação', color: 'bg-gray-200 text-gray-800' };
  }
  if (decisionKeywords.some(keyword => text.includes(keyword))) {
    return { type: 'Decisão', color: 'bg-gray-150 text-gray-700' };
  }

  return { type: 'Ato Público', color: 'bg-gray-100 text-gray-800' };
};

export const ResultCard: React.FC<ResultCardProps> = ({
  gazette,
  index,
  isExpanded,
  content,
  onToggleExpand,
  onLoadContent
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-4 bg-white hover:shadow-md transition-shadow">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {gazette.territory_name} - {gazette.state_code}
            </h3>
            <p className="text-sm text-gray-600">
              {new Date(gazette.date).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          {gazette.edition && (
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Edição: {gazette.edition}
              {gazette.is_extra_edition && ' (Extra)'}
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo identificado */}
      {gazette.excerpts && gazette.excerpts.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Conteúdo Educacional Identificado:
          </h4>
          
          {gazette.excerpts.map((excerpt, i) => {
            const actType = identifyActType(excerpt);
            return (
              <div key={i} className="bg-gray-50 p-4 rounded-lg mb-3 border-l-4 border-gray-300">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${actType.color}`}>
                    {actType.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    Educação
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {cleanGazetteText(excerpt)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Conteúdo expandido */}
      {isExpanded && content && (
        <div className="mb-4 bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Conteúdo Completo do Diário:
          </h4>
          <div className="max-h-96 overflow-y-auto bg-white p-3 rounded border">
            <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words font-mono">
              {content.slice(0, 5000)}
              {content.length > 5000 && '...'}
            </pre>
          </div>
          {content.length > 5000 && (
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              Mostrando os primeiros 5.000 caracteres de {content.length.toLocaleString()} total
            </p>
          )}
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-wrap gap-3 pt-3 border-t">
        {gazette.url && (
          <a
            href={gazette.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            Ver Diário Original
          </a>
        )}
        
        {gazette.txt_url && (
          <>
            <Button
              onClick={() => onLoadContent(gazette, index)}
              variant="secondary"
              className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              {isExpanded ? 'Recarregar' : 'Carregar'} Conteúdo Completo
            </Button>
            
            <a
              href={gazette.txt_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Baixar Texto
            </a>
          </>
        )}
        
        {isExpanded && (
          <Button
            onClick={() => onToggleExpand(index)}
            variant="secondary"
            className="inline-flex items-center gap-2"
          >
            Fechar Conteúdo
          </Button>
        )}
      </div>
    </div>
  );
};