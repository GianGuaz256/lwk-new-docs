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
<TabItem value="wasm" label="WASM">

```javascript
const addr = wollet.address(null); // Next available
const addr = wollet.address(AddressIndex.new()); // Force new
const addr = wollet.address(AddressIndex.peek(5)); // Specific index
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var addr = wollet.Address(null); // Next available
var addr = wollet.Address(AddressIndex.New); // Force new
var addr = wollet.Address(AddressIndex.Peek(5)); // Specific index
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
<TabItem value="wasm" label="WASM">

```javascript
const changeAddr = wollet.changeAddress(null);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
var changeAddr = wollet.ChangeAddress(null);
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
<TabItem value="wasm" label="WASM">

```javascript
// Get address with blinding info
const addrResult = wollet.address(null);
const address = addrResult.address();      // Liquid address
const blindingKey = addrResult.blindingKey();  // For unblinding
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Get address with blinding info
var addrResult = wollet.Address(null);
var address = addrResult.Address();      // Liquid address
var blindingKey = addrResult.BlindingKey();  // For unblinding
```

</TabItem>
</Tabs>

## Index Management

### Gap Limit
- Wollet tracks used addresses automatically
- Default gap limit: 20 unused addresses
- Configurable during sync operations

### Address Discovery

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Full scan with gap limit
let update = electrum_client.full_scan(&wollet, stop_gap: 20, parallel_requests: 10)?;
wollet.apply_update(update)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Full scan with gap limit
update = electrum_client.full_scan(wollet, stop_gap=20, parallel_requests=10)
wollet.apply_update(update)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Full scan with gap limit
val update = electrumClient.fullScan(wollet, stopGap = 20u, parallelRequests = 10u)
wollet.applyUpdate(update)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Full scan with gap limit
let update = try electrumClient.fullScan(wollet: wollet, stopGap: 20, parallelRequests: 10)
try wollet.applyUpdate(update: update)
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
// Full scan with gap limit
const update = await electrumClient.fullScan(wollet, 20, 10);
if (update) {
    wollet.applyUpdate(update);
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Full scan with gap limit
var update = electrumClient.FullScan(wollet, stopGap: 20, parallelRequests: 10);
wollet.ApplyUpdate(update);
```

</TabItem>
</Tabs>

## Best Practices

1. **Never Reuse Addresses**: Always generate new addresses for payments
2. **Backup Descriptors**: Store CT descriptors securely for recovery
3. **Monitor Gap Limit**: Adjust based on usage patterns
4. **Validate Before Use**: Verify addresses before sharing with others

## Address Validation

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use elements::Address;

// Parse and validate address
let addr = Address::from_str("lq1qq...")?;
assert!(addr.is_blinded()); // Check if confidential
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Address

# Parse and validate address
addr = Address.from_str("lq1qq...")
assert addr.is_blinded()  # Check if confidential
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.Address

// Parse and validate address
val addr = Address.fromStr("lq1qq...")
assert(addr.isBlinded()) // Check if confidential
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Parse and validate address
let addr = try Address(address: "lq1qq...")
assert(addr.isBlinded()) // Check if confidential
```

</TabItem>
<TabItem value="wasm" label="WASM">

```javascript
import { Address } from 'lwk-wasm';

// Parse and validate address
const addr = Address.fromStr("lq1qq...");
console.assert(addr.isBlinded()); // Check if confidential
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

// Parse and validate address
var addr = Address.FromStr("lq1qq...");
Debug.Assert(addr.IsBlinded()); // Check if confidential
```

</TabItem>
</Tabs> 