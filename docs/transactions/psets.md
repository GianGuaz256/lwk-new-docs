---
id: psets
title: Partially Signed Elements Transactions (PSETs)
sidebar_label: PSETs
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Understanding PSETs in Liquid Transactions

Partially Signed Elements Transactions (PSETs) are the foundation of transaction construction in Liquid. They allow for collaborative transaction building, where multiple parties can contribute inputs, outputs, and signatures before finalizing the transaction.

## What are PSETs?

PSETs extend Bitcoin's PSBT (Partially Signed Bitcoin Transaction) format to support Liquid's confidential transactions and asset features. They enable:

- **Collaborative Construction**: Multiple parties can contribute to a single transaction
- **Asset Support**: Handle multiple assets within one transaction
- **Confidential Transactions**: Maintain privacy through blinding
- **Hardware Wallet Integration**: Support for hardware signing devices

## PSET Structure

A PSET contains several key components:

### Transaction Template
The unsigned transaction structure with inputs and outputs defined but not yet signed.

### Input Metadata
For each input, PSETs store:
- Previous transaction outputs (UTXOs)
- Redemption scripts and witness data
- Asset and amount information
- Blinding factors for confidential transactions

### Output Metadata
For each output, PSETs store:
- Asset commitments and amount commitments
- Blinding keys and factors
- Script templates and addresses

## Creating PSETs

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::elements::pset::PartiallySignedTransaction;

// Create a new PSET
let mut pset = PartiallySignedTransaction::new_v2();

// Or parse from base64
let pset_str = "cHNldP8BAgQCAAAAAQMEAQAAAAEEAQEBBQECAQYBAwH5...";
let pset: PartiallySignedTransaction = pset_str.parse()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Pset

# Create from base64 string
pset_str = "cHNldP8BAgQCAAAAAQMEAQAAAAEEAQEBBQECAQYBAwH5..."
pset = Pset(pset_str)

# Access transaction data
tx = pset.extract_tx()
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.Pset

// Create from base64 string
val psetStr = "cHNldP8BAgQCAAAAAQMEAQAAAAEEAQEBBQECAQYBAwH5..."
val pset = Pset(psetStr)

// Extract transaction
val tx = pset.extractTx()
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create from base64 string
let psetStr = "cHNldP8BAgQCAAAAAQMEAQAAAAEEAQEBBQECAQYBAwH5..."
let pset = try Pset(base64: psetStr)

// Extract transaction
let tx = try pset.extractTx()
```

</TabItem>
</Tabs>

## PSET Operations

### Combining PSETs

Multiple PSETs can be combined when they reference the same transaction template:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Combine two PSETs
let mut pset1 = PartiallySignedTransaction::new_v2();
let pset2 = PartiallySignedTransaction::new_v2();

pset1.merge(pset2)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Combine PSETs
combined_pset = pset1.combine(pset2)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Combine PSETs
val combinedPset = pset1.combine(pset2)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Combine PSETs
let combinedPset = try pset1.combine(pset2)
```

</TabItem>
</Tabs>

### Finalizing PSETs

Once all signatures are collected, finalize the PSET to create a broadcastable transaction:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::elements::pset::finalize;
use elements::secp256k1_zkp::Secp256k1;

let secp = Secp256k1::new();
finalize(&mut pset, &secp, elements::BlockHash::all_zeros())?;

// Extract the final transaction
let final_tx = pset.extract_tx()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Finalize the PSET
final_tx = pset.finalize()
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Finalize the PSET
val finalTx = pset.finalize()
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Finalize the PSET
let finalTx = try pset.finalize()
```

</TabItem>
</Tabs>

## PSET Identification

Each PSET has a unique identifier based on the transaction template:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get unique PSET ID
let unique_id = pset.unique_id()?;
println!("PSET ID: {}", unique_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get unique PSET ID
unique_id = pset.unique_id()
print(f"PSET ID: {unique_id}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get unique PSET ID
val uniqueId = pset.uniqueId()
println("PSET ID: $uniqueId")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get unique PSET ID
let uniqueId = try pset.uniqueId()
print("PSET ID: \(uniqueId)")
```

</TabItem>
</Tabs>

## Confidential Transaction Support

PSETs handle Liquid's confidential transactions transparently:

- **Blinding Factors**: Store asset and amount blinding factors
- **Range Proofs**: Include zero-knowledge proofs for amounts
- **Surjection Proofs**: Prove asset commitments are valid

## Common PSET Workflows

### Single-Party Transaction
1. Create PSET with inputs and outputs
2. Add transaction details
3. Sign the PSET
4. Finalize and broadcast

### Multi-Party Transaction
1. Party A creates initial PSET structure
2. Party B adds their inputs/outputs
3. Both parties sign their respective inputs
4. Combine signatures
5. Finalize and broadcast

### Hardware Wallet Integration
1. Create PSET on software wallet
2. Transfer to hardware wallet for signing
3. Return signed PSET
4. Finalize transaction

## Best Practices

1. **Validate PSETs**: Always validate PSET structure before signing
2. **Secure Storage**: Store PSETs securely during multi-party workflows
3. **Version Compatibility**: Use PSET v2 for full Liquid feature support
4. **Error Handling**: Handle PSET parsing and combination errors gracefully
5. **Backup Strategy**: Keep copies of PSETs until transactions are confirmed

## Error Handling

Common PSET errors include:

- **Parse Errors**: Invalid base64 encoding or malformed structure
- **Combination Errors**: Incompatible PSETs that can't be merged
- **Finalization Errors**: Missing signatures or invalid transaction data

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
match pset_str.parse::<PartiallySignedTransaction>() {
    Ok(pset) => {
        // Process valid PSET
    },
    Err(e) => {
        eprintln!("PSET parse error: {}", e);
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
try:
    pset = Pset(pset_str)
    # Process valid PSET
except Exception as e:
    print(f"PSET error: {e}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
try {
    val pset = Pset(psetStr)
    // Process valid PSET
} catch (e: Exception) {
    println("PSET error: ${e.message}")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
do {
    let pset = try Pset(base64: psetStr)
    // Process valid PSET
} catch {
    print("PSET error: \(error)")
}
```

</TabItem>
</Tabs>