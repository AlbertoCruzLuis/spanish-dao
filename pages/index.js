import { Logo } from "components/Logo";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useMemo, useState } from "react";
import toast from 'react-hot-toast';
import { ethers } from "ethers";
import { sdk } from "lib/sdk";
import { useRouter } from 'next/router'
import { useClaimNFT } from "hooks/useClaimNFT";
import { BUNDLE_DROP_MODULE } from "config";

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(BUNDLE_DROP_MODULE);

export default function Home() {
  const { connectWallet, address, error, provider } = useWeb3();
  const { isClaiming, hasClaimedNFT, setIsClaiming, setHasClaimedNFT } = useClaimNFT()
  const router = useRouter()

  const mintNft = async () => {
    setIsClaiming(true);
    try {
      // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
      await bundleDropModule.claim("0",1);
      // Set claim state.
      setHasClaimedNFT(true);
      // Show user their fancy new NFT!
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
    } catch (error) {
      toast.error("failed to claim")
      console.error("failed to claim", error);
    } finally {
      // Stop loading state.
      setIsClaiming(false);
    }
  }

  // If the user has already claimed their NFT we want to display the interal DAO page to them
  // only DAO members will see this. Render all the members + token amounts.
  if (hasClaimedNFT) {
    router.push('/member')
  };

  return (
    <>
      <div className="flex justify-between bg-black bg-opacity-30 p-12 mb-4 rounded-md">
        <div>
          <div className="mb-8">
            <div className="mb-4">
              <span className="text-white font-bold text-2xl">Welcome to</span>
              <Logo size="text-5xl" />
            </div>
            <span className="text-gray-400">The first community of Spanish web3 developers</span>
          </div>
          <button
            className="bg-white p-2 rounded-md font-semibold"
            disabled={isClaiming}
            onClick={() => mintNft()}
            >
            {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
          </button>
        </div>
        <div>
          <img className="max-w-[200px]" src="https://cloudflare-ipfs.com/ipfs/QmRZyQEp7quYBbKirBQhzWBbjAi9LmWkJi9BX7wHWs4Vxp/0" />
        </div>
      </div>
    </>
  );
}
