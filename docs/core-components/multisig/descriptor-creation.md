---
id: setup
title: Setup
sidebar_label: Setup
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Multisig Setup

Setting up a 2-of-3 multisig wallet requires 3 simple steps:

## Step 1: Get XPubs from Each Signer

Each participant generates their extended public key using their private key.
Share these XPubs with all other participants.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Each participant runs this:
let signer = SwSigner::new(mnemonic, true)?;
let xpub = signer.keyorigin_xpub(Bip::new_bip87())?;
// Share this XPub with others
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Each participant runs this:
signer = SwSigner(mnemonic, True)
xpub = signer.keyorigin_xpub(Bip.new_bip87())
# Share this XPub with others
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Each participant runs this:
val signer = SwSigner(mnemonic, true)
val xpub = signer.keyoriginXpub(Bip.newBip87())
// Share this XPub with others
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Each participant runs this:
let signer = try SwSigner(mnemonic: mnemonic, isMainnet: true)
let xpub = try signer.keyoriginXpub(bip: Bip.newBip87())
// Share this XPub with others
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
// Each participant runs this:
const signer = new SwSigner(mnemonic, true);
const xpub = signer.keyoriginXpub(Bip.newBip87());
// Share this XPub with others
```

</TabItem>
</Tabs>

## Step 2: Create Multisig Descriptor

Combine all XPubs into a single multisig descriptor that defines the wallet.
This descriptor will be shared by all participants.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Collect the 3 XPubs from step 1
let xpubs = vec![xpub1, xpub2, xpub3];
let parsed_xpubs: Vec<_> = xpubs.iter().map(|s| keyorigin_xpub_from_str(s)).collect()?;

// Create 2-of-3 multisig descriptor
let descriptor = multisig_desc(2, parsed_xpubs, Multisig::Wsh, DescriptorBlindingKey::Elip151)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Collect the 3 XPubs from step 1
xpubs = [xpub1, xpub2, xpub3]
parsed_xpubs = [keyorigin_xpub_from_str(s) for s in xpubs]

# Create 2-of-3 multisig descriptor
descriptor = multisig_desc(2, parsed_xpubs, Multisig.WSH, DescriptorBlindingKey.ELIP151)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Collect the 3 XPubs from step 1
val xpubs = listOf(xpub1, xpub2, xpub3)
val parsedXpubs = xpubs.map { keyoriginXpubFromStr(it) }

// Create 2-of-3 multisig descriptor
val descriptor = multisigDesc(2, parsedXpubs, Multisig.WSH, DescriptorBlindingKey.ELIP151)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Collect the 3 XPubs from step 1
let xpubs = [xpub1, xpub2, xpub3]
let parsedXpubs = try xpubs.map { try keyoriginXpubFromStr($0) }

// Create 2-of-3 multisig descriptor
let descriptor = try multisigDesc(threshold: 2, xpubs: parsedXpubs, scriptVariant: .wsh, blindingVariant: .elip151)
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
// Collect the 3 XPubs from step 1
const xpubs = [xpub1, xpub2, xpub3];
const parsedXpubs = xpubs.map(s => keyoriginXpubFromStr(s));

// Create 2-of-3 multisig descriptor
const descriptor = multisigDesc(2, parsedXpubs, Multisig.WSH, DescriptorBlindingKey.ELIP151);
```

</TabItem>
</Tabs>

## Step 3: Create Wallet

Each participant creates their own watch-only wallet using the shared descriptor.
Everyone will have the same wallet view and can monitor transactions.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Everyone uses the same descriptor to create their wallet
let wollet = Wollet::new(network, persister, descriptor)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Everyone uses the same descriptor to create their wallet
wollet = Wollet(network, descriptor, datadir=None)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Everyone uses the same descriptor to create their wallet
val wollet = Wollet(network, descriptor, datadir = null)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Everyone uses the same descriptor to create their wallet
let wollet = try Wollet(network: network, descriptor: descriptor, datadir: nil)
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
// Everyone uses the same descriptor to create their wallet
const wollet = new Wollet(network, descriptor, null);
```

</TabItem>
</Tabs>

**Done!** All participants now have the same multisig wallet and can coordinate transactions.