---
id: descriptor-creation
title: Descriptor Creation
sidebar_label: Descriptor Creation
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating Multisig Descriptors

Creating multisig descriptors in LWK requires a coordinated process of collecting extended public keys from all participants and combining them into a standardized descriptor format. LWK provides both high-level utilities through the app interface and low-level APIs for direct integration.

## Understanding LWK Multisig Descriptors

LWK multisig descriptors follow the Elements descriptor format with specific enhancements for Liquid's confidential transactions. The basic structure is:

```
ct(blinding_key,elwsh(multi(threshold,xpub1/*,xpub2/*,xpub3/*)))
```

Where:
- `ct()` wraps the descriptor for confidential transaction support
- `blinding_key` can be either `slip77(random_key)` or `elip151`
- `elwsh()` indicates Elements witness script hash (native segwit)
- `multi()` defines the threshold and participating keys
- `/*` indicates the derivation path for address generation

## Step 1: Generating Extended Public Keys

Each participant must generate their extended public key (xpub) using their signer. LWK supports multiple signer types, each with their own xpub generation method.

### Software Signers

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_signer::{SwSigner, Signer};

// Create a software signer from mnemonic
let mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
let signer = SwSigner::new(mnemonic, true)?; // true for mainnet

// Get the master xpub
let master_xpub = signer.xpub();
println!("Master XPub: {}", master_xpub);

// Get fingerprint for the descriptor
let fingerprint = signer.fingerprint();
println!("Fingerprint: {}", fingerprint);

// Format for multisig descriptor
let keyorigin_xpub = format!("[{}]{}", fingerprint, master_xpub);
println!("Keyorigin XPub: {}", keyorigin_xpub);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import SwSigner

# Create a software signer from mnemonic
mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
signer = SwSigner(mnemonic, True)  # True for mainnet

# Get the master xpub
master_xpub = signer.xpub()
print(f"Master XPub: {master_xpub}")

# Get fingerprint for the descriptor
fingerprint = signer.fingerprint()
print(f"Fingerprint: {fingerprint}")

