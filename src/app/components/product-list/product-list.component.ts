import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number | undefined;
  currentCategoryName: string | null = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listProducts();
    });
  }

  listProducts() {
    // check if "id" parameter is available
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

      // get the name
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // now get the products for the given category id
    this.productService
      .getProducts(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
