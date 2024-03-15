import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleShowProductCode = createAction(
  '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  (currentProduct: Product) => ({ currentProduct })
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product',
);

export const loadProducts = createAction(
  '[Product] Load',
  props<{ products: Product[] }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Fail',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);
