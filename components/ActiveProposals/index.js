import { Proposal } from "components/Proposal"
import { useProposals } from "hooks/useProposals"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ActiveProposals = ({tokenModule}) => {
    const { proposals } = useProposals()

    return (
        <div>
            <h2 className="text-lg font-bold mb-2 text-white">Active Proposals</h2>
            <div className="flex flex-col gap-4">
                { proposals && proposals.map(({ proposalId, description, proposer, votes }) => (
                    <Proposal
                        key={proposalId}
                        proposalId={proposalId} 
                        description={description} 
                        address={proposer} 
                        options={votes} 
                        tokenModule={tokenModule} />
                    )
                )}
                {!proposals.length && 
                    <div className="bg-white rounded-md p-2">
                        <Skeleton highlightColor="#C2CBD7" width={100} />
                        <Skeleton highlightColor="#C2CBD7" />
                        <Skeleton highlightColor="#C2CBD7" height={30} count={3} />
                        <Skeleton highlightColor="#C2CBD7" />
                    </div>
                    }
            </div>
        </div>
    )
}