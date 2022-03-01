import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Table = ({headers, data, tableStyle}) => {
    return (
        <div className={tableStyle}>
            <div className={`grid grid-cols-2`}>
                {headers && headers.map((field) => (
                    <div key={uuidv4()} className="font-semibold">
                        {field.name}
                    </div>
                ))}
            </div>
            <div>
                {data && data.map((dataRow) => (
                    <div key={uuidv4()} className={`grid grid-cols-2 gap-4`}>
                        {headers.map((field) => (
                            <div key={uuidv4()}>
                                {dataRow[field.accessor]}
                            </div>
                        ))}
                    </div>
                ))}
                {headers && !data.length && (
                    <>
                        {new Array(2).fill("").map(_ => (
                            <div key={uuidv4()} className={`grid grid-cols-2 gap-4`}>
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