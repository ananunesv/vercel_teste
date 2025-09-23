// QUERIDO DIÁRIO: TECNOLOGIAS NA EDUCAÇÃO - Interface Educacional
'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [gazettes, setGazettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedGazettes, setExpandedGazettes] = useState(new Set());
  const [gazetteContents, setGazetteContents] = useState({});

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
    console.log('🔍 INICIANDO BUSCA COM FILTROS:', filters);

    try {
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
      const data = await response.json();

      console.log('📊 Resposta completa:', data);
      console.log('🏙️ Cidades nos resultados:', [...new Set(data.gazettes?.map(g => g.territory_name) || [])]);
      console.log('📈 Total encontrados:', data.total_gazettes);

      setGazettes(data.gazettes || []);

    } catch (error) {
      console.error('❌ Erro:', error);
    }

    setIsLoading(false);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Função para identificar o tipo de ato público (contratos, regulamentações, decisões)
  const identifyActType = (excerpt) => {
    const contractKeywords = ['contrato', 'licitação', 'pregão', 'dispensa', 'inexigibilidade', 'aquisição'];
    const regulationKeywords = ['decreto', 'portaria', 'resolução', 'lei', 'regulamento', 'normativa'];
    const decisionKeywords = ['autoriza', 'aprova', 'homologa', 'ratifica', 'designa', 'nomeia'];

    const text = excerpt.toLowerCase();

    if (contractKeywords.some(keyword => text.includes(keyword))) {
      return { type: 'Contrato', icon: '📄', color: 'bg-blue-100 text-blue-800' };
    }
    if (regulationKeywords.some(keyword => text.includes(keyword))) {
      return { type: 'Regulamentação', icon: '📋', color: 'bg-green-100 text-green-800' };
    }
    if (decisionKeywords.some(keyword => text.includes(keyword))) {
      return { type: 'Decisão', icon: '⚖️', color: 'bg-purple-100 text-purple-800' };
    }

    return { type: 'Ato Público', icon: '📊', color: 'bg-gray-100 text-gray-800' };
  };

  // Função para obter o emoji e descrição da categoria
  const getCategoryInfo = (categoria) => {
    const categoryMap = {
      'infraestrutura': { emoji: '🏗️', name: 'Infraestrutura' },
      'conectividade': { emoji: '🌐', name: 'Conectividade' },
      'robotica': { emoji: '🤖', name: 'Robótica' },
      'software': { emoji: '💻', name: 'Software' },
      'servicos': { emoji: '🔧', name: 'Serviços' }
    };
    return categoryMap[categoria] || { emoji: '📚', name: 'Educação' };
  };

  // Função para carregar conteúdo completo do diário
  const loadGazetteContent = async (gazette, index) => {
    if (!gazette.txt_url) return;

    try {
      const response = await fetch(gazette.txt_url);
      const content = await response.text();

      setGazetteContents(prev => ({
        ...prev,
        [index]: content
      }));

      setExpandedGazettes(prev => new Set([...prev, index]));
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      alert('Erro ao carregar conteúdo completo do diário');
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Querido Diário: Tecnologias na Educação</h1>
          <p className="text-gray-600">Monitoramento de tecnologias educacionais em diários oficiais municipais</p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Município */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Município
              </label>
              <select
                value={filters.municipio}
                onChange={(e) => updateFilter('municipio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Goiânia">Goiânia</option>
              </select>
            </div>

            {/* Categoria - Tecnologias na Educação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria Tecnológica
              </label>
              <select
                value={filters.categoria}
                onChange={(e) => updateFilter('categoria', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="infraestrutura">🏗️ Infraestrutura</option>
                <option value="conectividade">🌐 Conectividade</option>
                <option value="robotica">🤖 Robótica</option>
                <option value="software">💻 Software</option>
                <option value="servicos">🔧 Serviços</option>
              </select>
            </div>

            {/* Data Início */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Início
              </label>
              <input
                type="date"
                value={filters.dataInicio}
                onChange={(e) => updateFilter('dataInicio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Data Fim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Fim
              </label>
              <input
                type="date"
                value={filters.dataFim}
                onChange={(e) => updateFilter('dataFim', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Botão de busca */}
          <div className="mt-4">
            <button
              onClick={searchGazettes}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Buscando...' : 'Pesquisar'}
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {gazettes.length} publicação(ões) de tecnologia educacional encontrada(s)
            </h2>
            {filters.categoria && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Categoria:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {getCategoryInfo(filters.categoria).emoji} {getCategoryInfo(filters.categoria).name}
                </span>
              </div>
            )}
          </div>

          {gazettes.map((gazette, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">
                  {gazette.territory_name} - {gazette.state_code}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(gazette.date).toLocaleDateString('pt-BR')}
                </span>
              </div>

              {gazette.edition && (
                <p className="text-sm text-gray-600 mb-2">
                  Edição: {gazette.edition}
                  {gazette.is_extra_edition && ' (Extra)'}
                </p>
              )}

              {gazette.excerpts && gazette.excerpts.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-700 mb-2">Conteúdo Educacional Identificado:</h4>
                  {gazette.excerpts.map((excerpt, i) => {
                    const actType = identifyActType(excerpt);
                    return (
                      <div key={i} className="bg-gray-50 p-3 rounded mb-2 border-l-4 border-blue-400">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${actType.color}`}>
                            {actType.icon} {actType.type}
                          </span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                            🎓 Educação
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {excerpt}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Conteúdo expandido */}
              {expandedGazettes.has(index) && gazetteContents[index] && (
                <div className="mb-4 bg-gray-50 p-4 rounded border">
                  <h4 className="font-medium text-gray-700 mb-2">Conteúdo Completo do Diário:</h4>
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                      {gazetteContents[index].slice(0, 5000)}
                      {gazetteContents[index].length > 5000 && '...'}
                    </pre>
                  </div>
                  {gazetteContents[index].length > 5000 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Mostrando os primeiros 5000 caracteres de {gazetteContents[index].length} total
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                {gazette.url && (
                  <a
                    href={gazette.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                  >
                    Ver Diário Original
                  </a>
                )}
                {gazette.txt_url && (
                  <>
                    <button
                      onClick={() => loadGazetteContent(gazette, index)}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-200"
                    >
                      Carregar Conteúdo Completo
                    </button>
                    <a
                      href={gazette.txt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
                    >
                      Baixar Texto
                    </a>
                  </>
                )}
                {expandedGazettes.has(index) && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
                  >
                    Fechar Conteúdo
                  </button>
                )}
              </div>
            </div>
          ))}

          {gazettes.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <div className="mb-4">
                <span className="text-6xl">🔍</span>
              </div>
              <p className="text-gray-500 mb-2">Nenhuma tecnologia educacional encontrada nos diários oficiais.</p>
              <p className="text-sm text-gray-400">
                Tente ajustar os filtros de categoria, cidade ou período para encontrar mais resultados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}