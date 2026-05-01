import { getCurrentAvailability, generateMonthlyReport } from '../observability/availabilitySlo';

export async function runMonthlyAvailabilityReport(): Promise<void> {
  const report = getCurrentAvailability();
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  
  console.log('=== Iniciando reporte mensual de disponibilidad ===');
  console.log(`Mes: ${currentMonth}`);
  console.log(`Disponibilidad actual: ${(report.currentMonth.availability * 100).toFixed(3)}%`);
  console.log(`Objetivo SC-005: >= ${(report.currentMonth.target * 100)}%`);
  console.log(`Estado: ${report.meetsTarget ? 'CUMPLE' : 'NO CUMPLE'}`);
  
  const reportText = generateMonthlyReport(currentMonth);
  console.log(reportText);
  
  // Guardar en Supabase o enviar por email
  // await supabase.from('monthly_reports').insert({ month: currentMonth, report: reportText });
  
  console.log('=== Reporte mensual completado ===');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runMonthlyAvailabilityReport()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error en reporte mensual:', err);
      process.exit(1);
    });
}
