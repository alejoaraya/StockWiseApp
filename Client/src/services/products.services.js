/* import { httpClient } from '@/utils/';
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

// READ
export function serviceGetAllProducts() {
  return new Promise((resolve, reject) => {
    httpClient
      .get(path)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}


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

export function serviceGetProduct(id) {
  return new Promise((resolve, reject) => {
    httpClient
      .get(`${path}/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

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
 */


import { mockProductos } from '@/data';
import { addMovement } from '../redux/reducers/movements.reducer';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// CREATE
export function serviceCreateProduct(newProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const exists = mockProductos.some(
        product =>
          product.slogan?.toLowerCase().trim() ===
          newProduct.slogan?.toLowerCase().trim()
      );

      if (exists) {
        reject(new Error('Ya existe un producto con ese slogan'));
        return;
      }

      const createdProduct = {
        id:
          mockProductos.length > 0
            ? Math.max(...mockProductos.map(product => Number(product.id))) + 1
            : 1,
        nombre: newProduct.nombre,
        slogan: newProduct.slogan,
        imagen: newProduct.imagen ?? '',
        costo: Number(newProduct.costo ?? 0),
        impuesto: Number(newProduct.impuesto ?? 0),
        fechaVencimiento: newProduct.fechaVencimiento ?? null,
        min: Number(newProduct.min ?? 0),
        max: Number(newProduct.max ?? 0),
        actual: Number(newProduct.actual ?? 0),
        categoria: newProduct.categoria ?? null,
        proveedor: newProduct.proveedor ?? null,
        marca: newProduct.marca ?? null,
      };

      mockProductos.push(createdProduct);

      resolve(createdProduct);
    } catch (error) {
      reject(error);
    }
  });
}

// READ ALL
export function serviceGetAllProducts() {
  return new Promise(async resolve => {
    await delay(150);
    resolve([...mockProductos]);
  });
}

// READ ONE
export function serviceGetProduct(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const product = mockProductos.find(item => Number(item.id) === Number(id));

      if (!product) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      resolve({ ...product });
    } catch (error) {
      reject(error);
    }
  });
}

// UPDATE
export function serviceUpdateProduct(modifiedProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const index = mockProductos.findIndex(
        item => Number(item.id) === Number(modifiedProduct.id)
      );



      if (index === -1) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      const duplicatedSlogan = mockProductos.some(
        item =>
          Number(item.id) !== Number(modifiedProduct.id) &&
          item.slogan?.toLowerCase().trim() ===
          modifiedProduct.slogan?.toLowerCase().trim()
      );


      if (duplicatedSlogan) {
        reject(new Error('Ya existe otro producto con ese slogan'));
        return;
      }

      mockProductos[index] = {
        ...mockProductos[index],
        ...modifiedProduct,
      };


      resolve({ ...mockProductos[index] });
    } catch (error) {
      reject(error);
    }
  });
}

// DELETE
export function serviceDeleteProduct(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const index = mockProductos.findIndex(
        item => Number(item.id) === Number(id)
      );

      if (index === -1) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      mockProductos.splice(index, 1);

      resolve(id);
    } catch (error) {
      reject(error);
    }
  });
}

// AGREGAR STOCK
// espera algo como:
// [{ id: 1, cantidad: 5 }, { id: 2, cantidad: 3 }]
export function serviceAddStock(arr) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const updatedProducts = [];

      for (const item of arr) {

        const index = mockProductos.findIndex(
          product => Number(product.id) === Number(item.id)
        );

        if (index === -1) {
          reject(new Error(`Producto con id ${item.id} no encontrado`));
          return;
        }

        mockProductos[index] = {
          ...mockProductos[index],
          actual:
            Number(item.actual ?? 0) + Number(mockProductos[index].actual ?? 0),
        };

        updatedProducts.push({ ...mockProductos[index] });


        addMovement({

          payload: {
            id: crypto.randomUUID(),
            fecha_asiento: new Date(),
            cantidad: item.actual,
            tipo: 'ENTRADA',
            descripcion: 'Ingreso de ' + mockProductos[index].nombre,
          }
        })
      }
      resolve(updatedProducts);
    } catch (error) {
      reject(error);
    }
  });
}

// QUITAR STOCK
// espera algo como:
// [{ id: 1, cantidad: 5 }, { id: 2, cantidad: 3 }]
export function serviceSubtractStock(arr) {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(150);

      const updatedProducts = [];

      for (const item of arr) {
        const index = mockProductos.findIndex(
          product => Number(product.id) === Number(item.id)
        );

        if (index === -1) {
          reject(new Error(`Producto con id ${item.id} no encontrado`));
          return;
        }

        const currentStock = Number(mockProductos[index].actual ?? 0);
        const quantityToSubtract = Number(item.actual ?? 0);

        if (quantityToSubtract > currentStock) {
          reject(
            new Error(
              `Stock insuficiente para el producto ${mockProductos[index].nombre}`
            )
          );
          return;
        }

        mockProductos[index] = {
          ...mockProductos[index],
          actual: currentStock - quantityToSubtract,
        };

        updatedProducts.push({ ...mockProductos[index] });
      }

      resolve(updatedProducts);
    } catch (error) {
      reject(error);
    }
  });
}