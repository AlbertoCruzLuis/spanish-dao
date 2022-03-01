import CustomLink from "components/CustomLink"

export const NavItem = ({name, url, isActive, activeStyle = "border-b-2", disableStyle = ""}) => {
    const divStyle = isActive ? `${activeStyle} border-solid border-white` : `${disableStyle}`
    const linkStyle = isActive ? "text-white" : "text-gray-400"

    return (
        <div className={divStyle}>
            <CustomLink href={url} className={linkStyle}>
                <span>{name}</span>
            </CustomLink>
        </div>
    )
}