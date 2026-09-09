import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-specs-page',
  imports: [ProductCard, Pagination],
  templateUrl: './specs-page.html',
})
export class SpecsPage {

  route = inject(ActivatedRoute);
  specs = toSignal(this.route.params.pipe(map(({specs}) => specs)));
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({
      specs: this.specs(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        category: params.specs,
        offset: params.page * 9,
      });
    },
  });

}
