---
id: waterfalls
title: Waterfalls Optimized Backend
sidebar_label: Waterfalls
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Waterfalls

Waterfalls is a specialized blockchain backend designed for optimal wallet synchronization performance. It provides enhanced scanning capabilities with batch processing, descriptor-based optimization, and optional descriptor encryption for privacy.

## Basic Usage

### Creating a Waterfalls Client

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::clients::blocking::EsploraClient;
use lwk_wollet::ElementsNetwork;

// Create Waterfalls client
let client = EsploraClient::new_waterfalls(
    "https://waterfalls.liquidwebwallet.org/liquid/api",
    ElementsNetwork::Liquid
)?;

println!("Waterfalls client ready for optimized scanning");
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import EsploraClient, Network

# Create Waterfalls client
client = EsploraClient.new_waterfalls(
    url="https://waterfalls.liquidwebwallet.org/liquid/api",
    network=Network.LIQUID
)

print("Waterfalls client ready for optimized scanning")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create Waterfalls client
val client = EsploraClient.newWaterfalls(
    url = "https://waterfalls.liquidwebwallet.org/liquid/api",
    network = Network.LIQUID
)

println("Waterfalls client ready for optimized scanning")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create Waterfalls client
let client = try EsploraClient.newWaterfalls(
    url: "https://waterfalls.liquidwebwallet.org/liquid/api",
    network: .liquid
)

print("Waterfalls client ready for optimized scanning")
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { EsploraClient, Network } from 'lwk-wasm';

// Create Waterfalls client with options
const client = new EsploraClient(
    Network.liquid(),
    "https://waterfalls.liquidwebwallet.org/liquid/api",
    true,  // waterfalls enabled
    4,     // concurrency
    false  // utxo_only
);

console.log("Waterfalls client ready for optimized scanning");
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

// Create Waterfalls client
var client = EsploraClient.NewWaterfalls(
    "https://waterfalls.liquidwebwallet.org/liquid/api",
    Network.Liquid
);

Console.WriteLine("Waterfalls client ready for optimized scanning");
```

</TabItem>
</Tabs>

### Builder Pattern Configuration

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::clients::{EsploraClientBuilder, blocking::EsploraClient};
use lwk_wollet::ElementsNetwork;

// Advanced Waterfalls configuration
let client = EsploraClientBuilder::new(
    "https://waterfalls.liquidwebwallet.org/liquid/api",
    ElementsNetwork::Liquid
)
.waterfalls(true)
.concurrency(8)  // Higher concurrency for batch requests
.timeout(60)     // Longer timeout for large scans
.build_blocking()?;

println!("Advanced Waterfalls client configured");
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import EsploraClient, EsploraClientBuilder, Network

# Advanced Waterfalls configuration
builder = EsploraClientBuilder(
    base_url="https://waterfalls.liquidwebwallet.org/liquid/api",
    network=Network.LIQUID,
    waterfalls=True,
    concurrency=8,  # Higher concurrency
    timeout=60      # Longer timeout
)

client = EsploraClient.from_builder(builder)
print("Advanced Waterfalls client configured")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Advanced Waterfalls configuration
val builder = EsploraClientBuilder(
    baseUrl = "https://waterfalls.liquidwebwallet.org/liquid/api",
    network = Network.LIQUID,
    waterfalls = true,
    concurrency = 8u,  // Higher concurrency
    timeout = 60u      // Longer timeout
)

val client = EsploraClient.fromBuilder(builder)
println("Advanced Waterfalls client configured")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Advanced Waterfalls configuration
let builder = EsploraClientBuilder(
    baseUrl: "https://waterfalls.liquidwebwallet.org/liquid/api",
    network: .liquid,
    waterfalls: true,
    concurrency: 8,  // Higher concurrency
    timeout: 60      // Longer timeout
)

let client = try EsploraClient.fromBuilder(builder: builder)
print("Advanced Waterfalls client configured")
```

</TabItem>
</Tabs>

## Optimized Wallet Scanning

### Full Scan with Waterfalls

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{Wollet, WolletDescriptor};
use std::str::FromStr;

// Create wallet with CT descriptor
let descriptor = WolletDescriptor::from_str(
    "ct(slip77(master_blinding_key),wpkh(xpub.../*))"
)?;
let mut wollet = Wollet::without_persist(
    ElementsNetwork::Liquid, 
    descriptor
)?;

// Perform optimized scan with Waterfalls
let start = std::time::Instant::now();
let update = client.full_scan(&wollet)?;

