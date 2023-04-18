import { InferType, object, string } from 'yup';

export const dAppName = 'xCoffeeDAO Governance';
export const decimals = 2;
export const denomination = 18;
export const gasPrice = 1000000000;
export const version = 1;
export const gasPriceModifier = '0.01';
export const gasPerDataByte = '1500';
export const chainID = 'D';
export const gasLimit = 10_000_000;
export const minGasLimit = 50_000;
export const maxGasLimit = 1499999999;

export const walletConnectBridge = 'https://bridge.walletconnect.org';
export const walletConnectDeepLink =
  'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/';

export const issueTokenContractAddress =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';

export const network: NetworkType = {
  id: 'devnet',
  name: 'Devnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://devnet-wallet.multiversx.com',
  apiAddress: 'https://devnet-api.multiversx.com',
  gatewayAddress: 'https://devnet-gateway.multiversx.com',
  explorerAddress: 'http://devnet-explorer.multiversx.com'
};

const networkSchema = object({
  id: string().defined().required(),
  egldLabel: string().defined().required(),
  name: string().defined().required(),
  walletAddress: string(),
  apiAddress: string(),
  gatewayAddress: string(),
  explorerAddress: string().required()
}).required();

export type NetworkType = InferType<typeof networkSchema>;

networkSchema.validate(network, { strict: true }).catch(({ errors }) => {
  console.error(`Config invalid format for ${network.id}`, errors);
});

export const uniqueContractAddress =
  'erd1qqqqqqqqqqqqqpgqf22c6vqq5v96jarn6juc04etcvqnccljp4eqnnjcz5';
//Optional, if you want to give a name to the visual representation of the contract
export const uniqueContractName = 'xCoffeeDAO Governance Contract';

export const TOOLS_API_URL = 'https://tools.multiversx.com';
/**
 * Calls to these domains will use `nativeAuth` Baerer token
 */
export const sampleAuthenticatedDomains = [TOOLS_API_URL];
export const walletConnectV2ProjectId = 'd425b71aefaf446012364d51cbc7d651';
