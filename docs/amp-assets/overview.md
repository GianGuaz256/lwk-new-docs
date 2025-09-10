---
id: amp-assets-overview
title: AMP Assets Overview
sidebar_label: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AMP Assets Overview

[AMP0](https://blockstream.com/amp/) (Asset Management Platform version 0) is a service for issuers that allows enforcement of specific rules on certain Liquid assets. LWK 0.11.0 introduces partial support for AMP0, enabling developers to build applications that can interact with AMP0-managed assets while maintaining the security model of separated signing and watching operations.

## What is AMP0?

AMP0 is a legacy system that provides asset management capabilities for Liquid Bitcoin assets with enforced rules and restrictions. It operates through a 2-of-2 multisig setup where one key is controlled by the user and the other by the AMP0 service, ensuring that all transactions comply with predefined asset rules.

## LWK AMP0 Capabilities

LWK provides partial AMP0 support, focusing on the essential operations for asset management:

| Capability | LWK AMP0 | GDK | AMP0 API |
|------------|----------|-----|----------|
| Create AMP0 accounts | ❌ | ✅ | ❌ |
| Receive on AMP0 accounts | ✅ | ✅ | ❌ |
| Monitor AMP0 accounts | ✅ | ✅ | ❌ |
| Issue, reissue, burn AMP0 assets | ❌ | ❌ | ✅ |
| Set restriction for AMP0 assets | ❌ | ❌ | ✅ |

:::info
If you need full AMP0 support including account creation and asset issuance, use [GDK](https://github.com/blockstream/gdk) and the AMP0 issuer API.
:::

## Prerequisites

To use AMP0 with LWK, you need:

1. **Green Watch-Only Credentials**: Username and password for a Green Wallet with an AMP account
2. **Corresponding Signer**: Access to the signing key (e.g., Jade hardware wallet or software signer with BIP39 mnemonic)
3. **AMP ID**: The AMP account identifier (GAID)

## Supported Operations

With LWK AMP0 integration, you can:

- **Generate Addresses**: Get addresses for the AMP0 account (watch-only)
- **Monitor Accounts**: Track balance and transactions (watch-only)
- **Create Transactions**: Build AMP0 transactions (watch-only)
- **Sign Transactions**: Sign with user key (signer)
- **Request Cosigning**: Ask AMP0 service to cosign transactions (watch-only)
- **Broadcast**: Send completed transactions to the network (watch-only)

## Security Model

AMP0 uses a 2-of-2 multisig security model:

- **User Key**: Controlled by you (hardware wallet or software signer)
- **Server Key**: Controlled by Blockstream Green service
- **Transaction Validation**: Both signatures required for any transaction
- **Rule Enforcement**: AMP0 service validates transactions against asset rules before cosigning

:::warning Important Security Considerations
⚠️ **Server Dependency**: Transactions require AMP0 service approval and can be censored by server refusal.

⚠️ **Address Generation**: Only use `Amp0::address()` for address generation. Using `Wollet::address()` directly can lead to **fund loss** as the AMP0 server only monitors addresses it has generated.

⚠️ **Wallet Sync**: Use `full_scan_to_index()` instead of `full_scan()` to avoid missing transactions due to address gaps.
:::

## Quick Start Example

Here's a basic example of AMP0 integration:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::amp0::blocking::Amp0;
use lwk_wollet::{Wollet, ElementsNetwork};

// Create AMP0 context
let mut amp0 = Amp0::new(
    Network::TestnetLiquid,
    "username",
    "password", 
    "amp_id"
)?;

// Get wallet descriptor and create wollet
let descriptor = amp0.wollet_descriptor();
let mut wollet = Wollet::without_persist(ElementsNetwork::LiquidTestnet, descriptor)?;

// Get an address
let address = amp0.address(None)?;
println!("Address: {}", address.address());

// Sync wallet (use full_scan_to_index for AMP0!)
let last_index = amp0.last_index();
let update = client.full_scan_to_index(&wollet, last_index)?;
if let Some(update) = update {
    wollet.apply_update(update)?;
}

// Check balance
let balance = wollet.balance()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Amp0, Wollet, Network, EsploraClient

# Create AMP0 context
amp0 = Amp0(Network.testnet(), "username", "password", "amp_id")

# Get wallet descriptor and create wollet
descriptor = amp0.wollet_descriptor()
wollet = Wollet(Network.testnet(), descriptor, None)

# Get an address
address = amp0.address(None)
print(f"Address: {address.address()}")

# Sync wallet (use full_scan_to_index for AMP0!)
client = EsploraClient.new_waterfalls(url, Network.testnet())
last_index = amp0.last_index()
update = client.full_scan_to_index(wollet, last_index)
wollet.apply_update(update)

# Check balance
balance = wollet.balance()
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create AMP0 context
val amp0 = Amp0(Network.testnet(), "username", "password", "ampId")

// Get wallet descriptor and create wollet
val descriptor = amp0.wolletDescriptor()
val wollet = Wollet(Network.testnet(), descriptor, null)

// Get an address
val address = amp0.address(null)
println("Address: ${address.address()}")

// Sync wallet (use fullScanToIndex for AMP0!)
val client = EsploraClient.newWaterfalls(url, Network.testnet())
val lastIndex = amp0.lastIndex()
val update = client.fullScanToIndex(wollet, lastIndex)
wollet.applyUpdate(update)

// Check balance
val balance = wollet.balance()
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create AMP0 context
let amp0 = try Amp0(network: .testnet, username: "username", password: "password", ampId: "ampId")

// Get wallet descriptor and create wollet
let descriptor = try amp0.wolletDescriptor()
let wollet = try Wollet(network: .testnet, descriptor: descriptor, persister: nil)

// Get an address
let address = try amp0.address(index: nil)
print("Address: \(address.address())")

// Sync wallet (use fullScanToIndex for AMP0!)
let client = try EsploraClient.newWaterfalls(url: url, network: .testnet)
let lastIndex = try amp0.lastIndex()
let update = try client.fullScanToIndex(wollet: wollet, lastIndex: lastIndex)
try wollet.applyUpdate(update: update)

// Check balance
let balance = try wollet.balance()
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { Amp0, Wollet, Network, EsploraClient } from 'lwk-wasm';

// Create AMP0 context
const amp0 = await Amp0.newTestnet("username", "password", "ampId");

// Get wallet and sync
const wollet = amp0.wollet();
const client = EsploraClient.newWaterfalls(url, Network.testnet());

// Get an address
const address = await amp0.address(null);
console.log(`Address: ${address.address()}`);

// Sync wallet (use fullScanToIndex for AMP0!)
const lastIndex = amp0.lastIndex();
const update = await client.fullScanToIndex(wollet, lastIndex);
if (update) {
    wollet.applyUpdate(update);
}

// Check balance
const balance = wollet.balance();
```

</TabItem>
</Tabs>

## Setup Process

AMP0 account setup requires external tools since LWK cannot create new accounts:

1. **Create Liquid Wallet**: Use [Blockstream App](https://blockstream.com/app/), [`green_cli`](https://github.com/Blockstream/green_cli/), or [GDK](https://github.com/blockstream/gdk) directly
2. **Create AMP Account**: Generate an AMP ID within your wallet
3. **Create Watch-Only Credentials**: Generate username and password for watch-only access
4. **Backup Mnemonic**: Securely store your BIP39 seed or hardware wallet

Once you have these credentials, you're ready to use AMP0 with LWK for monitoring, receiving, and sending operations.

## Next Steps

- [Receive & Monitor](./receive-monitor.md) - Learn how to receive AMP0 assets and monitor balances
- [Send](./send.md) - Understand the complete AMP0 transaction sending flow
- [Transactions Guide](../transactions/building-transactions.md) - General transaction building concepts
