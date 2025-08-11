---
id: fee-estimation
title: Fee Estimation
sidebar_label: Fee Estimation
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fee Calculation and Estimation Strategies

Understanding fee estimation in Liquid transactions is crucial for optimal transaction construction. Fees in Liquid are paid in L-BTC and must account for the unique characteristics of confidential transactions and multi-asset operations.

## Fee Structure in Liquid

Liquid transactions use a fee structure similar to Bitcoin, but with additional considerations:

- **Base Fee**: Minimum fee required for transaction acceptance
- **Size-Based Fee**: Fee calculation based on transaction virtual size (vsize)
- **Confidential Transaction Overhead**: Additional size from range proofs and blinding
- **Multi-Asset Complexity**: Extra data for asset commitments and proofs

## Fee Rate vs Absolute Fee

### Fee Rate (Recommended)

Fee rate specifies satoshis per virtual byte (sat/vB), allowing automatic scaling with transaction size:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_wollet::TxBuilder;

// Set fee rate in satoshis per virtual byte
let tx_builder = TxBuilder::new(bitcoin::Network::Regtest)
    .fee_rate(Some(100)); // 100 sat/vB

// Build with automatic fee calculation
let pset = tx_builder
    .add_addressee(&recipient)
    .finish(&wollet)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import TxBuilder, Network

# Set fee rate in satoshis per virtual byte
tx_builder = TxBuilder(Network.REGTEST) \
    .fee_rate(100)  # 100 sat/vB

# Build with automatic fee calculation
pset = tx_builder \
    .add_addressee(recipient) \
    .finish(wollet)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.TxBuilder
import com.blockstream.lwk.Network

// Set fee rate in satoshis per virtual byte
val txBuilder = TxBuilder(Network.REGTEST)
    .feeRate(100UL)  // 100 sat/vB

// Build with automatic fee calculation
val pset = txBuilder
    .addAddressee(recipient)
    .finish(wollet)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Set fee rate in satoshis per virtual byte
let txBuilder = TxBuilder(network: .regtest)
try txBuilder.feeRate(100)  // 100 sat/vB

// Build with automatic fee calculation
let pset = try txBuilder
    .addAddressee(recipient)
    .finish(wollet)
```

</TabItem>
</Tabs>

### Absolute Fee

Absolute fee specifies a fixed L-BTC amount regardless of transaction size:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Set absolute fee in satoshis
let tx_builder = TxBuilder::new(bitcoin::Network::Regtest)
    .absolute_fee(5000); // 5000 sats fixed fee

let pset = tx_builder
    .add_addressee(&recipient)
    .finish(&wollet)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Set absolute fee in satoshis
tx_builder = TxBuilder(Network.REGTEST) \
    .absolute_fee(5000)  # 5000 sats fixed fee

pset = tx_builder \
    .add_addressee(recipient) \
    .finish(wollet)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Set absolute fee in satoshis
val txBuilder = TxBuilder(Network.REGTEST)
    .absoluteFee(5000UL)  // 5000 sats fixed fee

val pset = txBuilder
    .addAddressee(recipient)
    .finish(wollet)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Set absolute fee in satoshis
let txBuilder = TxBuilder(network: .regtest)
try txBuilder.absoluteFee(5000)  // 5000 sats fixed fee

let pset = try txBuilder
    .addAddressee(recipient)
    .finish(wollet)
```

</TabItem>
</Tabs>

## Dynamic Fee Estimation

LWK can automatically estimate optimal fees based on current network conditions:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Use default fee estimation (recommended)
let tx_builder = TxBuilder::new(bitcoin::Network::Regtest)
    .fee_rate(None); // Auto-estimate

// Or specify minimum acceptable fee rate
let tx_builder = TxBuilder::new(bitcoin::Network::Regtest)
    .fee_rate(Some(50)); // At least 50 sat/vB
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Use default fee estimation (recommended)
tx_builder = TxBuilder(Network.REGTEST) \
    .fee_rate(None)  # Auto-estimate

# Or specify minimum acceptable fee rate
tx_builder = TxBuilder(Network.REGTEST) \
    .fee_rate(50)  # At least 50 sat/vB
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Use default fee estimation (recommended)
val txBuilder = TxBuilder(Network.REGTEST)
    .feeRate(null)  // Auto-estimate

// Or specify minimum acceptable fee rate
val txBuilder = TxBuilder(Network.REGTEST)
    .feeRate(50UL)  // At least 50 sat/vB
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Use default fee estimation (recommended)
let txBuilder = TxBuilder(network: .regtest)
try txBuilder.feeRate(nil)  // Auto-estimate

