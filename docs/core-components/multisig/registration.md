---
id: registration
title: Registration
sidebar_label: Registration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Registering Multisig Wallets with Hardware Devices

Hardware wallet registration is a critical step in multisig setup that allows hardware devices to understand, validate, and display multisig transaction details correctly. In LWK, this process involves converting standard wallet descriptors into hardware-specific formats and storing the policy on the device.

## Why Registration is Required

Hardware wallets need to register multisig policies for several important reasons. First and foremost, registration enables the device to properly validate transaction details before signing, ensuring that the user sees accurate information about what they're authorizing. Without registration, hardware wallets cannot interpret multisig scripts correctly, potentially leading to security vulnerabilities or user confusion.

Additionally, registration allows hardware wallets to display meaningful information on their screens, such as which multisig wallet is being used, the threshold requirements, and the co-signers involved. This transparency is crucial for user confidence and security verification.

## LWK Multisig Registration Architecture

LWK implements multisig registration through a conversion layer that translates standard Elements descriptors into hardware-specific formats. The most comprehensive support is provided for Jade hardware wallets, which can store and manage multiple multisig policies simultaneously.

### JadeDescriptor Structure

LWK converts standard multisig descriptors into `JadeDescriptor` format for Jade registration:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_jade::{RegisterMultisigParams, JadeDescriptor, MultisigSigner};
use lwk_common::Network;
use elements::bitcoin::bip32::{Fingerprint, Xpub};

// Example of how LWK creates a JadeDescriptor from a standard descriptor
let jade_descriptor = JadeDescriptor {
    variant: "wsh(multi(k))".to_string(), // Script type
    sorted: false, // Whether keys are sorted (typically false for LWK)
    threshold: 2,  // M in M-of-N
    master_blinding_key: master_blinding_key_bytes, // 32-byte SLIP-77 key
    signers: vec![
        MultisigSigner {
            fingerprint: Fingerprint::from([0xde, 0xad, 0xbe, 0xef]),
            derivation: vec![], // Path from fingerprint to key used
            xpub: participant1_xpub,
            path: vec![], // Additional path for address derivation
        },
        MultisigSigner {
            fingerprint: Fingerprint::from([0xca, 0xfe, 0xba, 0xbe]),
            derivation: vec![],
            xpub: participant2_xpub,
            path: vec![],
        },
        MultisigSigner {
            fingerprint: Fingerprint::from([0xfa, 0xce, 0xfe, 0xed]),
            derivation: vec![],
            xpub: participant3_xpub,
            path: vec![],
        },
    ],
};

println!("Jade descriptor prepared for registration");
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import JadeDescriptor, MultisigSigner, Fingerprint

# Example of how LWK creates a JadeDescriptor from a standard descriptor
jade_descriptor = JadeDescriptor(
    variant="wsh(multi(k))",  # Script type
    sorted=False,  # Whether keys are sorted (typically false for LWK)
    threshold=2,   # M in M-of-N
    master_blinding_key=master_blinding_key_bytes,  # 32-byte SLIP-77 key
    signers=[
        MultisigSigner(
            fingerprint=Fingerprint([0xde, 0xad, 0xbe, 0xef]),
            derivation=[],  # Path from fingerprint to key used
            xpub=participant1_xpub,
            path=[],  # Additional path for address derivation
        ),
        MultisigSigner(
            fingerprint=Fingerprint([0xca, 0xfe, 0xba, 0xbe]),
            derivation=[],
            xpub=participant2_xpub,
            path=[],
        ),
        MultisigSigner(
            fingerprint=Fingerprint([0xfa, 0xce, 0xfe, 0xed]),
            derivation=[],
            xpub=participant3_xpub,
            path=[],
        ),
    ]
)