# Format for multisig descriptor
keyorigin_xpub = f"[{fingerprint}]{master_xpub}"
print(f"Keyorigin XPub: {keyorigin_xpub}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.SwSigner

// Create a software signer from mnemonic
val mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
val signer = SwSigner(mnemonic, true) // true for mainnet

// Get the master xpub
val masterXpub = signer.xpub()
println("Master XPub: $masterXpub")

// Get fingerprint for the descriptor
val fingerprint = signer.fingerprint()
println("Fingerprint: $fingerprint")

// Format for multisig descriptor
val keyoriginXpub = "[$fingerprint]$masterXpub"
println("Keyorigin XPub: $keyoriginXpub")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create a software signer from mnemonic
let mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
let signer = try SwSigner(mnemonic: mnemonic, isMainnet: true)

// Get the master xpub
let masterXpub = signer.xpub()
print("Master XPub: \(masterXpub)")

// Get fingerprint for the descriptor
let fingerprint = signer.fingerprint()
print("Fingerprint: \(fingerprint)")

// Format for multisig descriptor
let keyoriginXpub = "[\(fingerprint)]\(masterXpub)"
print("Keyorigin XPub: \(keyoriginXpub)")
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
import { SwSigner } from 'lwk-wasm';

// Create a software signer from mnemonic
const mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
const signer = new SwSigner(mnemonic, true); // true for mainnet

// Get the master xpub
const masterXpub = signer.xpub();
console.log(`Master XPub: ${masterXpub}`);

// Get fingerprint for the descriptor
const fingerprint = signer.fingerprint();
console.log(`Fingerprint: ${fingerprint}`);

// Format for multisig descriptor
const keyoriginXpub = `[${fingerprint}]${masterXpub}`;
console.log(`Keyorigin XPub: ${keyoriginXpub}`);
```

</TabItem>
</Tabs>

## Step 2: Creating the Multisig Descriptor

LWK provides the `multisig_desc` function to create properly formatted multisig descriptors:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_common::{multisig_desc, Multisig, DescriptorBlindingKey};

// Collect keyorigin xpubs from all participants
let keyorigin_xpubs = vec![
    "[deadbeef]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
    "[cafebabe]tpubD6NzVbkrYhZ4YB4X8mC6ZfFg7p8pYKKqJFp7CKuP2Y5VcnMPHPmVyRhk7gvTzDH9CiXg4uF1Vz8D3rMYFz2YB4X8mC6ZfFg7p8pYKKqJFp7C",
    "[facefeed]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
];

// Parse xpubs and create descriptor
let parsed_xpubs: Vec<_> = keyorigin_xpubs
    .iter()
    .map(|s| keyorigin_xpub_from_str(s))
    .collect::<Result<Vec<_>, _>>()?;

let descriptor = multisig_desc(
    2, // 2-of-3 threshold
    parsed_xpubs,
    Multisig::Wsh, // Native segwit
    DescriptorBlindingKey::Slip77Rand, // Random SLIP-77 key
)?;

println!("Multisig descriptor: {}", descriptor);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import multisig_desc, Multisig, DescriptorBlindingKey, keyorigin_xpub_from_str

# Collect keyorigin xpubs from all participants
keyorigin_xpubs = [
    "[deadbeef]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
    "[cafebabe]tpubD6NzVbkrYhZ4YB4X8mC6ZfFg7p8pYKKqJFp7CKuP2Y5VcnMPHPmVyRhk7gvTzDH9CiXg4uF1Vz8D3rMYFz2YB4X8mC6ZfFg7p8pYKKqJFp7C",
    "[facefeed]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
]

# Parse xpubs and create descriptor
parsed_xpubs = [keyorigin_xpub_from_str(s) for s in keyorigin_xpubs]

descriptor = multisig_desc(
    2,  # 2-of-3 threshold
    parsed_xpubs,
    Multisig.WSH,  # Native segwit
    DescriptorBlindingKey.SLIP77_RAND,  # Random SLIP-77 key
)

print(f"Multisig descriptor: {descriptor}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Collect keyorigin xpubs from all participants
val keyoriginXpubs = listOf(
    "[deadbeef]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
    "[cafebabe]tpubD6NzVbkrYhZ4YB4X8mC6ZfFg7p8pYKKqJFp7CKuP2Y5VcnMPHPmVyRhk7gvTzDH9CiXg4uF1Vz8D3rMYFz2YB4X8mC6ZfFg7p8pYKKqJFp7C",
    "[facefeed]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk"
)

// Parse xpubs and create descriptor
val parsedXpubs = keyoriginXpubs.map { keyoriginXpubFromStr(it) }

val descriptor = multisigDesc(
    2, // 2-of-3 threshold
    parsedXpubs,
    Multisig.WSH, // Native segwit
    DescriptorBlindingKey.SLIP77_RAND, // Random SLIP-77 key
)

println("Multisig descriptor: $descriptor")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Collect keyorigin xpubs from all participants
let keyoriginXpubs = [
    "[deadbeef]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
    "[cafebabe]tpubD6NzVbkrYhZ4YB4X8mC6ZfFg7p8pYKKqJFp7CKuP2Y5VcnMPHPmVyRhk7gvTzDH9CiXg4uF1Vz8D3rMYFz2YB4X8mC6ZfFg7p8pYKKqJFp7C",
    "[facefeed]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk"
]

// Parse xpubs and create descriptor
let parsedXpubs = try keyoriginXpubs.map { try keyoriginXpubFromStr($0) }

let descriptor = try multisigDesc(
    threshold: 2, // 2-of-3 threshold
    xpubs: parsedXpubs,
    scriptVariant: .wsh, // Native segwit
    blindingVariant: .slip77Rand // Random SLIP-77 key
)

print("Multisig descriptor: \(descriptor)")
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
import { multisigDesc, Multisig, DescriptorBlindingKey, keyoriginXpubFromStr } from 'lwk-wasm';

// Collect keyorigin xpubs from all participants
const keyoriginXpubs = [
    "[deadbeef]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk",
    "[cafebabe]tpubD6NzVbkrYhZ4YB4X8mC6ZfFg7p8pYKKqJFp7CKuP2Y5VcnMPHPmVyRhk7gvTzDH9CiXg4uF1Vz8D3rMYFz2YB4X8mC6ZfFg7p8pYKKqJFp7C",
    "[facefeed]tpubD6NzVbkrYhZ4XgiXtGrdW5XDAPFCL9h7we1vwNCpn8tGbBcgfVYjXyhWo4E1xkh56hjod1RhGjxbaTLV3X4FyWuejifB9justdXBYApDkzk"
];

// Parse xpubs and create descriptor
const parsedXpubs = keyoriginXpubs.map(s => keyoriginXpubFromStr(s));

const descriptor = multisigDesc(
    2, // 2-of-3 threshold
    parsedXpubs,
    Multisig.WSH, // Native segwit
    DescriptorBlindingKey.SLIP77_RAND, // Random SLIP-77 key
);

console.log(`Multisig descriptor: ${descriptor}`);
```

</TabItem>
</Tabs>

## Best Practices

1. **Secure XPub Collection**: Use encrypted channels to share XPubs between participants
2. **Independent Verification**: Each participant should verify the final descriptor
3. **Test First**: Always test the descriptor with small amounts before production use
4. **Backup Strategy**: All participants should securely backup the final descriptor
5. **Coordinate Carefully**: Ensure all participants understand the threshold and setup

The resulting descriptor can be used to create multisig wallets that all participants can monitor and sign transactions for when the threshold requirement is met.