export interface pijama {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  season: string;
  type: string | number;
  gender: string | number;
  size: size[];
  favorite: boolean;
  on_sale: boolean;
  sale_percent: number;
}
export interface pijamaEstranho {
  pijama: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    season: "Inverno" | "Verão" | "Todos";
    type: "Adulto" | "Infantil" | "Todos";
    gender: "Unisex" | "Masculino" | "Feminino" | "Família" | "Todos";
    favorite: boolean;
    on_sale: boolean;
    sale_percent: number;
  };
  size: {
    size: string;
    stock_quantity: number;
  }[];
}
export interface cartItemProps {
  name: string;
  imgPath: string;
  code: number;
  size: size;
  price: number;
  quantity: number;
}

export interface favItemProps {
  id: number;
  name: string;
  imgPath: string;
  price: number;
  favorite: boolean;
}

export interface feedback {
  id: number;
  name: string;
  description: string;
  rating: number;
}
export interface size {
  stock_quantity: number;
  size: string;
}
interface pijamaDados {
  pijamaID: number;
  size: string;
  quantity: number;
}
export interface ItemSale {
  buyer_name: string;
  cpf: string;
  price: number;
  payment_method: "Debit Card" | "Credit Card" | "Pix";
  installments: number;
  card_number: string;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  number: string;

  pajamas: pijamaDados[];
}
