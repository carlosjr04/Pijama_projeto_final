import { create } from "zustand"
import { cartItemProps } from "../types/types";

interface CartStore {
    
    cart:cartItemProps[]
    precoTotal:number
    addToCart:(item:cartItemProps)=>void;
    removeFromCart:(id:number)=>void;
    clearCart:()=>void;
    calcularTotal: () => void;
}

const useCartStore = create<CartStore>((set) => (
    {
        
        cart: [],
        precoTotal:0,
        addToCart: (item) => set((state) => {
            const novoCarrinho = [...state.cart, item];
            return {
                cart: novoCarrinho,
                precoTotal: novoCarrinho.reduce((acc, item) => acc + item.price * item.quantity, 0),
            };
        }),
    
        removeFromCart: (id) => set((state) => {
            const novoCarrinho = state.cart.filter((item) => item.code !== id);
            return {
                cart: novoCarrinho,
                precoTotal: novoCarrinho.reduce((acc, item) => acc + item.price * item.quantity, 0),
            };
        }),
       
        clearCart: () => set({ cart: [], precoTotal: 0 }),
        calcularTotal: () => set((state) => ({
            precoTotal: state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }))
    }
))

export default useCartStore;