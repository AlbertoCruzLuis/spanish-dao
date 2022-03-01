import { useWeb3 } from "@3rdweb/hooks"
import { useRouter } from "next/router"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useClaimNFT } from "./useClaimNFT"

export const useAuth = (privateRoutes) => {
    const { address } = useWeb3()
    const { hasClaimedNFT } = useClaimNFT()
    const router = useRouter()

    const isPrivateRoute = () => {
        const currentRoute = router.asPath
        return privateRoutes[currentRoute] 
    }

    const isLandingPage = () => {
        const currentRoute = router.asPath
        return (currentRoute === '/')
    }

    useEffect(() => {
        if (!hasClaimedNFT && isPrivateRoute() && !isLandingPage()) {
            router.push('/')
            toast('This route only can be access who have the SpanishDAO NFT', {
                icon: '🔒'
            })
        }

    }, [hasClaimedNFT, router, address])
}