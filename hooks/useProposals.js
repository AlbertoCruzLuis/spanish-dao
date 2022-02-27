import { useEffect, useState } from "react";
import { useClaimNFT } from "./useClaimNFT";
import { sdk } from "lib/sdk";
import { VOTE_MODULE } from "config";

const voteModule = sdk.getVoteModule(
    VOTE_MODULE,
);

export const useProposals = () => {
    const { hasClaimedNFT } = useClaimNFT()
    const [proposals, setProposals] = useState([]);

    // Retrieve all our existing proposals from the contract.
    useEffect(async () => {
        if (!hasClaimedNFT) {
            return;
        }
        // A simple call to voteModule.getAll() to grab the proposals.
        try {
            const proposals = await voteModule.getAll();
            setProposals(proposals);
            console.log("🌈 Proposals:", proposals);
        } catch (error) {
            console.log("failed to get proposals", error);
        }
    }, [hasClaimedNFT]);

    return { proposals }
}