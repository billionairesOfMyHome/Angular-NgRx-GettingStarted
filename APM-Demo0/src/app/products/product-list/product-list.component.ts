import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getProducts, getShowProductCode } from '../state/product.reducer';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService,
    private store: Store<State>) { }

  ngOnInit(): void {
    this.sub = this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
    /* this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    ); */

    this.store.select(getProducts).subscribe(
      (products: Product[]) => this.products = products
    );

    this.productService.getProducts().subscribe({
      // next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    this.store.dispatch(ProductActions.setCurrentProduct(product));
    // this.productService.changeSelectedProduct(product);
  }

}
