/* import { httpClient } from '@/utils/';
import { mockCategorias } from '@/data';

const path = '/categorias';

// CREATE
export function serviceCreateCategory(newCategory) {
  return new Promise((resolve, reject) => {
    httpClient
      .post(path, newCategory)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// READ
export function serviceGetAllCategories() {
  return new Promise((resolve, reject) => {
    httpClient
      .get(path)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}



export function serviceGetAllCategories() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockCategorias), 150);
  });
}
export function serviceGetCategory(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .get(`${path}/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// UPDATE
export function serviceUpdateCategory(modifiedCategory) {
  return new Promise((resolve, reject) => {
    httpClient
      .put(`${path}/${modifiedCategory.id}`, modifiedCategory)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// DELETE
export function serviceDeleteCategory(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .delete(`${path}/${id}`)
      .then(() => resolve(id))
      .catch(error => reject(new Error(error)));
  });
}
 */
import { mockCategorias } from '@/data';

/* const path = '/categorias';
 */
// helper para simular latencia
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// CREATE
export function serviceCreateCategory(newCategory) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const exists = mockCategorias.some(
        category =>
          category.nombre.toLowerCase().trim() ===
          newCategory.nombre.toLowerCase().trim()
      );

      if (exists) {
        reject(new Error('La categoría ya existe'));
        return;
      }

      const createdCategory = {
        id:
          mockCategorias.length > 0
            ? Math.max(...mockCategorias.map(category => Number(category.id))) + 1
            : 1,
        nombre: newCategory.nombre,
      };

      mockCategorias.push(createdCategory);

      resolve(createdCategory);
    } catch (error) {
      reject(error);
    }
  });
}

// READ ALL
export function serviceGetAllCategories() {
  return new Promise(async resolve => {
    await delay(300);
    resolve([...mockCategorias]);
  });
}

// READ ONE
export function serviceGetCategory(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const category = mockCategorias.find(
        item => Number(item.id) === Number(id)
      );

      if (!category) {
        reject(new Error('Categoría no encontrada'));
        return;
      }

      resolve({ ...category });
    } catch (error) {
      reject(error);
    }
  });
}

// UPDATE
export function serviceUpdateCategory(modifiedCategory) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const index = mockCategorias.findIndex(
        item => Number(item.id) === Number(modifiedCategory.id)
      );

      if (index === -1) {
        reject(new Error('Categoría no encontrada'));
        return;
      }

      const duplicatedName = mockCategorias.some(
        item =>
          Number(item.id) !== Number(modifiedCategory.id) &&
          item.nombre.toLowerCase().trim() ===
          modifiedCategory.nombre.toLowerCase().trim()
      );

      if (duplicatedName) {
        reject(new Error('Ya existe otra categoría con ese nombre'));
        return;
      }

      mockCategorias[index] = {
        ...mockCategorias[index],
        ...modifiedCategory,
      };

      resolve({ ...mockCategorias[index] });
    } catch (error) {
      reject(error);
    }
  });
}

// DELETE
export function serviceDeleteCategory(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(300);

      const index = mockCategorias.findIndex(
        item => Number(item.id) === Number(id)
      );

      if (index === -1) {
        reject(new Error('Categoría no encontrada'));
        return;
      }

      mockCategorias.splice(index, 1);

      resolve(id);
    } catch (error) {
      reject(error);
    }
  });
}