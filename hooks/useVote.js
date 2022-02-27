import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import { useClaimNFT } from "./useClaimNFT";
import { useProposals } from "./useProposals";
import { sdk } from "lib/sdk";
import { VOTE_MODULE } from "config";

const voteModule = sdk.getVoteModule(
    VOTE_MODULE,
);

export const useVote = () => {
    const { address, provider } = useWeb3();
    const { hasClaimedNFT } = useClaimNFT()
    const { proposals } = useProposals()
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const signer = provider ? provider.getSigner() : undefined;

    useEffect(() => {
        // We pass the signer to the sdk, which enables us to interact with
        // our deployed contract!
        sdk.setProviderOrSigner(signer);
    }, [signer]);

    // We also need to check if the user already voted.
    useEffect(async () => {
        if (!hasClaimedNFT) {
            return;
        }

        // If we haven't finished retrieving the proposals from the useEffect above
        // then we can't check if the user voted yet!
        if (!proposals.length) {
            return;
        }

        // Check if the user has already voted on the first proposal.
        try {
            console.log("hasVoted: ", hasVoted);
            const hasVoted = await voteModule.hasVoted(proposals[0].proposalId, address);
            setHasVoted(hasVoted);
            if(hasVoted) {
                console.log("🥵 User has already voted");
            } else {
                console.log("🙂 User has not voted yet");
            }
        } catch (error) {
            console.error("Failed to check if wallet has voted", error);
        }
    }, [hasClaimedNFT, address, isVoting]);

    return { isVoting, hasVoted, setIsVoting, setHasVoted, voteModule }
}