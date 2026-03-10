import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  serviceGetAllProducts,
  serviceGetProduct,
  serviceCreateProduct,
  serviceUpdateProduct,
  serviceDeleteProduct,
  serviceAddStock,
  serviceSubtractStock,
} from '@/services';

import { mockCategorias, mockMarcas, mockProveedores } from '@/data';

export const getAllProductsAsync = createAsyncThunk(
  'products/getAll',
  async () => {
    const response = await serviceGetAllProducts();
    return response;
  }
);

export const getProductAsync = createAsyncThunk('products/getOne', async () => {
  const response = await serviceGetProduct();
  return response;
});

export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async newProduct => {


    const payload = {
      categoria: mockCategorias.find((c) => c.nombre === newProduct.categoria),
      marca: mockMarcas.find((m) => m.nombre === newProduct.marca),
      proveedor: mockProveedores.find((s) => s.email === newProduct.proveedor),
      actual: 0,
      costo: newProduct.costo,
      fechaVencimiento: newProduct.fechaVencimiento,
      imagen: newProduct.imagen,
      max: newProduct.max,
      min: newProduct.min,
      nombre: newProduct.nombre,
      slogan: newProduct.slogan,
    }

    const response = await serviceCreateProduct(payload);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async productModified => {
    const payload = {
      categoria: mockCategorias.find((c) => c.nombre === productModified.categoria),
      marca: mockMarcas.find((m) => m.nombre === productModified.marca),
      proveedor: mockProveedores.find((s) => s.email === productModified.proveedor),
      actual: productModified.actual,
      costo: productModified.costo,
      fechaVencimiento: productModified.fechaVencimiento,
      imagen: productModified.imagen,
      max: productModified.max,
      min: productModified.min,
      nombre: productModified.nombre,
      id: productModified.id,
    }
    const response = await serviceUpdateProduct(payload);
    return response;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/delete',
  async id => {
    await serviceDeleteProduct(id);
    return id;
  }
);

export const addStockAsync = createAsyncThunk(
  'products/addStock',
  async arr => {
    const response = await serviceAddStock(arr);
    return response;
  }
);

export const subtractStockAsync = createAsyncThunk(
  'products/subtractStock',
  async arr => {
    // console.log(arr)
    const response = await serviceSubtractStock(arr);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    getAllProducts: state => state,
  },
  extraReducers: builder => {
    builder.addCase(getAllProductsAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    // -------------------------------- GET
    builder.addCase(getProductAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    // -------------------------------- CREATE
    builder.addCase(createProductAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    // -------------------------------- UPDATE
    builder.addCase(updateProductAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      const productModified = action.payload;
      const productId = productModified.id;
      const index = state.products.findIndex(
        product => product.id === productId
      );
      state.products[index] = productModified;
    });
    // -------------------------------- DELETE
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      const idProduct = action.payload;
      const index = state.products.findIndex(
        product => product.id === idProduct
      );
      state.products.splice(index, 1);
    });
    // -------------------------------- ADD STOCK
    builder.addCase(addStockAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(addStockAsync.fulfilled, (state, action) => {
      state.loading = false;
      const productosModified = action.payload;
      // console.log('addStock', productosModified);

      productosModified.forEach(prodMod => {
        const index = state.products.findIndex(
          product => product.id === prodMod.id
        );
        state.products[index] = prodMod;
      });
    });
    // -------------------------------- SUSTRACT STOCK
    builder.addCase(subtractStockAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(subtractStockAsync.fulfilled, (state, action) => {
      state.loading = false;
      const productosModified = action.payload;
      // console.log('subtractStock', productosModified);

      productosModified.forEach(prodMod => {
        const index = state.products.findIndex(
          product => product.id === prodMod.id
        );
        state.products[index] = prodMod;
      });
    });
  },
});
export const { getAllProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
