import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { RINKEBY_CHAIN_ID } from 'config';
import { PageLayout } from 'layouts/PageLayout';
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

// Include what chains you wanna support.
const supportedChainIds = [RINKEBY_CHAIN_ID];

// Include what type of wallet you want to support.
// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {},
};


function App({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Toaster 
        position='bottom-center' 
        toastOptions={{ duration: 3000 }}
      />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThirdwebWeb3Provider>
  )
}

export default App