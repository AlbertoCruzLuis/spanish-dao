import { useWeb3 } from "@3rdweb/hooks"
import { BUNDLE_DROP_MODULE } from "config"
import { useGlobalStore } from "features/GlobalStore"
import { sdk } from "lib/sdk"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSessionStorage } from 'react-use'

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
    BUNDLE_DROP_MODULE,
)

export const useClaimNFT = () => {
    const { address, provider } = useWeb3()
    //const [hasNFT, setHasNFT] = useSessionStorage('HAS_NFT', "not_set")
    const hasClaimedNFT  = useGlobalStore(state => state.hasClaimedNFT)
    const setHasClaimedNFT  = useGlobalStore(state => state.setHasClaimedNFT)
    const [isClaiming, setIsClaiming] = useState(false)
    const signer = provider ? provider.getSigner() : undefined

    useEffect(() => {
        // We pass the signer to the sdk, which enables us to interact with
        // our deployed contract!
        sdk.setProviderOrSigner(signer)
    }, [signer])

    useEffect(async () => {
        // If they don't have an connected wallet, exit!
        if (!address) {
          return
        }

        /*if (hasNFT === "yes") {
            setHasClaimedNFT(true)
            return
        }*/
    
        // Check if the user has the NFT by using bundleDropModule.balanceOf
        const balance = await bundleDropModule.balanceOf(address, "0");
       
        try {
          // If balance is greater than 0, they have our NFT!
          if(balance.gt(0)) {
              setHasClaimedNFT(true)
              //setHasNFT("yes")
              console.log("🌟 this user has a membership NFT!");
          } else {
              setHasClaimedNFT(false)
              //setHasNFT("no")
              console.log("😭 this user doesn't have a membership NFT.")
          }
        } catch (error) {
            setHasClaimedNFT(false)
            console.error("failed to nft balance", error);
        }
    }, [address]);

    return { hasClaimedNFT, isClaiming, setHasClaimedNFT, setIsClaiming }
}