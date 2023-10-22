import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() itemCountChange = new EventEmitter<number>();

  sort = 'desc';
  itemsShowCount = 12;

  ngOnInit(): void {
  };

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  };

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemCountChange.emit(count);
  };

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
