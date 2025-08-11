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

## Welcome to LWK

**Liquid Wallet Kit (LWK)** is a modular collection of Rust crates designed for building robust Liquid Bitcoin wallets. LWK provides everything developers need to integrate Liquid functionality into their applications, from simple payment wallets to complex multi-signature systems and asset management platforms.

## What is LWK?

LWK is not a single wallet application, but rather a comprehensive **toolkit** that enables developers to build their own Liquid wallet solutions. It follows a modular architecture where each component serves a specific purpose, allowing developers to use only what they need.

### Key Design Principles

- **Modular Architecture**: Pick and choose only the components you need
- **Watch-Only Model**: Enhanced security through separation of concerns  
- **Multi-Language Support**: Native bindings for Python, Kotlin, Swift, C#, and WebAssembly
- **Hardware Integration**: First-class support for Jade and Ledger devices
- **Production Ready**: All crates are published and actively maintained

## Core Capabilities

### Wallet Operations
- Create and manage watch-only wallets using CT descriptors
- Generate receiving addresses with full confidential transaction support
- Sync with Liquid blockchain via Electrum or Esplora backends
- Build, sign, and broadcast transactions using PSET format

### Asset Management
- Issue new assets on the Liquid network
- Reissue existing assets with proper token management
- Burn assets permanently from circulation
- Transfer any Liquid asset with confidential amounts

### Security Features
- Hardware wallet integration (Jade, Ledger)
- Multi-signature wallet support
- Offline signing capabilities
- Hierarchical deterministic key derivation

### Developer Experience
- Command-line interface for testing and automation
- JSON-RPC server for easy integration
- Comprehensive language bindings
- WebAssembly support for browser applications

## Crate Status

All LWK crates are **published on crates.io** and ready for production use:

| Crate | Status | Description |
|-------|--------|-------------|
| `lwk_wollet` | [![Crates.io](https://img.shields.io/crates/v/lwk_wollet.svg)](https://crates.io/crates/lwk_wollet) | Watch-only wallet core |
| `lwk_signer` | [![Crates.io](https://img.shields.io/crates/v/lwk_signer.svg)](https://crates.io/crates/lwk_signer) | Transaction signing |
| `lwk_cli` | [![Crates.io](https://img.shields.io/crates/v/lwk_cli.svg)](https://crates.io/crates/lwk_cli) | Command-line interface |
| `lwk_jade` | [![Crates.io](https://img.shields.io/crates/v/lwk_jade.svg)](https://crates.io/crates/lwk_jade) | Jade hardware wallet |
| `lwk_ledger` | [![Crates.io](https://img.shields.io/crates/v/lwk_ledger.svg)](https://crates.io/crates/lwk_ledger) | Ledger hardware wallet |
| `lwk_common` | [![Crates.io](https://img.shields.io/crates/v/lwk_common.svg)](https://crates.io/crates/lwk_common) | Common utilities |

## About This Documentation

This documentation provides comprehensive guides for developers at all levels:

### For Beginners
- **[Getting Started](./getting-started)** - Learn the fundamentals and create your first wallet
- **[Installation](./getting-started/installation)** - Set up your development environment
- **[Essential Concepts](./getting-started/concepts)** - Understand Liquid and LWK principles

### For Developers
- **[Core Components](./core-components)** - Deep dive into LWK architecture
- **[Language Bindings](./core-components)** - Use LWK in Python, Kotlin, Swift, C#, or WASM
- **[Tutorials](./tutorials/)** - Step-by-step guides for specific use cases

### For Advanced Users
- **[CLI Reference](./cli)** - Complete command-line tool documentation
- **[Advanced Topics](./advanced-topics/)** - Multisig, assets, and complex workflows
- **[API Reference](./reference/)** - Detailed technical specifications

## Who Should Use LWK?

LWK is designed for developers building:

- **Mobile Wallets**: iOS and Android applications using Swift/Kotlin bindings
- **Web Applications**: Browser-based wallets with WebAssembly support
- **Exchange Integration**: Trading platforms requiring Liquid asset support
- **Enterprise Solutions**: Multi-signature wallets and treasury management
- **Asset Issuers**: Applications for creating and managing Liquid tokens
- **Hardware Wallet Apps**: Secure applications leveraging Jade or Ledger devices

## Quick Navigation

Ready to start building? Choose your path:

- **[🚀 Getting Started](./getting-started)** - New to LWK? Start here
- **[💻 Installation](./getting-started/installation)** - Set up your environment  
- **[🏗️ Core Components](./core-components)** - Understand the architecture
- **[🔧 Tutorials](./tutorials/)** - Learn by building
- **[📚 API Reference](./reference/)** - Technical documentation

---

*LWK is developed and maintained by [Blockstream](https://blockstream.com) and the open-source community.* 