print("Jade descriptor prepared for registration")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Example of how LWK creates a JadeDescriptor from a standard descriptor
val jadeDescriptor = JadeDescriptor(
    variant = "wsh(multi(k))",  // Script type
    sorted = false,  // Whether keys are sorted (typically false for LWK)
    threshold = 2,   // M in M-of-N
    masterBlindingKey = masterBlindingKeyBytes,  // 32-byte SLIP-77 key
    signers = listOf(
        MultisigSigner(
            fingerprint = Fingerprint(byteArrayOf(0xde.toByte(), 0xad.toByte(), 0xbe.toByte(), 0xef.toByte())),
            derivation = emptyList(),  // Path from fingerprint to key used
            xpub = participant1Xpub,
            path = emptyList(),  // Additional path for address derivation
        ),
        MultisigSigner(
            fingerprint = Fingerprint(byteArrayOf(0xca.toByte(), 0xfe.toByte(), 0xba.toByte(), 0xbe.toByte())),
            derivation = emptyList(),
            xpub = participant2Xpub,
            path = emptyList(),
        ),
        MultisigSigner(
            fingerprint = Fingerprint(byteArrayOf(0xfa.toByte(), 0xce.toByte(), 0xfe.toByte(), 0xed.toByte())),
            derivation = emptyList(),
            xpub = participant3Xpub,
            path = emptyList(),
        ),
    )
)

println("Jade descriptor prepared for registration")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Example of how LWK creates a JadeDescriptor from a standard descriptor
let jadeDescriptor = JadeDescriptor(
    variant: "wsh(multi(k))",  // Script type
    sorted: false,  // Whether keys are sorted (typically false for LWK)
    threshold: 2,   // M in M-of-N
    masterBlindingKey: masterBlindingKeyBytes,  // 32-byte SLIP-77 key
    signers: [
        MultisigSigner(
            fingerprint: Fingerprint([0xde, 0xad, 0xbe, 0xef]),
            derivation: [],  // Path from fingerprint to key used
            xpub: participant1Xpub,
            path: []  // Additional path for address derivation
        ),
        MultisigSigner(
            fingerprint: Fingerprint([0xca, 0xfe, 0xba, 0xbe]),
            derivation: [],
            xpub: participant2Xpub,
            path: []
        ),
        MultisigSigner(
            fingerprint: Fingerprint([0xfa, 0xce, 0xfe, 0xed]),
            derivation: [],
            xpub: participant3Xpub,
            path: []
        ),
    ]
)

print("Jade descriptor prepared for registration")
```

</TabItem>
</Tabs>

## Automatic Registration with LWK App

The most straightforward way to register multisig wallets with hardware devices is through the LWK app, which handles the conversion and registration process automatically:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_app::Client;

// Connect to LWK app
let client = Client::new("http://localhost:3000")?;

// First, ensure you have a multisig wallet created
let wallet_name = "company-treasury".to_string();

// Register the multisig wallet with a connected Jade device
let jade_signer_name = "jade-primary".to_string();

let response = client.signer_register_multisig(
    jade_signer_name,
    wallet_name.clone(),
)?;

println!("Multisig wallet '{}' registered with Jade device", wallet_name);

// Verify registration by listing registered multisigs
let jade = /* get jade instance */;
let registered_multisigs = jade.get_registered_multisigs()?;

for (name, multisig) in registered_multisigs {
    println!("Registered multisig: {} (variant: {})", name, multisig.variant);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Client

# Connect to LWK app
client = Client("http://localhost:3000")

# First, ensure you have a multisig wallet created
wallet_name = "company-treasury"

# Register the multisig wallet with a connected Jade device
jade_signer_name = "jade-primary"

response = client.signer_register_multisig(
    name=jade_signer_name,
    wallet=wallet_name,
)

print(f"Multisig wallet '{wallet_name}' registered with Jade device")

# Verify registration by listing registered multisigs
# jade = get jade instance
registered_multisigs = jade.get_registered_multisigs()

for name, multisig in registered_multisigs.items():
    print(f"Registered multisig: {name} (variant: {multisig.variant})")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.Client

// Connect to LWK app
val client = Client("http://localhost:3000")

// First, ensure you have a multisig wallet created
val walletName = "company-treasury"

// Register the multisig wallet with a connected Jade device
val jadeSignerName = "jade-primary"

val response = client.signerRegisterMultisig(
    name = jadeSignerName,
    wallet = walletName,
)

println("Multisig wallet '$walletName' registered with Jade device")

// Verify registration by listing registered multisigs
// val jade = get jade instance
val registeredMultisigs = jade.getRegisteredMultisigs()

registeredMultisigs.forEach { (name, multisig) ->
    println("Registered multisig: $name (variant: ${multisig.variant})")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Connect to LWK app
let client = Client("http://localhost:3000")

// First, ensure you have a multisig wallet created
let walletName = "company-treasury"

// Register the multisig wallet with a connected Jade device
let jadeSignerName = "jade-primary"

let response = try client.signerRegisterMultisig(
    name: jadeSignerName,
    wallet: walletName
)

print("Multisig wallet '\(walletName)' registered with Jade device")

// Verify registration by listing registered multisigs
// let jade = get jade instance
let registeredMultisigs = try jade.getRegisteredMultisigs()

for (name, multisig) in registeredMultisigs {
    print("Registered multisig: \(name) (variant: \(multisig.variant))")
}
```

