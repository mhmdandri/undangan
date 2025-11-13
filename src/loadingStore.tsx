import { create } from "zustand";

export interface LoadingInterface {
  loading: boolean;
  setLoading: (newLoading: boolean) => void;
}

const LoadingStore = create<LoadingInterface>((set: any) => ({
  loading: true,
  setLoading: (newLoading: boolean) => set({ loading: newLoading }),
}));

export default LoadingStore;
