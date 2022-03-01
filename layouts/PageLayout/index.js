import CustomLink from "components/CustomLink"
import { Logo } from "components/Logo"
import { Navbar } from "components/Navbar"
import { Wallet } from "components/Wallet"

export const PageLayout = ({ children }) => {
    const routes = [
        {name: "Token", url: "https://rinkeby.etherscan.io/token/0x52f376C173C780EadBF347E7b1467b0311E5D484"},
        {name: "OpenSea", url: "https://testnets.opensea.io/collection/unidentified-contract-uoqhbcayts"},
        {name: "Dashboard", url: "/dashboard"}
    ]
    return (
        <div className="bg-indigo-900">
            <div className="flex flex-col min-h-screen 2xl:container 2xl:mx-auto">
                <header className="flex items-center justify-between sm:px-8 py-4 px-4">
                    <div className="flex divide-x divide-gray-500">
                        <CustomLink className="pr-5" href="/">
                            <Logo />
                        </CustomLink>
                        <div className="pl-5">
                            <Navbar routes={routes} />
                        </div>
                    </div>
                    <Wallet />
                </header>
                <main className="grow sm:px-8 p-4">
                    {children}
                </main>
                <footer className="flex justify-center p-4">
                </footer>
            </div>
        </div>
    )
}