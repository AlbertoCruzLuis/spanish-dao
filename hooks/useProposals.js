import { useEffect, useState } from "react";
import { sdk } from "lib/sdk";
import { VOTE_MODULE } from "config";

const voteModule = sdk.getVoteModule(
    VOTE_MODULE,
);

export const useProposals = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(async () => {
        try {
            const proposals = await voteModule.getAll();
            setProposals(proposals);
        } catch (error) {
            console.log("failed to get proposals", error);
        }
    }, []);

    return { proposals, setProposals }
}