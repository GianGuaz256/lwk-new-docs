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

### Key Components

- **SwSigner**: Software signer with BIP39 mnemonic support
- **AnySigner**: Unified enum for all signer types (software + hardware)
- **Signing Workflow**: PSET-based transaction signing process
- **Hardware Integration**: Jade and Ledger device support

## Core Signer Types

LWK provides two main signer categories through a unified interface:

- **Software Signers (SwSigner)**: Memory-based key management with BIP39 mnemonics
- **Hardware Signers**: Jade and Ledger device integration via `AnySigner` enum
- **Unified Interface**: All signers implement the same `Signer` trait for consistent APIs

## Quick Start

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_signer::{SwSigner, AnySigner};

// Software signer
let signer = SwSigner::generate(true, 0)?; // testnet, 12 words
let any_signer = AnySigner::Software(signer);

// Sign transaction
let signed_inputs = any_signer.sign(&mut pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import SwSigner, AnySigner

# Software signer
signer = SwSigner.generate(is_mainnet=False, mnemonic_len=12)
any_signer = AnySigner.software(signer)

# Sign transaction
signed_inputs = any_signer.sign(pset)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Software signer
val signer = SwSigner.generate(isMainnet = false, mnemonicLen = 12u)
val anySigner = AnySigner.Software(signer)

// Sign transaction
val signedInputs = anySigner.sign(pset)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Software signer
let signer = try SwSigner.generate(isMainnet: false, mnemonicLen: 12)
let anySigner = AnySigner.software(signer)

// Sign transaction
let signedInputs = try anySigner.sign(pset: &pset)
```

</TabItem>
</Tabs>

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

### Capabilities Matrix

| Signer Type | Speed | Security | Mobility | Use Case |
|-------------|-------|----------|----------|----------|
| Software | ⚡ Fast | ⚠️ Memory-based | 📱 Portable | Development, Testing |
| Jade | 🐌 Moderate | 🔒 Hardware Secure | 📱 Portable | Mobile, Personal |
| Ledger | 🐌 Moderate | 🔒 Hardware Secure | 💻 Desktop | Desktop, Enterprise |

## Security Considerations

### Software Signers

- **Memory Security**: Private keys exist in memory during signing
- **Development Use**: Ideal for testing and development environments
- **Key Storage**: Use secure key derivation and storage mechanisms

### Hardware Signers

- **Secure Element**: Private keys never leave the hardware device
- **User Confirmation**: Physical confirmation required for transactions
- **Device Trust**: Rely on hardware manufacturer's security implementation

### Best Practices

1. **Environment Separation**: Use hardware signers for production, software for development
2. **Key Rotation**: Regularly rotate software signer mnemonics
3. **Multisig Setup**: Combine multiple signer types for enhanced security
4. **Secure Communication**: Ensure secure channels for hardware wallet communication

## Next Steps

- [Software Signer](./software-signer.md) - Deep dive into software signer implementation
- [Hardware Integration](./hardware-integration.md) - Learn hardware wallet integration
- [Signing Flow](./signing-flow.md) - Understand the complete signing process
- [Hardware Wallets](../hardware-wallets/README.md) - Explore Jade and Ledger integration