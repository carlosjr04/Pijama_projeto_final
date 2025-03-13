import { create } from "zustand"

/* To-Do: tipagem */

const useCartStore = create((set) => (
    {
        cart: [],
        addToCart: (item) => set((state) => ({cart: [...state.cart, item]})),
        removeFromCart: (id) => set((state) => ({cart: state.cart.filter((item) => item.id !== id)}))
    }
))

export default useCartStore;