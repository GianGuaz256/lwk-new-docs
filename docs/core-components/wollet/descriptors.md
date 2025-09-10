---
id: descriptors
title: CT Descriptors
sidebar_label: Descriptors
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CT Descriptors

CT (Confidential Transaction) descriptors are **the foundation of every LWK wallet**. They define both how your wallet generates addresses and how it handles Liquid's privacy features. Think of them as a blueprint that tells LWK:

1. **What script type to use** (single-sig, multisig, etc.)
2. **How to derive addresses** from extended public keys
3. **How to handle confidential transactions** (the privacy layer)

## Why CT Descriptors Matter

Unlike Bitcoin wallets that only need to track balances, Liquid wallets must also handle **blinded transactions** where amounts and asset types are hidden. CT descriptors solve this by combining:

- **Standard Bitcoin descriptors** for spending conditions
- **Blinding key information** for privacy

## Basic Structure

Every CT descriptor follows this pattern:

```
ct(blinding_key, script_descriptor)
```

The **blinding key** handles privacy, while the **script descriptor** handles spending rules.

## Choosing Your Blinding Key

You have three main options for blinding keys, each with different trade-offs:

### 1. SLIP77 (Recommended for Single-Sig)

**Best for**: Personal wallets, hardware wallet integration

<Tabs>
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{WolletDescriptor, Wollet, ElementsNetwork};

// Using SLIP77 with deterministic blinding
let descriptor_str = "ct(slip77(9c8e4f05c7711a98c838be228bcb84924d4570ca53f35fa1c793e58841d47023),elwpkh([73c5da0a/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M/<0;1>/*))";

let descriptor: WolletDescriptor = descriptor_str.parse()?;
let wollet = Wollet::without_persist(ElementsNetwork::LiquidTestnet, descriptor)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Signer, Network, Wollet

# Generate SLIP77 descriptor automatically
network = Network.regtest_default()
signer = Signer.random(network)
descriptor = signer.wpkh_slip77_descriptor()

# Create wallet with descriptor
wollet = Wollet(network, descriptor, datadir=None)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Generate SLIP77 descriptor
val network = Network.regtestDefault()
val signer = Signer.random(network)
val descriptor = signer.wpkhSlip77Descriptor()

// Create wallet
val wollet = Wollet(network, descriptor, datadir = null)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Generate SLIP77 descriptor
let network = Network.regtestDefault()
let signer = try Signer.random(network: network)
let descriptor = try signer.wpkhSlip77Descriptor()

// Create wallet
let wollet = try Wollet(network: network, descriptor: descriptor, datadir: nil)
```

</TabItem>
</Tabs>

**Why SLIP77?**
- Deterministic: Same seed always generates same blinding keys
- Hardware wallet compatible
- Standard across Liquid ecosystem

### 2. ELIP151 (Recommended for Multisig)

**Best for**: Multisig wallets, watch-only setups, exchange integrations

<Tabs>
<TabItem value="rust" label="Rust" default>

```rust
// ELIP151 derives blinding keys from the descriptor itself
let descriptor_str = "ct(elip151,elwsh(multi(2,[73c5da0a/87'/1'/0']tpubDCChhoz5Qdrkn7Z7KXawq6Ad6r3A4MUkCoVTqeWxfTkA6bHNJ3CHUEtALQdkNeixNz4446PcAmw4WKcj3mV2vb29H7sg9EPzbyCU1y2merw/<0;1>/*,[0f04356d/87'/1'/0']tpubDD2NZt5nWoiA5uuWNNWw8eKiexd8EFs8kwChV5DrzkXQ3ZoNu3SZdAmD82z78oYGmt4aihPi5rPfEFNZGs7C9WiAshoD7UEtL5R79Jo76TA/<0;1>/*)))";

let descriptor: WolletDescriptor = descriptor_str.parse()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# ELIP151 multisig example
xpub1 = signer1.keyorigin_xpub(Bip.new_bip87())
xpub2 = signer2.keyorigin_xpub(Bip.new_bip87())

