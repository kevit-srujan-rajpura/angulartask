export interface product {
  id: number;
  quantityAdd:number;
  sellername: string;
  productname: string;
  quantity: number;
  Addquantity:number;
  description: string;
  price: number;
  url: string;
  product_quantity:number ;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface sellerLogin {
  email: string;
  password: string;
}
