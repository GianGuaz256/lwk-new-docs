---
id: address-generation
title: Address Generation
sidebar_label: Address Generation
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Address Derivation and Management

Wollet generates addresses from CT descriptors with automatic blinding key coordination for confidential transactions.

## Address Types

### Receiving Addresses

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let addr = wollet.address(None)?; // Next available
let addr = wollet.address(Some(AddressIndex::New))?; // Force new
let addr = wollet.address(Some(AddressIndex::Peek(5)))?; // Specific index
```

</TabItem>
<TabItem value="python" label="Python">

```python
addr = wollet.address(None)  # Next available
addr = wollet.address(AddressIndex.NEW)  # Force new
addr = wollet.address(AddressIndex.peek(5))  # Specific index
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val addr = wollet.address(null)  // Next available
val addr = wollet.address(AddressIndex.NEW)  // Force new
val addr = wollet.address(AddressIndex.peek(5))  // Specific index
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let addr = try wollet.address(index: nil)  // Next available
let addr = try wollet.address(index: .new)  // Force new
let addr = try wollet.address(index: .peek(5))  // Specific index
```

</TabItem>
</Tabs>

### Change Addresses

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let change_addr = wollet.change_address(None)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
change_addr = wollet.change_address(None)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val changeAddr = wollet.changeAddress(null)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let changeAddr = try wollet.changeAddress(index: nil)
```

</TabItem>
</Tabs>

## Address Formats

### Liquidv1 (Default)
```
lq1qq2xvpcvfup5j8zscjq05u2wxxjcyewk7979f9jrh7v3kqj5rk8kg75rscm5vdqazgtqw4dh4m6y
```

### Legacy Format
```
2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF
```

## Blinding Key Coordination

Each address has an associated blinding key for confidential transactions:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get address with blinding info
let addr_result = wollet.address(None)?;
let address = addr_result.address();      // Liquid address
let blinding_key = addr_result.blinding_key(); // For unblinding
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get address with blinding info
addr_result = wollet.address(None)
address = addr_result.address()      # Liquid address
blinding_key = addr_result.blinding_key()  # For unblinding
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get address with blinding info
val addrResult = wollet.address(null)
val address = addrResult.address()      // Liquid address
val blindingKey = addrResult.blindingKey()  // For unblinding
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get address with blinding info
let addrResult = try wollet.address(index: nil)
let address = addrResult.address()      // Liquid address
let blindingKey = addrResult.blindingKey()  // For unblinding
```

</TabItem>
</Tabs>

## Index Management

### Gap Limit
- Wollet tracks used addresses automatically
- Default gap limit: 20 unused addresses
- Configurable during sync operations

### Address Discovery
```rust
// Full scan with gap limit
let update = electrum_client.full_scan(&wollet, stop_gap: 20, parallel_requests: 10)?;
wollet.apply_update(update)?;
```

## Best Practices

1. **Never Reuse Addresses**: Always generate new addresses for payments
2. **Backup Descriptors**: Store CT descriptors securely for recovery
3. **Monitor Gap Limit**: Adjust based on usage patterns
4. **Validate Before Use**: Verify addresses before sharing with others

## Address Validation

```rust
use elements::Address;

// Parse and validate address
let addr = Address::from_str("lq1qq...")?;
assert!(addr.is_blinded()); // Check if confidential
``` 