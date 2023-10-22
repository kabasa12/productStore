import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();

  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getCategories();
  };

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  };

  getCategories(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((_categories) => {
      this.categories = _categories;
      this.categories.unshift('All Categories');
    });
  };

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }
}
