import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useGlobalStore = create(devtools(set => ({
    hasClaimedNFT: false,
    setHasClaimedNFT: (value) => set(_ => ({ hasClaimedNFT: value}))
})))