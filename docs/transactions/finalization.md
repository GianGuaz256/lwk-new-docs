---
id: finalization
title: Finalization
sidebar_label: Finalization
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Finalizing and Broadcasting Transactions

Transaction finalization is the final step in the transaction lifecycle, converting signed PSETs into valid, broadcastable Liquid transactions. This process includes signature validation, witness construction, and network submission.

## Basic Finalization

Once all required signatures are collected, finalize the PSET:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::elements::pset::{finalize, PartiallySignedTransaction};
use elements::secp256k1_zkp::Secp256k1;
use elements::BlockHash;

// Assume we have a fully signed PSET
let mut signed_pset: PartiallySignedTransaction = /* ... */;

// Finalize the PSET
let secp = Secp256k1::new();
finalize(&mut signed_pset, &secp, BlockHash::all_zeros())?;

// Extract the final transaction
let final_tx = signed_pset.extract_tx()?;
println!("Final transaction: {}", final_tx.txid());
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Pset

# Assume we have a fully signed PSET
signed_pset = # ... signed PSET

# Finalize the PSET
final_tx = signed_pset.finalize()
print(f"Final transaction: {final_tx.txid()}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.Pset

// Assume we have a fully signed PSET
val signedPset = // ... signed PSET

// Finalize the PSET
val finalTx = signedPset.finalize()
println("Final transaction: ${finalTx.txid()}")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Assume we have a fully signed PSET
let signedPset = // ... signed PSET

// Finalize the PSET
let finalTx = try signedPset.finalize()
print("Final transaction: \(finalTx.txid())")
```

</TabItem>
</Tabs>

## Best Practices

1. **Validate Before Broadcasting**: Always perform pre-broadcast validation
2. **Handle Errors Gracefully**: Implement comprehensive error handling
3. **Monitor Confirmations**: Track transaction status after broadcasting
4. **Backup PSETs**: Save PSETs before finalization for troubleshooting
5. **Test on Testnet**: Validate complex transactions on testnet first
6. **Fee Verification**: Ensure fee amounts are reasonable before broadcasting 