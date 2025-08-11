---
id: coin-selection
title: Coin Selection
sidebar_label: Coin Selection
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual and Automatic Coin Selection

Coin selection is the process of choosing which UTXOs (Unspent Transaction Outputs) to use as inputs for a transaction. In Liquid's multi-asset environment, effective coin selection is crucial for optimizing fees, privacy, and transaction efficiency.

## Understanding UTXOs in Liquid

Liquid UTXOs have unique characteristics compared to Bitcoin:

- **Asset Type**: Each UTXO contains a specific asset (L-BTC, USDT, etc.)
- **Confidential Amounts**: Values are blinded for privacy
- **Blinding Keys**: Required for spending confidential outputs
- **Asset Proofs**: Cryptographic proofs of asset validity

## Automatic Coin Selection

LWK provides intelligent automatic coin selection that optimizes for multiple criteria:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{TxBuilder, AddressAmount};

// Automatic coin selection (recommended)
let recipient = AddressAmount {
    address: Address::from_str("lq1qq...")?,
    amount: 100_000, // 0.001 L-BTC
    asset: AssetId::LIQUID_BTC,
};

let pset = TxBuilder::new(bitcoin::Network::Regtest)
    .add_addressee(&recipient)
    .fee_rate(Some(100))
    .finish(&wollet)?; // LWK selects optimal UTXOs automatically
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import TxBuilder, AddressAmount, AssetId

# Automatic coin selection (recommended)
recipient = AddressAmount(
    address="lq1qq...",
    amount=100_000,  # 0.001 L-BTC
    asset=AssetId.LBTC()
)

pset = TxBuilder(Network.REGTEST) \
    .add_addressee(recipient) \
    .fee_rate(100) \
    .finish(wollet)  # LWK selects optimal UTXOs automatically
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Automatic coin selection (recommended)
val recipient = AddressAmount(
    address = "lq1qq...",
    amount = 100_000UL,  // 0.001 L-BTC
    asset = AssetId.lbtc()
)

val pset = TxBuilder(Network.REGTEST)
    .addAddressee(recipient)
    .feeRate(100UL)
    .finish(wollet)  // LWK selects optimal UTXOs automatically
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Automatic coin selection (recommended)
let recipient = AddressAmount(
    address: "lq1qq...",
    amount: 100_000,  // 0.001 L-BTC
    asset: AssetId.lbtc()
)

let pset = try TxBuilder(network: .regtest)
    .addAddressee(recipient)
    .feeRate(100)
    .finish(wollet)  // LWK selects optimal UTXOs automatically
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
import { TxBuilder, AddressAmount, AssetId, Network } from 'lwk-wasm';

// Automatic coin selection (recommended)
const recipient = new AddressAmount(
    "lq1qq...",
    100_000,  // 0.001 L-BTC
    AssetId.lbtc()
);

const pset = new TxBuilder(Network.REGTEST)
    .addAddressee(recipient)
    .feeRate(100)
    .finish(wollet);  // LWK selects optimal UTXOs automatically
```

</TabItem>
</Tabs>

## Manual Coin Selection

For advanced use cases, you can manually specify which UTXOs to use:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use elements::OutPoint;

// Get available UTXOs
let utxos = wollet.utxos()?;
for utxo in &utxos {
    println!("UTXO: {}, Asset: {}, Amount: {}", 
             utxo.outpoint, utxo.asset, utxo.value);
}

// Select specific UTXOs
let outpoint1 = OutPoint::from_str("abcd1234...:0")?;
let outpoint2 = OutPoint::from_str("efgh5678...:1")?;

let pset = TxBuilder::new(bitcoin::Network::Regtest)
    .add_addressee(&recipient)
    .add_utxo(outpoint1)
    .add_utxo(outpoint2)
    .fee_rate(Some(100))
    .finish(&wollet)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import OutPoint

# Get available UTXOs
utxos = wollet.utxos()
for utxo in utxos:
    print(f"UTXO: {utxo.outpoint}, Asset: {utxo.asset}, Amount: {utxo.value}")

# Select specific UTXOs
outpoint1 = OutPoint("abcd1234...:0")
outpoint2 = OutPoint("efgh5678...:1")

pset = TxBuilder(Network.REGTEST) \
    .add_addressee(recipient) \
    .add_utxo(outpoint1) \
    .add_utxo(outpoint2) \
    .fee_rate(100) \
    .finish(wollet)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.OutPoint

// Get available UTXOs
val utxos = wollet.utxos()
utxos.forEach { utxo ->
    println("UTXO: ${utxo.outpoint}, Asset: ${utxo.asset}, Amount: ${utxo.value}")
}

// Select specific UTXOs
val outpoint1 = OutPoint("abcd1234...:0")
val outpoint2 = OutPoint("efgh5678...:1")

val pset = TxBuilder(Network.REGTEST)
    .addAddressee(recipient)
    .addUtxo(outpoint1)
    .addUtxo(outpoint2)
    .feeRate(100UL)
    .finish(wollet)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Get available UTXOs
let utxos = try wollet.utxos()
for utxo in utxos {
    print("UTXO: \(utxo.outpoint), Asset: \(utxo.asset), Amount: \(utxo.value)")
}

// Select specific UTXOs
let outpoint1 = try OutPoint("abcd1234...:0")
let outpoint2 = try OutPoint("efgh5678...:1")

let pset = try TxBuilder(network: .regtest)
    .addAddressee(recipient)
    .addUtxo(outpoint1)
    .addUtxo(outpoint2)
    .feeRate(100)
    .finish(wollet)
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
import { OutPoint, TxBuilder, Network } from 'lwk-wasm';

// Get available UTXOs
const utxos = wollet.utxos();
for (const utxo of utxos) {
    console.log(`UTXO: ${utxo.outpoint}, Asset: ${utxo.asset}, Amount: ${utxo.value}`);
}

// Select specific UTXOs
const outpoint1 = new OutPoint("abcd1234...:0");
const outpoint2 = new OutPoint("efgh5678...:1");

const pset = new TxBuilder(Network.REGTEST)
    .addAddressee(recipient)
    .addUtxo(outpoint1)
    .addUtxo(outpoint2)
    .feeRate(100)
    .finish(wollet);
```

