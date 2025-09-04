---
id: signer-overview
title: Signer Architecture
sidebar_label: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Signing Architecture Overview

The `lwk_signer` crate provides a unified abstraction layer for transaction signing in LWK, supporting both software signers and hardware wallet integration. This flexible architecture enables seamless switching between different signing methods while maintaining consistent APIs.

## Overview

LWK's signing architecture is built around the `Signer` trait, which abstracts signing operations for both software and hardware implementations. The main signer types include software signers with BIP39 mnemonics and hardware wallet integration through Jade and Ledger devices.

## Core Signer Types

LWK provides two main signer categories through a unified interface:

- **Software Signers (SwSigner)**: Memory-based key management with BIP39 mnemonics
- **Hardware Signers**: Jade and Ledger device integration via `AnySigner` enum
- **Unified Interface**: All signers implement the same `Signer` trait for consistent APIs

## Signing Architecture

### PSET-Based Workflow

```mermaid
graph LR
    A[Create PSET] --> B[Sign with Signer]
    B --> C[Verify Signatures]
    C --> D[Finalize & Broadcast]
```

LWK uses Partially Signed Elements Transactions (PSETs) for all signing operations, enabling coordinated signing across multiple parties in multisig scenarios.

## Core Signer Trait

All signers implement the core `Signer` trait with these essential methods:

### Key Methods

```rust
pub trait Signer {
    type Error;
    
    /// Sign a PSET, returning number of inputs signed
    fn sign(&self, pset: &mut PartiallySignedTransaction) -> Result<u32, Self::Error>;
    
    /// Derive extended public key for given path
    fn derive_xpub(&self, path: &DerivationPath) -> Result<Xpub, Self::Error>;
    
    /// Get SLIP77 master blinding key
    fn slip77_master_blinding_key(&self) -> Result<MasterBlindingKey, Self::Error>;
    
    /// Get signer fingerprint
    fn fingerprint(&self) -> Result<Fingerprint, Self::Error>;
}
```

## Security Considerations

### Software Signers

- **Memory Security**: Private keys exist in memory during signing
- **Development Use**: Ideal for testing and development environments
- **Key Storage**: Use secure key derivation and storage mechanisms

### Hardware Signers

- **Secure Element**: Private keys never leave the hardware device
- **User Confirmation**: Physical confirmation required for transactions
- **Device Trust**: Rely on hardware manufacturer's security implementation

## Next Steps

- [Software Signer](./software-signer.md) - Deep dive into software signer implementation
- [Hardware Integration](./hardware-integration.md) - Learn hardware wallet integration
- [Signing Flow](./signing-flow.md) - Understand the complete signing process
- [Hardware Wallets](../hardware-wallets/README.md) - Explore Jade and Ledger integration