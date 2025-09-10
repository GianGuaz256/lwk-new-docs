---
id: blockchain-backends-overview
title: Blockchain Backend Architecture
sidebar_label: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blockchain Backend Architecture

LWK supports multiple blockchain data sources for wallet synchronization and transaction broadcasting. The primary backends are Electrum (TCP-based protocol), Esplora (HTTP REST API), and Waterfalls (optimized Esplora), each offering different trade-offs for performance, deployment, and integration scenarios.

## Backend Comparison

```mermaid
graph TB
    A[LWK Wallet] --> B[Blockchain Backend]
    B --> C[Electrum Client<br/>TCP Protocol]
    B --> D[Esplora Client<br/>HTTP REST API]
    B --> E[Waterfalls Client<br/>Optimized HTTP API]
    
    C --> F[Electrum Server<br/>• Persistent connections<br/>• Real-time subscriptions<br/>• Binary protocol]
    D --> G[Esplora Server<br/>• Stateless requests<br/>• HTTP caching<br/>• JSON responses]
    E --> H[Waterfalls Server<br/>• Batch processing<br/>• Descriptor optimization<br/>• Age encryption]
```

| Feature | Electrum | Esplora | Waterfalls | Best For |
|---------|----------|---------|------------|----------|
| **Protocol** | TCP with binary format | HTTP REST with JSON | HTTP REST with optimization | Electrum: Real-time apps<br/>Esplora: Web/mobile<br/>Waterfalls: Large wallets |
| **Connection** | Persistent with subscriptions | Stateless requests | Stateless with batching | Electrum: Desktop wallets<br/>Esplora: Web services<br/>Waterfalls: High-volume |
| **Performance** | Lower latency, efficient | Higher latency, cacheable | Fastest for wallet scanning | Electrum: Frequent sync<br/>Esplora: Occasional sync<br/>Waterfalls: Initial sync |
| **Deployment** | Requires TCP connectivity | Works behind HTTP proxies | Works behind HTTP proxies | Electrum: Direct networks<br/>Esplora: Enterprise/mobile<br/>Waterfalls: Performance-critical |

## Quick Start Examples

### Electrum Client

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{ElectrumClient, ElectrumUrl};

// Connect to Blockstream Electrum server
let url = ElectrumUrl::new("blockstream.info:465", true, true)?;
let mut client = ElectrumClient::new(&url)?;

// Test connection
client.ping()?;

// Sync wallet
let update = client.full_scan(&wollet)?;
if let Some(update) = update {
    wollet.apply_update(update)?;
}

println!("Wallet synced via Electrum");
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import ElectrumClient

# Connect to Blockstream Electrum server
client = ElectrumClient(
    electrum_url="blockstream.info:465",
    tls=True,
    validate_domain=True
)

# Test connection
client.ping()

# Sync wallet
update = client.full_scan(wollet)
if update:
    wollet.apply_update(update)

print("Wallet synced via Electrum")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.ElectrumClient

// Connect to Blockstream Electrum server
val client = ElectrumClient(
    electrumUrl = "blockstream.info:465",
    tls = true,
    validateDomain = true
)

// Test connection
client.ping()

// Sync wallet
val update = client.fullScan(wollet)
update?.let { wollet.applyUpdate(it) }

println("Wallet synced via Electrum")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Connect to Blockstream Electrum server
let client = try ElectrumClient(
    electrumUrl: "blockstream.info:465",
    tls: true,
    validateDomain: true
)

// Test connection
try client.ping()

// Sync wallet
let update = try client.fullScan(wollet)
if let update = update {
    try wollet.applyUpdate(update)
}

print("Wallet synced via Electrum")
```

</TabItem>
</Tabs>

### Esplora Client

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::blocking::EsploraClient;

// Connect to Blockstream Esplora API
let client = EsploraClient::new(
    "https://blockstream.info/liquidtestnet/api",
    ElementsNetwork::LiquidTestnet
)?;

// Sync wallet
let update = client.full_scan(&wollet)?;
if let Some(update) = update {
    wollet.apply_update(update)?;
}

println!("Wallet synced via Esplora");
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import EsploraClient, Network

# Connect to Blockstream Esplora API
client = EsploraClient(
    url="https://blockstream.info/liquidtestnet/api",
    network=Network.LIQUID_TESTNET
)

# Sync wallet
update = client.full_scan(wollet)
if update:
    wollet.apply_update(update)

print("Wallet synced via Esplora")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Connect to Blockstream Esplora API
val client = EsploraClient(
    url = "https://blockstream.info/liquidtestnet/api",
    network = Network.LIQUID_TESTNET
)

// Sync wallet
val update = client.fullScan(wollet)
update?.let { wollet.applyUpdate(it) }

println("Wallet synced via Esplora")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Connect to Blockstream Esplora API
let client = try EsploraClient(
    url: "https://blockstream.info/liquidtestnet/api",
    network: .liquidTestnet
)

// Sync wallet
let update = try client.fullScan(wollet)
if let update = update {
    try wollet.applyUpdate(update)
}

print("Wallet synced via Esplora")
```

