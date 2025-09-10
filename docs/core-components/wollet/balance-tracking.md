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

## Asset Types

### L-BTC (Liquid Bitcoin)
- Primary network asset
- Used for transaction fees
- Asset ID: `6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`

### USDT (Tether USD)
- Popular stablecoin on Liquid
- Asset ID: `ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2`
- Ticker: USDt
- Precision: 8 decimals

### AMP Assets (Asset Management Platform)
- Compliance-focused assets with regulatory controls
- Require special handling through AMP integration
- Support whitelist/blacklist controls and freezing capabilities
- See [AMP Assets Receive & Monitor guide](../../amp-assets/receive-monitor) for detailed integration

## Asset Registry

For comprehensive information about all assets issued on Liquid, including their metadata, tickers, and issuer information, consult the [Blockstream Liquid Asset Registry documentation](https://docs.liquid.net/docs/blockstream-liquid-asset-registry). The registry provides standardized asset information used by wallets, block explorers, and other Liquid services.