// Or specify minimum acceptable fee rate
let txBuilder = TxBuilder(network: .regtest)
try txBuilder.feeRate(50)  // At least 50 sat/vB
```

</TabItem>
</Tabs>

## Size Estimation and Optimization

### Understanding Transaction Size

Confidential transactions are larger than regular Bitcoin transactions due to:

- **Range Proofs**: Zero-knowledge proofs for amounts (~2.5KB each)
- **Surjection Proofs**: Asset commitment proofs (~100 bytes each)
- **Blinding Data**: Additional cryptographic material

### Size Optimization Strategies

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Minimize inputs for better fee efficiency
let tx_builder = TxBuilder::new(bitcoin::Network::Regtest)
    .add_utxo(largest_utxo) // Use fewer, larger UTXOs
    .fee_rate(Some(100));

// Batch operations when possible
let tx_builder = tx_builder
    .add_addressee(&recipient1)
    .add_addressee(&recipient2) // Batch multiple sends
    .add_addressee(&recipient3);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Minimize inputs for better fee efficiency
tx_builder = TxBuilder(Network.REGTEST) \
    .add_utxo(largest_utxo) \
    .fee_rate(100)

# Batch operations when possible
tx_builder = tx_builder \
    .add_addressee(recipient1) \
    .add_addressee(recipient2) \
    .add_addressee(recipient3)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Minimize inputs for better fee efficiency
val txBuilder = TxBuilder(Network.REGTEST)
    .addUtxo(largestUtxo)
    .feeRate(100UL)

// Batch operations when possible
txBuilder
    .addAddressee(recipient1)
    .addAddressee(recipient2)
    .addAddressee(recipient3)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Minimize inputs for better fee efficiency
let txBuilder = TxBuilder(network: .regtest)
try txBuilder.addUtxo(largestUtxo)
    .feeRate(100)

// Batch operations when possible
try txBuilder
    .addAddressee(recipient1)
    .addAddressee(recipient2)
    .addAddressee(recipient3)
```

</TabItem>
</Tabs>

## Common Fee Ranges

- **Minimum**: 1-10 sat/vB for low-priority transactions
- **Standard**: 10-50 sat/vB for normal priority
- **Priority**: 50-200 sat/vB for fast confirmation
- **Urgent**: 200+ sat/vB for immediate confirmation

## Best Practices

### Fee Rate Selection

1. **Network Conditions**: Monitor Liquid mempool for optimal fee rates
2. **Transaction Priority**: Use higher fees for time-sensitive transactions
3. **Asset Type**: Consider higher fees for complex asset operations
4. **Batch Operations**: Combine multiple operations to amortize fees

### Fee Optimization

1. **UTXO Consolidation**: Regularly consolidate small UTXOs during low-fee periods
2. **Input Selection**: Prefer fewer, larger inputs to reduce transaction size
3. **Output Minimization**: Combine outputs when possible
4. **Fee Estimation**: Use dynamic estimation for optimal network conditions

### Error Handling

Always handle fee-related errors gracefully:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
match tx_builder.finish(&wollet) {
    Ok(pset) => {
        println!("Transaction built with appropriate fees");
    },
    Err(lwk_wollet::Error::InsufficientFunds { needed, available }) => {
        eprintln!("Insufficient funds for transaction + fees");
        eprintln!("Need: {} sat, Have: {} sat", needed, available);
    },
    Err(e) => {
        eprintln!("Fee calculation error: {}", e);
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
try:
    pset = tx_builder.finish(wollet)
    print("Transaction built with appropriate fees")
except InsufficientFundsError as e:
    print(f"Insufficient funds for transaction + fees: {e}")
except Exception as e:
    print(f"Fee calculation error: {e}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
try {
    val pset = txBuilder.finish(wollet)
    println("Transaction built with appropriate fees")
} catch (e: InsufficientFundsException) {
    println("Insufficient funds for transaction + fees: ${e.message}")
} catch (e: Exception) {
    println("Fee calculation error: ${e.message}")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
do {
    let pset = try txBuilder.finish(wollet)
    print("Transaction built with appropriate fees")
} catch let error as InsufficientFundsError {
    print("Insufficient funds for transaction + fees: \(error)")
} catch {
    print("Fee calculation error: \(error)")
}
```

</TabItem>
</Tabs>