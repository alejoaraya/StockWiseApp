/* import { httpClient } from '@/utils/';
import { mockProveedores } from '@/data';

const path = '/proveedores';

// CREATE
export function serviceCreateProvider(newProvider) {
  return new Promise((resolve, reject) => {
    httpClient
      .post(path, newProvider)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// READ
export function serviceGetAllProviders() {
  return new Promise((resolve, reject) => {
    httpClient
      .get(path)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}




export function serviceGetAllProviders() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockProveedores), 150);
  });
}
export function serviceGetProvider(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .get(`${path}/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// UPDATE
export function serviceUpdateProvider(modifiedProvider) {
  return new Promise((resolve, reject) => {
    httpClient
      .put(`${path}/${modifiedProvider.id}`, modifiedProvider)
      .then(() => resolve(modifiedProvider))
      .catch(error => reject(new Error(error)));
  });
}

// DELETE
export function serviceDeleteProvider(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .delete(`${path}/${id}`)
      .then(() => resolve(id))
      .catch(error => reject(new Error(error)));
  });
}
 */

import { mockProveedores } from '@/data';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// CREATE
export function serviceCreateProvider(newProvider) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const exists = mockProveedores.some(
        provider =>
          provider.email.toLowerCase().trim() ===
          newProvider.email.toLowerCase().trim()
      );

      if (exists) {
        reject(new Error('Ya existe un proveedor con ese email'));
        return;
      }

      const createdProvider = {
        id:
          mockProveedores.length > 0
            ? Math.max(...mockProveedores.map(provider => Number(provider.id))) + 1
            : 1,
        nombre: newProvider.nombre,
        empresa: newProvider.empresa,
        email: newProvider.email,
        telefono: newProvider.telefono,
      };

      mockProveedores.push(createdProvider);

      resolve(createdProvider);
    } catch (error) {
      reject(error);
    }
  });
}

// READ ALL
export function serviceGetAllProviders() {
  return new Promise(async resolve => {
    await delay(150);
    resolve([...mockProveedores]);
  });
}

// READ ONE
export function serviceGetProvider(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const provider = mockProveedores.find(
        item => Number(item.id) === Number(id)
      );

      if (!provider) {
        reject(new Error('Proveedor no encontrado'));
        return;
      }

      resolve({ ...provider });
    } catch (error) {
      reject(error);
    }
  });
}

// UPDATE
export function serviceUpdateProvider(modifiedProvider) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const index = mockProveedores.findIndex(
        item => Number(item.id) === Number(modifiedProvider.id)
      );

      if (index === -1) {
        reject(new Error('Proveedor no encontrado'));
        return;
      }

      const duplicatedEmail = mockProveedores.some(
        item =>
          Number(item.id) !== Number(modifiedProvider.id) &&
          item.email.toLowerCase().trim() ===
          modifiedProvider.email.toLowerCase().trim()
      );

      if (duplicatedEmail) {
        reject(new Error('Ya existe otro proveedor con ese email'));
        return;
      }

      mockProveedores[index] = {
        ...mockProveedores[index],
        ...modifiedProvider,
      };

      resolve({ ...mockProveedores[index] });
    } catch (error) {
      reject(error);
    }
  });
}

// DELETE
export function serviceDeleteProvider(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const index = mockProveedores.findIndex(
        item => Number(item.id) === Number(id)
      );

      if (index === -1) {
        reject(new Error('Proveedor no encontrado'));
        return;
      }

      mockProveedores.splice(index, 1);

      resolve(id);
    } catch (error) {
      reject(error);
    }
  });
}