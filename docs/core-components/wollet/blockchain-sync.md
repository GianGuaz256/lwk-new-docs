---
id: blockchain-sync
title: Blockchain Synchronization
sidebar_label: Blockchain Sync
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Synchronizing with Blockchain Backends

Wollet synchronizes with the Liquid blockchain through Electrum or Esplora backends to maintain up-to-date transaction history and UTXO state.

## Backend Types

### Electrum

Connect to an Electrum server for real-time blockchain data. Electrum provides efficient SPV-style synchronization with lower bandwidth requirements.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{ElectrumClient, ElectrumUrl};

let url = ElectrumUrl::new("blockstream.info:465", true, true);
let client = ElectrumClient::new(&url)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import ElectrumClient, ElectrumUrl

url = ElectrumUrl("blockstream.info:465", True, True)
client = ElectrumClient(url)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val url = ElectrumUrl("blockstream.info:465", true, true)
val client = ElectrumClient(url)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let url = try ElectrumUrl(host: "blockstream.info:465", useTls: true, validateDomain: true)
let client = try ElectrumClient(url: url)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { ElectrumClient, ElectrumUrl } from 'lwk-wasm';

const url = new ElectrumUrl("blockstream.info:465", true, true);
const client = new ElectrumClient(url);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

var url = new ElectrumUrl("blockstream.info:465", true, true);
var client = new ElectrumClient(url);
```

</TabItem>
</Tabs>

### Esplora

Connect to an Esplora HTTP API server for blockchain data. Esplora offers REST-style access with comprehensive transaction and block information.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::blocking::EsploraClient;

let client = EsploraClient::new("https://blockstream.info/liquidtestnet/api")?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import EsploraClient

client = EsploraClient("https://blockstream.info/liquidtestnet/api")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.EsploraClient

val client = EsploraClient("https://blockstream.info/liquidtestnet/api")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let client = try EsploraClient(url: "https://blockstream.info/liquidtestnet/api")
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { EsploraClient, Network } from 'lwk-wasm';

const client = new EsploraClient(Network.testnet(), "https://blockstream.info/liquidtestnet/api", false, 1, false);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

var client = new EsploraClient("https://blockstream.info/liquidtestnet/api");
```

</TabItem>
</Tabs>

## Sync Strategies

### Full Scan (Initial Sync)

