import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Liquid Wallet Kit',
  tagline: 'Developer Documentation Portal',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blockstream.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/lwk/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'blockstream', // Usually your GitHub org/user name.
  projectName: 'lwk', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/blockstream/lwk/tree/main/new_docs/',
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/lwk-social-card.jpg',
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    navbar: {
      title: 'Liquid Wallet Kit',
      logo: {
        alt: 'LWK Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'lwkSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Tutorials',
          position: 'left',
          items: [
            {
              label: 'Single-Sig Wallet',
              to: '/docs/tutorials/single-sig-wallet',
            },
            {
              label: 'Multisig Custody',
              to: '/docs/tutorials/multisig-custody',
            },
            {
              label: 'Asset Issuer',
              to: '/docs/tutorials/asset-issuer',
            },
            {
              label: 'Exchange Integration',
              to: '/docs/tutorials/exchange-integration',
            },
            {
              label: 'Mobile Wallet',
              to: '/docs/tutorials/mobile-wallet',
            },
            {
              label: 'Web Wallet',
              to: '/docs/tutorials/web-wallet',
            },
            {
              label: 'Hardware Integration',
              to: '/docs/tutorials/hardware-integration-tutorial',
            },
          ],
        },
        {
          href: 'https://github.com/blockstream/lwk',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://crates.io/crates/lwk_wollet',
          label: 'crates.io',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blockstream Discord',
              href: 'https://discord.gg/blockstream',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/blockstream_community',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/blockstream',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/blockstream/lwk',
            },
            {
              label: 'Blockstream',
              href: 'https://blockstream.com',
            },
            {
              label: 'Liquid Network',
              href: 'https://liquid.net',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Blockstream Corporation. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'rust',
        'python', 
        'kotlin',
        'swift',
        'csharp',
        'bash',
        'shell-session',
        'json',
        'toml',
        'yaml',
        'javascript',
        'typescript',
        'java'
      ],
      defaultLanguage: 'bash',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'error-next-line',
          block: {start: 'error-start', end: 'error-end'},
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
