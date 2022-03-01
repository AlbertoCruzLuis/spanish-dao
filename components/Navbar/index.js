import { NavItem } from "./NavItem"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from 'uuid';

export const Navbar = ({routes, containerStyle = "flex gap-6", ...rest}) => {
    const router = useRouter()

    const isActiveRoute = (route) => {
        return router.asPath === route
    }

    return (
        <div className={`${containerStyle}`}>
            {routes && routes.map(({name, url}) => (
                <NavItem key={uuidv4()} name={name} url={url} isActive={isActiveRoute(url)} {...rest} />
            ))}
        </div>
    )
}