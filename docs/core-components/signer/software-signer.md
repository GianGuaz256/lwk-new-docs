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
use lwk_signer::{SwSigner, bip39::Mnemonic};

let mnemonic_str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
let mnemonic = Mnemonic::parse(mnemonic_str)?;
let signer = SwSigner::new(&mnemonic, true)?; // true for testnet
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import SwSigner, Mnemonic

mnemonic_str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
mnemonic = Mnemonic.parse(mnemonic_str)
signer = SwSigner(mnemonic, is_testnet=True)
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

val mnemonicStr = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
val mnemonic = Mnemonic.parse(mnemonicStr)
val signer = SwSigner(mnemonic, isTestnet = true)
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

let mnemonicStr = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
let mnemonic = try Mnemonic.parse(mnemonic: mnemonicStr)
let signer = try SwSigner(mnemonic: mnemonic, isTestnet: true)
```

</TabItem>
</Tabs>

### Generate New Mnemonic

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// Generate 12-word mnemonic
let signer = SwSigner::generate(true, 0)?; // testnet, 12 words

// Generate 24-word mnemonic  
let signer = SwSigner::generate(true, 1)?; // testnet, 24 words
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Generate 12-word mnemonic
signer = SwSigner.generate(is_testnet=True, word_count=0)  # 12 words

# Generate 24-word mnemonic  
signer = SwSigner.generate(is_testnet=True, word_count=1)  # 24 words
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Generate 12-word mnemonic
val signer = SwSigner.generate(isTestnet = true, wordCount = 0)  // 12 words

// Generate 24-word mnemonic  
val signer = SwSigner.generate(isTestnet = true, wordCount = 1)  // 24 words
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// Generate 12-word mnemonic
let signer = try SwSigner.generate(isTestnet: true, wordCount: 0)  // 12 words

// Generate 24-word mnemonic  
let signer = try SwSigner.generate(isTestnet: true, wordCount: 1)  // 24 words
```

</TabItem>
</Tabs>

## Key Derivation

### Master Keys
```rust
// Get master fingerprint
let fingerprint = signer.fingerprint();

// Derive extended public key
let derivation_path = DerivationPath::from_str("m/84'/1'/0'")?;
let xpub = signer.derive_xpub(&derivation_path)?;
```

### Blinding Keys
```rust
// Get SLIP77 master blinding key
let master_blinding_key = signer.slip77_master_blinding_key()?;
```

## Signing Operations

### Basic Signing
```rust
let mut pset = /* build PSET with TxBuilder */;
let signed_inputs = signer.sign(&mut pset)?;
println!("Signed {} inputs", signed_inputs);
```

### Multi-signature Partial Signing
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

## Security Considerations

### Memory Management
- Private keys exist in memory during signing
- Keys are cleared after use where possible
- Use for development and testing environments

### Key Storage
```rust
// Don't store private keys - store mnemonic securely
let mnemonic_words = signer.mnemonic().to_string();
// Store mnemonic_words securely (encrypted, HSM, etc.)
```

### Best Practices
1. **Development Only**: Use software signers for testing
2. **Secure Storage**: Encrypt mnemonic storage
3. **Key Rotation**: Regularly rotate mnemonics for production
4. **Environment Isolation**: Separate dev/prod environments
5. **Backup Strategy**: Secure mnemonic backup procedures

## Error Handling

```rust
match signer.sign(&mut pset) {
    Ok(count) => println!("Signed {} inputs", count),
    Err(SignError::Generic(msg)) => eprintln!("Signing failed: {}", msg),
    Err(SignError::PrivateKeyNotFound) => eprintln!("Required key not found"),
    Err(e) => eprintln!("Other error: {}", e),
}
```

## Testing Utilities

```rust
// Create deterministic signer for tests
let test_mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
let test_signer = SwSigner::new(&Mnemonic::parse(test_mnemonic)?, true)?;

// Generate random signer for property testing
let random_signer = SwSigner::generate(true, 0)?;
``` 