</TabItem>
</Tabs>

## Direct Registration with Jade

For more direct control, you can register multisig policies directly with Jade devices:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
use lwk_jade::{Jade, RegisterMultisigParams, JadeDescriptor};
use lwk_wollet::WolletDescriptor;
use lwk_common::Network;

// Connect to Jade device
let mut jade = Jade::from_tcp("192.168.1.100:30121")?;

// Authenticate with the device (implementation depends on setup)
jade.auth_user(auth_params)?;

// Start with a standard LWK multisig descriptor
let lwk_descriptor_str = "ct(slip77(abcd1234...),elwsh(multi(2,[deadbeef]tpub...,[cafebabe]tpub...,[facefeed]tpub...)))";
let lwk_descriptor = WolletDescriptor::new(lwk_descriptor_str)?;

// Convert to Jade format - LWK provides this conversion
let jade_descriptor: JadeDescriptor = (&lwk_descriptor.as_inner()).try_into()
    .map_err(|e| format!("Failed to convert descriptor: {:?}", e))?;

// Register with Jade
let register_params = RegisterMultisigParams {
    network: Network::Liquid,
    multisig_name: "company-treasury".to_string(),
    descriptor: jade_descriptor,
};

let success = jade.register_multisig(register_params)?;
if success {
    println!("Multisig policy successfully registered with Jade");
} else {
    eprintln!("Failed to register multisig policy");
}

// Verify registration
let registered_multisig = jade.get_registered_multisig(GetRegisteredMultisigParams {
    multisig_name: "company-treasury".to_string(),
})?;

println!("Verified registration:");
println!("  Name: {}", registered_multisig.multisig_name);
println!("  Threshold: {}", registered_multisig.descriptor.threshold);
println!("  Signers: {}", registered_multisig.descriptor.signers.len());
```

</TabItem>
<TabItem value="python" label="Python">

```python
from lwk import Jade, RegisterMultisigParams, WolletDescriptor, Network, GetRegisteredMultisigParams

# Connect to Jade device
jade = Jade.from_tcp("192.168.1.100:30121")

# Authenticate with the device
jade.auth_user(auth_params)

# Start with a standard LWK multisig descriptor
lwk_descriptor_str = "ct(slip77(abcd1234...),elwsh(multi(2,[deadbeef]tpub...,[cafebabe]tpub...,[facefeed]tpub...)))"
lwk_descriptor = WolletDescriptor(lwk_descriptor_str)

# Convert to Jade format - LWK provides this conversion
jade_descriptor = lwk_descriptor.to_jade_descriptor()

# Register with Jade
register_params = RegisterMultisigParams(
    network=Network.LIQUID,
    multisig_name="company-treasury",
    descriptor=jade_descriptor,
)

success = jade.register_multisig(register_params)
if success:
    print("Multisig policy successfully registered with Jade")
else:
    print("Failed to register multisig policy")

