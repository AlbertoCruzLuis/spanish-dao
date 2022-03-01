import CustomLink from "components/CustomLink"
import { Footer } from "components/Footer"
import { Logo } from "components/Logo"
import { Navbar } from "components/Navbar"
import { Wallet } from "components/Wallet"
import { useAuth } from "hooks/useAuth"

export const PageLayout = ({ children }) => {
    const routes = [
        {name: "Token", url: "https://rinkeby.etherscan.io/token/0x52f376C173C780EadBF347E7b1467b0311E5D484"},
        {name: "OpenSea", url: "https://testnets.opensea.io/collection/unidentified-contract-uoqhbcayts"},
        {name: "Dashboard", url: "/dashboard"}
    ]
    const privateRoutes = {
        '/dashboard' : true,
        '/dashboard/create-proposal' : true
    }

    const auth = useAuth(privateRoutes)

    return (
        <div className="bg-indigo-900">
            <div className="flex flex-col min-h-screen xl:container xl:mx-auto">
                <header className="flex items-center justify-between xl:px-8 py-4 px-4">
                    <div className="flex divide-x divide-gray-500">
                        <CustomLink className="pr-5" href="/">
                            <Logo />
                        </CustomLink>
                        <div className="pl-5 xs:hidden">
                            <Navbar routes={routes} />
                        </div>
                    </div>
                    <Wallet />
                </header>
                <main className="grow xl:px-8 p-4">
                    {children}
                </main>
                <footer className="flex justify-center p-4 bg-black bg-opacity-30 rounded-t-md">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}