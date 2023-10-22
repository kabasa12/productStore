import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.modle';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>();

  ngOnInit(): void {
  };

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  };
}
