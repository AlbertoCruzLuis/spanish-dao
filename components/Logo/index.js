export const Logo = ({size = "text-lg"}) => {
    return (
        <div className={`flex items-center ${size}`}>
            <span className="font-bold text-green-600">Spanish</span>
            <span className="font-extrabold text-white">DAO</span>
        </div>
    )
}