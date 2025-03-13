import { create } from "zustand"
import { cartItemProps } from "../types/types";

interface CartStore {
    
    cart:cartItemProps[]
    addToCart:(item:cartItemProps)=>void;
    removeFromCart:(id:number)=>void;
    clearCart:()=>void;
}

const useCartStore = create<CartStore>((set) => (
    {
        
        cart: [],
        addToCart: (item) => set((state) => ({cart: [...state.cart, item]})),
        removeFromCart: (id) => set((state) => ({cart: state.cart.filter((item) => item.code !== id)})),
        clearCart: () => set({ cart: [] })
    }
))

export default useCartStore;