// CAMADA 3: LAYOUT - ORGANISM
// Footer da aplicação com informações e links

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">❤️</span>
          <p className="text-gray-600">
            Desenvolvido com dados públicos do <strong>Querido Diário</strong>
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Contribuindo para transparência e acesso à informação pública na educação
        </p>
      </div>

      {/* Links úteis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 flex items-center justify-center gap-2">
            <span>🌐</span>
            Recursos Externos
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a 
                href="https://queridodiario.ok.org.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Portal Querido Diário
              </a>
            </li>
            <li>
              <a 
                href="https://queridodiario.ok.org.br/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                API Querido Diário
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 flex items-center justify-center gap-2">
            <span>🎓</span>
            Categorias
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>🏗️ Infraestrutura Tecnológica</li>
            <li>🌐 Conectividade Digital</li>
            <li>🤖 Robótica Educacional</li>
            <li>💻 Software e Aplicativos</li>
            <li>🔧 Serviços Técnicos</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 flex items-center justify-center gap-2">
            <span>📊</span>
            Dados e Estatísticas
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Diários Oficiais Municipais</li>
            <li>Atualizações em Tempo Real</li>
            <li>Dados Públicos Verificados</li>
            <li>Transparência Governamental</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t pt-4 text-center text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()} P.I.T.E.R - Plataforma de Integração e Transparência em Educação e Recursos
        </p>
        <p className="mt-1">
          Dados fornecidos pela API do Querido Diário • Projeto de código aberto
        </p>
      </div>
    </footer>
  );
};