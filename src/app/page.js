// P.I.T.E.R - Interface Educacional
'use client';

import React, { useState } from 'react';
import { cleanGazetteText } from '@/utils/textCleaner';
import { SearchBar } from '@/components/molecules/SearchBar';
import { SearchStats } from '@/components/molecules/SearchStats';
import { ResultCard } from '@/components/molecules/ResultCard';
import { LoadingOverlay } from '@/components/molecules/LoadingOverlay';
import { Toast } from '@/components/molecules/Toast';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { useToast } from '@/hooks/useToast';

export default function HomePage() {
  const [gazettes, setGazettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedGazettes, setExpandedGazettes] = useState(new Set());
  const [gazetteContents, setGazetteContents] = useState({});
  const [searchTime, setSearchTime] = useState(null);
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  // Estados dos filtros - Baseado no projeto Tecnologias na Educação
  const [filters, setFilters] = useState({
    municipio: 'Goiânia',
    categoria: 'infraestrutura',
    dataInicio: '2024-01-01',
    dataFim: new Date().toISOString().split('T')[0]
  });

  // Mapear município para código IBGE
  const getTerritoryId = (municipio) => {
    const territoryMap = {
      'Goiânia': '5208707'
    };
    return territoryMap[municipio] || null;
  };

  // Construir query string baseada nas categorias de Tecnologias na Educação
  const buildQueryString = (categoria) => {
    const keywords = [];

    if (categoria === 'infraestrutura') {
      keywords.push(
        'infraestrutura tecnológica',
        'laboratório informática',
        'sala multimídia',
        'equipamento tecnológico',
        'instalação tecnológica',
        'rede estruturada',
        'cabeamento',
        'energia elétrica',
        'mobiliário tecnológico'
      );
    } else if (categoria === 'conectividade') {
      keywords.push(
        'internet',
        'banda larga',
        'conexão',
        'wifi',
        'rede',
        'telecomunicações',
        'fibra óptica',
        'provedora internet',
        'acesso digital',
        'conectividade'
      );
    } else if (categoria === 'robotica') {
      keywords.push(
        'robótica',
        'robot',
        'programação',
        'scratch',
        'arduino',
        'maker',
        'STEM',
        'pensamento computacional',
        'automação',
        'kit robótica'
      );
    } else if (categoria === 'software') {
      keywords.push(
        'software educacional',
        'aplicativo',
        'plataforma digital',
        'sistema educacional',
        'licença software',
        'programa computador',
        'aplicação educativa',
        'ferramenta digital',
        'tecnologia educacional'
      );
    } else if (categoria === 'servicos') {
      keywords.push(
        'serviço tecnológico',
        'consultoria tecnológica',
        'suporte técnico',
        'manutenção equipamento',
        'treinamento tecnológico',
        'capacitação digital',
        'assessoria técnica',
        'prestação serviço',
        'contrato tecnológico'
      );
    }

    return keywords.join(' OR ');
  };

  const searchGazettes = async () => {
    setIsLoading(true);
    const startTime = performance.now();
    console.log('🔍 INICIANDO BUSCA COM FILTROS:', filters);

    try {
      showInfo('Iniciando busca nos diários oficiais...');
      
      const territoryId = getTerritoryId(filters.municipio);
      const querystring = buildQueryString(filters.categoria);

      // Parâmetros corretos da API
      const params = new URLSearchParams({
        territory_ids: territoryId,
        querystring: querystring,
        published_since: filters.dataInicio,
        published_until: filters.dataFim,
        size: '100',
        sort_by: 'descending_date'
      });

      console.log('🌐 URL:', `https://queridodiario.ok.org.br/api/gazettes?${params}`);
      console.log('🎯 Territory ID:', territoryId);
      console.log('🔎 Query:', querystring);

      const response = await fetch(`https://queridodiario.ok.org.br/api/gazettes?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      console.log('📊 Resposta completa:', data);
      console.log('🏙️ Cidades nos resultados:', [...new Set(data.gazettes?.map(g => g.territory_name) || [])]);
      console.log('📈 Total encontrados:', data.total_gazettes);

      const results = data.gazettes || [];
      setGazettes(results);
      
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      setSearchTime(duration);
      
      if (results.length > 0) {
        showSuccess(`${results.length} publicação${results.length !== 1 ? 'ões' : ''} encontrada${results.length !== 1 ? 's' : ''} em ${duration.toFixed(2)}s`);
      } else {
        showInfo('Nenhuma publicação encontrada para os filtros selecionados. Tente ajustar os parâmetros de busca.');
      }

    } catch (error) {
      console.error('❌ Erro:', error);
      setGazettes([]);
      showError(`Erro na busca: ${error.message}`);
    }

    setIsLoading(false);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Função para carregar conteúdo completo do diário
  const loadGazetteContent = async (gazette, index) => {
    if (!gazette.txt_url) {
      showError('URL do conteúdo não disponível para este diário');
      return;
    }

    try {
      showInfo('Carregando conteúdo completo do diário...');
      
      const response = await fetch(gazette.txt_url, {
        headers: {
          'Accept': 'text/plain; charset=utf-8'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      let content = await response.text();

      // Limpar o texto usando a função utilitária
      content = cleanGazetteText(content);

      setGazetteContents(prev => ({
        ...prev,
        [index]: content
      }));

      setExpandedGazettes(prev => new Set([...prev, index]));
      showSuccess('Conteúdo carregado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      showError(`Erro ao carregar conteúdo: ${error.message}`);
    }
  };

  // Função para alternar expansão
  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedGazettes);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedGazettes(newExpanded);
  };

  return (
    <>
      <LoadingOverlay 
        isLoading={isLoading} 
        message="Consultando diários oficiais..."
      />
      
      {/* Toast notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          
          {/* Header */}
          <Header />

          {/* Barra de busca */}
          <div className="mb-8">
            <SearchBar
              filters={filters}
              onFilterChange={updateFilter}
              onSearch={searchGazettes}
              isLoading={isLoading}
            />
          </div>

          {/* Estatísticas */}
          <div className="mb-8">
            <SearchStats
              totalResults={gazettes.length}
              isLoading={isLoading}
              currentCategory={filters.categoria}
              searchTime={searchTime}
            />
          </div>

          {/* Resultados */}
          {!isLoading && gazettes.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span>📋</span>
                Publicações Encontradas
              </h3>
              
              {gazettes.map((gazette, index) => (
                <ResultCard
                  key={gazette.id || `${gazette.territory_id}_${gazette.date}_${index}`}
                  gazette={gazette}
                  index={index}
                  isExpanded={expandedGazettes.has(index)}
                  content={gazetteContents[index]}
                  onToggleExpand={toggleExpanded}
                  onLoadContent={loadGazetteContent}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}