if let Some(update) = update {
    wollet.apply_update(update)?;
    println!(
        "Scan completed in {}ms, found {} transactions",
        start.elapsed().as_millis(),
        wollet.transactions()?.len()
    );
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Wollet, WolletDescriptor, Network
import time

# Create wallet with CT descriptor
descriptor = WolletDescriptor(
    "ct(slip77(master_blinding_key),wpkh(xpub.../*))#checksum"
)
wollet = Wollet(
    network=Network.LIQUID,
    persister=None,
    descriptor=descriptor
)

# Perform optimized scan with Waterfalls
start = time.time()
update = client.full_scan(wollet)

if update:
    wollet.apply_update(update)
    elapsed = (time.time() - start) * 1000
    print(f"Scan completed in {elapsed:.0f}ms, found {len(wollet.transactions())} transactions")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create wallet with CT descriptor
val descriptor = WolletDescriptor(
    "ct(slip77(master_blinding_key),wpkh(xpub.../*))#checksum"
)
val wollet = Wollet(
    network = Network.LIQUID,
    persister = null,
    descriptor = descriptor
)

// Perform optimized scan with Waterfalls
val start = System.currentTimeMillis()
val update = client.fullScan(wollet)

update?.let {
    wollet.applyUpdate(it)
    val elapsed = System.currentTimeMillis() - start
    println("Scan completed in ${elapsed}ms, found ${wollet.transactions().size} transactions")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create wallet with CT descriptor
let descriptor = try WolletDescriptor(
    descriptor: "ct(slip77(master_blinding_key),wpkh(xpub.../*))#checksum"
)
let wollet = try Wollet(
    network: .liquid,
    persister: nil,
    descriptor: descriptor
)

// Perform optimized scan with Waterfalls
let start = Date()
let update = try client.fullScan(wollet: wollet)

if let update = update {
    try wollet.applyUpdate(update: update)
    let elapsed = Date().timeIntervalSince(start) * 1000
    print("Scan completed in \(Int(elapsed))ms, found \(try wollet.transactions().count) transactions")
}
```

</TabItem>
</Tabs>

### Scanning to Specific Index

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Scan up to derivation index 100 (instead of default gap limit)
let update = client.full_scan_to_index(&wollet, 100)?;

if let Some(update) = update {
    wollet.apply_update(update)?;
    println!("Scanned up to index 100");
}

// For very large wallets, scan in chunks
for chunk_start in (0..1000).step_by(100) {
    let update = client.full_scan_to_index(&wollet, chunk_start + 99)?;
    if let Some(update) = update {
        wollet.apply_update(update)?;
        println!("Processed chunk starting at index {}", chunk_start);
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Scan up to derivation index 100
update = client.full_scan_to_index(wollet, 100)

if update:
    wollet.apply_update(update)
    print("Scanned up to index 100")

# For very large wallets, scan in chunks
for chunk_start in range(0, 1000, 100):
    update = client.full_scan_to_index(wollet, chunk_start + 99)
    if update:
        wollet.apply_update(update)
        print(f"Processed chunk starting at index {chunk_start}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Scan up to derivation index 100
val update = client.fullScanToIndex(wollet, 100u)

update?.let {
    wollet.applyUpdate(it)
    println("Scanned up to index 100")
}

// For very large wallets, scan in chunks
for (chunkStart in 0 until 1000 step 100) {
    val chunkUpdate = client.fullScanToIndex(wollet, (chunkStart + 99).toUInt())
    chunkUpdate?.let {
        wollet.applyUpdate(it)
        println("Processed chunk starting at index $chunkStart")
    }
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Scan up to derivation index 100
let update = try client.fullScanToIndex(wollet: wollet, index: 100)

if let update = update {
    try wollet.applyUpdate(update: update)
    print("Scanned up to index 100")
}

// For very large wallets, scan in chunks
for chunkStart in stride(from: 0, to: 1000, by: 100) {
    let chunkUpdate = try client.fullScanToIndex(wollet: wollet, index: UInt32(chunkStart + 99))
    if let chunkUpdate = chunkUpdate {
        try wollet.applyUpdate(update: chunkUpdate)
        print("Processed chunk starting at index \(chunkStart)")
    }
}
```

</TabItem>
</Tabs>

## Descriptor Encryption

Waterfalls supports optional descriptor encryption using [Age encryption](https://age-encryption.org/) to enhance privacy when communicating with the server.

### Encryption Management

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use age::x25519::Recipient;

// Get server's encryption recipient key
let recipient = client.waterfalls_server_recipient()?;
println!("Server recipient: {}", recipient);

// Set custom recipient (for private Waterfalls servers)
let custom_recipient = Recipient::from_str("age1...")?;
client.set_waterfalls_server_recipient(custom_recipient);

// Disable encryption for testing/debugging
client.waterfalls_avoid_encryption();

// The client automatically caches encrypted descriptors
// to avoid re-encryption on every request
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Note: Direct encryption management not available in Python bindings
# Encryption is handled automatically by the client

# For debugging, you can create a client without encryption
# by using a test/development Waterfalls server that doesn't require it
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Note: Direct encryption management not available in Kotlin bindings  
// Encryption is handled automatically by the client

// For advanced use cases, configure via builder pattern
val client = EsploraClient.fromBuilder(
    EsploraClientBuilder(
        baseUrl = testServerUrl,
        network = Network.REGTEST,
        waterfalls = true
    )
)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Note: Direct encryption management not available in Swift bindings
// Encryption is handled automatically by the client

// For advanced use cases, configure via builder pattern
let client = try EsploraClient.fromBuilder(
    builder: EsploraClientBuilder(
        baseUrl: testServerUrl,
        network: .regtest,
        waterfalls: true
    )
)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Set custom encryption recipient for WASM client
await client.set_waterfalls_server_recipient("age1ql3z...");

// The client handles encryption automatically
// Descriptors are encrypted before sending to server
```

</TabItem>
</Tabs>

## Network Endpoints

### Production Endpoints

```bash
# Liquid Mainnet
https://waterfalls.liquidwebwallet.org/liquid/api

# Liquid Testnet  
https://waterfalls.liquidwebwallet.org/liquidtestnet/api
```

## External Resources

- [Waterfalls Repository](https://github.com/RCasatta/waterfalls) - Server implementation and documentation
- [Age Encryption](https://age-encryption.org/) - Encryption library used for descriptor privacy
- [Performance Benchmarks](https://github.com/RCasatta/waterfalls#benchmarks) - Detailed performance analysis
