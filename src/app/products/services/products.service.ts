import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponce } from '@products/interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductsResponce>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponce> {

    const { limit = 9, offset = 0, category = '' } = options;

    const key = `${limit}-${offset}-${category}`;
    if(this.productsCache.has(key)){
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponce>(`${baseUrl}/products?`, {
        params: {
          limit,
          offset,
          category,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp)),
      );
  }

  getProductByIdSlug( idSlug: string ): Observable<Product>{

    if(this.productCache.has(idSlug)) return of(this.productCache.get(idSlug)!);

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      // delay(2000),
      tap((product) => this.productCache.set(idSlug, product))
    );
  }

}
