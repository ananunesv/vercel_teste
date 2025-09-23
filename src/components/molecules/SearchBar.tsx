// CAMADA 2: COMPORTAMENTO - MOLECULE
// Componente de barra de busca integrado

import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';

interface SearchBarProps {
  filters: {
    municipio: string;
    categoria: string;
    dataInicio: string;
    dataFim: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const categoryOptions = [
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'conectividade', label: 'Conectividade' },
  { value: 'robotica', label: 'Robótica' },
  { value: 'software', label: 'Software' },
  { value: 'servicos', label: 'Serviços' }
];

const municipioOptions = [
  { value: 'Goiânia', label: 'Goiânia' }
];

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFilterChange,
  onSearch,
  isLoading
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filtros de Busca</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Município */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Município
          </label>
          <Select
            options={municipioOptions}
            value={filters.municipio}
            onChange={(value) => onFilterChange('municipio', value)}
            className="w-full"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria Tecnológica
          </label>
          <Select
            options={categoryOptions}
            value={filters.categoria}
            onChange={(value) => onFilterChange('categoria', value)}
            className="w-full"
          />
        </div>

        {/* Data Início */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Início
          </label>
          <Input
            type="date"
            value={filters.dataInicio}
            onChange={(value) => onFilterChange('dataInicio', value)}
            className="w-full"
          />
        </div>

        {/* Data Fim */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Fim
          </label>
          <Input
            type="date"
            value={filters.dataFim}
            onChange={(value) => onFilterChange('dataFim', value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Botão de busca */}
      <div className="flex justify-center">
        <Button
          onClick={onSearch}
          disabled={isLoading}
          className="px-8 py-3 text-lg"
        >
          {isLoading ? (
            <>
              Buscando...
            </>
          ) : (
            <>
              Pesquisar Diários
            </>
          )}
        </Button>
      </div>
    </div>
  );
};