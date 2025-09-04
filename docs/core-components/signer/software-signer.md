---
id: software-signer
title: Software Signer
sidebar_label: Software Signer
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SwSigner Implementation and Usage

SwSigner provides software-based transaction signing using BIP39 mnemonics with full support for Liquid's confidential transactions and asset operations.

## Creating Software Signers

### From Mnemonic

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_signer::SwSigner;
use bip39::Mnemonic;

let mnemonic_str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
let signer = SwSigner::new(mnemonic_str, false)?; // false for mainnet, true for testnet
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Signer, Mnemonic, Network

mnemonic_str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
mnemonic = Mnemonic(mnemonic_str)
network = Network.testnet()
signer = Signer(mnemonic, network)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val mnemonicStr = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
val mnemonic = Mnemonic(mnemonicStr)
val network = Network.testnet()
val signer = Signer(mnemonic, network)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let mnemonicStr = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
let mnemonic = try Mnemonic(mnemonic: mnemonicStr)
let network = Network.testnet()
let signer = try Signer(mnemonic: mnemonic, network: network)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
import { Signer, Mnemonic, Network } from 'lwk-wasm';

const mnemonicStr = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
const mnemonic = new Mnemonic(mnemonicStr);
const network = Network.testnet();
const signer = new Signer(mnemonic, network);
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using LiquidWalletKit;

string mnemonicStr = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
Mnemonic mnemonic = new Mnemonic(mnemonicStr);
Network network = Network.Testnet();
Signer signer = new Signer(mnemonic, network);
```

</TabItem>
</Tabs>

### Generate New Mnemonic

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Generate random mnemonic and signer
let (signer, mnemonic) = SwSigner::random(false)?; // false for mainnet
println!("Generated mnemonic: {}", mnemonic);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Generate random signer
network = Network.testnet()
signer = Signer.random(network)
mnemonic = signer.mnemonic()
print(f"Generated mnemonic: {mnemonic}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Generate random signer
val network = Network.testnet()
val signer = Signer.random(network)
val mnemonic = signer.mnemonic()
println("Generated mnemonic: $mnemonic")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Generate random signer
let network = Network.testnet()
let signer = try Signer.random(network: network)
let mnemonic = try signer.mnemonic()
print("Generated mnemonic: \(mnemonic)")
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
// Generate random mnemonic first
const mnemonic = Mnemonic.fromRandom(12); // 12 words
const network = Network.testnet();
const signer = new Signer(mnemonic, network);
console.log("Generated mnemonic:", mnemonic.toString());
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Generate random signer
Network network = Network.Testnet();
Signer signer = Signer.Random(network);
Mnemonic mnemonic = signer.Mnemonic();
Console.WriteLine($"Generated mnemonic: {mnemonic}");
```

</TabItem>
</Tabs>

## Key Derivation and Descriptor Creation

### Create Wallet Descriptors

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Create WPKH descriptor with SLIP77 blinding
let desc_str = lwk_common::singlesig_desc(
    &signer,
    lwk_common::Singlesig::Wpkh,
    lwk_common::DescriptorBlindingKey::Slip77,
)?;
let descriptor = WolletDescriptor::new(&desc_str)?;
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Create WPKH descriptor with SLIP77 blinding
descriptor = signer.wpkh_slip77_descriptor()

# Or create custom descriptor types
from lwk import Singlesig, DescriptorBlindingKey
descriptor = signer.singlesig_desc(Singlesig.Wpkh, DescriptorBlindingKey.Slip77)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Create WPKH descriptor with SLIP77 blinding
val descriptor = signer.wpkhSlip77Descriptor()

// Or create custom descriptor types
val descriptor2 = signer.singlesigDesc(Singlesig.WPKH, DescriptorBlindingKey.SLIP77)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Create WPKH descriptor with SLIP77 blinding
let descriptor = try signer.wpkhSlip77Descriptor()

