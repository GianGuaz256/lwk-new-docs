---
id: ledger
title: Ledger Devices
sidebar_label: Ledger
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ledger Devices

Ledger hardware wallets provide enterprise-grade security for Liquid operations through the Elements app with comprehensive transaction signing and address verification.

## Key Features

- **Elements App**: Dedicated Liquid support via Ledger Elements application
- **Enterprise Security**: Bank-grade secure element protection
- **HID Communication**: Standard USB HID protocol support
- **Address Verification**: On-device address verification
- **Multisig Support**: Standard multisig wallet operations

## Setup and Connection

### Prerequisites

1. **Install Elements App**: Install the Elements app on your Ledger device via Ledger Live
2. **Device Authentication**: Unlock device with PIN
3. **Open Elements App**: Navigate to and open the Elements app on device

### Basic Connection

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_ledger::{Ledger, TransportTcp};
use lwk_signer::AnySigner;

// TCP connection (Speculos emulator)
let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;

// Get device information
let version = ledger.get_version()?;
println!("Elements app version: {}", version);

// Create signer
let master_id = ledger.fingerprint()?;
let ledger_signer = AnySigner::Ledger(ledger, master_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Ledger, TransportTcp, AnySigner

# TCP connection (Speculos emulator)
transport = TransportTcp("127.0.0.1:9999")
ledger = Ledger(transport)

# Get device information
version = ledger.get_version()
print(f"Elements app version: {version}")

# Create signer
master_id = ledger.fingerprint()
ledger_signer = AnySigner.ledger(ledger, master_id)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// TCP connection (Speculos emulator)
val transport = TransportTcp("127.0.0.1:9999")
val ledger = Ledger(transport)

// Get device information
val version = ledger.getVersion()
println("Elements app version: $version")

// Create signer
val masterId = ledger.fingerprint()
val ledgerSigner = AnySigner.Ledger(ledger, masterId)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// TCP connection (Speculos emulator)
let transport = try TransportTcp(address: "127.0.0.1:9999")
let ledger = try Ledger(transport: transport)

// Get device information
let version = try ledger.getVersion()
print("Elements app version: \(version)")

// Create signer
let masterId = try ledger.fingerprint()
let ledgerSigner = AnySigner.ledger(ledger, masterId: masterId)
```

</TabItem>
</Tabs>

### Production USB Connection

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Note: USB HID connection implementation varies by platform
// Typically requires platform-specific HID libraries

#[cfg(feature = "usb")]
use lwk_ledger::TransportHid;

let transport = TransportHid::new()?; // Auto-detect Ledger device
let ledger = Ledger::new(transport)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Note: USB HID connection implementation varies by platform
from lwk import TransportHid, Ledger

transport = TransportHid()  # Auto-detect Ledger device
ledger = Ledger(transport)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Note: USB HID connection implementation varies by platform
import com.blockstream.lwk.*

val transport = TransportHid()  // Auto-detect Ledger device
val ledger = Ledger(transport)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Note: USB HID connection implementation varies by platform
import LiquidWalletKit

let transport = try TransportHid()  // Auto-detect Ledger device
let ledger = try Ledger(transport: transport)
```

</TabItem>
</Tabs>

## Core Operations

### Transaction Signing

The primary function of Ledger is to securely sign transactions with user confirmation on the device.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Sign any PSET
let signed_inputs = ledger_signer.sign(&mut pset)?;
println!("Ledger signed {} inputs", signed_inputs);

// User reviews transaction details on device and confirms
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sign any PSET
signed_inputs = ledger_signer.sign(pset)
print(f"Ledger signed {signed_inputs} inputs")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sign any PSET
val signedInputs = ledgerSigner.sign(pset)
println("Ledger signed $signedInputs inputs")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sign any PSET
let signedInputs = try ledgerSigner.sign(pset: &pset)
print("Ledger signed \(signedInputs) inputs")
```

</TabItem>
</Tabs>

### Address Generation and Verification

Generate and verify addresses on the device screen.

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Note: Address verification requires specific APDU commands
// Implementation varies based on Ledger Elements app version

let derivation_path = DerivationPath::from_str("m/84'/1'/0'/0/0")?;

// Get address (implementation specific to Elements app)
let address = ledger.get_address(&derivation_path, true)?; // true = show on screen
println!("Verified address: {}", address);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Note: Address verification requires specific APDU commands
# Implementation varies based on Ledger Elements app version

derivation_path = "m/84'/1'/0'/0/0"

# Get address (implementation specific to Elements app)
address = ledger.get_address(derivation_path, show_on_screen=True)
print(f"Verified address: {address}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Note: Address verification requires specific APDU commands
// Implementation varies based on Ledger Elements app version

val derivationPath = "m/84'/1'/0'/0/0"

// Get address (implementation specific to Elements app)
val address = ledger.getAddress(derivationPath, showOnScreen = true)
println("Verified address: $address")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Note: Address verification requires specific APDU commands
// Implementation varies based on Ledger Elements app version

let derivationPath = "m/84'/1'/0'/0/0"

// Get address (implementation specific to Elements app)
let address = try ledger.getAddress(derivationPath: derivationPath, showOnScreen: true)
print("Verified address: \(address)")
```

</TabItem>
</Tabs>

## Asset Operations

Ledger supports Liquid asset operations through the Elements app.

### Standard Asset Transfers

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Sign asset transfer transactions
let mut asset_pset = TxBuilder::new()
    .add_recipient(&recipient_addr, amount)?
    .add_asset_recipient(&asset_recipient_addr, asset_id, asset_amount)?
    .finish(&wollet)?;

let signed = ledger_signer.sign(&mut asset_pset)?;
// User confirms asset details on device
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sign asset transfer transactions
asset_pset = TxBuilder() \
    .add_recipient(recipient_addr, amount) \
    .add_asset_recipient(asset_recipient_addr, asset_id, asset_amount) \
    .finish(wollet)

signed = ledger_signer.sign(asset_pset)
# User confirms asset details on device
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sign asset transfer transactions
val assetPset = TxBuilder()
    .addRecipient(recipientAddr, amount)
    .addAssetRecipient(assetRecipientAddr, assetId, assetAmount)
    .finish(wollet)

val signed = ledgerSigner.sign(assetPset)
// User confirms asset details on device
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sign asset transfer transactions
let assetPset = try TxBuilder()
    .addRecipient(address: recipientAddr, amount: amount)
    .addAssetRecipient(address: assetRecipientAddr, assetId: assetId, amount: assetAmount)
    .finish(wollet: wollet)

let signed = try ledgerSigner.sign(pset: assetPset)
// User confirms asset details on device
```

</TabItem>
</Tabs>

### Asset Issuance (Limited Support)

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Asset issuance support depends on Elements app version
let mut issuance_pset = TxBuilder::new()
    .issue_asset(asset_amount, token_amount)?
    .finish(&wollet)?;

// May require specific app version and additional confirmations
let signed = ledger_signer.sign(&mut issuance_pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Asset issuance support depends on Elements app version
issuance_pset = TxBuilder().issue_asset(asset_amount, token_amount).finish(wollet)

# May require specific app version and additional confirmations
signed = ledger_signer.sign(issuance_pset)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Asset issuance support depends on Elements app version
val issuancePset = TxBuilder()
    .issueAsset(assetAmount, tokenAmount)
    .finish(wollet)

// May require specific app version and additional confirmations
val signed = ledgerSigner.sign(issuancePset)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Asset issuance support depends on Elements app version
let issuancePset = try TxBuilder()
    .issueAsset(assetAmount: assetAmount, tokenAmount: tokenAmount)
    .finish(wollet: wollet)

// May require specific app version and additional confirmations
let signed = try ledgerSigner.sign(pset: issuancePset)
```

</TabItem>
</Tabs>

## Key Derivation

### Extended Public Keys

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Derive extended public keys
let bip84_path = DerivationPath::from_str("m/84'/1'/0'")?; // Native SegWit
let bip48_path = DerivationPath::from_str("m/48'/1'/0'/2'")?; // Multisig

let xpub_84 = ledger_signer.derive_xpub(&bip84_path)?;
let xpub_48 = ledger_signer.derive_xpub(&bip48_path)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Derive extended public keys
bip84_path = "m/84'/1'/0'"  # Native SegWit
bip48_path = "m/48'/1'/0'/2'"  # Multisig

xpub_84 = ledger_signer.derive_xpub(bip84_path)
xpub_48 = ledger_signer.derive_xpub(bip48_path)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Derive extended public keys
val bip84Path = "m/84'/1'/0'"  // Native SegWit
val bip48Path = "m/48'/1'/0'/2'"  // Multisig

val xpub84 = ledgerSigner.deriveXpub(bip84Path)
val xpub48 = ledgerSigner.deriveXpub(bip48Path)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Derive extended public keys
let bip84Path = "m/84'/1'/0'"  // Native SegWit
let bip48Path = "m/48'/1'/0'/2'"  // Multisig

let xpub84 = try ledgerSigner.deriveXpub(path: bip84Path)
let xpub48 = try ledgerSigner.deriveXpub(path: bip48Path)
```

</TabItem>
</Tabs>

### SLIP77 Blinding Key

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get master blinding key (if supported by app version)
let master_blinding_key = ledger_signer.slip77_master_blinding_key()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get master blinding key (if supported by app version)
master_blinding_key = ledger_signer.slip77_master_blinding_key()
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get master blinding key (if supported by app version)
val masterBlindingKey = ledgerSigner.slip77MasterBlindingKey()
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get master blinding key (if supported by app version)
let masterBlindingKey = try ledgerSigner.slip77MasterBlindingKey()
```

</TabItem>
</Tabs>

## Multisig Support

Ledger supports standard multisig operations through the Elements app.

### Multisig Signing

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Sign multisig PSET
let signed = ledger_signer.sign(&mut multisig_pset)?;
// Device shows multisig details and signature requirements
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sign multisig PSET
signed = ledger_signer.sign(multisig_pset)
# Device shows multisig details and signature requirements
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sign multisig PSET
val signed = ledgerSigner.sign(multisigPset)
// Device shows multisig details and signature requirements
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sign multisig PSET
let signed = try ledgerSigner.sign(pset: &multisigPset)
// Device shows multisig details and signature requirements
```

</TabItem>
</Tabs>

Note: Unlike Jade, Ledger typically doesn't require explicit multisig policy registration, but may have limitations on multisig complexity.

## Device Capabilities

### Supported Operations
| Operation | Support Level | Notes |
|-----------|--------------|-------|
| L-BTC Transfers | ✅ Full | Standard transaction signing |
| Asset Transfers | ✅ Full | All registered assets |
| Asset Issuance | ⚠️ Limited | Depends on app version |
| Multisig | ✅ Standard | Up to standard complexity |
| Address Verification | ✅ Full | On-device display |
| Confidential Transactions | ✅ Full | Native CT support |

### Elements App Versions
- **Minimum Version**: Check Ledger Live for latest supported version
- **Recommended**: Always use latest Elements app version
- **Feature Support**: Newer versions may include additional Liquid features

## Error Handling

### Common Error Scenarios

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
match ledger_signer.sign(&mut pset) {
    Ok(signed) => println!("Successfully signed {} inputs", signed),
    Err(SignerError::LedgerError(ledger_err)) => {
        match ledger_err {
            LedgerError::UserCancelled => println!("User cancelled on device"),
            LedgerError::DeviceTimeout => println!("Device operation timed out"),
            LedgerError::AppNotOpen => println!("Elements app not open on device"),
            LedgerError::DeviceNotFound => println!("Ledger device not connected"),
            LedgerError::InvalidResponse => println!("Invalid response from device"),
            LedgerError::TransportError(_) => println!("Communication error"),
            _ => println!("Other Ledger error: {}", ledger_err),
        }
    },
    Err(e) => println!("Other signing error: {}", e),
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
try:
    signed = ledger_signer.sign(pset)
    print(f"Successfully signed {signed} inputs")
except LedgerError as ledger_err:
    if ledger_err.is_user_cancelled():
        print("User cancelled on device")
    elif ledger_err.is_device_timeout():
        print("Device operation timed out")
    elif ledger_err.is_app_not_open():
        print("Elements app not open on device")
    elif ledger_err.is_device_not_found():
        print("Ledger device not connected")
    elif ledger_err.is_invalid_response():
        print("Invalid response from device")
    elif ledger_err.is_transport_error():
        print("Communication error")
    else:
        print(f"Other Ledger error: {ledger_err}")
except Exception as e:
    print(f"Other signing error: {e}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
try {
    val signed = ledgerSigner.sign(pset)
    println("Successfully signed $signed inputs")
} catch (ledgerErr: LedgerError) {
    when {
        ledgerErr.isUserCancelled() -> println("User cancelled on device")
        ledgerErr.isDeviceTimeout() -> println("Device operation timed out")
        ledgerErr.isAppNotOpen() -> println("Elements app not open on device")
        ledgerErr.isDeviceNotFound() -> println("Ledger device not connected")
        ledgerErr.isInvalidResponse() -> println("Invalid response from device")
        ledgerErr.isTransportError() -> println("Communication error")
        else -> println("Other Ledger error: $ledgerErr")
    }
} catch (e: Exception) {
    println("Other signing error: $e")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
do {
    let signed = try ledgerSigner.sign(pset: &pset)
    print("Successfully signed \(signed) inputs")
} catch let ledgerError as LedgerError {
    switch ledgerError {
    case .userCancelled:
        print("User cancelled on device")
    case .deviceTimeout:
        print("Device operation timed out")
    case .appNotOpen:
        print("Elements app not open on device")
    case .deviceNotFound:
        print("Ledger device not connected")
    case .invalidResponse:
        print("Invalid response from device")
    case .transportError:
        print("Communication error")
    default:
        print("Other Ledger error: \(ledgerError)")
    }
} catch {
    print("Other signing error: \(error)")
}
```

</TabItem>
</Tabs>

## Development and Testing

### Speculos Emulator

Ledger provides the Speculos emulator for development and testing.

```bash
# Install Speculos
pip install speculos

# Run Ledger emulator with Elements app
speculos --model nanos --display headless --apdu-port 9999 elements-app.elf
```

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Connect to emulator
let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Connect to emulator
transport = TransportTcp("127.0.0.1:9999")
ledger = Ledger(transport)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Connect to emulator
val transport = TransportTcp("127.0.0.1:9999")
val ledger = Ledger(transport)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Connect to emulator
let transport = try TransportTcp(address: "127.0.0.1:9999")
let ledger = try Ledger(transport: transport)
```

</TabItem>
</Tabs>

### Testing Workflow

1. **Start Emulator**: Launch Speculos with Elements app
2. **Connect**: Establish TCP connection to emulator
3. **Test Operations**: Run signing and key derivation tests
4. **Validate**: Verify expected behavior and error handling

## Platform-Specific Considerations

### USB HID Support

#### Linux
```bash
# Add udev rules for Ledger devices
sudo wget -q -O - https://raw.githubusercontent.com/LedgerHQ/udev-rules/master/add_udev_rules.sh | sudo bash
```

#### macOS
```bash
# No additional setup required for HID support
```

#### Windows
```bash
# Install Ledger Live which includes necessary drivers
```

### Connection Examples

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Platform-specific USB connection (when available)
#[cfg(target_os = "linux")]
let transport = TransportHid::open_device("/dev/hidraw0")?;

#[cfg(target_os = "macos")]
let transport = TransportHid::auto_connect()?;

#[cfg(target_os = "windows")]
let transport = TransportHid::enumerate_and_connect()?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Platform-specific USB connection (when available)
import sys

if sys.platform.startswith('linux'):
    transport = TransportHid.open_device("/dev/hidraw0")
elif sys.platform == 'darwin':  # macOS
    transport = TransportHid.auto_connect()
elif sys.platform == 'win32':  # Windows
    transport = TransportHid.enumerate_and_connect()
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Platform-specific USB connection (when available)
import java.lang.System

val transport = when {
    System.getProperty("os.name").lowercase().contains("linux") -> 
        TransportHid.openDevice("/dev/hidraw0")
    System.getProperty("os.name").lowercase().contains("mac") -> 
        TransportHid.autoConnect()
    System.getProperty("os.name").lowercase().contains("windows") -> 
        TransportHid.enumerateAndConnect()
    else -> throw UnsupportedOperationException("Unsupported platform")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Platform-specific USB connection (when available)
#if os(Linux)
let transport = try TransportHid.openDevice(path: "/dev/hidraw0")
#elseif os(macOS)
let transport = try TransportHid.autoConnect()
#elseif os(Windows)
let transport = try TransportHid.enumerateAndConnect()
#endif
```

</TabItem>
</Tabs>

## Best Practices

### Security
1. **Verify App**: Always verify Elements app is genuine via Ledger Live
2. **Firmware Updates**: Keep device firmware current
3. **App Updates**: Use latest Elements app version
4. **Physical Security**: Secure device when not in use

### Development
1. **Use Emulator**: Start development with Speculos emulator
2. **Error Handling**: Implement comprehensive error handling
3. **User Experience**: Provide clear device interaction instructions
4. **Testing**: Test with both emulator and physical devices

### Operations
1. **App State**: Ensure Elements app is open before operations
2. **Timeouts**: Allow sufficient time for user confirmation
3. **Connection Management**: Handle device disconnection gracefully
4. **User Guidance**: Provide clear instructions for device interactions

## Troubleshooting

### Common Issues

#### Device Not Found
- Check USB connection
- Verify Ledger Live drivers installed
- Ensure device is unlocked

#### Elements App Issues
- Confirm Elements app is installed and up to date
- Verify app is open on device
- Check app permissions in Ledger Live

#### Communication Errors
- Try different USB cable/port
- Restart Ledger Live
- Reinstall device drivers if necessary

#### Transaction Signing Issues
- Verify transaction is valid
- Check device battery level
- Ensure sufficient time for user review

### Debug Commands

```bash
# Check device connectivity (when available)
lwk_cli ledger-info --tcp 127.0.0.1:9999

# Test basic communication
lwk_cli test-ledger-connection
```