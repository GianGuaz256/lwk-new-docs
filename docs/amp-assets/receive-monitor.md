---
id: receive-monitor
title: Receive & Monitor AMP Assets
sidebar_label: Receive & Monitor
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Receiving & Monitoring AMP Assets

This guide covers how to receive AMP0 assets and monitor account balances using LWK. The process involves address generation, wallet synchronization, and balance tracking with special considerations for AMP0's unique requirements.

## Receiving AMP Assets

### Address Generation

For AMP0 wallets, address generation must be done through the `Amp0` context, not directly from the wallet descriptor. This is crucial because the AMP0 server only monitors addresses that it has explicitly generated.

:::danger Critical Warning
**Never use `Wollet::address()` or `WolletDescriptor::address()` for AMP0 wallets!**

Using these methods can lead to **permanent fund loss** because:
- AMP0 uses a 2-of-2 multisig setup
- The server only monitors addresses it has generated
- Funds sent to unmonitored addresses cannot be spent (server won't cosign)
:::

#### Getting New Addresses

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::amp0::blocking::Amp0;
use lwk_common::Network;

// Create AMP0 context
let mut amp0 = Amp0::new(
    Network::TestnetLiquid,
    "username",
    "password",
    "amp_id"
)?;

// Get a NEW address (server generates and tracks it)
let address_result = amp0.address(None)?;
println!("New address: {}", address_result.address());
println!("Address index: {}", address_result.index());

// The server now monitors this address for incoming transactions
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Amp0, Network

# Create AMP0 context
amp0 = Amp0(Network.testnet(), "username", "password", "amp_id")

# Get a NEW address (server generates and tracks it)
address_result = amp0.address(None)
print(f"New address: {address_result.address()}")
print(f"Address index: {address_result.index()}")

# The server now monitors this address for incoming transactions
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create AMP0 context
val amp0 = Amp0(Network.testnet(), "username", "password", "ampId")

// Get a NEW address (server generates and tracks it)
val addressResult = amp0.address(null)
println("New address: ${addressResult.address()}")
println("Address index: ${addressResult.index()}")

// The server now monitors this address for incoming transactions
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create AMP0 context
let amp0 = try Amp0(network: .testnet, username: "username", password: "password", ampId: "ampId")

// Get a NEW address (server generates and tracks it)
let addressResult = try amp0.address(index: nil)
print("New address: \(addressResult.address())")
print("Address index: \(addressResult.index())")

// The server now monitors this address for incoming transactions
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { Amp0, Network } from 'lwk-wasm';

// Create AMP0 context
const amp0 = await Amp0.newTestnet("username", "password", "ampId");

// Get a NEW address (server generates and tracks it)
const addressResult = await amp0.address(null);
console.log(`New address: ${addressResult.address()}`);
console.log(`Address index: ${addressResult.index()}`);

// The server now monitors this address for incoming transactions
```

</TabItem>
</Tabs>

#### Retrieving Existing Addresses

You can also retrieve previously generated addresses by their index:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get a previously generated address by index
// Index must be between 1 and last_index (inclusive)
let existing_address = amp0.address(Some(1))?;
println!("Address at index 1: {}", existing_address.address());

// Get the highest address index that has been generated
let last_index = amp0.last_index();
println!("Last generated address index: {}", last_index);

// You can access any address from index 1 to last_index
for i in 1..=last_index.min(5) {  // Show first 5 addresses
    let addr = amp0.address(Some(i))?;
    println!("Address {}: {}", i, addr.address());
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get a previously generated address by index
# Index must be between 1 and last_index (inclusive)
existing_address = amp0.address(1)
print(f"Address at index 1: {existing_address.address()}")

# Get the highest address index that has been generated
last_index = amp0.last_index()
print(f"Last generated address index: {last_index}")

# You can access any address from index 1 to last_index
for i in range(1, min(last_index + 1, 6)):  # Show first 5 addresses
    addr = amp0.address(i)
    print(f"Address {i}: {addr.address()}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get a previously generated address by index
// Index must be between 1 and lastIndex (inclusive)
val existingAddress = amp0.address(1u)
println("Address at index 1: ${existingAddress.address()}")

// Get the highest address index that has been generated
val lastIndex = amp0.lastIndex()
println("Last generated address index: $lastIndex")

// You can access any address from index 1 to lastIndex
for (i in 1u..minOf(lastIndex, 5u)) {  // Show first 5 addresses
    val addr = amp0.address(i)
    println("Address $i: ${addr.address()}")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get a previously generated address by index
// Index must be between 1 and lastIndex (inclusive)
let existingAddress = try amp0.address(index: 1)
print("Address at index 1: \(existingAddress.address())")

// Get the highest address index that has been generated
let lastIndex = try amp0.lastIndex()
print("Last generated address index: \(lastIndex)")

// You can access any address from index 1 to lastIndex
for i in 1...min(lastIndex, 5) {  // Show first 5 addresses
    let addr = try amp0.address(index: i)
    print("Address \(i): \(addr.address())")
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Get a previously generated address by index
// Index must be between 1 and lastIndex (inclusive)
const existingAddress = await amp0.address(1);
console.log(`Address at index 1: ${existingAddress.address()}`);

// Get the highest address index that has been generated
const lastIndex = amp0.lastIndex();
console.log(`Last generated address index: ${lastIndex}`);

// You can access any address from index 1 to lastIndex
for (let i = 1; i <= Math.min(lastIndex, 5); i++) {  // Show first 5 addresses
    const addr = await amp0.address(i);
    console.log(`Address ${i}: ${addr.address()}`);
}
```

</TabItem>
</Tabs>

### Address Index Rules

- **Index 0**: Never used in AMP0
- **Index 1+**: Valid address indices that can be generated
- **Sequential Generation**: Addresses are typically generated sequentially
- **Server Tracking**: Only server-generated addresses are monitored for transactions

## Monitoring AMP Assets

### Wallet Creation and Sync

To monitor an AMP0 account, create a watch-only wallet using the AMP0 descriptor and sync it with the blockchain:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{Wollet, ElementsNetwork};
use lwk_wollet::amp0::blocking::Amp0;

// Create AMP0 context
let amp0 = Amp0::new(
    Network::TestnetLiquid,
    "username", 
    "password", 
    "amp_id"
)?;

// Get the wallet descriptor from AMP0 context
let descriptor = amp0.wollet_descriptor();

// Create watch-only wallet
let mut wollet = Wollet::without_persist(ElementsNetwork::LiquidTestnet, descriptor)?;

// Create blockchain client
let mut client = EsploraClient::new_waterfalls(
    "https://waterfalls.liquidwebwallet.org/liquidtestnet/api",
    None
)?;

// CRITICAL: Use full_scan_to_index for AMP0 wallets
let last_index = amp0.last_index();
let update = client.full_scan_to_index(&wollet, last_index)?;

if let Some(update) = update {
    wollet.apply_update(update)?;
    println!("Wallet synced successfully");
} else {
    println!("No new transactions found");
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Amp0, Wollet, EsploraClient, Network

# Create AMP0 context
amp0 = Amp0(Network.testnet(), "username", "password", "amp_id")

# Get the wallet descriptor from AMP0 context
descriptor = amp0.wollet_descriptor()

# Create watch-only wallet
wollet = Wollet(Network.testnet(), descriptor, None)

# Create blockchain client
client = EsploraClient.new_waterfalls(
    "https://waterfalls.liquidwebwallet.org/liquidtestnet/api",
    Network.testnet()
)

# CRITICAL: Use full_scan_to_index for AMP0 wallets
last_index = amp0.last_index()
update = client.full_scan_to_index(wollet, last_index)

if update:
    wollet.apply_update(update)
    print("Wallet synced successfully")
else:
    print("No new transactions found")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create AMP0 context
val amp0 = Amp0(Network.testnet(), "username", "password", "ampId")

// Get the wallet descriptor from AMP0 context
val descriptor = amp0.wolletDescriptor()

// Create watch-only wallet
val wollet = Wollet(Network.testnet(), descriptor, null)

// Create blockchain client
val client = EsploraClient.newWaterfalls(
    "https://waterfalls.liquidwebwallet.org/liquidtestnet/api",
    Network.testnet()
)

// CRITICAL: Use fullScanToIndex for AMP0 wallets
val lastIndex = amp0.lastIndex()
val update = client.fullScanToIndex(wollet, lastIndex)

update?.let {
    wollet.applyUpdate(it)
    println("Wallet synced successfully")
} ?: println("No new transactions found")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create AMP0 context
let amp0 = try Amp0(network: .testnet, username: "username", password: "password", ampId: "ampId")

// Get the wallet descriptor from AMP0 context
let descriptor = try amp0.wolletDescriptor()

// Create watch-only wallet
let wollet = try Wollet(network: .testnet, descriptor: descriptor, persister: nil)

// Create blockchain client
let client = try EsploraClient.newWaterfalls(
    url: "https://waterfalls.liquidwebwallet.org/liquidtestnet/api",
    network: .testnet
)

// CRITICAL: Use fullScanToIndex for AMP0 wallets
let lastIndex = try amp0.lastIndex()
let update = try client.fullScanToIndex(wollet: wollet, lastIndex: lastIndex)

if let update = update {
    try wollet.applyUpdate(update: update)
    print("Wallet synced successfully")
} else {
    print("No new transactions found")
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { Amp0, EsploraClient, Network } from 'lwk-wasm';

// Create AMP0 context
const amp0 = await Amp0.newTestnet("username", "password", "ampId");

// Get wallet from AMP0 context (automatically has descriptor)
const wollet = amp0.wollet();

// Create blockchain client
const client = EsploraClient.newWaterfalls(
    "https://waterfalls.liquidwebwallet.org/liquidtestnet/api",
    Network.testnet()
);

// CRITICAL: Use fullScanToIndex for AMP0 wallets
const lastIndex = amp0.lastIndex();
const update = await client.fullScanToIndex(wollet, lastIndex);

if (update) {
    wollet.applyUpdate(update);
    console.log("Wallet synced successfully");
} else {
    console.log("No new transactions found");
}
```

</TabItem>
</Tabs>

### Why Use `full_scan_to_index`?

:::warning Critical Sync Requirement
**Always use `full_scan_to_index()` for AMP0 wallets, never `full_scan()`!**

AMP0 accounts don't follow the standard gap limit concept and can have many unused addresses in sequence. Using `full_scan()` may stop scanning too early and miss transactions, leading to incorrect balances.
:::

### Balance Monitoring

Once synced, you can monitor asset balances:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use std::collections::HashMap;
use elements::AssetId;

// Get all balances
let balance: HashMap<AssetId, u64> = wollet.balance()?;

// Get L-BTC balance
let lbtc_asset = wollet.policy_asset();
let lbtc_balance = balance.get(&lbtc_asset).unwrap_or(&0);
println!("L-BTC balance: {} satoshis", lbtc_balance);

// Display all asset balances
for (asset_id, amount) in &balance {
    if *amount > 0 {
        if *asset_id == lbtc_asset {
            println!("L-BTC: {} satoshis", amount);
        } else {
            println!("Asset {}: {} units", asset_id, amount);
        }
    }
}

// Get transaction count
let transactions = wollet.transactions()?;
println!("Transaction count: {}", transactions.len());

// Get UTXO count
let utxos = wollet.utxos()?;
println!("UTXO count: {}", utxos.len());
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get all balances
balance = wollet.balance()

# Get L-BTC balance
lbtc_asset = wollet.policy_asset()
lbtc_balance = balance.get(lbtc_asset, 0)
print(f"L-BTC balance: {lbtc_balance} satoshis")

# Display all asset balances
for asset_id, amount in balance.items():
    if amount > 0:
        if asset_id == lbtc_asset:
            print(f"L-BTC: {amount} satoshis")
        else:
            print(f"Asset {asset_id}: {amount} units")

# Get transaction count
transactions = wollet.transactions()
print(f"Transaction count: {len(transactions)}")

# Get UTXO count
utxos = wollet.utxos()
print(f"UTXO count: {len(utxos)}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get all balances
val balance = wollet.balance()

// Get L-BTC balance
val lbtcAsset = wollet.policyAsset()
val lbtcBalance = balance[lbtcAsset] ?: 0uL
println("L-BTC balance: $lbtcBalance satoshis")

// Display all asset balances
balance.forEach { (assetId, amount) ->
    if (amount > 0uL) {
        if (assetId == lbtcAsset) {
            println("L-BTC: $amount satoshis")
        } else {
            println("Asset $assetId: $amount units")
        }
    }
}

// Get transaction count
val transactions = wollet.transactions()
println("Transaction count: ${transactions.size}")

// Get UTXO count
val utxos = wollet.utxos()
println("UTXO count: ${utxos.size}")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get all balances
let balance = try wollet.balance()

// Get L-BTC balance
let lbtcAsset = try wollet.policyAsset()
let lbtcBalance = balance[lbtcAsset] ?? 0
print("L-BTC balance: \(lbtcBalance) satoshis")

// Display all asset balances
for (assetId, amount) in balance {
    if amount > 0 {
        if assetId == lbtcAsset {
            print("L-BTC: \(amount) satoshis")
        } else {
            print("Asset \(assetId): \(amount) units")
        }
    }
}

// Get transaction count
let transactions = try wollet.transactions()
print("Transaction count: \(transactions.count)")

// Get UTXO count
let utxos = try wollet.utxos()
print("UTXO count: \(utxos.count)")
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Get all balances
const balance = wollet.balance();

// Get L-BTC balance
const lbtcAsset = wollet.policyAsset();
const lbtcBalance = balance.get(lbtcAsset) || 0;
console.log(`L-BTC balance: ${lbtcBalance} satoshis`);

// Display all asset balances
balance.forEach((amount, assetId) => {
    if (amount > 0) {
        if (assetId.toString() === lbtcAsset.toString()) {
            console.log(`L-BTC: ${amount} satoshis`);
        } else {
            console.log(`Asset ${assetId}: ${amount} units`);
        }
    }
});

// Get transaction count
const transactions = wollet.transactions();
console.log(`Transaction count: ${transactions.length}`);

// Get UTXO count
const utxos = wollet.utxos();
console.log(`UTXO count: ${utxos.length}`);
```

</TabItem>
</Tabs>

### Transaction History

Retrieve and examine transaction history:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get all transactions
let transactions = wollet.transactions()?;

for tx in transactions {
    println!("Transaction ID: {}", tx.txid);
    println!("Block height: {:?}", tx.height);
    println!("Timestamp: {:?}", tx.timestamp);
    
    // Check transaction amounts by asset
    for (asset_id, amount) in &tx.balance {
        if *amount != 0 {
            let direction = if *amount > 0 { "received" } else { "sent" };
            println!("  {} {}: {} units", direction, asset_id, amount.abs());
        }
    }
    println!("---");
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get all transactions
transactions = wollet.transactions()

for tx in transactions:
    print(f"Transaction ID: {tx.txid}")
    print(f"Block height: {tx.height}")
    print(f"Timestamp: {tx.timestamp}")
    
    # Check transaction amounts by asset
    for asset_id, amount in tx.balance.items():
        if amount != 0:
            direction = "received" if amount > 0 else "sent"
            print(f"  {direction} {asset_id}: {abs(amount)} units")
    print("---")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get all transactions
val transactions = wollet.transactions()

transactions.forEach { tx ->
    println("Transaction ID: ${tx.txid}")
    println("Block height: ${tx.height}")
    println("Timestamp: ${tx.timestamp}")
    
    // Check transaction amounts by asset
    tx.balance.forEach { (assetId, amount) ->
        if (amount != 0L) {
            val direction = if (amount > 0) "received" else "sent"
            println("  $direction $assetId: ${kotlin.math.abs(amount)} units")
        }
    }
    println("---")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get all transactions
let transactions = try wollet.transactions()

for tx in transactions {
    print("Transaction ID: \(tx.txid)")
    print("Block height: \(tx.height ?? "unconfirmed")")
    print("Timestamp: \(tx.timestamp ?? "unknown")")
    
    // Check transaction amounts by asset
    for (assetId, amount) in tx.balance {
        if amount != 0 {
            let direction = amount > 0 ? "received" : "sent"
            print("  \(direction) \(assetId): \(abs(amount)) units")
        }
    }
    print("---")
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Get all transactions
const transactions = wollet.transactions();

transactions.forEach(tx => {
    console.log(`Transaction ID: ${tx.txid()}`);
    console.log(`Block height: ${tx.height() ?? "unconfirmed"}`);
    console.log(`Timestamp: ${tx.timestamp() ?? "unknown"}`);
    
    // Check transaction amounts by asset
    tx.balance().forEach((amount, assetId) => {
        if (amount !== 0) {
            const direction = amount > 0 ? "received" : "sent";
            console.log(`  ${direction} ${assetId}: ${Math.abs(amount)} units`);
        }
    });
    console.log("---");
});
```

</TabItem>
</Tabs>

## Next Steps

- [Send AMP Assets](./send.md) - Learn how to send AMP0 transactions
- [Transaction Building](../transactions/building-transactions.md) - General transaction concepts
- [Blockchain Backends](../blockchain-backends/blockchain-backends-overview.md) - Different sync options
