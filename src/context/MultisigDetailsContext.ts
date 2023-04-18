import React from 'react';
import BigNumber from 'bignumber.js';

const MultisigDetailsContext = React.createContext({
  quorumSize: 0,
  totalBoardMembers: 0,
  multisigBalance: new BigNumber('0'),
  isProposer: false
});

export default MultisigDetailsContext;