# Verify registration
registered_multisig = jade.get_registered_multisig(GetRegisteredMultisigParams(
    multisig_name="company-treasury"
))

print("Verified registration:")
print(f"  Name: {registered_multisig.multisig_name}")
print(f"  Threshold: {registered_multisig.descriptor.threshold}")
print(f"  Signers: {len(registered_multisig.descriptor.signers)}")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import com.blockstream.lwk.*

// Connect to Jade device
val jade = Jade.fromTcp("192.168.1.100:30121")

// Authenticate with the device
jade.authUser(authParams)

// Start with a standard LWK multisig descriptor
val lwkDescriptorStr = "ct(slip77(abcd1234...),elwsh(multi(2,[deadbeef]tpub...,[cafebabe]tpub...,[facefeed]tpub...)))"
val lwkDescriptor = WolletDescriptor(lwkDescriptorStr)

// Convert to Jade format - LWK provides this conversion
val jadeDescriptor = lwkDescriptor.toJadeDescriptor()

// Register with Jade
val registerParams = RegisterMultisigParams(
    network = Network.LIQUID,
    multisigName = "company-treasury",
    descriptor = jadeDescriptor,
)

val success = jade.registerMultisig(registerParams)
if (success) {
    println("Multisig policy successfully registered with Jade")
} else {
    println("Failed to register multisig policy")
}

// Verify registration
val registeredMultisig = jade.getRegisteredMultisig(GetRegisteredMultisigParams(
    multisigName = "company-treasury"
))

println("Verified registration:")
println("  Name: ${registeredMultisig.multisigName}")
println("  Threshold: ${registeredMultisig.descriptor.threshold}")
println("  Signers: ${registeredMultisig.descriptor.signers.size}")
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import LiquidWalletKit

// Connect to Jade device
let jade = try Jade.fromTcp("192.168.1.100:30121")

// Authenticate with the device
try jade.authUser(authParams)

// Start with a standard LWK multisig descriptor
let lwkDescriptorStr = "ct(slip77(abcd1234...),elwsh(multi(2,[deadbeef]tpub...,[cafebabe]tpub...,[facefeed]tpub...)))"
let lwkDescriptor = try WolletDescriptor(lwkDescriptorStr)

// Convert to Jade format - LWK provides this conversion
let jadeDescriptor = try lwkDescriptor.toJadeDescriptor()

// Register with Jade
let registerParams = RegisterMultisigParams(
    network: .liquid,
    multisigName: "company-treasury",
    descriptor: jadeDescriptor
)

let success = try jade.registerMultisig(registerParams)
if success {
    print("Multisig policy successfully registered with Jade")
} else {
    print("Failed to register multisig policy")
}

// Verify registration
let registeredMultisig = try jade.getRegisteredMultisig(GetRegisteredMultisigParams(
    multisigName: "company-treasury"
))

print("Verified registration:")
print("  Name: \(registeredMultisig.multisigName)")
print("  Threshold: \(registeredMultisig.descriptor.threshold)")
print("  Signers: \(registeredMultisig.descriptor.signers.count)")
```

</TabItem>
</Tabs>

## Managing Multiple Registrations

Jade devices can store multiple multisig policies simultaneously. LWK provides methods to manage these registrations:

<Tabs groupId="language">
<TabItem value="rust" label="Rust" default>

```rust
// List all registered multisig wallets
let all_multisigs = jade.get_registered_multisigs()?;

println!("Registered multisig wallets:");
for (name, details) in all_multisigs {
    println!("  {}: {} of {} ({})", 
             name, 
             details.threshold, 
             details.signers.len(), 
             details.variant);
}

