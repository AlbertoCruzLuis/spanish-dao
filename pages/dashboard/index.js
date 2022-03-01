import { Proposals } from "components/Proposals";
import { TOKEN_MODULE } from "config";
import { DashboardLayout } from "layouts/DashboardLayout";
import { sdk } from "lib/sdk";
import Head from "next/head";

// We can grab a reference to our ERC-20 contract.
const tokenModule = sdk.getTokenModule(TOKEN_MODULE);

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>SpanishDAO - dashboard</title>
            </Head>
            <DashboardLayout>
                {(memberAddresses) =>
                    <Proposals tokenModule={tokenModule} memberAddresses={memberAddresses} />
                }
            </DashboardLayout>
        </>
    )
}

export default Dashboard;