</TabItem>
</Tabs>

### Waterfalls Client

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::clients::blocking::EsploraClient;

// Connect to Waterfalls optimized endpoint
let client = EsploraClient::new_waterfalls(
    "https://waterfalls.liquidwebwallet.org/liquid/api",
    ElementsNetwork::Liquid
)?;

// Sync wallet with optimized performance
let update = client.full_scan(&wollet)?;
if let Some(update) = update {
    wollet.apply_update(update)?;
}

println!("Wallet synced via Waterfalls (optimized)");
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import EsploraClient, Network

# Connect to Waterfalls optimized endpoint
client = EsploraClient.new_waterfalls(
    url="https://waterfalls.liquidwebwallet.org/liquid/api",
    network=Network.LIQUID
)

# Sync wallet with optimized performance
update = client.full_scan(wollet)
if update:
    wollet.apply_update(update)

print("Wallet synced via Waterfalls (optimized)")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Connect to Waterfalls optimized endpoint
val client = EsploraClient.newWaterfalls(
    url = "https://waterfalls.liquidwebwallet.org/liquid/api",
    network = Network.LIQUID
)

// Sync wallet with optimized performance
val update = client.fullScan(wollet)
update?.let { wollet.applyUpdate(it) }

println("Wallet synced via Waterfalls (optimized)")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Connect to Waterfalls optimized endpoint
let client = try EsploraClient.newWaterfalls(
    url: "https://waterfalls.liquidwebwallet.org/liquid/api",
    network: .liquid
)

// Sync wallet with optimized performance
let update = try client.fullScan(wollet)
if let update = update {
    try wollet.applyUpdate(update)
}

print("Wallet synced via Waterfalls (optimized)")
```

</TabItem>
</Tabs>

## Network Configuration

### Mainnet (Liquid)

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Electrum mainnet
let electrum_url = ElectrumUrl::new("blockstream.info:700", false, true)?;
let electrum_client = ElectrumClient::new(&electrum_url)?;

// Esplora mainnet  
let esplora_client = EsploraClient::new(
    "https://blockstream.info/liquid/api",
    ElementsNetwork::Liquid
)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Electrum mainnet
electrum_client = ElectrumClient("blockstream.info:700", False, True)

# Esplora mainnet
esplora_client = EsploraClient(
    "https://blockstream.info/liquid/api",
    Network.LIQUID
)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Electrum mainnet
val electrumClient = ElectrumClient("blockstream.info:700", false, true)

// Esplora mainnet
val esploraClient = EsploraClient(
    "https://blockstream.info/liquid/api",
    Network.LIQUID
)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Electrum mainnet
let electrumClient = try ElectrumClient(
    electrumUrl: "blockstream.info:700",
    tls: false,
    validateDomain: true
)

// Esplora mainnet
let esploraClient = try EsploraClient(
    url: "https://blockstream.info/liquid/api",
    network: .liquid
)
```

</TabItem>
</Tabs>

## Backend Selection Guidelines

**For development:**
- Use Esplora for quick prototyping and testing
- Use Electrum for production applications requiring real-time updates
- Use Waterfalls for performance testing with large wallets
- Consider fallback mechanisms using multiple backends for reliability

## Performance Comparison

| Wallet Size | Electrum | Esplora | Waterfalls | Improvement |
|-------------|----------|---------|------------|-------------|
| 10 txs | ~3s | ~2.5s | ~0.2s | **12x faster** |
| 100 txs | ~30s | ~25s | ~0.8s | **30x faster** |
| 1000 txs | ~300s | ~250s | ~4.2s | **60x faster** |
| 6000+ txs | ~1800s | ~1500s | ~12s | **125x faster** |

*Results based on real-world testing. Actual performance may vary based on network conditions and server load.*

## Next Steps

- [Electrum](./electrum.md) - TCP-based backend
- [Esplora](./esplora.md) - HTTP REST API backend
- [Waterfalls](./waterfalls.md) - Optimized Esplora backend