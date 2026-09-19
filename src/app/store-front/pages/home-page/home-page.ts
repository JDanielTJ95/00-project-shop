import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "@products/components/product-card/product-card";
import { ProductsService } from '@products/services/products.service';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination, Pagination],
  templateUrl: './home-page.html',
  styles: ``,
})
export class HomePage {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
      });
    },
  });

}
