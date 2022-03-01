import { AutoComplete } from "components/AutoComplete";
import { Select } from "components/Select";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderAlt } from 'react-icons/bi'

const ACTIONS = [
  { label: "mint", value: "mint" },
  { label: "transfer", value: "transfer" }
]

const TOKENS = [
  { label: "SHP", value: "SHP" }
]

export const NewProposal = ({tokenModule, voteModule, memberAddresses}) => {
  const [description, setDescription] = useState(null)
  const [amount, setAmount] = useState(null)
  const [action, setAction] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    setAction("mint")
    setWallet(voteModule.address)
  }, [])

  const handleChangeDescription = (event) => {
      setDescription(event.currentTarget.value)
  }

  const handleChangeAction = (event) => {
    setAction(event.currentTarget.value)
    if (event.currentTarget.value === "mint") {
      setWallet(voteModule.address)
    } else {
      setWallet(null)
    }
  }

  const handleChangeAmount = (event) => {
    setAmount(event.currentTarget.value)
  }

  const createProposal = async () => {
    try {
      if (!action || !description || !amount || !wallet) {
        toast.error("All Field has be filled")
        return
      }
      setIsCreating(true)

      await voteModule.propose(
        description,
        [
          {
            nativeTokenValue: 0,
            transactionData: tokenModule.contract.interface.encodeFunctionData(
              action,
              [
                wallet,
                ethers.utils.parseUnits(amount.toString(), 18),
              ]
            ),
            toAddress: tokenModule.address,
          },
        ]
      );
      toast.success("Successfully created proposal")
      setIsCreating(false)
    } catch (error) {
      toast.error("Failed to create the proposal")
      setIsCreating(false)
      console.log(error);
    }
  }

  return (
      <div className="flex flex-col gap-2">
          <h2 className="text-white text-lg font-bold">New Proposal</h2>
          <div className="flex flex-col gap-4 bg-white p-2 rounded-md">
              <textarea 
                className="outline-none border-2 border-solid rounded-md p-2 resize-none" 
                rows="3" 
                placeholder="Write to new proposal..."
                onChange={handleChangeDescription} />
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Action</span>
                <div>
                  <Select 
                    options={ACTIONS} 
                    handleChange={handleChangeAction} 
                    selectedOption={action} />
                </div>
              </div>
              { action === "transfer" &&
                  <AutoComplete 
                    suggestions={memberAddresses} 
                    placeholder="Wallet Address..." 
                    state={wallet}
                    setState={setWallet} />
              }
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Amount</span>
                <div className="flex gap-2">
                  <Select disabled options={TOKENS} />
                  <input 
                    className="outline-none border-2 border-solid rounded-md p-2 w-24"
                    onChange={handleChangeAmount}
                    type="number"
                    placeholder="Amount" />
                </div>
              </div>
              <button className="bg-black p-2 rounded-md" onClick={createProposal}>
                { isCreating ? (
                  <div className="flex gap-2 justify-center items-center">
                    <BiLoaderAlt className="animate-spin" color="white" />
                    <span className="text-white">Creating...</span>
                  </div>
                ) : (
                  <span className="text-white">Create Proposal</span>
                )}
              </button>
          </div>
      </div>
  )
}