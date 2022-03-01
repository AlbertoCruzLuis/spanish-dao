import { useWeb3 } from "@3rdweb/hooks"
import { useEffect, useState } from "react"

export const useDataOfBlock = (blockNumber) => {
    const { provider } = useWeb3()
    const [timestamp, setTimestamp] = useState()

    useEffect(async () => {
        try {
            const block = await provider.getBlock(blockNumber)
            setTimestamp(block.timestamp)   
        } catch (error) {
            console.log(error);
        }
    }, [provider])

    return { timestamp }
}