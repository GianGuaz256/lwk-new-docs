---
id: wollet-overview
title: Watch-Only Wallet (Wollet)
sidebar_label: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Watch-Only Wallet (Wollet)

The `lwk_wollet` crate is the core component of LWK, providing comprehensive watch-only wallet functionality for Liquid Bitcoin. The name "wollet" emphasizes its watch-only nature while offering all essential wallet operations except private key management.

## Overview

A Wollet is defined by a [CT descriptor](https://github.com/ElementsProject/ELIPs/blob/main/elip-0150.mediawiki) (Confidential Transaction descriptor), which combines a Bitcoin descriptor with blinding key information. This enables the wallet to generate addresses, track balances, and build transactions while remaining watch-only.

### Key Capabilities

- **Descriptor-Based Wallets**: Create wallets from CT descriptors with built-in blinding support
- **Address Generation**: Derive receiving and change addresses from descriptors
- **Balance Tracking**: Monitor L-BTC and asset balances across all wallet addresses
- **Transaction Building**: Create PSETs for various operations including issuance, reissuance, and burns
- **Blockchain Synchronization**: Update wallet state from Electrum or Esplora backends
- **Asset Management**: Handle Liquid asset operations and registry integration

## Quick Start

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{ElementsNetwork, NoPersist, Wollet, WolletDescriptor};

// Create wallet from CT descriptor
let descriptor_str = "ct(slip77(master_blinding_key),wpkh(xpub/0/*))";
let descriptor: WolletDescriptor = descriptor_str.parse()?;
let wollet = Wollet::new(ElementsNetwork::LiquidTestnet, NoPersist::new(), descriptor)?;

// Generate address and sync
let address = wollet.address(None)?;
let update = electrum_client.full_scan(&wollet, 20, 20)?;
wollet.apply_update(update)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Wollet, WolletDescriptor, ElementsNetwork

# Create wallet from CT descriptor
descriptor = WolletDescriptor("ct(slip77(master_blinding_key),wpkh(xpub/0/*))")
wollet = Wollet(ElementsNetwork.LIQUID_TESTNET, None, descriptor)

# Generate address and sync
address = wollet.address()
update = electrum_client.full_scan(wollet, stop_gap=20)
wollet.apply_update(update)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create wallet from CT descriptor
val descriptor = WolletDescriptor("ct(slip77(master_blinding_key),wpkh(xpub/0/*))")
val wollet = Wollet(ElementsNetwork.LIQUID_TESTNET, null, descriptor)

// Generate address and sync
val address = wollet.address()
val update = electrumClient.fullScan(wollet, stopGap = 20u)
wollet.applyUpdate(update)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create wallet from CT descriptor
let descriptor = try WolletDescriptor(descriptor: "ct(slip77(master_blinding_key),wpkh(xpub/0/*))")
let wollet = try Wollet(network: .liquidTestnet, persister: nil, descriptor: descriptor)

// Generate address and sync
let address = try wollet.address()
let update = try electrumClient.fullScan(wollet: wollet, stopGap: 20)
try wollet.applyUpdate(update: update)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { Wollet, WolletDescriptor, Network, EsploraClient } from 'lwk-wasm';

// Create wallet from CT descriptor
const descriptor = new WolletDescriptor("ct(slip77(master_blinding_key),wpkh(xpub/0/*))")
const wollet = new Wollet(Network.testnet(), null, descriptor)

// Generate address and sync
const address = wollet.address()
const esploraClient = new EsploraClient(Network.testnet(), "https://blockstream.info/liquidtestnet/api", false, 1, false)
const update = await esploraClient.fullScan(wollet)
if (update) {
    wollet.applyUpdate(update)
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

// Create wallet from CT descriptor
var descriptor = new WolletDescriptor("ct(slip77(master_blinding_key),wpkh(xpub/0/*))");
var wollet = new Wollet(Network.LiquidTestnet, null, descriptor);

// Generate address and sync
var address = wollet.Address();
var update = electrumClient.FullScan(wollet, 20);
wollet.ApplyUpdate(update);
```

</TabItem>
</Tabs>

## Core Architecture

### Wallet Structure

```mermaid
graph TD
    subgraph "🌐 Blockchain Backends"
        ELEC["⚡ Electrum<br/>Lightweight Protocol"]
        ESP["🌍 Esplora<br/>REST API"]
        WATER["🌊 Waterfalls<br/>Optimized Scanning"]
    end
    
    subgraph "🏦 Wollet Core"
        W["📱 Wollet<br/>Watch-Only Wallet"]
    end
    
    subgraph "📋 Core Components"
        D["📋 WolletDescriptor<br/>CT Descriptor + Blinding Key"]
        S["💾 Store<br/>In-Memory State<br/>Transactions & UTXOs"]
        P["🗂️ Persister<br/>Optional Storage<br/>NoPersist | FsPersister"]
        C["⚙️ Config<br/>Network Settings<br/>Validation Rules"]
    end
    
    subgraph "🔧 Transaction Operations"
        TB["🏗️ TxBuilder<br/>PSET Creation<br/>Asset Operations"]
    end
    
    ELEC -.->|"Updates"| W
    ESP -.->|"Updates"| W
    WATER -.->|"Updates"| W
    
    W --> D
    W --> S
    W --> P
    W --> C
    
    W --> TB
    TB -.->|"PSETs"| W
    
    style W fill:#e1f5fe,stroke:#01579b,stroke-width:4px
    style D fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style S fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style P fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style C fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    style ELEC fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style ESP fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style WATER fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style TB fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    
    click ELEC "https://github.com/romanz/electrs" "Electrum Server Implementation"
    click ESP "https://github.com/Blockstream/esplora" "Esplora Block Explorer API"
    click WATER "https://github.com/RCasatta/waterfalls" "Waterfalls Optimized Backend"
```

The Wollet consists of:

- **WolletDescriptor**: Defines the wallet's address derivation and blinding key
- **Store**: In-memory state containing transactions, UTXOs, and balances
- **Persister**: Interface for saving/loading wallet state (optional)
- **Config**: Network configuration and validation settings

### Data Flow

1. **Initialization**: Parse descriptor and create wallet instance
2. **Synchronization**: Fetch blockchain data and apply updates
3. **Address Generation**: Derive addresses from descriptor
4. **Transaction Building**: Create PSETs for various operations
5. **State Management**: Persist wallet state for future sessions

### Blockchain Backend Support

Wollet supports multiple blockchain backends for synchronization:

- **[Electrum](https://github.com/romanz/electrs)**: Efficient, lightweight protocol ideal for most applications
- **[Esplora](https://github.com/Blockstream/esplora)**: REST API backend perfect for web integrations  
- **[Waterfalls](https://github.com/RCasatta/waterfalls)**: Optimized scanning backend that provides enhanced performance for wallet synchronization with specialized endpoints for descriptor-based wallets

## Next Steps

- [Address Generation](./address-generation.md) - Learn about address derivation
- [Balance Tracking](./balance-tracking.md) - Understand balance management
- [Blockchain Sync](./blockchain-sync.md) - Deep dive into synchronization
- [Descriptors](./descriptors.md) - Master CT descriptor creation 