---
id: transaction-signing
title: Transaction Signing
sidebar_label: Sign Transaction
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Multisig Transaction Signing

Signing a multisig transaction requires 2 steps:

## Step 1: Create Transaction

One person creates a transaction PSET (Partially Signed Elements Transaction).
Share this PSET with the required signers.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// One person creates the transaction
let pset = wollet.tx_builder()
    .add_addressee(&Addressee {
        address: "el1qq2...ab4".parse()?,
        amount: 100_000, // satoshis
        asset: None, // L-BTC
    })
    .fee_rate(Some(1000))
    .finish()?;

// Share this PSET with signers
```

</TabItem>
<TabItem value="python" label="Python">

```python
# One person creates the transaction
pset = wollet.tx_builder() \
    .add_addressee(Addressee(
        address="el1qq2...ab4",
        amount=100_000,  # satoshis
        asset=None  # L-BTC
    )) \
    .fee_rate(1000) \
    .finish()

# Share this PSET with signers
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// One person creates the transaction
val pset = wollet.txBuilder()
    .addAddressee(Addressee(
        address = "el1qq2...ab4",
        amount = 100_000UL, // satoshis
        asset = null // L-BTC
    ))
    .feeRate(1000UL)
    .finish()

// Share this PSET with signers
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// One person creates the transaction
let pset = try wollet.txBuilder()
    .addAddressee(Addressee(
        address: "el1qq2...ab4",
        amount: 100_000, // satoshis
        asset: nil // L-BTC
    ))
    .feeRate(1000)
    .finish()

// Share this PSET with signers
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
// One person creates the transaction
const pset = wollet.txBuilder()
    .addAddressee(new Addressee(
        "el1qq2...ab4",
        100_000, // satoshis
        null // L-BTC
    ))
    .feeRate(1000)
    .finish();

// Share this PSET with signers
```

</TabItem>
</Tabs>

## Step 2: Sign and Combine

Each required signer signs their copy of the PSET, then combine all signatures.
Once you have enough signatures (2 out of 3), finalize and broadcast.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Signer 1 signs
let signer1 = SwSigner::new(mnemonic1, true)?;
let mut pset1 = pset.clone();
signer1.sign(&mut pset1)?;

// Signer 2 signs 
let signer2 = SwSigner::new(mnemonic2, true)?;
let mut pset2 = pset.clone();
signer2.sign(&mut pset2)?;

// Combine signatures
let combined = wollet.combine(&[pset1, pset2])?;

// Finalize transaction
let tx = wollet.finalize(&mut combined)?;

// Broadcast
// electrum_client.broadcast(&tx)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Signer 1 signs
signer1 = SwSigner(mnemonic1, True)
pset1 = pset.copy()
signer1.sign(pset1)

# Signer 2 signs
signer2 = SwSigner(mnemonic2, True)
pset2 = pset.copy()
signer2.sign(pset2)

# Combine signatures
combined = wollet.combine([pset1, pset2])

# Finalize transaction
tx = wollet.finalize(combined)

# Broadcast
# electrum_client.broadcast(tx)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Signer 1 signs
val signer1 = SwSigner(mnemonic1, true)
val pset1 = pset.copy()
signer1.sign(pset1)

// Signer 2 signs
val signer2 = SwSigner(mnemonic2, true)
val pset2 = pset.copy()
signer2.sign(pset2)

// Combine signatures
val combined = wollet.combine(listOf(pset1, pset2))

// Finalize transaction
val tx = wollet.finalize(combined)

// Broadcast
// electrumClient.broadcast(tx)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Signer 1 signs
let signer1 = try SwSigner(mnemonic: mnemonic1, isMainnet: true)
let pset1 = pset.copy()
try signer1.sign(pset1)

// Signer 2 signs
let signer2 = try SwSigner(mnemonic: mnemonic2, isMainnet: true)
let pset2 = pset.copy()
try signer2.sign(pset2)

// Combine signatures
let combined = try wollet.combine([pset1, pset2])

// Finalize transaction
let tx = try wollet.finalize(combined)

// Broadcast
// try electrumClient.broadcast(tx)
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
// Signer 1 signs
const signer1 = new SwSigner(mnemonic1, true);
const pset1 = pset.copy();
signer1.sign(pset1);

// Signer 2 signs
const signer2 = new SwSigner(mnemonic2, true);
const pset2 = pset.copy();
signer2.sign(pset2);

// Combine signatures
const combined = wollet.combine([pset1, pset2]);

// Finalize transaction
const tx = wollet.finalize(combined);

// Broadcast
// electrumClient.broadcast(tx);
```

</TabItem>
</Tabs>

**Done!** The multisig transaction is signed and ready to broadcast.