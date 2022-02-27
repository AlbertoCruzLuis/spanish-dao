import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Table = ({headers, data, tableStyle}) => {
    return (
        <div className={tableStyle}>
            <div className={`grid grid-cols-${headers.length}`}>
                {headers && headers.map((field) => (
                    <div className="font-semibold">
                        {field.name}
                    </div>
                ))}
            </div>
            <div>
                {data && data.map((dataRow) => (
                    <div className={`grid grid-cols-${headers.length} gap-4`}>
                        {headers.map((field) => (
                            <div>
                                {dataRow[field.accessor]}
                            </div>
                        ))}
                    </div>
                ))}
                {headers && !data.length && (
                    <>
                        {Array(2).fill("").map(_ => (
                            <div className={`grid grid-cols-${headers.length} gap-4`}>
                                <Skeleton />
                                <Skeleton />
                            </div>
                        ))}
                    </>
                    )
                }
            </div>
        </div>
    )
}