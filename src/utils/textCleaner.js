// Utilitário para limpeza e correção de encoding de texto
export function cleanText(text) {
  if (!text || typeof text !== 'string') return text;

  // Correções específicas baseadas no exemplo do diário de Goiânia
  let cleanedText = text
    // Correções específicas do texto mencionado
    .replace(/Ins�tui/g, 'Institui')
    .replace(/A�ngidas/g, 'Atingidas')
    .replace(/Domés�ca/g, 'Doméstica')
    .replace(/ins�tuído/g, 'instituído')
    .replace(/Goi�nia/g, 'Goiânia')
    .replace(/Goi�s/g, 'Goiás')
    .replace(/C�mara/g, 'Câmara')
    .replace(/Preven��o/g, 'Prevenção')
    .replace(/prote��o/g, 'proteção')
    .replace(/a��es/g, 'ações')
    .replace(/integra��o/g, 'integração')
    .replace(/educa��o/g, 'educação')
    .replace(/crian�as/g, 'crianças')

    // Padrões gerais de caracteres mal codificados
    .replace(/�+/g, function(match) {
      // Se são múltiplos � seguidos, provavelmente é um caractere acentuado
      if (match.length === 1) {
        return ''; // Remove � isolados
      } else if (match.length === 2) {
        return 'ção'; // Padrão comum para -ção
      }
      return match;
    })

    // Substituições comuns de caracteres latinos
    .replace(/Ã¡/g, 'á')
    .replace(/Ã /g, 'à')
    .replace(/Ã¢/g, 'â')
    .replace(/Ã£/g, 'ã')
    .replace(/Ã¤/g, 'ä')
    .replace(/Ã©/g, 'é')
    .replace(/Ãª/g, 'ê')
    .replace(/Ã­/g, 'í')
    .replace(/Ã´/g, 'ô')
    .replace(/Ãµ/g, 'õ')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã±/g, 'ñ')

    // Substituições maiúsculas
    .replace(/Ã/g, 'Á')
    .replace(/Ã‚/g, 'Â')
    .replace(/Ãƒ/g, 'Ã')
    .replace(/Ã‰/g, 'É')
    .replace(/ÃŠ/g, 'Ê')
    .replace(/Ã/g, 'Í')
    .replace(/Ã"/g, 'Ô')
    .replace(/Ã•/g, 'Õ')
    .replace(/Ãš/g, 'Ú')
    .replace(/Ã‡/g, 'Ç')

    // Caracteres especiais comuns
    .replace(/â€œ/g, '"')
    .replace(/â€�/g, '"')
    .replace(/â€™/g, "'")
    .replace(/â€"/g, '–')
    .replace(/â€"/g, '—')
    .replace(/Â°/g, '°')
    .replace(/Â²/g, '²')
    .replace(/Â³/g, '³')
    .replace(/Â§/g, '§')

    // Remove caracteres de controle inválidos
    .replace(/[\x00-\x1F\x7F]/g, '')

    // Normaliza espaços múltiplos
    .replace(/\s+/g, ' ')
    .trim();

  return cleanedText;
}

// Função específica para textos de diários oficiais
export function cleanGazetteText(text) {
  let cleaned = cleanText(text);

  // Correções específicas para documentos oficiais
  cleaned = cleaned
    .replace(/MUNI[��]IPIO/gi, 'MUNICÍPIO')
    .replace(/MUNIC[��]PIO/gi, 'MUNICÍPIO')
    .replace(/PRETEITO/gi, 'PREFEITO')
    .replace(/SECR[��]ARIA/gi, 'SECRETARIA')
    .replace(/LEI N[��]/gi, 'LEI Nº')
    .replace(/DECRETO N[��]/gi, 'DECRETO Nº')
    .replace(/PORTARIA N[��]/gi, 'PORTARIA Nº')
    .replace(/DI[��]RIO/gi, 'DIÁRIO')
    .replace(/OFICIAL/gi, 'OFICIAL')
    .replace(/P[��]BLICO/gi, 'PÚBLICO');

  return cleaned;
}