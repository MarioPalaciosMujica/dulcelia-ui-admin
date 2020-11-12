import { Product } from './../../../../shared/models/product.model';
import { ProductService } from './../../../../core/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { productDB } from 'src/app/shared/tables/product-list';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public product_list = []
  public productList: Product[] = [];

  private subscriptions$: Subscription[] = [];

  constructor(
    private productService: ProductService
  ) {
    this.product_list = productDB.product;

    const findAllProducts$: Subscription = this.productService.findAll().subscribe(data => {
      this.productList = data as Product[];
      console.log(this.productList);
    });
    this.subscriptions$.push(findAllProducts$);
  }

  ngOnInit() {
    registerLocaleData(es);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(el => el.unsubscribe());
  }


}
