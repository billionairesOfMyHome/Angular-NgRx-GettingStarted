import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import {
  State,
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  products$: Observable<Product[]>;
  currentProduct$: Observable<Product>;
  showProductCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.currentProduct$ = this.store.select(getCurrentProduct);
    this.products$ = this.store.select(getProducts);
    this.showProductCode$ = this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleShowProductCode());
    /* this.store.dispatch({
      type: '[Product] Toggle Product Code'
    }) */
    // this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ currentProduct: product })
    );
    // this.productService.changeSelectedProduct(product);
  }
}
