import { TOKEN_MODULE, VOTE_MODULE } from "config";
import { NewProposal } from "features/NewProposal";
import { DashboardLayout } from "layouts/DashboardLayout";
import { sdk } from "lib/sdk";
import Head from "next/head";

// We can grab a reference to our ERC-20 contract.
const tokenModule = sdk.getTokenModule(TOKEN_MODULE)
const voteModule = sdk.getVoteModule(VOTE_MODULE)

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>SpanishDAO - Dashboard</title>
            </Head>
            <DashboardLayout>
                <NewProposal tokenModule={tokenModule} voteModule={voteModule} />
            </DashboardLayout>
        </>
    )
}

export default Dashboard;