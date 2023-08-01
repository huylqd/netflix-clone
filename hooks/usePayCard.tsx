import { create } from 'zustand'

export interface ModalStoreInterface {
  
    isOpenPayCard: boolean
    openPayCard: (customer: string) => void
    closePayCard: () => void
}

const usePayCard = create<ModalStoreInterface>((set) => ({
    isOpenPayCard: false,
    openPayCard: (customer: string) => set({ isOpenPayCard: true }),
    closePayCard: () => set({ isOpenPayCard: false })
}))

export default usePayCard