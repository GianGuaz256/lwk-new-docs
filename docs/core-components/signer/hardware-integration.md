---
id: hardware-integration
title: Hardware Integration
sidebar_label: Hardware Integration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Hardware Wallet Abstraction

LWK provides hardware wallet integration supporting Jade and Ledger devices through consistent APIs while handling device-specific communication protocols.

## Supported Devices

### Blockstream Jade

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_jade::Jade;
use lwk_signer::AnySigner;

// USB/Serial connection
let jade = Jade::from_serial("/dev/ttyUSB0").await?;
let master_id = jade.identifier()?;
let jade_signer = AnySigner::Jade(jade, master_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Hardware wallets are integrated through descriptors with xpubs
# Extract xpub from hardware wallet using manufacturer software
# Then create descriptor manually

from lwk import WolletDescriptor, Wollet, Network

# Example with hardware wallet xpub (obtained externally)
hardware_xpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

# Create watch-only descriptor with hardware wallet
desc_str = f"ct(slip77(master_blinding_key),elwpkh({hardware_xpub}/<0;1>/*))"
descriptor = WolletDescriptor(desc_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Hardware wallets are integrated through descriptors with xpubs
// Extract xpub from hardware wallet using manufacturer software
// Then create descriptor manually

import com.blockstream.lwk.*

// Example with hardware wallet xpub (obtained externally)
val hardwareXpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

// Create watch-only descriptor with hardware wallet
val descStr = "ct(slip77(master_blinding_key),elwpkh($hardwareXpub/<0;1>/*))"
val descriptor = WolletDescriptor(descStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Hardware wallets are integrated through descriptors with xpubs
// Extract xpub from hardware wallet using manufacturer software
// Then create descriptor manually

import LiquidWalletKit

// Example with hardware wallet xpub (obtained externally)
let hardwareXpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

// Create watch-only descriptor with hardware wallet
let descStr = "ct(slip77(master_blinding_key),elwpkh(\(hardwareXpub)/<0;1>/*))"
let descriptor = try WolletDescriptor(descriptor: descStr)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { JadeWebSocket, Jade } from 'lwk-wasm';

// WebSocket connection for browser environments
const jadeWs = new JadeWebSocket('ws://192.168.1.100:30121');
const jade = new Jade(jadeWs);

// Authenticate with PIN
await jade.auth('123456');
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Hardware wallets are integrated through descriptors with xpubs
// Extract xpub from hardware wallet using manufacturer software
// Then create descriptor manually

using LiquidWalletKit;

// Example with hardware wallet xpub (obtained externally)
string hardwareXpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M";

// Create watch-only descriptor with hardware wallet
string descStr = $"ct(slip77(master_blinding_key),elwpkh({hardwareXpub}/<0;1>/*))";
WolletDescriptor descriptor = new WolletDescriptor(descStr);
```

</TabItem>
</Tabs>

### Ledger Devices

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_ledger::{Ledger, TransportTcp};
use lwk_signer::AnySigner;

// TCP connection (Speculos emulator)
let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;
let master_id = ledger.fingerprint()?;
let ledger_signer = AnySigner::Ledger(ledger, master_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Same approach as Jade - use xpubs from Ledger device
from lwk import WolletDescriptor, Wollet, Network

# Example with Ledger hardware wallet xpub (obtained via Ledger Live or HWI)
ledger_xpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

# Create watch-only descriptor with Ledger
desc_str = f"ct(slip77(master_blinding_key),elwpkh({ledger_xpub}/<0;1>/*))"
descriptor = WolletDescriptor(desc_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Same approach as Jade - use xpubs from Ledger device
import com.blockstream.lwk.*

// Example with Ledger hardware wallet xpub (obtained via Ledger Live or HWI)
val ledgerXpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

// Create watch-only descriptor with Ledger
val descStr = "ct(slip77(master_blinding_key),elwpkh($ledgerXpub/<0;1>/*))"
val descriptor = WolletDescriptor(descStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Same approach as Jade - use xpubs from Ledger device
import LiquidWalletKit

// Example with Ledger hardware wallet xpub (obtained via Ledger Live or HWI)
let ledgerXpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

// Create watch-only descriptor with Ledger
let descStr = "ct(slip77(master_blinding_key),elwpkh(\(ledgerXpub)/<0;1>/*))"
let descriptor = try WolletDescriptor(descriptor: descStr)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { searchLedgerDevice } from 'lwk-wasm';

// Search for connected Ledger devices
const devices = await searchLedgerDevice();
if (devices.length === 0) {
    throw new Error('No Ledger devices found');
}

// Use first available device
const ledger = devices[0];
const version = await ledger.getVersion();
console.log('Ledger app version:', version);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Same approach as Jade - use xpubs from Ledger device
using LiquidWalletKit;

// Example with Ledger hardware wallet xpub (obtained via Ledger Live or HWI)
string ledgerXpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M";

// Create watch-only descriptor with Ledger
string descStr = $"ct(slip77(master_blinding_key),elwpkh({ledgerXpub}/<0;1>/*))";
WolletDescriptor descriptor = new WolletDescriptor(descStr);
```

</TabItem>
</Tabs>

## Hardware Multisig Wallets

### Creating Multisig Descriptors

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_common::Signer;

// Get xpubs from multiple hardware signers
let xpub1 = signer1.keyorigin_xpub(lwk_common::Bip::Bip87, true)?;
let xpub2 = signer2.keyorigin_xpub(lwk_common::Bip::Bip87, true)?;

// Create 2-of-2 multisig descriptor
let desc_str = format!(
    "ct(elip151,elwsh(multi(2,{}/<0;1>/*,{}/<0;1>/*))",
    xpub1, xpub2
);
let descriptor = WolletDescriptor::new(&desc_str)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Signer, Mnemonic, Network, WolletDescriptor, Bip

# Create signers (one could be hardware-derived)
network = Network.regtest_default()
mnemonic1 = Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")
mnemonic2 = Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure")

signer1 = Signer(mnemonic1, network)
signer2 = Signer(mnemonic2, network)

# Get BIP87 xpubs for multisig
xpub1 = signer1.keyorigin_xpub(Bip.new_bip87())
xpub2 = signer2.keyorigin_xpub(Bip.new_bip87())

# Create 2-of-2 multisig descriptor
desc_str = f"ct(elip151,elwsh(multi(2,{xpub1}/<0;1>/*,{xpub2}/<0;1>/*)))"
descriptor = WolletDescriptor(desc_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Create signers (one could be hardware-derived)
val network = Network.regtestDefault()
val mnemonic1 = Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")
val mnemonic2 = Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure")

val signer1 = Signer(mnemonic1, network)
val signer2 = Signer(mnemonic2, network)

// Get BIP87 xpubs for multisig
val xpub1 = signer1.keyoriginXpub(Bip.newBip87())
val xpub2 = signer2.keyoriginXpub(Bip.newBip87())

// Create 2-of-2 multisig descriptor
val descStr = "ct(elip151,elwsh(multi(2,$xpub1/<0;1>/*,$xpub2/<0;1>/*)))"
val descriptor = WolletDescriptor(descStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Create signers (one could be hardware-derived)
let network = Network.regtestDefault()
let mnemonic1 = try Mnemonic(mnemonic: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")
let mnemonic2 = try Mnemonic(mnemonic: "tissue mix draw siren diesel escape menu misery tube yellow zoo measure")

let signer1 = try Signer(mnemonic: mnemonic1, network: network)
let signer2 = try Signer(mnemonic: mnemonic2, network: network)

// Get BIP87 xpubs for multisig
let xpub1 = try signer1.keyoriginXpub(bip: Bip.newBip87())
let xpub2 = try signer2.keyoriginXpub(bip: Bip.newBip87())

// Create 2-of-2 multisig descriptor
let descStr = "ct(elip151,elwsh(multi(2,\(xpub1)/<0;1>/*,\(xpub2)/<0;1>/*)))"
let descriptor = try WolletDescriptor(descriptor: descStr)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { Signer, Mnemonic, Network, WolletDescriptor, Bip } from 'lwk-wasm';

// Create signers (one could be hardware-derived)
const network = Network.regtestDefault();
const mnemonic1 = new Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
const mnemonic2 = new Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure");

const signer1 = new Signer(mnemonic1, network);
const signer2 = new Signer(mnemonic2, network);

// Get BIP87 xpubs for multisig
const xpub1 = signer1.keyoriginXpub(Bip.bip87());
const xpub2 = signer2.keyoriginXpub(Bip.bip87());

// Create 2-of-2 multisig descriptor
const descStr = `ct(elip151,elwsh(multi(2,${xpub1}/<0;1>/*,${xpub2}/<0;1>/*)))`;
const descriptor = new WolletDescriptor(descStr);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

// Create signers (one could be hardware-derived)
Network network = Network.RegtestDefault();
Mnemonic mnemonic1 = new Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
Mnemonic mnemonic2 = new Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure");

Signer signer1 = new Signer(mnemonic1, network);
Signer signer2 = new Signer(mnemonic2, network);

// Get BIP87 xpubs for multisig
string xpub1 = signer1.KeyoriginXpub(Bip.NewBip87());
string xpub2 = signer2.KeyoriginXpub(Bip.NewBip87());

// Create 2-of-2 multisig descriptor
string descStr = $"ct(elip151,elwsh(multi(2,{xpub1}/<0;1>/*,{xpub2}/<0;1>/*)))";
WolletDescriptor descriptor = new WolletDescriptor(descStr);
```

</TabItem>
</Tabs>

## PSET Signing with Hardware Wallets

### External Signing Workflow

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Direct hardware signing with AnySigner
let signed_inputs = hardware_signer.sign(&mut pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Export PSET for external signing
from lwk import TxBuilder, Wollet

# Create unsigned PSET
builder = TxBuilder()
builder.add_lbtc_recipient(recipient_address, amount)
pset = builder.finish(wollet)

# Export PSET as base64 for hardware wallet
pset_base64 = pset.serialize()
print(f"Sign this PSET with hardware wallet: {pset_base64}")

# After external signing, import signed PSET
# signed_pset = Pset(signed_base64_from_hardware)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Export PSET for external signing
import com.blockstream.lwk.*

// Create unsigned PSET
val builder = TxBuilder()
builder.addLbtcRecipient(recipientAddress, amount)
val pset = builder.finish(wollet)

// Export PSET as base64 for hardware wallet
val psetBase64 = pset.serialize()
println("Sign this PSET with hardware wallet: $psetBase64")

// After external signing, import signed PSET
// val signedPset = Pset(signedBase64FromHardware)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Export PSET for external signing
import LiquidWalletKit

// Create unsigned PSET
let builder = TxBuilder()
try builder.addLbtcRecipient(address: recipientAddress, satoshi: amount)
let pset = try builder.finish(wollet: wollet)

// Export PSET as base64 for hardware wallet
let psetBase64 = pset.serialize()
print("Sign this PSET with hardware wallet: \(psetBase64)")

// After external signing, import signed PSET
// let signedPset = try Pset(pset: signedBase64FromHardware)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
// Direct hardware signing available in WASM
const signedPset = await jade.signLiquidTx(pset);
console.log('Transaction signed with hardware wallet');
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Export PSET for external signing
using LiquidWalletKit;

// Create unsigned PSET
TxBuilder builder = new TxBuilder();
builder.AddLbtcRecipient(recipientAddress, amount);
Pset pset = builder.Finish(wollet);

// Export PSET as base64 for hardware wallet
string psetBase64 = pset.Serialize();
Console.WriteLine($"Sign this PSET with hardware wallet: {psetBase64}");

// After external signing, import signed PSET
// Pset signedPset = new Pset(signedBase64FromHardware);
```

</TabItem>
</Tabs>

## Development Tips

### Hardware Wallet Setup
1. **Extract xpubs**: Use manufacturer software (Jade Companion, Ledger Live, HWI)
2. **Create descriptors**: Build watch-only wallets with hardware xpubs
3. **External signing**: Export PSETs for hardware wallet signing
4. **Import signatures**: Bring signed PSETs back into LWK wallets

### Best Practices
1. **Use Emulators**: Start with device emulators for development
2. **Verify xpubs**: Always verify extended public keys match your hardware device
3. **Test thoroughly**: Validate signing workflow before production use
4. **Backup descriptors**: Store wallet descriptors securely for recovery