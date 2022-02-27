import { ethers } from "ethers"
import { useVote } from "hooks/useVote"
import { useVoteModuleSettings } from "hooks/useVoteModuleSettings"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Popup from "reactjs-popup"
import { middleStringTruncate } from "utils/middleStringTruncate"

const OPEN_PROPOSAL = 1
const READY_PROPOSAL = 4

export const Proposal = ({proposalId, description, address, options, tokenModule}) => {
    const [selectOption, setSelectOption] = useState(null)
    const { voteModule, setHasVoted, isVoting, hasVoted, setIsVoting } = useVote()
    const { votingPeriod, proposalFee } = useVoteModuleSettings()
    

    const handleChangeOption = (option) => {
        setSelectOption(option)
    }
    
    const delegateTokens = async () => {
        try {
            const delegation = await tokenModule.getDelegationOf(address);

            if (delegation === ethers.constants.AddressZero) {
                await tokenModule.delegateTo(address);
                toast.success("Tokens have been successfully delegated")
                return true
            }   
        } catch (error) {
            toast.error("Failed to delegate tokens")
            return false
        }
    }

    const getStateProposal = async () => {
        try {
            const proposal = await voteModule.get(proposalId)
            return proposal.state   
        } catch (error) {
            toast.error("Failed to get state Proposal")
            return false
        }
    }

    const vote = async () => {
        try {
            const stateProposal = await getStateProposal()
            if (stateProposal === OPEN_PROPOSAL) {
                await voteModule.vote(proposalId, selectOption.type)
                toast.success("Your vote was successful")
                return true;
            }
        } catch (error) {
            toast.error("Failed to Vote")
            return false
        }
    }

    const executeProposal = async () => {
        try {
            const stateProposal = await getStateProposal()
            if (stateProposal === READY_PROPOSAL) {
                await voteModule.execute(proposalId)
                toast.success("The proposal was execute successful")
                setHasVoted(true)
                return true
            }
        } catch (error) {
            toast.error("Failed to execute proposal")
            return false
        }
    }


    const onSubmitVote = async () => {
        if (!selectOption) {
            toast.error("Select an option before vote")
            return
        }

        setIsVoting(true)

        const isDelegated = await delegateTokens()

        if (isDelegated) {
            const isVoted = await vote()
            const isProposalExecuted = await executeProposal()
        }

        setIsVoting(false)
    }

    return (
        <div className="flex flex-col gap-2 bg-white p-2 rounded-md">
            <div className="flex justify-between">
                <span>Made by { middleStringTruncate(address, 4, 4)}</span>
            </div>
            <h4 className="font-semibold">{description}</h4>
            <div className="flex flex-col gap-2">
                {options && options.map((option) => {
                    // const countOfVotes = ethers.utils.formatEther(option.count)
                    let selectOptionStyle = "border border-solid border-gray-400"
                    if (option === selectOption) {
                        selectOptionStyle = "focus:border-2 border-2 focus:border-indigo-600 border-indigo-600 bg-indigo-200"
                    }
                    return (
                        <button key={option.type} 
                            onClick={() => handleChangeOption(option)}
                            className={`rounded-md p-2 hover:bg-indigo-200 ${selectOptionStyle}`}
                            >
                            <span>{option.label}</span>
                        </button>
                    )
                })}
                <button disabled={isVoting || hasVoted} onClick={onSubmitVote} className="bg-black rounded-md hover:bg-gray-900">
                    <span className="text-white">{ isVoting ? "Voting..." : hasVoted ? "You Already Voted" : "Vote"}</span>
                </button>
            </div>
        </div>
    )
}