import CustomLink from "components/CustomLink"
import { Logo } from "components/Logo"
import { Wallet } from "components/Wallet"

export const PageLayout = ({ children }) => {
    return (
        <div className="bg-indigo-900">
            <div className="flex flex-col min-h-screen 2xl:container 2xl:mx-auto">
                <header className="flex justify-between sm:px-8 py-4 px-4">
                    <a href="/">
                        <Logo />
                    </a>
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