Perform a complete wallet scan from the beginning. Use this for initial setup or when you suspect missing transactions.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Scan entire wallet with gap limit
let update = full_scan_with_electrum_client(&client, &wollet, 20, 20)?;
wollet.apply_update(update)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Scan entire wallet with gap limit
update = client.full_scan(wollet, stop_gap=20)
wollet.apply_update(update)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Scan entire wallet with gap limit
val update = client.fullScan(wollet, stopGap = 20u)
wollet.applyUpdate(update)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Scan entire wallet with gap limit
let update = try client.fullScan(wollet: wollet, stopGap: 20)
try wollet.applyUpdate(update: update)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Scan entire wallet with gap limit
const update = await client.fullScan(wollet);
if (update) {
    wollet.applyUpdate(update);
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Scan entire wallet with gap limit
var update = client.FullScan(wollet, 20);
wollet.ApplyUpdate(update);
```

</TabItem>
</Tabs>

### Incremental Sync

Sync only new transactions since the last update. More efficient for regular wallet updates when you're already synchronized.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get new transactions since last sync
let update = client.sync(&wollet, 20)?;
wollet.apply_update(update)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get new transactions since last sync
update = client.sync(wollet, stop_gap=20)
wollet.apply_update(update)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get new transactions since last sync
val update = client.sync(wollet, stopGap = 20u)
wollet.applyUpdate(update)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get new transactions since last sync
let update = try client.sync(wollet: wollet, stopGap: 20)
try wollet.applyUpdate(update: update)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Get new transactions since last sync
const update = await client.sync(wollet);
if (update) {
    wollet.applyUpdate(update);
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Get new transactions since last sync
var update = client.Sync(wollet, 20);
wollet.ApplyUpdate(update);
```

</TabItem>
</Tabs>

## Network Configuration

### Mainnet

Production Liquid network configuration. Use for real assets and live applications.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let network = ElementsNetwork::Liquid;
let url = ElectrumUrl::new("blockstream.info:700", false, true);
```

</TabItem>
<TabItem value="python" label="Python">

```python
network = Network.LIQUID
url = ElectrumUrl("blockstream.info:700", False, True)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val network = Network.LIQUID
val url = ElectrumUrl("blockstream.info:700", false, true)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let network = Network.liquid
let url = try ElectrumUrl(host: "blockstream.info:700", useTls: false, validateDomain: true)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
const network = Network.liquid();
const url = new ElectrumUrl("blockstream.info:700", false, true);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var network = Network.Liquid;
var url = new ElectrumUrl("blockstream.info:700", false, true);
```

</TabItem>
</Tabs>

### Testnet

Test network with fake assets. Use for development and testing without real value.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let network = ElementsNetwork::LiquidTestnet;
let url = ElectrumUrl::new("blockstream.info:465", true, true);
```

</TabItem>
<TabItem value="python" label="Python">

```python
network = Network.LIQUID_TESTNET
url = ElectrumUrl("blockstream.info:465", True, True)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val network = Network.LIQUID_TESTNET
val url = ElectrumUrl("blockstream.info:465", true, true)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let network = Network.liquidTestnet
let url = try ElectrumUrl(host: "blockstream.info:465", useTls: true, validateDomain: true)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
const network = Network.testnet();
const url = new ElectrumUrl("blockstream.info:465", true, true);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var network = Network.LiquidTestnet;
var url = new ElectrumUrl("blockstream.info:465", true, true);
```

</TabItem>
</Tabs>

### Regtest

Local development network for testing. Run your own Elements node for complete control and privacy.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let network = ElementsNetwork::ElementsRegtest;
let url = ElectrumUrl::new("localhost:60401", false, false);
```

</TabItem>
<TabItem value="python" label="Python">

```python
network = Network.REGTEST
url = ElectrumUrl("localhost:60401", False, False)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val network = Network.REGTEST
val url = ElectrumUrl("localhost:60401", false, false)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let network = Network.regtest
let url = try ElectrumUrl(host: "localhost:60401", useTls: false, validateDomain: false)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
const network = Network.regtest();
const url = new ElectrumUrl("localhost:60401", false, false);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var network = Network.Regtest;
var url = new ElectrumUrl("localhost:60401", false, false);
```

</TabItem>
</Tabs>

## Performance Optimization

### Parallel Requests

Increase the number of concurrent requests to speed up synchronization. Higher values use more bandwidth but sync faster.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Increase parallel requests for faster sync
let update = client.full_scan(&wollet, stop_gap: 20, parallel_requests: 50)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Increase parallel requests for faster sync
update = client.full_scan(wollet, stop_gap=20, parallel_requests=50)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Increase parallel requests for faster sync
val update = client.fullScan(wollet, stopGap = 20u, parallelRequests = 50u)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Increase parallel requests for faster sync
let update = try client.fullScan(wollet: wollet, stopGap: 20, parallelRequests: 50)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Increase parallel requests for faster sync
const update = await client.fullScan(wollet, 20, 50);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Increase parallel requests for faster sync
var update = client.FullScan(wollet, stopGap: 20, parallelRequests: 50);
```

</TabItem>
</Tabs>

### Gap Limits

Control how many consecutive unused addresses to check before stopping the scan.

- **Small Gap (5-10)**: Faster sync, may miss transactions
- **Large Gap (20-50)**: Comprehensive but slower
- **Adaptive**: Start small, increase if needed

## Progress Tracking

Monitor synchronization progress for long-running operations. Useful for showing progress bars in user interfaces.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Monitor sync progress
let total_addresses = wollet.script_count();
let mut synced = 0;

for chunk in address_chunks {
    sync_chunk(chunk)?;
    synced += chunk.len();
    println!("Progress: {}/{}", synced, total_addresses);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Monitor sync progress
total_addresses = wollet.script_count()
synced = 0

for chunk in address_chunks:
    sync_chunk(chunk)
    synced += len(chunk)
    print(f"Progress: {synced}/{total_addresses}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Monitor sync progress
val totalAddresses = wollet.scriptCount()
var synced = 0

for (chunk in addressChunks) {
    syncChunk(chunk)
    synced += chunk.size
    println("Progress: $synced/$totalAddresses")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Monitor sync progress
let totalAddresses = wollet.scriptCount()
var synced = 0

for chunk in addressChunks {
    try syncChunk(chunk)
    synced += chunk.count
    print("Progress: \(synced)/\(totalAddresses)")
}
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Monitor sync progress
const totalAddresses = wollet.scriptCount();
let synced = 0;

for (const chunk of addressChunks) {
    await syncChunk(chunk);
    synced += chunk.length;
    console.log(`Progress: ${synced}/${totalAddresses}`);
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Monitor sync progress
var totalAddresses = wollet.ScriptCount();
int synced = 0;

foreach (var chunk in addressChunks) {
    SyncChunk(chunk);
    synced += chunk.Count;
    Console.WriteLine($"Progress: {synced}/{totalAddresses}");
}
```

</TabItem>
</Tabs>