import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // LWK Documentation Sidebar
  lwkSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started',
        'getting-started/installation',
        'getting-started/first-wallet',
        'getting-started/concepts',
      ],
    },
    {
      type: 'category',
      label: 'Core Components',
      items: [
        'core-components/core-components-overview',
        {
          type: 'category',
          label: 'Watch-Only Wallet (Wollet)',
          items: [
            'core-components/wollet/wollet-overview',
            'core-components/wollet/descriptors',
            'core-components/wollet/address-generation',
            'core-components/wollet/balance-tracking',
            'core-components/wollet/blockchain-sync',
          ],
        },
        {
          type: 'category',
          label: 'Signer',
          items: [
            'core-components/signer/signer-overview',
            'core-components/signer/software-signer',
            'core-components/signer/hardware-integration',
            'core-components/signer/signing-flow',
          ],
        },
        {
          type: 'category',
          label: 'Hardware Wallets',
          items: [
            'core-components/hardware-wallets/hardware-wallets-overview',
            'core-components/hardware-wallets/jade',
            'core-components/hardware-wallets/ledger',
            'core-components/hardware-wallets/extending-hardware-wallets',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Transactions',
      items: [
        'transactions/psets',
        'transactions/building-transactions',
        'transactions/fee-estimation',
        'transactions/coin-selection',
        'transactions/blinding',
        'transactions/finalization',
      ],
    },
    {
      type: 'category',
      label: 'Assets (Coming Soon)',
      items: [
        'assets/assets-overview',
        'assets/issuance',
        'assets/reissuance',
        'assets/burning',
        'assets/contracts',
        'assets/registry',
        'assets/amp2',
      ],
    },
    {
      type: 'category',
      label: 'Multisig',
      items: [
        'multisig/multisig-overview',
        'multisig/descriptor-creation',
        'multisig/registration',
        'multisig/transaction-flow',
      ],
    },
    
    {
      type: 'category',
      label: 'Blockchain Backends',
      items: [
        'blockchain-backends/blockchain-backends-overview',
        'blockchain-backends/electrum',
        'blockchain-backends/esplora',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics (Coming Soon)',
      items: [
        'advanced-topics/liquidex',
        'advanced-topics/pegins',
        'advanced-topics/covenants',
        'advanced-topics/swaps',
        'advanced-topics/privacy',
        'advanced-topics/performance-optimization',
        'advanced-topics/custom-descriptors',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        'cli/cli-overview',
        'cli/installation',
        'cli/server-management',
        'cli/signer-operations',
        'cli/wallet-operations',
        'cli/asset-operations',
        'cli/transaction-operations',
        'cli/scripting',
      ],
    },
    {
      type: 'category',
      label: 'Deployment (Coming Soon)',
      items: [
        'deployment/production-considerations',
        'deployment/security-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Reference (Coming Soon)',
      items: [
        'reference/cli-reference',
        'reference/error-codes',
        'reference/configuration-reference',
        'reference/glossary',
        'reference/changelog',
      ],
    },
  ],
};

export default sidebars;
