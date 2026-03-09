import { httpClient } from '@/utils/';
import { mockProductos } from '@/data';

const path = '/productos';

// CREATE
export function serviceCreateProduct(newProduct) {
  return new Promise((resolve, reject) => {
    httpClient
      .post(path, newProduct)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

/* // READ
export function serviceGetAllProducts() {
  return new Promise((resolve, reject) => {
    httpClient
      .get(path)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
} */


export function serviceGetAllProducts() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockProductos), 150);
  });
}

export function serviceGetProduct(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = mockProductos.find(item => item.id === Number(id));

      if (!producto) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      resolve(producto);
    }, 300);
  });
}

/* export function serviceGetProduct(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .get(`${path}/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
} */

// UPDATE
export function serviceUpdateProduct(modifiedProduct) {
  return new Promise((resolve, reject) => {
    httpClient
      .put(`${path}/${modifiedProduct.id}`, modifiedProduct)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// DELETE
export function serviceDeleteProduct(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .delete(`${path}/${id}`)
      .then(() => resolve(id))
      .catch(error => reject(new Error(error)));
  });
}

// AGREGAR STOCK
export function serviceAddStock(arr) {
  return new Promise((resolve, reject) => {
    httpClient
      .patch(`/productos/agregarStock`, arr)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

// QUITAR STOCK
export function serviceSubtractStock(arr) {
  return new Promise((resolve, reject) => {
    httpClient
      .patch(`/productos/quitarStock`, arr)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}
