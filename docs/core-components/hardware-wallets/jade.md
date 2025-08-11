---
id: jade
title: Blockstream Jade
sidebar_label: Jade
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blockstream Jade

Blockstream Jade provides native Liquid support with comprehensive hardware security and multiple connection options.

## Key Features

- **Native Liquid Support**: Built specifically for Liquid with confidential transaction support
- **Multiple Connectivity**: USB, Serial, TCP (emulator), Bluetooth LE
- **Asset Operations**: Full support for issuance, reissuance, and burn operations
- **Large Multisig**: Support for up to 15-of-15 multisig wallets
- **Address Verification**: On-device address verification for enhanced security

## Connection and Setup

### Basic Connection

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_jade::Jade;
use lwk_signer::AnySigner;

// USB/Serial connection (most common)
let mut jade = Jade::from_serial("/dev/ttyUSB0").await?;

// TCP connection (emulator)
let mut jade = Jade::from_tcp("127.0.0.1:30121").await?;

// Authenticate with PIN
jade.auth("123456").await?;

// Create signer
let master_id = jade.identifier()?;
let jade_signer = AnySigner::Jade(jade, master_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Jade, AnySigner

# USB/Serial connection
jade = Jade.from_serial("/dev/ttyUSB0")

# Authenticate with PIN
jade.auth("123456")

# Create signer
master_id = jade.identifier()
jade_signer = AnySigner.jade(jade, master_id)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// USB/Serial connection
val jade = Jade.fromSerial("/dev/ttyUSB0")

// Authenticate with PIN
jade.auth("123456")

// Create signer
val masterId = jade.identifier()
val jadeSigner = AnySigner.Jade(jade, masterId)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// USB/Serial connection
let jade = try Jade.fromSerial(path: "/dev/ttyUSB0")

// Authenticate with PIN
try jade.auth(pin: "123456")

// Create signer
let masterId = try jade.identifier()
let jadeSigner = AnySigner.jade(jade, masterId: masterId)
```

</TabItem>
</Tabs>

### Device Information

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get device information
let version_info = jade.get_version_info().await?;
println!("Jade version: {}", version_info.jade_version);

// Get master fingerprint
let fingerprint = jade.fingerprint()?;
println!("Device fingerprint: {:?}", fingerprint);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get device information
version_info = jade.get_version_info()
print(f"Jade version: {version_info.jade_version}")

# Get master fingerprint
fingerprint = jade.fingerprint()
print(f"Device fingerprint: {fingerprint}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get device information
val versionInfo = jade.getVersionInfo()
println("Jade version: ${versionInfo.jadeVersion}")

// Get master fingerprint
val fingerprint = jade.fingerprint()
println("Device fingerprint: $fingerprint")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get device information
let versionInfo = try jade.getVersionInfo()
print("Jade version: \(versionInfo.jadeVersion)")

// Get master fingerprint
let fingerprint = try jade.fingerprint()
print("Device fingerprint: \(fingerprint)")
```

</TabItem>
</Tabs>

## Core Operations

### Transaction Signing

The primary function of Jade is to securely sign transactions with user confirmation on the device.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Sign any PSET
let signed_inputs = jade_signer.sign(&mut pset)?;
println!("Jade signed {} inputs", signed_inputs);

// User sees transaction details on device and confirms
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sign any PSET
signed_inputs = jade_signer.sign(pset)
print(f"Jade signed {signed_inputs} inputs")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sign any PSET
val signedInputs = jadeSigner.sign(pset)
println("Jade signed $signedInputs inputs")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sign any PSET
let signedInputs = try jadeSigner.sign(pset: &pset)
print("Jade signed \(signedInputs) inputs")
```

</TabItem>
</Tabs>

### Address Generation and Verification

Generate and verify addresses on the device screen for enhanced security.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_jade::get_receive_address::Variant;

// Generate address with on-device verification
let address = jade.get_receive_address(
    &derivation_path,
    Variant::Segwit,
    true // Show on screen for verification
).await?;

println!("Verified address: {}", address);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk.jade import Variant

# Generate and verify address
address = jade.get_receive_address(
    derivation_path,
    Variant.SEGWIT,
    show_on_screen=True
)
print(f"Verified address: {address}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.jade.Variant

// Generate and verify address
val address = jade.getReceiveAddress(
    derivationPath,
    Variant.SEGWIT,
    showOnScreen = true
)
println("Verified address: $address")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Generate and verify address
let address = try jade.getReceiveAddress(
    derivationPath: derivationPath,
    variant: .segwit,
    showOnScreen: true
)
print("Verified address: \(address)")
```

</TabItem>
</Tabs>

## Asset Operations

Jade provides full support for Liquid asset operations with user confirmation.

### Asset Issuance

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Build issuance PSET with TxBuilder
let mut issuance_pset = TxBuilder::new()
    .issue_asset(asset_amount, token_amount)?
    .finish(&wollet)?;

// Sign with Jade (user confirms issuance details)
let signed = jade_signer.sign(&mut issuance_pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Build issuance PSET with TxBuilder
issuance_pset = TxBuilder().issue_asset(asset_amount, token_amount).finish(wollet)

# Sign with Jade (user confirms issuance details)
signed = jade_signer.sign(issuance_pset)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Build issuance PSET with TxBuilder
val issuancePset = TxBuilder()
    .issueAsset(assetAmount, tokenAmount)
    .finish(wollet)

// Sign with Jade (user confirms issuance details)
val signed = jadeSigner.sign(issuancePset)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Build issuance PSET with TxBuilder
let issuancePset = try TxBuilder()
    .issueAsset(assetAmount: assetAmount, tokenAmount: tokenAmount)
    .finish(wollet: wollet)

// Sign with Jade (user confirms issuance details)
let signed = try jadeSigner.sign(pset: issuancePset)
```

</TabItem>
</Tabs>

### Asset Reissuance

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Build reissuance PSET
let mut reissuance_pset = TxBuilder::new()
    .reissue_asset(&asset_id, additional_amount)?
    .finish(&wollet)?;

// Sign with Jade
let signed = jade_signer.sign(&mut reissuance_pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Build reissuance PSET
reissuance_pset = TxBuilder().reissue_asset(asset_id, additional_amount).finish(wollet)

# Sign with Jade
signed = jade_signer.sign(reissuance_pset)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Build reissuance PSET
val reissuancePset = TxBuilder()
    .reissueAsset(assetId, additionalAmount)
    .finish(wollet)

// Sign with Jade
val signed = jadeSigner.sign(reissuancePset)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Build reissuance PSET
let reissuancePset = try TxBuilder()
    .reissueAsset(assetId: assetId, additionalAmount: additionalAmount)
    .finish(wollet: wollet)

// Sign with Jade
let signed = try jadeSigner.sign(pset: reissuancePset)
```

</TabItem>
</Tabs>

### Asset Burning

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Build burn PSET
let mut burn_pset = TxBuilder::new()
    .burn_asset(&asset_id, burn_amount)?
    .finish(&wollet)?;

// Sign with Jade (user confirms burn operation)
let signed = jade_signer.sign(&mut burn_pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Build burn PSET
burn_pset = TxBuilder().burn_asset(asset_id, burn_amount).finish(wollet)

# Sign with Jade (user confirms burn operation)
signed = jade_signer.sign(burn_pset)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Build burn PSET
val burnPset = TxBuilder()
    .burnAsset(assetId, burnAmount)
    .finish(wollet)

// Sign with Jade (user confirms burn operation)
val signed = jadeSigner.sign(burnPset)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Build burn PSET
let burnPset = try TxBuilder()
    .burnAsset(assetId: assetId, burnAmount: burnAmount)
    .finish(wollet: wollet)

// Sign with Jade (user confirms burn operation)
let signed = try jadeSigner.sign(pset: burnPset)
```

</TabItem>
</Tabs>

## Multisig Support

Jade supports large multisig wallets and requires explicit policy registration.

### Register Multisig Policy

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_jade::register_multisig::{RegisterMultisigParams, JadeDescriptor};

let params = RegisterMultisigParams {
    network: elements::bitcoin::Network::Testnet,
    multisig_name: "Business Wallet".to_string(),
    threshold: 2,
    sorted: true,
    cosigners: vec![
        JadeDescriptor {
            fingerprint: Fingerprint::from_str("deadbeef")?,
            derivation_path: DerivationPath::from_str("m/48'/1'/0'/2'")?,
            xpub: "tpub6E...".to_string(),
        },
        // Additional cosigners...
    ],
};

jade.register_multisig(&params).await?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk.jade import RegisterMultisigParams, JadeDescriptor
from lwk import Network

params = RegisterMultisigParams(
    network=Network.TESTNET,
    multisig_name="Business Wallet",
    threshold=2,
    sorted=True,
    cosigners=[
        JadeDescriptor(
            fingerprint="deadbeef",
            derivation_path="m/48'/1'/0'/2'",
            xpub="tpub6E..."
        ),
        # Additional cosigners...
    ]
)

jade.register_multisig(params)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.jade.*

val params = RegisterMultisigParams(
    network = Network.TESTNET,
    multisigName = "Business Wallet",
    threshold = 2,
    sorted = true,
    cosigners = listOf(
        JadeDescriptor(
            fingerprint = "deadbeef",
            derivationPath = "m/48'/1'/0'/2'",
            xpub = "tpub6E..."
        ),
        // Additional cosigners...
    )
)

jade.registerMultisig(params)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let params = RegisterMultisigParams(
    network: .testnet,
    multisigName: "Business Wallet",
    threshold: 2,
    sorted: true,
    cosigners: [
        JadeDescriptor(
            fingerprint: "deadbeef",
            derivationPath: "m/48'/1'/0'/2'",
            xpub: "tpub6E..."
        ),
        // Additional cosigners...
    ]
)

try jade.registerMultisig(params: params)
```

</TabItem>
</Tabs>

### Sign Multisig Transaction

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Sign multisig PSET (requires prior registration)
let signed = jade_signer.sign(&mut multisig_pset)?;
// Jade displays multisig policy and threshold information
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sign multisig PSET (requires prior registration)
signed = jade_signer.sign(multisig_pset)
# Jade displays multisig policy and threshold information
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sign multisig PSET (requires prior registration)
val signed = jadeSigner.sign(multisigPset)
// Jade displays multisig policy and threshold information
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sign multisig PSET (requires prior registration)
let signed = try jadeSigner.sign(pset: &multisigPset)
// Jade displays multisig policy and threshold information
```

</TabItem>
</Tabs>

## Key Derivation

### Extended Public Keys

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Derive extended public keys for different purposes
let bip84_path = DerivationPath::from_str("m/84'/1'/0'")?; // Native SegWit
let bip48_path = DerivationPath::from_str("m/48'/1'/0'/2'")?; // Multisig

let xpub_84 = jade_signer.derive_xpub(&bip84_path)?;
let xpub_48 = jade_signer.derive_xpub(&bip48_path)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Derive extended public keys for different purposes
bip84_path = "m/84'/1'/0'"  # Native SegWit
bip48_path = "m/48'/1'/0'/2'"  # Multisig

xpub_84 = jade_signer.derive_xpub(bip84_path)
xpub_48 = jade_signer.derive_xpub(bip48_path)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Derive extended public keys for different purposes
val bip84Path = "m/84'/1'/0'"  // Native SegWit
val bip48Path = "m/48'/1'/0'/2'"  // Multisig

val xpub84 = jadeSigner.deriveXpub(bip84Path)
val xpub48 = jadeSigner.deriveXpub(bip48Path)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Derive extended public keys for different purposes
let bip84Path = "m/84'/1'/0'"  // Native SegWit
let bip48Path = "m/48'/1'/0'/2'"  // Multisig

let xpub84 = try jadeSigner.deriveXpub(path: bip84Path)
let xpub48 = try jadeSigner.deriveXpub(path: bip48Path)
```

</TabItem>
</Tabs>

### SLIP77 Blinding Key

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get master blinding key for CT descriptors
let master_blinding_key = jade_signer.slip77_master_blinding_key()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get master blinding key for CT descriptors
master_blinding_key = jade_signer.slip77_master_blinding_key()
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get master blinding key for CT descriptors
val masterBlindingKey = jadeSigner.slip77MasterBlindingKey()
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get master blinding key for CT descriptors
let masterBlindingKey = try jadeSigner.slip77MasterBlindingKey()
```

</TabItem>
</Tabs>

## Firmware and Compatibility

### Minimum Requirements
- **Liquid Support**: Jade firmware v0.1.32+
- **Large Multisig**: Jade firmware v0.1.40+
- **Asset Operations**: Jade firmware v0.1.35+

### Feature Matrix
| Operation | Min Firmware | User Confirmation |
|-----------|-------------|-------------------|
| L-BTC Transfers | v0.1.32 | ✅ Amount, recipient |
| Asset Transfers | v0.1.32 | ✅ Asset, amount, recipient |
| Asset Issuance | v0.1.35 | ✅ Asset details |
| Multisig (15-of-15) | v0.1.40 | ✅ Policy details |
| Address Verification | v0.1.32 | ✅ Full address display |

### Checking Firmware

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
let version = jade.get_version_info().await?;
println!("Firmware: {}", version.jade_version);

// Check feature support
if version.supports_feature("large_multisig") {
    println!("Large multisig supported");
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
version = jade.get_version_info()
print(f"Firmware: {version.jade_version}")

# Check feature support
if version.supports_feature("large_multisig"):
    print("Large multisig supported")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val version = jade.getVersionInfo()
println("Firmware: ${version.jadeVersion}")

// Check feature support
if (version.supportsFeature("large_multisig")) {
    println("Large multisig supported")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
let version = try jade.getVersionInfo()
print("Firmware: \(version.jadeVersion)")

// Check feature support
if version.supportsFeature("large_multisig") {
    print("Large multisig supported")
}
```

</TabItem>
</Tabs>

## Error Handling

### Common Error Scenarios

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
match jade_signer.sign(&mut pset) {
    Ok(signed) => println!("Successfully signed {} inputs", signed),
    Err(SignerError::JadeError(jade_err)) => {
        match jade_err {
            JadeError::UserCancelled => println!("User cancelled on device"),
            JadeError::DeviceTimeout => println!("Device operation timed out"),
            JadeError::IncorrectPin => println!("Incorrect PIN entered"),
            JadeError::DeviceLocked => println!("Device locked - too many failed attempts"),
            JadeError::Transport(_) => println!("Connection error - check USB cable"),
            _ => println!("Other Jade error: {}", jade_err),
        }
    },
    Err(e) => println!("Other signing error: {}", e),
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
try:
    signed = jade_signer.sign(pset)
    print(f"Successfully signed {signed} inputs")
except JadeError as jade_err:
    if jade_err.is_user_cancelled():
        print("User cancelled on device")
    elif jade_err.is_device_timeout():
        print("Device operation timed out")
    elif jade_err.is_incorrect_pin():
        print("Incorrect PIN entered")
    elif jade_err.is_device_locked():
        print("Device locked - too many failed attempts")
    elif jade_err.is_transport_error():
        print("Connection error - check USB cable")
    else:
        print(f"Other Jade error: {jade_err}")
except Exception as e:
    print(f"Other signing error: {e}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
try {
    val signed = jadeSigner.sign(pset)
    println("Successfully signed $signed inputs")
} catch (jadeErr: JadeError) {
    when {
        jadeErr.isUserCancelled() -> println("User cancelled on device")
        jadeErr.isDeviceTimeout() -> println("Device operation timed out")
        jadeErr.isIncorrectPin() -> println("Incorrect PIN entered")
        jadeErr.isDeviceLocked() -> println("Device locked - too many failed attempts")
        jadeErr.isTransportError() -> println("Connection error - check USB cable")
        else -> println("Other Jade error: $jadeErr")
    }
} catch (e: Exception) {
    println("Other signing error: $e")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
do {
    let signed = try jadeSigner.sign(pset: &pset)
    print("Successfully signed \(signed) inputs")
} catch let jadeError as JadeError {
    switch jadeError {
    case .userCancelled:
        print("User cancelled on device")
    case .deviceTimeout:
        print("Device operation timed out")
    case .incorrectPin:
        print("Incorrect PIN entered")
    case .deviceLocked:
        print("Device locked - too many failed attempts")
    case .transportError:
        print("Connection error - check USB cable")
    default:
        print("Other Jade error: \(jadeError)")
    }
} catch {
    print("Other signing error: \(error)")
}
```

</TabItem>
</Tabs>

## Development and Testing

### Emulator Support

```bash
# Run Jade emulator with Docker
docker run -p 30121:30121 blockstream/jade:latest
```

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Connect to emulator
let jade = Jade::from_tcp("127.0.0.1:30121").await?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Connect to emulator
jade = Jade.from_tcp("127.0.0.1:30121")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Connect to emulator
val jade = Jade.fromTcp("127.0.0.1:30121")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Connect to emulator
let jade = try Jade.fromTcp(address: "127.0.0.1:30121")
```

</TabItem>
</Tabs>

### Best Practices

1. **Authentication**: Always authenticate before operations
2. **Error Handling**: Handle user cancellation gracefully
3. **Firmware Checks**: Verify firmware version for required features
4. **Connection Management**: Handle device disconnection/reconnection
5. **User Experience**: Provide clear instructions for device confirmation

## Troubleshooting

### Connection Issues
- **Device Not Found**: Check USB cable and permissions
- **Authentication Failed**: Verify PIN and device state
- **Connection Timeout**: Ensure device is unlocked and ready

### Usage Tips
- Keep firmware updated for latest features
- Use emulator for development and testing
- Register multisig policies before signing
- Allow sufficient time for user confirmation on device