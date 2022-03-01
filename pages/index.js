import { Logo } from "components/Logo";
import toast from 'react-hot-toast';
import { sdk } from "lib/sdk";
import { useRouter } from 'next/router'
import { useClaimNFT } from "hooks/useClaimNFT";
import { BUNDLE_DROP_MODULE } from "config";
import Head from "next/head";
import { BannerAnalytics } from "components/BannerAnalytics";
import CustomLink from "components/CustomLink";
import { MdArrowForwardIos } from "react-icons/md";

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(BUNDLE_DROP_MODULE);

export default function Home() {
  const { isClaiming, hasClaimedNFT, setIsClaiming, setHasClaimedNFT } = useClaimNFT()
  const router = useRouter()

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      const tokenId = "0"
      const amount = 1
      await bundleDropModule.claim(tokenId, amount);
      setHasClaimedNFT(true);
      toast.success("Successfully Minted! Now can you see it on OpenSea")
    } catch (error) {
      toast.error("failed to claim")
    } finally {
      setIsClaiming(false);
    }
  }

  if (hasClaimedNFT) {
    router.push('/dashboard')
  };

  return (
    <>
      <Head>
        <title>SpanishDAO</title>
      </Head>
      <div className="flex justify-between bg-black bg-opacity-30 p-12 mb-4 rounded-md">
        <div className="flex flex-col justify-around">
          <div className="mb-8">
            <div className="flex flex-col gap-2 mb-4">
              <Logo size="text-5xl" />
              <span className="text-white font-bold text-4xl">Join the community, that change the future</span>
            </div>
            <span className="text-gray-400">The first community of Spanish web3 developers</span>
          </div>
          <button
            className="bg-white p-2 rounded-md font-semibold max-w-max"
            disabled={isClaiming}
            onClick={() => mintNft()}
            >
            {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
          </button>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-md p-3">
          <img className="max-w-[200px] rounded-md" src="https://cloudflare-ipfs.com/ipfs/QmRZyQEp7quYBbKirBQhzWBbjAi9LmWkJi9BX7wHWs4Vxp/0" />
          <CustomLink className="flex gap-2 items-center bg-blue-700 rounded-md p-2 max-w-max" href="https://testnets.opensea.io/collection/unidentified-contract-uoqhbcayts">
            <span className="text-white">View in OpenSea</span>
            <MdArrowForwardIos color="white" />
          </CustomLink>
        </div>
      </div>
      <BannerAnalytics />
    </>
  );
}
