/**
 * FIC: Política de comentarios bilingües (Constitución - Cumplimiento)
 * 
 * Todo código en backend/ debe incluir comentarios en español e inglés
 * para cumplir con la constitución de la plataforma.
 * 
 * Every code file in backend/ must include comments in Spanish and English
 * to comply with the platform constitution.
 */

export interface FicCommentCheck {
  filePath: string;
  hasFicComment: boolean;
  languageCompliance: 'bilingual' | 'spanish-only' | 'english-only' | 'none';
  lineNumbers: number[];
}

/**
 * FIC: Verifica que el archivo cumpla con comentarios bilingües
 * Check if file complies with bilingual comment policy
 */
export function checkFicCompliance(filePath: string, content: string): FicCommentCheck {
  const lines = content.split('\n');
  const commentLines: number[] = [];
  let hasSpanish = false;
  let hasEnglish = false;

  lines.forEach((line, index) => {
    // Detectar comentarios que contienen marcador FIC:
    if (line.includes('FIC:') || line.includes('//') || line.includes('/*')) {
      commentLines.push(index + 1);
      
      // Detectar español (palabras comunes)
      if (/[áéíóúñ¿¡]/i.test(line) || /\b(El|La|Los|Las|Es|Una?)\b/i.test(line)) {
        hasSpanish = true;
      }
      
      // Detectar inglés (palabras comunes)
      if (/\b(The|is|are|and|for|with|this)\b/i.test(line)) {
        hasEnglish = true;
      }
    }
  });

  let languageCompliance: 'bilingual' | 'spanish-only' | 'english-only' | 'none';
  
  if (hasSpanish && hasEnglish) {
    languageCompliance = 'bilingual';
  } else if (hasSpanish) {
    languageCompliance = 'spanish-only';
  } else if (hasEnglish) {
    languageCompliance = 'english-only';
  } else {
    languageCompliance = 'none';
  }

  return {
    filePath,
    hasFicComment: commentLines.length > 0,
    languageCompliance,
    lineNumbers: commentLines
  };
}

/**
 * FIC: Genera reporte de cumplimiento de comentarios
 * Generate compliance report for comments
 */
export function generateFicReport(checkResults: FicCommentCheck[]): string {
  const total = checkResults.length;
  const compliant = checkResults.filter(r => r.languageCompliance === 'bilingual').length;
  const complianceRate = (compliant / total * 100).toFixed(2);

  return `
# Reporte de Cumplimiento FIC - Comentarios Bilingües

## Resumen Ejecutivo
- Total archivos revisados: ${total}
- Archivos conformes (bilingües): ${compliant}
- Tasa de cumplimiento: ${complianceRate}%

## Detalle por Archivo
${checkResults.map(r => `
### ${r.filePath}
- ¿Tiene comentarios FIC?: ${r.hasFicComment ? 'SÍ' : 'NO'}
- Conformidad: ${r.languageCompliance}
- Líneas con comentarios: ${r.lineNumbers.join(', ') || 'Ninguna'}
`).join('\n')}

## Acciones Correctivas
${compliant < total ? '- Agregar comentarios en ambos idiomas (español e inglés)\n- Usar marcador FIC: para identificación' : '- Mantener estándar actual'}
`;
}
