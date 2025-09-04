---
id: intro
title: Introduction to Liquid Wallet Kit (LWK)
sidebar_label: Introduction
sidebar_position: 1
---

# Introduction to Liquid Wallet Kit (LWK)

<div align="center">

![LWK Logo](/img/lwk_logo.png)

</div>

## What is Liquid?

[Liquid](https://docs.liquid.net) is a Bitcoin sidechain that extends Bitcoin with features like confidential transactions, issued assets, and faster settlement times. Think of it as Bitcoin with enhanced privacy and the ability to create custom tokens (like USDT-Liquid) while maintaining Bitcoin's security model.

## What is LWK?

**Liquid Wallet Kit (LWK)** is a comprehensive Rust-based toolkit that lets developers build Liquid wallets and applications. Instead of building Liquid functionality from scratch, LWK provides battle-tested, modular components that handle the complex parts for you.

**Important**: LWK is **not** a wallet itself but rather the engine that powers wallets to use Liquid.

### Key Features

- **Watch-Only Wallets**: Track balances and generate addresses without storing private keys
- **Multi-Language Support**: 
  <img alt="Rust" src="https://img.shields.io/badge/-Rust-000000?style=flat-square&logo=rust&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img alt="Kotlin" src="https://img.shields.io/badge/-Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white" />
  <img alt="Swift" src="https://img.shields.io/badge/-Swift-FA7343?style=flat-square&logo=swift&logoColor=white" />
  <img alt="C#" src="https://img.shields.io/badge/-C%23-239120?style=flat-square&logo=c-sharp&logoColor=white" />
  <img alt="WebAssembly" src="https://img.shields.io/badge/-WebAssembly-654FF0?style=flat-square&logo=webassembly&logoColor=white" />
- **Hardware Integration**: Built-in support for Jade and Ledger hardware wallets
- **Asset Management**: Handle Bitcoin, USDT, and any other Liquid assets

## Core Capabilities

```mermaid
graph TB
    A[LWK] --> B[Wollet]
    A --> C[Signer]
    A --> D[Hardware]
    A --> E[Multisig]
    
    classDef default fill:#0066cc,stroke:#0066cc,color:#ffffff
```

### Wollet (Watch-Only Wallet)
- Create and manage watch-only wallets using descriptors
- Generate receiving addresses with privacy features
- Sync with the Liquid blockchain and track balances
- Handle any Liquid asset (L-BTC, USDT-Liquid, etc.)

### Signer
- Build and sign transactions using PSET format
- Software-based signing with private keys
- Integration with hardware wallets for secure signing
- Support for complex transaction types and asset transfers

### Hardware
- Native integration with Jade hardware wallets
- Support for Ledger devices
- Secure transaction signing with hardware devices
- Multi-device support for different signing scenarios

### Multisig
- Create and manage multi-signature wallets
- Support for various threshold configurations (2-of-3, 3-of-5, etc.)
- Hardware wallet integration for multisig signing
- Enterprise-grade security for treasury management

## Who Should Use LWK?

```mermaid
graph TB
    A[LWK] --> B[Exchange]
    A --> C[Wallet]
    A --> D[Multisig]
    
    classDef default fill:#0066cc,stroke:#0066cc,color:#ffffff
```

### Exchange
Building a cryptocurrency exchange that needs Liquid asset support? LWK provides:
- **Watch-Only Wallets**: Track user deposits without storing private keys
- **Asset Support**: Handle L-BTC, USDT-Liquid, and other issued assets
- **Batch Processing**: Efficiently process multiple transactions
- **Hot/Cold Separation**: Keep signing keys offline for security
- **Hardware Integration**: Use hardware wallets for cold storage signing

### Wallet
Creating mobile or web wallets for end users? LWK offers:
- **Cross-Platform**: Use the same codebase on iOS, Android, and web
- **Privacy**: Built-in confidential transactions for user privacy
- **Hardware Support**: Let users secure funds with Jade or Ledger devices
- **Simple APIs**: Abstract complex Liquid concepts behind easy-to-use interfaces
- **Asset Management**: Support any Liquid asset with unified wallet experience

### Multisig
Need secure multi-signature setups for treasury or enterprise use? LWK enables:
- **Flexible Thresholds**: Configure 2-of-3, 3-of-5, or any M-of-N setup
- **Hardware Signing**: Each signer can use their own Jade or Ledger device
- **Policy Enforcement**: Require multiple approvals for transactions
- **Enterprise Security**: Perfect for company treasuries holding USDT-Liquid
- **Audit Trail**: Complete transaction history and compliance reporting

**Example**: A company treasury holding USDT-Liquid in a 2-of-3 multisig where any two executives must approve transactions using their Jade hardware wallets.

## Quick Navigation

Ready to start building? Choose your path:

- **[Getting Started](./getting-started)** - New to LWK? Start here
- **[Installation](./getting-started/installation)** - Set up your environment  
- **[Core Components](./core-components)** - Understand the architecture
- **[Tutorials](./tutorials/)** - Learn by building
- **[API Reference](./reference/)** - Technical documentation

---

*LWK is developed and maintained by [Blockstream](https://blockstream.com) and the open-source community.* 