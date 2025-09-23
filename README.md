# Projeto P.I.T.E.R

**Plataforma de Integração e Transparência em Educação e Recursos**

Aplicação web para monitoramento de tecnologias educacionais em diários oficiais municipais, focada especificamente em Goiânia/GO.

## Visão Geral

O P.I.T.E.R é uma plataforma que utiliza a API do Querido Diário para buscar e analisar publicações relacionadas a tecnologias educacionais em diários oficiais do município de Goiânia. A aplicação permite filtrar e visualizar informações sobre infraestrutura, conectividade, robótica, software e serviços tecnológicos no contexto educacional.

## Funcionalidades Implementadas

### Interface Principal
- Busca em tempo real na API do Querido Diário
- Filtros por categoria tecnológica (infraestrutura, conectividade, robótica, software, serviços)
- Filtros por período temporal (data início/fim)
- Visualização de resultados com identificação automática de tipos de atos públicos
- Carregamento de conteúdo completo dos diários
- Links diretos para diários originais e downloads de texto

### Processamento de Dados
- Identificação automática de tipos de atos: contratos, regulamentações, decisões
- Categorização de conteúdo educacional
- Parsing e exibição de excerpts relevantes
- Preview limitado de conteúdo completo (primeiros 5000 caracteres)

## Arquitetura Técnica

### Frontend (Next.js)
- **Framework**: Next.js 14 com App Router
- **Linguagem**: JavaScript (ES2022)
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: React useState hooks

### API Integration
- **API Principal**: Querido Diário (https://queridodiario.ok.org.br/api)
- **Cliente HTTP**: Axios com interceptors para logging
- **Timeout**: 30s para requests principais, 15s para conteúdo de diários
- **Cache**: Revalidação a cada 1 hora

### Estrutura de Dados
```typescript
// Filtros de busca
{
  municipio: 'Goiânia',
  categoria: 'infraestrutura' | 'conectividade' | 'robotica' | 'software' | 'servicos',
  dataInicio: 'YYYY-MM-DD',
  dataFim: 'YYYY-MM-DD'
}

// Response da API Querido Diário
{
  id, territory_id, territory_name, state_code,
  date, url, content, txt_url, created_at,
  edition_number, is_extra_edition
}
```

## Tecnologias Utilizadas

### Core
- **Next.js** 14.2.32
- **React** 18.2.0
- **Tailwind CSS** 3.3.0

### HTTP Client
- **Axios** 1.6.0

### API Externa
- **Querido Diário API** - Dados de diários oficiais brasileiros

## Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Setup
```bash
# Clone o repositório
git clone https://github.com/unb-mds/Projeto-P.I.T.E.R.git

# Entre no diretório
cd Projeto-P.I.T.E.R

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Análise estática
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── gazettes/              # API route para Querido Diário
│   │   └── process-investment-data/ # Processamento + NLP (preparado)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.js                    # Página principal da aplicação
├── services/
│   └── api/
│       └── QueridoDiarioApiClient.ts # Cliente HTTP para API
└── types/
    └── index.ts                   # Definições TypeScript
```

## Categorias de Busca

### Infraestrutura
- Laboratórios de informática, salas multimídia
- Equipamentos e instalações tecnológicas
- Rede estruturada, cabeamento, energia
- Mobiliário tecnológico

### Conectividade
- Internet, banda larga, WiFi
- Telecomunicações, fibra óptica
- Provedores, acesso digital

### Robótica
- Kits de robótica, Arduino, Scratch
- Programação, pensamento computacional
- STEM, maker, automação

### Software
- Software educacional, aplicativos
- Plataformas digitais, sistemas
- Licenças, ferramentas digitais

### Serviços
- Consultoria e suporte técnico
- Manutenção de equipamentos
- Treinamento e capacitação digital
- Assessoria técnica

## API Routes

### `GET /api/gazettes`
Busca diários oficiais via Querido Diário API
- Parâmetros: municipio, categoria, data_inicio, data_fim
- Response: Array de diários com metadados

### `POST /api/process-investment-data`
Orquestração completa: busca + análise NLP (preparado para microserviço Python)
- Input: Filtros de busca
- Output: Dados processados para visualização

## Desenvolvimento

### Estado Atual
A aplicação está totalmente funcional com integração direta à API do Querido Diário. Todas as funcionalidades de busca, filtragem e visualização estão implementadas.

### Futuras Melhorias
1. Microserviço NLP em Python/SpaCy para análise semântica
2. Dashboard com gráficos Chart.js
3. Exportação de relatórios
4. Cache local de resultados
5. Expansão para outros municípios

### Debugging
- Console logs detalhados em todas as requisições
- Interceptors Axios para monitoramento de requests/responses
- Error handling com mensagens específicas por tipo de erro

---

**Desenvolvido pela equipe UnB-MDS**
