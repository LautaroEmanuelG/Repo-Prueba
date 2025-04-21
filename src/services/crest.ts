/**
 * Determina la URL base para las llamadas API según el entorno
 * @returns {string} URL base para las llamadas API
 */
function getBaseUrl() {
  // Verificar si estamos ejecutando en un navegador
  if (typeof window !== 'undefined') {
    // Determinar si estamos en desarrollo local o en producción
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // En desarrollo local usamos una ruta relativa
      return '';
    }
  }

  // En producción usamos la URL completa
  return 'https://www.services.onmtc.com/apps/app-react-prueba';
}

/**
 * Recupera los elementos desde la API de Bitrix24 según el tipo de entidad.
 * @param {number} entityTypeId - El ID del tipo de entidad a consultar.
 * @param {object} filter - Filtros opcionales para la consulta.
 * @returns {Promise<Array>} - Una promesa que resuelve con los elementos obtenidos.
 */
export async function getRelaciones(entityTypeId: number, filter = {}) {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(
      `${baseUrl}/my-app/installBitrix24/api.php?method=crm.item.list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entityTypeId,
          filter,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(
        result.error_description || 'Error en la llamada a la API'
      );
    }

    return result.result.items;
  } catch (error) {
    console.error('Error al obtener relaciones:', error);
    throw error;
  }
}

/**
 * Función genérica para hacer llamados a la API de Bitrix24
 * @param {string} method - El método de la API a llamar
 * @param {number|object} param - Puede ser un entityTypeId (número) o un objeto con parámetros
 * @param {object} filter - Filtros opcionales (solo si param es un entityTypeId)
 * @returns {Promise<any>} - Promesa con el resultado de la llamada
 */
export async function getRelacionesCrest(
  method: string,
  param: number | object,
  filter = {}
) {
  try {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/my-app/installBitrix24/api.php?method=${method}`;

    // Determinar si es una llamada con entityTypeId o con parámetros generales
    const body =
      typeof param === 'number'
        ? JSON.stringify({ entityTypeId: param, filter })
        : JSON.stringify(param);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(
        result.error_description || 'Error en la llamada a la API'
      );
    }

    return result.result.items || result.result;
  } catch (error) {
    console.error('Error al obtener relaciones:', error);
    throw error;
  }
}
