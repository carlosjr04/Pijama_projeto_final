import { create } from "zustand";

interface CartPreco {
    
    preco:number
    somarPreco:(item:number)=>void;
    diminuirPreco:(item:number)=>void;
    clearPreco:()=>void
    precoInicial:(item:number)=>void;
}

const useCartPreco = create<CartPreco>((set) => ({
    preco: 0,
    precoInicial:(item)=>
        set(()=>({
            preco:item
        })),
    somarPreco: (item) =>
      set((state) => ({
        preco: state.preco + item, 
      })),
  
    diminuirPreco: (item) =>
      set((state) => ({
        preco: state.preco - item, 
      })),
    clearPreco:()=>
        set(() => ({
            preco: 0, 
          })),
  }));

export default useCartPreco;