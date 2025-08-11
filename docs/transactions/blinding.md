---
id: blinding
title: Confidential Transaction Blinding
sidebar_label: Blinding
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Confidential Transaction Blinding

Confidential Transactions (CT) are the cornerstone of Liquid's privacy model, utilizing advanced cryptographic techniques to hide transaction amounts and asset types while maintaining the ability to verify transaction validity. LWK implements CT blinding seamlessly, but understanding the underlying mechanisms is crucial for developers working with privacy-sensitive applications.

## Understanding Confidential Transactions

Confidential Transactions transform visible transaction data into cryptographic commitments that hide the actual values while preserving mathematical relationships necessary for validation. This is achieved through a combination of homomorphic commitments, range proofs, and surjection proofs.

### Core Cryptographic Components

#### Pedersen Commitments
Confidential Transactions use Pedersen commitments to hide amounts while maintaining homomorphic properties:

```
C = r*H + v*G
```

Where:
- `C` is the commitment to value `v`
- `r` is the blinding factor (random scalar)
- `H` and `G` are elliptic curve generator points
- `v` is the actual amount being committed to

The homomorphic property ensures that `C1 + C2 = (r1 + r2)*H + (v1 + v2)*G`, allowing validators to verify that inputs equal outputs without knowing the actual values.

#### Asset Commitments
Asset types are similarly hidden using asset generators derived from the asset tag:

```
A = asset_tag * G + asset_blinding_factor * H
```

#### Range Proofs
Range proofs are zero-knowledge proofs that demonstrate committed amounts fall within valid ranges (0 to maximum supply) without revealing the actual values.

#### Surjection Proofs
Surjection proofs demonstrate that asset commitments correspond to valid, known assets without revealing which specific assets are involved.

## Blinding Process in LWK

### Automatic Blinding During Transaction Construction

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::{TxBuilder, AddressAmount};
use elements::{Address, AssetId};

// Create a transaction with automatic blinding
let recipient = AddressAmount {
    address: Address::from_str("lq1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef2mjn...")?,
    amount: 50_000_000, // 0.5 L-BTC in satoshis
    asset: AssetId::LIQUID_BTC,
};

// The blinding process occurs during finish()
let pset = TxBuilder::new(bitcoin::Network::Liquid)
    .add_addressee(&recipient)
    .fee_rate(Some(1000))
    .finish(&wollet)?;

println!("PSET with blinded outputs: {}", pset);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import TxBuilder, AddressAmount, AssetId, Network

# Create a transaction with automatic blinding
recipient = AddressAmount(
    address="lq1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef2mjn...",
    amount=50_000_000,  # 0.5 L-BTC in satoshis
    asset=AssetId.LBTC()
)

# The blinding process occurs during finish()
pset = TxBuilder(Network.LIQUID) \
    .add_addressee(recipient) \
    .fee_rate(1000) \
    .finish(wollet)

print(f"PSET with blinded outputs: {pset}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create a transaction with automatic blinding
val recipient = AddressAmount(
    address = "lq1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef2mjn...",
    amount = 50_000_000UL, // 0.5 L-BTC in satoshis
    asset = AssetId.lbtc()
)

// The blinding process occurs during finish()
val pset = TxBuilder(Network.LIQUID)
    .addAddressee(recipient)
    .feeRate(1000UL)
    .finish(wollet)

println("PSET with blinded outputs: $pset")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create a transaction with automatic blinding
let recipient = AddressAmount(
    address: "lq1qqw3e3mk4ng3ks43mh54udznuekaadh9lgwef2mjn...",
    amount: 50_000_000, // 0.5 L-BTC in satoshis
    asset: AssetId.lbtc()
)

// The blinding process occurs during finish()
let pset = try TxBuilder(network: .liquid)
    .addAddressee(recipient)
    .feeRate(1000)
    .finish(wollet)

print("PSET with blinded outputs: \(pset)")
```

</TabItem>
</Tabs>

### Blinding Key Derivation

LWK implements SLIP-77 for deterministic blinding key derivation from wallet descriptors:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Generate a confidential address with associated blinding key
let address_result = wollet.address(None)?;
let confidential_address = address_result.address();
let blinding_key = address_result.blinding_key();

println!("Confidential address: {}", confidential_address);
println!("Blinding key (private): {}", blinding_key);

// The blinding key is derived deterministically using SLIP-77
let blinding_public_key = blinding_key.public_key();
println!("Blinding public key: {}", blinding_public_key);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Generate a confidential address with associated blinding key
address_result = wollet.address(None)
confidential_address = address_result.address()
blinding_key = address_result.blinding_key()

print(f"Confidential address: {confidential_address}")
print(f"Blinding key (private): {blinding_key}")

# The blinding key is derived deterministically using SLIP-77
blinding_public_key = blinding_key.public_key()
print(f"Blinding public key: {blinding_public_key}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Generate a confidential address with associated blinding key
val addressResult = wollet.address(null)
val confidentialAddress = addressResult.address()
val blindingKey = addressResult.blindingKey()

println("Confidential address: $confidentialAddress")
println("Blinding key (private): $blindingKey")

// The blinding key is derived deterministically using SLIP-77
val blindingPublicKey = blindingKey.publicKey()
println("Blinding public key: $blindingPublicKey")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Generate a confidential address with associated blinding key
let addressResult = try wollet.address(index: nil)
let confidentialAddress = addressResult.address()
let blindingKey = addressResult.blindingKey()

print("Confidential address: \(confidentialAddress)")
print("Blinding key (private): \(blindingKey)")

// The blinding key is derived deterministically using SLIP-77
let blindingPublicKey = blindingKey.publicKey()
print("Blinding public key: \(blindingPublicKey)")
```

</TabItem>
</Tabs>

## Multi-Asset Blinding

Liquid's multi-asset nature requires sophisticated blinding to hide both amounts and asset types in the same transaction. Each asset type gets its own asset commitment and surjection proof, while amounts are independently blinded with range proofs.

## Unblinding Process

Recipients can unblind received outputs using their private blinding keys. LWK automatically handles this process during wallet synchronization, revealing transaction details only to the intended recipients while maintaining privacy from external observers.

## Privacy Considerations

While Confidential Transactions provide strong privacy guarantees, developers should understand their limitations. CT protects transaction amounts and asset types but does not hide transaction structure, network metadata, or protect against advanced statistical analysis over time.

## Best Practices for Maximum Privacy

1. **Use Fresh Addresses**: Generate new addresses for each transaction
2. **Avoid Round Amounts**: Use non-obvious amounts to prevent correlation
3. **Consider Timing**: Space out transactions to avoid timing analysis
4. **Network Privacy**: Use additional tools like Tor for network-level privacy
5. **Backup Blinding Keys**: Ensure blinding keys are included in wallet backups

Understanding these concepts helps developers leverage Liquid's privacy features effectively while being aware of the system's capabilities and limitations.