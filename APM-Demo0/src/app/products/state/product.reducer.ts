import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from "src/app/state/app.state";
import * as ProductActions from "./product.action";

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  products: ProductState;
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  products: Product[];
  currentProduct: Product; // why comment this out?
  // currentProductId: number;
}

const initProductState: ProductState = {
  showProductCode: true,
  products: [],
  currentProduct: null,
  // currentProductId: null
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState, 
  state => state.showProductCode
);

export const getProducts = createSelector(
  getProductFeatureState, 
  state => state.products
);

export const getCurrentProduct = createSelector(
  getProductFeatureState, 
  state => state.currentProduct
);

/* export const getCurrentProductID = createSelector(
  getProductFeatureState,  
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,  
  getCurrentProductID,
  (state, currentProductId) =>  state.products.find(p => p.id === currentProductId)
); */

/* 更高一层的封装，将 currentProductId 抽出，当 store 的结构改变时，只要较小的改动
export const getCurrentProduct = createSelector(getProductFeatureState, 
  (state) => state.products.find(p => p.id === state.currentProductId)); */

export const productReducer = createReducer<ProductState>(
  initProductState,
  on(ProductActions.toggleShowProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.currentProduct
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New8',
        description: '',
        starRating: 8
      }
    }
  }),
  on(ProductActions.loadProducts, (state, action): ProductState => {
    return {
      ...state,
      products: action.products
    }
  }),
  on(ProductActions.updateProduct, (state, action): ProductState => {
    const updatedProducts = state.products.map(
      item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProduct: action.product
    }
  }),
  on(ProductActions.createProduct, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProduct: action.product
    }
  }),
  on(ProductActions.deleteProduct, (state, action): ProductState => {
    return {
      ...state,
      products: state.products.filter(p => p.id !== action.productId),
      currentProduct: null
    }
  })
)