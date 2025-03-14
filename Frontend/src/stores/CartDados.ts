import { create } from "zustand";

export interface pijamaDados {
  pajamaId: number;
  size: string;
  quantity: number;
}

interface CartDados {
  preco: number;
  pijama: pijamaDados[];
  addToDados: (item: pijamaDados) => void;
  removeFromDados: (id: number) => void;
  clearDados: () => void;
  clearPreco: () => void;
  precoInicial: (item: number) => void;
}

const useCartDados = create<CartDados>((set) => ({
  preco: 0,
  pijama: [],
  precoInicial: (item: number) =>
    set(() => ({
      preco: item,
    })),
  addToDados: (item: pijamaDados) =>
    set((state) => {
      const novoPijama = [...state.pijama, item];
      return {
        pijama: novoPijama,
      };
    }),
  removeFromDados: (id: number) =>
    set((state) => {
      const novoPijama = state.pijama.filter((item) => item.pajamaId !== id);
      return {
        pijama: novoPijama,
      };
    }),
  clearDados: () =>
    set(() => ({
      pijama: [],
    })),
  clearPreco: () =>
    set(() => ({
      preco: 0,
    })),
  
}));
export default useCartDados;