</TabItem>
</Tabs>

## Selection Strategies

### Minimize Fee Strategy

Select fewer, larger UTXOs to reduce transaction size:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Sort UTXOs by value (descending) and select largest
let mut utxos = wollet.utxos()?;
utxos.sort_by(|a, b| b.value.cmp(&a.value));

// Select the largest UTXO that covers the amount
let required_amount = 100_000;
let selected_utxo = utxos
    .into_iter()
    .find(|utxo| utxo.value >= required_amount && utxo.asset == AssetId::LIQUID_BTC)
    .expect("Insufficient funds");

let pset = TxBuilder::new(bitcoin::Network::Regtest)
    .add_addressee(&recipient)
    .add_utxo(selected_utxo.outpoint)
    .finish(&wollet)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sort UTXOs by value (descending) and select largest
utxos = wollet.utxos()
utxos.sort(key=lambda x: x.value, reverse=True)

# Select the largest UTXO that covers the amount
required_amount = 100_000
selected_utxo = next(
    utxo for utxo in utxos 
    if utxo.value >= required_amount and utxo.asset == AssetId.LBTC()
)

pset = TxBuilder(Network.REGTEST) \
    .add_addressee(recipient) \
    .add_utxo(selected_utxo.outpoint) \
    .finish(wollet)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sort UTXOs by value (descending) and select largest
val utxos = wollet.utxos().sortedByDescending { it.value }

// Select the largest UTXO that covers the amount
val requiredAmount = 100_000UL
val selectedUtxo = utxos.first { 
    it.value >= requiredAmount && it.asset == AssetId.lbtc() 
}

val pset = TxBuilder(Network.REGTEST)
    .addAddressee(recipient)
    .addUtxo(selectedUtxo.outpoint)
    .finish(wollet)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sort UTXOs by value (descending) and select largest
let utxos = try wollet.utxos().sorted { $0.value > $1.value }

// Select the largest UTXO that covers the amount
let requiredAmount: UInt64 = 100_000
let selectedUtxo = utxos.first { 
    $0.value >= requiredAmount && $0.asset == AssetId.lbtc() 
}!

let pset = try TxBuilder(network: .regtest)
    .addAddressee(recipient)
    .addUtxo(selectedUtxo.outpoint)
    .finish(wollet)
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

```javascript
import { TxBuilder, AssetId, Network } from 'lwk-wasm';

// Sort UTXOs by value (descending) and select largest
const utxos = wollet.utxos().sort((a, b) => b.value - a.value);

// Select the largest UTXO that covers the amount
const requiredAmount = 100_000;
const selectedUtxo = utxos.find(utxo => 
    utxo.value >= requiredAmount && utxo.asset.equals(AssetId.lbtc())
);

if (!selectedUtxo) {
    throw new Error("Insufficient funds");
}

const pset = new TxBuilder(Network.REGTEST)
    .addAddressee(recipient)
    .addUtxo(selectedUtxo.outpoint)
    .finish(wollet);
```

</TabItem>
</Tabs>

## Best Practices

1. **Use Automatic Selection**: Let LWK optimize for you in most cases
2. **Asset Matching**: Ensure UTXOs match the required asset types
3. **Fee Efficiency**: Prefer fewer, larger UTXOs to minimize fees
4. **Privacy**: Consider mixing strategies for better transaction privacy
5. **Dust Prevention**: Avoid creating outputs too small to spend
6. **UTXO Consolidation**: Periodically consolidate small UTXOs during low-fee periods 