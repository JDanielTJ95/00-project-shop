import { User } from "@auth/interfaces/user.interface";

export interface ProductsResponce {
  count:    number;
  pages:    number;
  products: Product[];
}

export interface Product {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  category:    Category;
  type:        string[];
  specs:       string[];
  tags:        string[];
  images:      string[];
  user:        User;
}

export enum Category {
  Cerrajeria = "cerrajeria",
  Consumibles = "consumibles",
  Herrajes = "herrajes",
  Herramientas = "herramientas",
  Laminas = "laminas",
  Perfiles = "perfiles",
  Tubulares = "tubulares",
  Pedidos = 'pedidos',
}
