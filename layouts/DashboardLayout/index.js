import { Navbar } from "components/Navbar";
import { Table } from "components/Table";
import { ethers } from "ethers";
import { useClaimNFT } from "hooks/useClaimNFT";
import { useEffect, useMemo, useState } from "react";
import { middleStringTruncate } from "utils/middleStringTruncate";
import { BUNDLE_DROP_MODULE, TOKEN_MODULE } from "config";
import { sdk } from "lib/sdk";

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(BUNDLE_DROP_MODULE);
// We can grab a reference to our ERC-20 contract.
const tokenModule = sdk.getTokenModule(TOKEN_MODULE);

export const DashboardLayout = ({ children }) => {
    const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
    const [memberAddresses, setMemberAddresses] = useState([]);
    const { hasClaimedNFT } = useClaimNFT()


    // This useEffect grabs all the addresses of our members holding our NFT.
    useEffect(async () => {
        if (!hasClaimedNFT) {
            return;
        }
        
        // Just like we did in the 07-airdrop-token.js file! Grab the users who hold our NFT
        // with tokenId 0.
        try {
            const memberAddresses = await bundleDropModule.getAllClaimerAddresses("0");
            setMemberAddresses(memberAddresses);
        } catch (error) {
            console.error("failed to get member list", error);
        }
    }, [hasClaimedNFT]);

    // This useEffect grabs the # of token each member holds.
    useEffect(async () => {
        if (!hasClaimedNFT) {
            return;
        }

        // Grab all the balances.
        try {
            const amounts = await tokenModule.getAllHolderBalances();
            setMemberTokenAmounts(amounts);
        } catch (error) {
            console.error("failed to get token amounts", error);
        }
    }, [hasClaimedNFT]);

    // Now, we combine the memberAddresses and memberTokenAmounts into a single array
    const memberList = useMemo(() => {
        return memberAddresses.map((address) => {
            return {
                address: middleStringTruncate(address, 4, 4),
                tokenAmount: ethers.utils.formatUnits(
                    // If the address isn't in memberTokenAmounts, it means they don't
                    // hold any of our token.
                    memberTokenAmounts[address] || 0,
                    18,
                ),
            };
        });
    }, [memberAddresses, memberTokenAmounts]);

    const routes = [
        {name: "Proposals", url: "/dashboard"},
        {name: "Create Proposal", url: "/dashboard/create-proposal"}
    ]

    return (
        <div className="">
            <div className="p-4 bg-black bg-opacity-30 rounded-md mb-4">
                <p className="text-gray-400">🎉 Congratulations on being a member</p>
            </div>
            <div className="grid grid-cols-3 gap-10">
                <div className="flex flex-col xs:col-span-3 gap-4">
                    <div className="border border-solid border-gray-400 py-2 rounded-md">
                        <Navbar containerStyle="flex flex-col gap-4" activeStyle="border-l-2 pl-4" disableStyle="pl-4" routes={routes} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-white">Member List</h2>
                        <Table
                            headers={[{name: "Address", accessor: "address"}, {name: "Token Amount", accessor: "tokenAmount"}]} 
                            data={memberList}
                            tableStyle="bg-white p-2 rounded-md"
                            />
                    </div>
                </div>
                <div className="col-span-2 xs:col-span-3">
                    {children(memberAddresses)}
                </div>
            </div>
        </div>
    )
}