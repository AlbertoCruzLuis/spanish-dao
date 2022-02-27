import { useEffect, useState } from "react"
import { sdk } from "lib/sdk";
import { VOTE_MODULE } from "config";

const voteModule = sdk.getVoteModule(
    VOTE_MODULE,
);

export const useVoteModuleSettings = () => {
    const [votingPeriod, setVotingPeriod] = useState(null)
    const [proposalFee, setProposalFee] = useState(null)

    useEffect(() => {
        getVoteModuleSettigns()
    }, [voteModule])

    const getVoteModuleSettigns = async () => {
        const voteModuleSettings = await voteModule.settings()

        setVotingPeriod(voteModuleSettings.votingPeriod)
        setProposalFee(voteModuleSettings.proposalTokenThreshold)
    }

    return { votingPeriod, proposalFee }
}