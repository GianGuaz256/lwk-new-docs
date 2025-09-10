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

let jade = Jade::from_serial("/dev/ttyUSB0").await?;
let master_id = jade.identifier()?;
let jade_signer = AnySigner::Jade(jade, master_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import WolletDescriptor, Wollet, Network

hardware_xpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

desc_str = f"ct(slip77(master_blinding_key),elwpkh({hardware_xpub}/<0;1>/*))"
descriptor = WolletDescriptor(desc_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val hardwareXpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

val descStr = "ct(slip77(master_blinding_key),elwpkh($hardwareXpub/<0;1>/*))"
val descriptor = WolletDescriptor(descStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let hardwareXpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

let descStr = "ct(slip77(master_blinding_key),elwpkh(\(hardwareXpub)/<0;1>/*))"
let descriptor = try WolletDescriptor(descriptor: descStr)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { JadeWebSocket, Jade } from 'lwk-wasm';

const jadeWs = new JadeWebSocket('ws://192.168.1.100:30121');
const jade = new Jade(jadeWs);

await jade.auth('123456');
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

string hardwareXpub = "[deadbeef/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M";

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

let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;
let master_id = ledger.fingerprint()?;
let ledger_signer = AnySigner::Ledger(ledger, master_id);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import WolletDescriptor, Wollet, Network

ledger_xpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

desc_str = f"ct(slip77(master_blinding_key),elwpkh({ledger_xpub}/<0;1>/*))"
descriptor = WolletDescriptor(desc_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val ledgerXpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

val descStr = "ct(slip77(master_blinding_key),elwpkh($ledgerXpub/<0;1>/*))"
val descriptor = WolletDescriptor(descStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let ledgerXpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"

let descStr = "ct(slip77(master_blinding_key),elwpkh(\(ledgerXpub)/<0;1>/*))"
let descriptor = try WolletDescriptor(descriptor: descStr)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { searchLedgerDevice } from 'lwk-wasm';

const devices = await searchLedgerDevice();
if (devices.length === 0) {
    throw new Error('No Ledger devices found');
}

const ledger = devices[0];
const version = await ledger.getVersion();
console.log('Ledger app version:', version);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

string ledgerXpub = "[ledger_fp/84'/1'/0']tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M";

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

let xpub1 = signer1.keyorigin_xpub(lwk_common::Bip::Bip87, true)?;
let xpub2 = signer2.keyorigin_xpub(lwk_common::Bip::Bip87, true)?;

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

network = Network.regtest_default()
mnemonic1 = Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")
mnemonic2 = Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure")

signer1 = Signer(mnemonic1, network)
signer2 = Signer(mnemonic2, network)

xpub1 = signer1.keyorigin_xpub(Bip.new_bip87())
xpub2 = signer2.keyorigin_xpub(Bip.new_bip87())

desc_str = f"ct(elip151,elwsh(multi(2,{xpub1}/<0;1>/*,{xpub2}/<0;1>/*)))"
descriptor = WolletDescriptor(desc_str)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val network = Network.regtestDefault()
val mnemonic1 = Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")
val mnemonic2 = Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure")

val signer1 = Signer(mnemonic1, network)
val signer2 = Signer(mnemonic2, network)

val xpub1 = signer1.keyoriginXpub(Bip.newBip87())
val xpub2 = signer2.keyoriginXpub(Bip.newBip87())

val descStr = "ct(elip151,elwsh(multi(2,$xpub1/<0;1>/*,$xpub2/<0;1>/*)))"
val descriptor = WolletDescriptor(descStr)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let network = Network.regtestDefault()
let mnemonic1 = try Mnemonic(mnemonic: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")
let mnemonic2 = try Mnemonic(mnemonic: "tissue mix draw siren diesel escape menu misery tube yellow zoo measure")

let signer1 = try Signer(mnemonic: mnemonic1, network: network)
let signer2 = try Signer(mnemonic: mnemonic2, network: network)

let xpub1 = try signer1.keyoriginXpub(bip: Bip.newBip87())
let xpub2 = try signer2.keyoriginXpub(bip: Bip.newBip87())

let descStr = "ct(elip151,elwsh(multi(2,\(xpub1)/<0;1>/*,\(xpub2)/<0;1>/*)))"
let descriptor = try WolletDescriptor(descriptor: descStr)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { Signer, Mnemonic, Network, WolletDescriptor, Bip } from 'lwk-wasm';

const network = Network.regtestDefault();
const mnemonic1 = new Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
const mnemonic2 = new Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure");

const signer1 = new Signer(mnemonic1, network);
const signer2 = new Signer(mnemonic2, network);

const xpub1 = signer1.keyoriginXpub(Bip.bip87());
const xpub2 = signer2.keyoriginXpub(Bip.bip87());

const descStr = `ct(elip151,elwsh(multi(2,${xpub1}/<0;1>/*,${xpub2}/<0;1>/*)))`;
const descriptor = new WolletDescriptor(descStr);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

Network network = Network.RegtestDefault();
Mnemonic mnemonic1 = new Mnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
Mnemonic mnemonic2 = new Mnemonic("tissue mix draw siren diesel escape menu misery tube yellow zoo measure");

Signer signer1 = new Signer(mnemonic1, network);
Signer signer2 = new Signer(mnemonic2, network);

string xpub1 = signer1.KeyoriginXpub(Bip.NewBip87());
string xpub2 = signer2.KeyoriginXpub(Bip.NewBip87());

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
use lwk_jade::Jade;
use lwk_ledger::{Ledger, TransportTcp};
use lwk_signer::AnySigner;

// Setup Jade hardware signer
let jade = Jade::from_serial("/dev/ttyUSB0").await?;
let jade_id = jade.identifier()?;
let jade_signer = AnySigner::Jade(jade, jade_id);

// Or setup Ledger hardware signer
let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;
let ledger_id = ledger.fingerprint()?;
let ledger_signer = AnySigner::Ledger(ledger, ledger_id);

// Direct hardware signing
let signed_inputs = jade_signer.sign(&mut pset)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import TxBuilder, Wollet, Pset

builder = TxBuilder()
builder.add_lbtc_recipient(recipient_address, amount)
pset = builder.finish(wollet)

pset_base64 = pset.serialize()
print(f"Sign this PSET with hardware wallet: {pset_base64}")

# Use external tools like:
# - Jade Companion app
# - Ledger Live
# - HWI (Hardware Wallet Interface)
# - Custom hardware wallet integration

signed_base64 = input("Enter signed PSET from hardware wallet: ")
signed_pset = Pset(signed_base64)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val builder = TxBuilder()
builder.addLbtcRecipient(recipientAddress, amount)
val pset = builder.finish(wollet)

val psetBase64 = pset.serialize()
println("Sign this PSET with hardware wallet: $psetBase64")

// Use external tools like:
// - Jade Companion app
// - Ledger Live
// - HWI (Hardware Wallet Interface)
// - Custom hardware wallet integration

val signedBase64 = readLine() // Get signed PSET from hardware wallet
val signedPset = Pset(signedBase64!!)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let builder = TxBuilder()
try builder.addLbtcRecipient(address: recipientAddress, satoshi: amount)
let pset = try builder.finish(wollet: wollet)

let psetBase64 = pset.serialize()
print("Sign this PSET with hardware wallet: \(psetBase64)")

// Use external tools like:
// - Jade Companion app
// - Ledger Live
// - HWI (Hardware Wallet Interface)
// - Custom hardware wallet integration

// Get signed PSET from hardware wallet
let signedPset = try Pset(pset: signedBase64FromHardware)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { JadeWebSocket, Jade, TxBuilder } from 'lwk-wasm';

// Setup Jade WebSocket connection
const jadeWs = new JadeWebSocket('ws://192.168.1.100:30121');
const jade = new Jade(jadeWs);
await jade.auth('123456');

// Create and sign PSET directly
const builder = new TxBuilder();
builder.addLbtcRecipient(recipientAddress, amount);
const pset = builder.finish(wollet);

const signedPset = await jade.signLiquidTx(pset);
console.log('Transaction signed with Jade hardware wallet');
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

TxBuilder builder = new TxBuilder();
builder.AddLbtcRecipient(recipientAddress, amount);
Pset pset = builder.Finish(wollet);

string psetBase64 = pset.Serialize();
Console.WriteLine($"Sign this PSET with hardware wallet: {psetBase64}");

// Use external tools like:
// - Jade Companion app
// - Ledger Live
// - HWI (Hardware Wallet Interface)
// - Custom hardware wallet integration

Console.Write("Enter signed PSET from hardware wallet: ");
string signedBase64 = Console.ReadLine();
Pset signedPset = new Pset(signedBase64);
```

</TabItem>
</Tabs>

## Development Tips

### Hardware Wallet Setup
1. **Extract xpubs**: Use manufacturer software (Jade Companion, Ledger Live, HWI)
2. **Create descriptors**: Build watch-only wallets with hardware xpubs
3. **External signing**: Export PSETs for hardware wallet signing
4. **Import signatures**: Bring signed PSETs back into LWK wallets
