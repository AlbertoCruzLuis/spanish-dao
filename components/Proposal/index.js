import { ethers } from "ethers"
import { useDataOfBlock } from "hooks/useDataOfBlock"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { middleStringTruncate } from "utils/middleStringTruncate"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat  from 'dayjs/plugin/localizedFormat'
import { useHasVoted } from "hooks/useHasVoted"
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)


// Info proposalStates: https://compound.finance/docs/governance#state
const proposalStates = [
    { label: 'Pending', value: '0', color: 'yellow' },
    { label: 'Active', value: '1', color: 'blue' },
    { label: 'Canceled', value: '2', color: 'gray' },
    { label: 'Defeated', value: '3', color: 'red' },
    { label: 'Succeeded', value: '4', color: 'purple' },
    { label: 'Queued', value: '5', color: 'orange' },
    { label: 'Expired', value: '6', color: 'gray' },
    { label: 'Executed', value: '7', color: 'green' }
]

export const Proposal = ({proposalId, description, state, proposer, votes, executions, startBlock, endBlock, tokenModule}) => {
    const [selectOption, setSelectOption] = useState(null)
    const { hasVoted, isVoting, setHasVoted, setIsVoting, voteModule } = useHasVoted(proposalId)
    const { timestamp: startTimeProposal } = useDataOfBlock(parseInt(startBlock.toString()))
    const { timestamp: endTimeProposal } = useDataOfBlock(parseInt(endBlock.toString()))

    const relativeDate = state === 1 ? `start since ${dayjs.unix(startTimeProposal).from()}` : ''

    const handleChangeOption = (option) => {
        setSelectOption(option)
    }
    
    const delegateTokens = async () => {
        try {
            const delegation = await tokenModule.getDelegationOf(proposer);

            if (delegation === ethers.constants.AddressZero) {
                await tokenModule.delegateTo(proposer);
                toast.success("Tokens have been successfully delegated")
            }
            return true
        } catch (error) {
            toast.error("Failed to delegate tokens")
            return false
        }
    }

    const vote = async () => {
        try {
            if (proposalStates[state].label === "Active") {
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
            if (proposalStates[state].label === "Succeeded") {
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
                <span>Made by { middleStringTruncate(proposer, 4, 4)}</span>
                <div className="flex gap-4">
                    <span className="text-xs">{relativeDate}</span>
                    <div className={`bg-gray-200 rounded-md px-4`} >
                        <span className="text-sm">{proposalStates[state].label}</span>
                    </div>
                </div>
            </div>
            <h4 className="font-semibold break-words">{description}</h4>
            <div className="flex flex-col gap-2">
                {votes && votes.map((option) => {
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