// export async function getRelaciones() {
//   const res = await fetch(
//     'https://services.onmtc.com/apps/salud-crm/app/backOtorgaTurno/controllers/controllers.php?ruta=/saludcrm/practica'
//   );
//   if (!res.ok) throw new Error('Error al obtener prácticas');
//   const data = await res.json();
//   return data.Practica || [];
// }
import { getRelaciones, getRelacionesCrest } from './crest';

// Re-exportar las funciones de crest.ts
export { getRelaciones, getRelacionesCrest };

// Aquí puedes añadir otras funciones de API que necesites