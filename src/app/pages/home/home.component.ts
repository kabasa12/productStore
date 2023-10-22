import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.modle';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight: number = ROW_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  limit = '12';
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  };

  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.limit, this.sort,this.category).subscribe((_products) => {
      this.products = _products;
      //console.log(_products)
    });
  };

  onColumnsCountChanged(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  };

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  };

  onSortChanged(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  };

  onItemCountChanged(newCount: number): void {
    this.limit = newCount.toString();
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  };

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }
}
