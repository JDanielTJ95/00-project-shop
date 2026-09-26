import { Component, effect, inject, input, OnInit } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabel } from '@dashboard/components/form-error-label/form-error-label';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails {

  product = input.required<Product>()

  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)]
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    types: [['']],
    images: [[]],
    tags: [''],
    specs: [''],
    category: ['perfiles', [Validators.required, Validators.pattern(/'perfiles'|'tubulares'|'laminas'|'consumibles'|'herrajes'|'cerrajeria'|'herramientas'|'pedidos'/)]]
  })

  types = ['ptr','perfil_ventana','angulo','solera','varilla','tubo','lamina','placa','electrodo','disco','bisagra','cerradura','quimico','maquinaria']

  // ngOnInit(): void {
  //   this.setFormValue(this.product());
  // }

  constructor() {
    effect(() => {
      this.setFormValue(this.product());
    });
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.patchValue({tags: formLike.tags?.join(',')})
    this.productForm.reset(this.product() as any);
  }

  onSizeClicked(type: string) {

    const currentTypes = this.productForm.value.types ?? [];

    if (currentTypes.includes(type)) {
      currentTypes.splice(currentTypes.indexOf(type), 1);
    } else {
      currentTypes.push(type);
    }
    this.productForm.patchValue({ types: currentTypes });

  }

  onSubmit(){

    const isValid = this.productForm.valid;
    console.log(this.productForm.value, {isValid});

  }

}