// Or create custom descriptor types
let descriptor2 = try signer.singlesigDesc(
    scriptVariant: Singlesig.wpkh,
    blindingVariant: DescriptorBlindingKey.slip77
)
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
// Create WPKH descriptor with SLIP77 blinding
const descriptor = signer.wpkhSlip77Descriptor();
console.log("Descriptor:", descriptor.toString());
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Create WPKH descriptor with SLIP77 blinding
WolletDescriptor descriptor = signer.WpkhSlip77Descriptor();
Console.WriteLine($"Descriptor: {descriptor}");
```

</TabItem>
</Tabs>

### Key Origin Information

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Get master fingerprint
let fingerprint = signer.fingerprint();

// Get master xpub
let xpub = signer.xpub();
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Get key origin xpub for different BIP standards
from lwk import Bip

bip84_xpub = signer.keyorigin_xpub(Bip.new_bip84())  # Native SegWit
bip49_xpub = signer.keyorigin_xpub(Bip.new_bip49())  # P2SH-wrapped SegWit
bip87_xpub = signer.keyorigin_xpub(Bip.new_bip87())  # Multisig
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get key origin xpub for different BIP standards
val bip84Xpub = signer.keyoriginXpub(Bip.newBip84())  // Native SegWit
val bip49Xpub = signer.keyoriginXpub(Bip.newBip49())  // P2SH-wrapped SegWit
val bip87Xpub = signer.keyoriginXpub(Bip.newBip87())  // Multisig
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Get key origin xpub for different BIP standards
let bip84Xpub = try signer.keyoriginXpub(bip: Bip.newBip84())  // Native SegWit
let bip49Xpub = try signer.keyoriginXpub(bip: Bip.newBip49())  // P2SH-wrapped SegWit
let bip87Xpub = try signer.keyoriginXpub(bip: Bip.newBip87())  // Multisig
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
// Get key origin xpub for different BIP standards
const bip84Xpub = signer.keyoriginXpub(Bip.bip84());  // Native SegWit
const bip49Xpub = signer.keyoriginXpub(Bip.bip49());  // P2SH-wrapped SegWit
const bip87Xpub = signer.keyoriginXpub(Bip.bip87());  // Multisig

// Get master xpub
const masterXpub = signer.getMasterXpub();
console.log("Master fingerprint:", masterXpub.fingerprint());
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Get key origin xpub for different BIP standards
string bip84Xpub = signer.KeyoriginXpub(Bip.NewBip84());  // Native SegWit
string bip49Xpub = signer.KeyoriginXpub(Bip.NewBip49());  // P2SH-wrapped SegWit
string bip87Xpub = signer.KeyoriginXpub(Bip.NewBip87());  // Multisig
```

</TabItem>
</Tabs>

## Signing Operations

### Basic Signing

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_common::Signer;

let mut pset = /* build PSET with TxBuilder */;
let signed_inputs = signer.sign(&mut pset)?;
println!("Signed {} inputs", signed_inputs);
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Sign PSET and return new signed PSET
signed_pset = signer.sign(pset)
print(f"Successfully signed transaction")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Sign PSET and return new signed PSET
val signedPset = signer.sign(pset)
println("Successfully signed transaction")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Sign PSET and return new signed PSET
let signedPset = try signer.sign(pset: pset)
print("Successfully signed transaction")
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
// Sign PSET and return new signed PSET
const signedPset = signer.sign(pset);
console.log("Successfully signed transaction");
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// Sign PSET and return new signed PSET
Pset signedPset = signer.Sign(pset);
Console.WriteLine("Successfully signed transaction");
```

</TabItem>
</Tabs>

### Message Signing

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use elements_miniscript::bitcoin::bip32::DerivationPath;

// Sign message with master key
let message = "Hello, LWK!";
let path = DerivationPath::master();
let signature = signer.sign_message(message, &path)?;
println!("Signature: {}", signature);
```

</TabItem>
<TabItem value="js" label="JS">

```javascript
// Sign message with master key (WASM only)
const message = "Hello, LWK!";
const signature = signer.signMessage(message);
console.log("Signature:", signature);
```

</TabItem>
</Tabs>

## Multi-signature Partial Signing

```rust
// Each signer signs independently
let signer1 = SwSigner::new(&mnemonic1, true)?;
let signer2 = SwSigner::new(&mnemonic2, true)?;

// Partial signing
let signed1 = signer1.sign(&mut pset)?;
let signed2 = signer2.sign(&mut pset)?;

// Check if threshold reached
let is_complete = pset.inputs().iter().all(|input| {
    input.partial_sigs.len() >= threshold
});
```

## Transaction Types

### Standard Transfers
```rust
// SwSigner handles all standard transaction types automatically
let mut pset = TxBuilder::new()
    .add_recipient(&recipient_addr, amount)?
    .finish(&wollet)?;

signer.sign(&mut pset)?;
```

### Asset Operations
```rust
// Asset issuance
let mut issuance_pset = TxBuilder::new()
    .issue_asset(asset_amount, token_amount)?
    .finish(&wollet)?;

signer.sign(&mut issuance_pset)?;

// Asset reissuance
let mut reissuance_pset = TxBuilder::new()
    .reissue_asset(&asset_id, reissue_amount)?
    .finish(&wollet)?;

signer.sign(&mut reissuance_pset)?;
```