/* import { httpClient } from '@/utils/'; */
import { mockMovimientos } from '@/data';

/* const path = '/movimientos'; */


export function serviceGetAllMovements() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockMovimientos), 150);
  });
}
export function addMovement() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockMovimientos), 150);
  });
}

/* // READ
export function serviceGetAllMovements() {
  return new Promise((resolve, reject) => {
    httpClient
      .get(path)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
} */
