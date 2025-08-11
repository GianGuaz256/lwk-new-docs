---
id: hardware-wallets-overview
title: Hardware Wallets
sidebar_label: Overview
sidebar_position: 1
---

# Hardware Wallet Support Overview

LWK provides comprehensive support for hardware wallets, enabling secure transaction signing and key management through physical devices. Currently supporting Jade and Ledger devices, with consistent APIs that abstract away device-specific implementations.

## Overview

Hardware wallet integration in LWK offers enterprise-grade security by keeping private keys isolated in dedicated hardware secure elements. The implementation provides unified interfaces for different devices while maintaining full compatibility with Liquid-specific features like confidential transactions and asset operations.

### Supported Devices

- **[Blockstream Jade](./jade/README.md)**: Purpose-built for Liquid with native confidential transaction support
- **[Ledger](./ledger/README.md)**: Enterprise-grade hardware with Liquid Elements app support

### Key Capabilities

- **Secure Key Storage**: Private keys never leave the hardware device
- **Transaction Signing**: PSET-based signing with user confirmation
- **Multisig Registration**: Hardware-based multisig wallet setup
- **Asset Support**: Native handling of L-BTC and Liquid assets
- **Address Verification**: On-device address verification for enhanced security 