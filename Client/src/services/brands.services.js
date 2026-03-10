/* import { httpClient } from '@/utils/';
import { mockMarcas } from '@/data';

const path = 'marcas';

// CREATE
export function serviceCreateBrand(newBrand) {
  return new Promise((resolve, reject) => {
    httpClient
      .post(path, newBrand)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// READ
export function serviceGetAllBrands() {
  return new Promise((resolve, reject) => {
    httpClient
      .get(path)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

export function serviceGetAllBrands() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockMarcas), 150);
  });
}

export function serviceGetBrand(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .get(`${path}/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// UPDATE
export function serviceUpdateBrand(modifiedBrand) {
  return new Promise((resolve, reject) => {
    httpClient
      .put(`${path}/${modifiedBrand.id}`, modifiedBrand)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// DELETE
export function serviceDeleteBrand(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .delete(`${path}/${id}`)
      .then(() => resolve(id))
      .catch(error => reject(new Error(error)));
  });
}
 */

import { mockMarcas, mockProductos } from '@/data';



const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// CREATE
export function serviceCreateBrand(newBrand) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const exists = mockMarcas.some(
        brand =>
          brand.nombre.toLowerCase().trim() ===
          newBrand.nombre.toLowerCase().trim()
      );

      if (exists) {
        reject(new Error('La marca ya existe'));
        return;
      }

      const createdBrand = {
        id:
          mockMarcas.length > 0
            ? Math.max(...mockMarcas.map(brand => Number(brand.id))) + 1
            : 1,
        nombre: newBrand.nombre,
      };

      mockMarcas.push(createdBrand);

      resolve(createdBrand);
    } catch (error) {
      reject(error);
    }
  });
}

// READ ALL
export function serviceGetAllBrands() {
  return new Promise(async resolve => {
    await delay(300);
    resolve([...mockMarcas]);
  });
}

// READ ONE
export function serviceGetBrand(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const brand = mockMarcas.find(item => Number(item.id) === Number(id));

      if (!brand) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      resolve({ ...brand });
    } catch (error) {
      reject(error);
    }
  });
}

// UPDATE
export function serviceUpdateBrand(modifiedBrand) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const index = mockMarcas.findIndex(
        item => Number(item.id) === Number(modifiedBrand.id)
      );

      if (index === -1) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      const duplicatedName = mockMarcas.some(
        item =>
          Number(item.id) !== Number(modifiedBrand.id) &&
          item.nombre.toLowerCase().trim() ===
          modifiedBrand.nombre.toLowerCase().trim()
      );

      if (duplicatedName) {
        reject(new Error('Ya existe otra marca con ese nombre'));
        return;
      }

      mockMarcas[index] = {
        ...mockMarcas[index],
        ...modifiedBrand,
      };

      resolve({ ...mockMarcas[index] });
    } catch (error) {
      reject(error);
    }
  });
}

// DELETE
export function serviceDeleteBrand(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const index = mockMarcas.findIndex(
        item => Number(item.id) === Number(id)
      );


      const isAssignedToProduct = mockProductos.filter(p => p.category.nombre === mockMarcas[index]) > 0

      if (isAssignedToProduct) {
        reject(new Error('Marca asginada en producto'));
        return;
      }
      if (index === -1) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      mockMarcas.splice(index, 1);

      resolve(id);
    } catch (error) {
      reject(error);
    }
  });
}