// Check if specific multisig is registered
let wallet_name = "company-treasury";
if all_multisigs.contains_key(wallet_name) {
    println!("Wallet '{}' is registered", wallet_name);
    
    // Get detailed information
    let detailed_info = jade.get_registered_multisig(GetRegisteredMultisigParams {
        multisig_name: wallet_name.to_string(),
    })?;
    
    println!("Detailed info:");
    println!("  Sorted: {}", detailed_info.descriptor.sorted);
    println!("  Blinding key: {}", hex::encode(&detailed_info.descriptor.master_blinding_key));
    
    for (i, signer) in detailed_info.descriptor.signers.iter().enumerate() {
        println!("  Signer {}: {} ({})", i + 1, signer.xpub, signer.fingerprint);
    }
} else {
    println!("Wallet '{}' is not registered", wallet_name);
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
# List all registered multisig wallets
all_multisigs = jade.get_registered_multisigs()

print("Registered multisig wallets:")
for name, details in all_multisigs.items():
    print(f"  {name}: {details.threshold} of {len(details.signers)} ({details.variant})")

# Check if specific multisig is registered
wallet_name = "company-treasury"
if wallet_name in all_multisigs:
    print(f"Wallet '{wallet_name}' is registered")
    
    # Get detailed information
    detailed_info = jade.get_registered_multisig(GetRegisteredMultisigParams(
        multisig_name=wallet_name
    ))
    
    print("Detailed info:")
    print(f"  Sorted: {detailed_info.descriptor.sorted}")
    print(f"  Blinding key: {detailed_info.descriptor.master_blinding_key.hex()}")
    
    for i, signer in enumerate(detailed_info.descriptor.signers):
        print(f"  Signer {i + 1}: {signer.xpub} ({signer.fingerprint})")
else:
    print(f"Wallet '{wallet_name}' is not registered")
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// List all registered multisig wallets
val allMultisigs = jade.getRegisteredMultisigs()

println("Registered multisig wallets:")
allMultisigs.forEach { (name, details) ->
    println("  $name: ${details.threshold} of ${details.signers.size} (${details.variant})")
}

// Check if specific multisig is registered
val walletName = "company-treasury"
if (allMultisigs.containsKey(walletName)) {
    println("Wallet '$walletName' is registered")
    
    // Get detailed information
    val detailedInfo = jade.getRegisteredMultisig(GetRegisteredMultisigParams(
        multisigName = walletName
    ))
    
    println("Detailed info:")
    println("  Sorted: ${detailedInfo.descriptor.sorted}")
    println("  Blinding key: ${detailedInfo.descriptor.masterBlindingKey.toHex()}")
    
    detailedInfo.descriptor.signers.forEachIndexed { i, signer ->
        println("  Signer ${i + 1}: ${signer.xpub} (${signer.fingerprint})")
    }
} else {
    println("Wallet '$walletName' is not registered")
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
// List all registered multisig wallets
let allMultisigs = try jade.getRegisteredMultisigs()

print("Registered multisig wallets:")
for (name, details) in allMultisigs {
    print("  \(name): \(details.threshold) of \(details.signers.count) (\(details.variant))")
}

// Check if specific multisig is registered
let walletName = "company-treasury"
if allMultisigs.keys.contains(walletName) {
    print("Wallet '\(walletName)' is registered")
    
    // Get detailed information
    let detailedInfo = try jade.getRegisteredMultisig(GetRegisteredMultisigParams(
        multisigName: walletName
    ))
    
    print("Detailed info:")
    print("  Sorted: \(detailedInfo.descriptor.sorted)")
    print("  Blinding key: \(detailedInfo.descriptor.masterBlindingKey.hexString)")
    
    for (i, signer) in detailedInfo.descriptor.signers.enumerated() {
        print("  Signer \(i + 1): \(signer.xpub) (\(signer.fingerprint))")
    }
} else {
    print("Wallet '\(walletName)' is not registered")
}
```

</TabItem>
</Tabs>

## Best Practices

**Device Verification**: Always verify registration details on the hardware device screen before confirming - check threshold, participant count, and wallet name.

**Consistent Naming**: Use the same wallet names across all devices to avoid confusion during transaction coordination.

**Test First**: Create and sign small test transactions before using the registered wallet in production.

**Documentation**: Keep records of which devices have which policies registered for troubleshooting and team coordination.

**Backup Planning**: Have procedures for device loss or failure since registered policies create dependencies on specific hardware.