descriptor_str = f"ct(elip151,elwsh(multi(2,{xpub1}/<0;1>/*,{xpub2}/<0;1>/*)))"
descriptor = WolletDescriptor(descriptor_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// ELIP151 multisig setup
val xpub1 = signer1.keyoriginXpub(Bip.newBip87())
val xpub2 = signer2.keyoriginXpub(Bip.newBip87())

val descriptorStr = "ct(elip151,elwsh(multi(2,$xpub1/<0;1>/*,$xpub2/<0;1>/*)))"
val descriptor = WolletDescriptor(descriptorStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// ELIP151 multisig setup
let xpub1 = try signer1.keyoriginXpub(bip: Bip.newBip87())
let xpub2 = try signer2.keyoriginXpub(bip: Bip.newBip87())

let descriptorStr = "ct(elip151,elwsh(multi(2,\(xpub1)/<0;1>/*,\(xpub2)/<0;1>/*)))"
let descriptor = try WolletDescriptor(descriptorStr)
```

</TabItem>
</Tabs>

**Why ELIP151?**
- No need for shared blinding master key
- Perfect for coordinated multisig (all parties can derive the same blinding keys)
- Deterministic from descriptor alone

### 3. Explicit Blinding Key

**Best for**: Custom setups, specific privacy requirements

<Tabs>
<TabItem value="rust" label="Rust" default>

```rust
// Using explicit 32-byte blinding key
let descriptor_str = "ct(ab5824f4477b4ebb00a132adfd8eb0b7935cf24f6ac151add5d1913db374ce92,elwpkh(tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M/<0;1>/*))";

let descriptor: WolletDescriptor = descriptor_str.parse()?;
let wollet = Wollet::without_persist(ElementsNetwork::LiquidTestnet, descriptor)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Using explicit blinding key for watch-only setup
descriptor_str = "ct(ab5824f4477b4ebb00a132adfd8eb0b7935cf24f6ac151add5d1913db374ce92,elwpkh(tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M/<0;1>/*))"

descriptor = WolletDescriptor(descriptor_str)
wollet = Wollet(network, descriptor, datadir=None)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Custom blinding key setup
val descriptorStr = "ct(ab5824f4477b4ebb00a132adfd8eb0b7935cf24f6ac151add5d1913db374ce92,elwpkh(tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M/<0;1>/*))"

val descriptor = WolletDescriptor(descriptorStr)
val wollet = Wollet(network, descriptor, datadir = null)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Explicit blinding key configuration
let descriptorStr = "ct(ab5824f4477b4ebb00a132adfd8eb0b7935cf24f6ac151add5d1913db374ce92,elwpkh(tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M/<0;1>/*))"

let descriptor = try WolletDescriptor(descriptorStr)
let wollet = try Wollet(network: network, descriptor: descriptor, datadir: nil)
```

</TabItem>
</Tabs>

**Why Explicit Keys?**
- Full control over blinding key derivation
- Useful for migrating from other wallet systems
- Required when you have pre-existing blinding keys to maintain compatibility

## Key Decisions for Developers

When choosing your descriptor setup, consider:

### 1. **Blinding Key Strategy**
- **SLIP77**: When you have a seed/mnemonic and want hardware wallet compatibility
- **ELIP151**: When you need deterministic blinding without sharing keys (multisig)
- **Explicit**: When you have specific blinding key requirements

### 2. **Script Type**
- **elwpkh**: Default choice for single-sig wallets (lowest fees, best compatibility)
- **elwsh**: When you need multisig (2-of-3, 3-of-5, etc.)
- **eltr**: When you need advanced privacy features

### 3. **Derivation Paths**
- Use `<0;1>/*` for receive (0) and change (1) addresses
- Follow BIP standards: 84' for native SegWit, 87' for multisig
- Coin type: 1776 for mainnet, 1 for testnet