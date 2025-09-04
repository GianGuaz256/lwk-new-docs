---
id: balance-tracking
title: Balance Tracking
sidebar_label: Balance Tracking
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Balance and UTXO Management

Wollet tracks balances across L-BTC and all Liquid assets with automatic confidential transaction unblinding and asset registry integration.

## Balance Queries

### Get All Balances

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let balances = wollet.balance()?;
for (asset_id, amount) in balances {
    println!("Asset {}: {} satoshis", asset_id, amount);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
balances = wollet.balance()
for asset_id, amount in balances.items():
    print(f"Asset {asset_id}: {amount} satoshis")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val balances = wollet.balance()
for ((assetId, amount) in balances) {
    println("Asset $assetId: $amount satoshis")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let balances = try wollet.balance()
for (assetId, amount) in balances {
    print("Asset \(assetId): \(amount) satoshis")
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
const balances = wollet.balance();
for (const [assetId, amount] of Object.entries(balances)) {
    console.log(`Asset ${assetId}: ${amount} satoshis`);
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var balances = wollet.Balance();
foreach (var kvp in balances) {
    Console.WriteLine($"Asset {kvp.Key}: {kvp.Value} satoshis");
}
```

</TabItem>
</Tabs>

### L-BTC Balance

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let lbtc_balance = wollet.balance()?.get(&ElementsNetwork::liquid_asset_id())?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
lbtc_balance = wollet.balance().get(Network.liquid_asset_id())
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val lbtcBalance = wollet.balance()[Network.liquidAssetId()]
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let lbtcBalance = try wollet.balance()[Network.liquidAssetId()]
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
const lbtcBalance = wollet.balance()[Network.liquidAssetId()];
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var lbtcBalance = wollet.Balance()[Network.LiquidAssetId()];
```

</TabItem>
</Tabs>

## Asset Types

### L-BTC (Liquid Bitcoin)
- Primary network asset
- Used for transaction fees
- Asset ID: `6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`

### Issued Assets
- Custom tokens on Liquid
- Unique asset IDs from issuance transactions
- Support for reissuance and burning

## UTXO Management

### Available UTXOs

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let utxos = wollet.utxos()?;
for utxo in utxos {
    println!("UTXO: {}:{} - {} sats of {}", 
             utxo.outpoint.txid, 
             utxo.outpoint.vout,
             utxo.unblinded.value,
             utxo.unblinded.asset);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
utxos = wollet.utxos()
for utxo in utxos:
    print(f"UTXO: {utxo.outpoint.txid}:{utxo.outpoint.vout} - {utxo.unblinded.value} sats of {utxo.unblinded.asset}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val utxos = wollet.utxos()
for (utxo in utxos) {
    println("UTXO: ${utxo.outpoint.txid}:${utxo.outpoint.vout} - ${utxo.unblinded.value} sats of ${utxo.unblinded.asset}")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let utxos = try wollet.utxos()
for utxo in utxos {
    print("UTXO: \(utxo.outpoint.txid):\(utxo.outpoint.vout) - \(utxo.unblinded.value) sats of \(utxo.unblinded.asset)")
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
const utxos = wollet.utxos();
for (const utxo of utxos) {
    console.log(`UTXO: ${utxo.outpoint.txid}:${utxo.outpoint.vout} - ${utxo.unblinded.value} sats of ${utxo.unblinded.asset}`);
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var utxos = wollet.Utxos();
foreach (var utxo in utxos) {
    Console.WriteLine($"UTXO: {utxo.Outpoint.Txid}:{utxo.Outpoint.Vout} - {utxo.Unblinded.Value} sats of {utxo.Unblinded.Asset}");
}
```

</TabItem>
</Tabs>

### Coin Selection

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// TxBuilder automatically selects appropriate UTXOs
let mut tx_builder = TxBuilder::new();
tx_builder.add_recipient(&recipient_addr, amount)?;
let pset = tx_builder.finish(&wollet)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# TxBuilder automatically selects appropriate UTXOs
tx_builder = TxBuilder()
tx_builder.add_recipient(recipient_addr, amount)
pset = tx_builder.finish(wollet)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// TxBuilder automatically selects appropriate UTXOs
val txBuilder = TxBuilder()
txBuilder.addRecipient(recipientAddr, amount)
val pset = txBuilder.finish(wollet)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// TxBuilder automatically selects appropriate UTXOs
let txBuilder = TxBuilder()
try txBuilder.addRecipient(address: recipientAddr, amount: amount)
let pset = try txBuilder.finish(wollet: wollet)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// TxBuilder automatically selects appropriate UTXOs
const txBuilder = new TxBuilder();
txBuilder.addRecipient(recipientAddr, amount);
const pset = txBuilder.finish(wollet);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// TxBuilder automatically selects appropriate UTXOs
var txBuilder = new TxBuilder();
txBuilder.AddRecipient(recipientAddr, amount);
var pset = txBuilder.Finish(wollet);
```

</TabItem>
</Tabs>
