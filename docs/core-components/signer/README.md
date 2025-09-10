---
id: signer-overview
title: Signer Architecture
sidebar_label: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Signing Architecture Overview

The `lwk_signer` crate provides a unified abstraction layer for transaction signing in LWK, supporting both software signers and hardware wallet integration. This flexible architecture enables seamless switching between different signing methods while maintaining consistent APIs across software and hardware implementations.

LWK's signing architecture is built around the `Signer` trait, which abstracts signing operations for both software and hardware implementations. The main signer types include software signers with [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonics and hardware wallet integration through [Jade](../hardware-wallets/jade.md) and [Ledger](../hardware-wallets/ledger.md) devices, all unified under a single interface that enables consistent transaction signing regardless of the underlying signing mechanism.

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

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

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

</TabItem>
<TabItem value="python" label="Python">

```python
# Signer interface methods
class Signer:
    def sign(self, pset) -> int:
        """Sign a PSET, returning number of inputs signed"""
        pass
    
    def derive_xpub(self, path) -> str:
        """Derive extended public key for given path"""
        pass
    
    def slip77_master_blinding_key(self) -> str:
        """Get SLIP77 master blinding key"""
        pass
    
    def fingerprint(self) -> str:
        """Get signer fingerprint"""
        pass
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Signer interface methods
interface Signer {
    /**
     * Sign a PSET, returning number of inputs signed
     */
    fun sign(pset: Pset): UInt
    
    /**
     * Derive extended public key for given path
     */
    fun deriveXpub(path: String): String
    
    /**
     * Get SLIP77 master blinding key
     */
    fun slip77MasterBlindingKey(): String
    
    /**
     * Get signer fingerprint
     */
    fun fingerprint(): String
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Signer protocol methods
protocol Signer {
    /**
     * Sign a PSET, returning number of inputs signed
     */
    func sign(pset: inout Pset) throws -> UInt32
    
    /**
     * Derive extended public key for given path
     */
    func deriveXpub(path: String) throws -> String
    
    /**
     * Get SLIP77 master blinding key
     */
    func slip77MasterBlindingKey() throws -> String
    
    /**
     * Get signer fingerprint
     */
    func fingerprint() throws -> String
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Signer interface methods
class Signer {
    /**
     * Sign a PSET, returning number of inputs signed
     */
    sign(pset) {
        // Returns number
    }
    
    /**
     * Derive extended public key for given path
     */
    deriveXpub(path) {
        // Returns string
    }
    
    /**
     * Get SLIP77 master blinding key
     */
    slip77MasterBlindingKey() {
        // Returns string
    }
    
    /**
     * Get signer fingerprint
     */
    fingerprint() {
        // Returns string
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Signer interface methods
public interface ISigner
{
    /// <summary>
    /// Sign a PSET, returning number of inputs signed
    /// </summary>
    uint Sign(Pset pset);
    
    /// <summary>
    /// Derive extended public key for given path
    /// </summary>
    string DeriveXpub(string path);
    
    /// <summary>
    /// Get SLIP77 master blinding key
    /// </summary>
    string Slip77MasterBlindingKey();
    
    /// <summary>
    /// Get signer fingerprint
    /// </summary>
    string Fingerprint();
}
```

</TabItem>
</Tabs>

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