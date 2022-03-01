import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import { sdk } from "lib/sdk";
import { VOTE_MODULE } from "config";

const voteModule = sdk.getVoteModule(VOTE_MODULE);

export const useHasVoted = (proposalId) => {
    const { address } = useWeb3();
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(async () => {
        try {
            const hasVoted = await voteModule.hasVoted(proposalId, address);
            setHasVoted(hasVoted);
            if(hasVoted) {
                console.log("🥵 User has already voted");
            } else {
                console.log("🙂 User has not voted yet");
            }
        } catch (error) {
            console.error("Failed to check if wallet has voted", error);
        }
    }, [address]);

    return { isVoting, hasVoted, setIsVoting, setHasVoted, voteModule }
}