// src/services/bitrix24.ts
declare global {
    interface Window {
      BX24: any;
    }
  }
  
  export async function getRelaciones(
    entityTypeId: number,
    filter: Record<string, any> = {}
  ): Promise<any[]> {
    const data = {
      entityTypeId,
      filter: { ...filter },
    };
  
    return new Promise((resolve, reject) => {
      if (typeof window.BX24 === 'undefined') {
        reject(new Error('BX24 no está disponible. ¿Estás dentro de Bitrix24?'));
        return;
      }
      window.BX24.callMethod('crm.item.list', data, function (result: any) {
        if (result.error()) {
          reject(result.error());
        } else {
          resolve(result.data().items);
        }
      });
    });
  }