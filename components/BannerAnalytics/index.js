import { BiPencil, BiUser } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';

export const BannerAnalytics = () => {
    const analytics = [
        {name: "Total proposals", icon: <BiPencil />, value: "2"},
        {name: "Members", icon: <BiUser />, value: "2"},
    ]

    return (
        <div className="flex flex-wrap bg-white rounded-md py-4 px-8 divide-x xs:divide-x-0 max-w-max mx-auto">
            {analytics && analytics.map(({name, icon, value}) => (
                <div key={uuidv4()} className="flex flex-col items-center justify-center mx-auto gap-1 px-10">
                    <div className="flex gap-2 items-center">
                        {icon}
                        <span className="text-gray-400">{name}</span>
                    </div>
                    <span className="text-gray-800 text-3xl font-bold">{value}</span>
                </div>
            ))}
        </div>
    )
}