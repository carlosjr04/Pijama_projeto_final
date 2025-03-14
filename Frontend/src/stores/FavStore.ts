import { create } from "zustand"
import { favItemProps } from "../types/types"

interface FavStore {
    favorites: favItemProps[]
    addFavorite: (item:favItemProps) => void;
    removeFavorite: (id:number) => void;
}

const useFavStore = create<FavStore>((set) => (
    {
        favorites: [],
        addFavorite: (item) => set((state) => ({favorites: [...state.favorites, item]})),
        removeFavorite: (id) => set((state) => ({favorites: state.favorites.filter((item) => item.id !== id)})),
    }
))

export default useFavStore;