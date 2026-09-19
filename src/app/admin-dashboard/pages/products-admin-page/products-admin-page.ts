import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from '@products/components/product-table/product-table';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin-page.html',
  styles: ``,
})
export class ProductsAdminPage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productPerPage(),
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
        limit: params.limit,
      });
    }
  });
}
