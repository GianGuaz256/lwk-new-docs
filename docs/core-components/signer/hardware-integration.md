---
id: hardware-integration
title: Hardware Integration
sidebar_label: Hardware Integration
sidebar_position: 3
---

# AnySigner and Hardware Wallet Abstraction

AnySigner provides unified hardware wallet integration supporting Jade and Ledger devices through consistent APIs while handling device-specific communication protocols.

## Supported Devices

### Blockstream Jade
```rust
use lwk_jade::Jade;
use lwk_signer::AnySigner;

// USB/Serial connection
let jade = Jade::from_serial("/dev/ttyUSB0").await?;
let master_id = jade.identifier()?;
let jade_signer = AnySigner::Jade(jade, master_id);
```

### Ledger Devices
```rust
use lwk_ledger::{Ledger, TransportTcp};
use lwk_signer::AnySigner;

// TCP connection (Speculos emulator)
let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;
let master_id = ledger.fingerprint()?;
let ledger_signer = AnySigner::Ledger(ledger, master_id);
```

## Communication Protocols

### Jade Connectivity
- **USB/Serial**: Production devices (`/dev/ttyUSB0`)
- **TCP**: Emulator support (`127.0.0.1:30121`)
- **Bluetooth LE**: Wireless connection (when supported)

### Ledger Connectivity  
- **HID**: USB connection to physical devices
- **TCP**: Speculos emulator for development

## Device Initialization

### Jade Setup
```rust
let mut jade = Jade::from_serial("/dev/ttyUSB0").await?;

// Authenticate with PIN
jade.auth("123456").await?;

// Get device information
let version = jade.get_version_info().await?;
println!("Jade version: {}", version.jade_version);

// Get master fingerprint
let fingerprint = jade.fingerprint()?;
```

### Ledger Setup
```rust
let transport = TransportTcp::new("127.0.0.1:9999")?;
let ledger = Ledger::new(transport)?;

// Get device information
let version = ledger.get_version()?;
println!("Ledger app version: {}", version);

// Get master fingerprint
let fingerprint = ledger.fingerprint()?;
```

## Key Extraction

### Derive Extended Public Keys
```rust
// Works with any hardware signer
let derivation_path = DerivationPath::from_str("m/84'/1'/0'")?;
let xpub = any_signer.derive_xpub(&derivation_path)?;
```

### Master Blinding Key
```rust
// Get SLIP77 master blinding key
let master_blinding_key = any_signer.slip77_master_blinding_key()?;
```

## Signing Workflows

### Transaction Signing
```rust
// Unified signing interface
let signed_inputs = any_signer.sign(&mut pset)?;

// User sees transaction details on device screen
// User confirms transaction with button press
```

### Multisig Registration
```rust
// Jade requires multisig policy registration
if let AnySigner::Jade(jade, _) = &any_signer {
    let multisig_params = RegisterMultisigParams {
        network: elements::bitcoin::Network::Testnet,
        multisig_name: "Business Wallet".to_string(),
        threshold: 2,
        sorted: true,
        cosigners: vec![/* cosigner descriptors */],
    };
    
    jade.register_multisig(&multisig_params).await?;
}
```

## Device Capabilities

### Jade Capabilities
- Native Liquid support
- Confidential transactions
- Asset operations (issuance, reissuance, burn)
- Large multisig (up to 15-of-15)
- Address verification on screen

### Ledger Capabilities
- Elements app required
- Confidential transactions
- Standard multisig support
- Address verification
- Asset operations (limited)

## Error Handling

### Connection Errors
```rust
match AnySigner::Jade(jade, master_id) {
    Ok(signer) => { /* use signer */ },
    Err(JadeError::Transport(_)) => {
        eprintln!("Device connection failed - check USB cable");
    },
    Err(JadeError::Authentication(_)) => {
        eprintln!("PIN authentication failed");
    },
    Err(e) => eprintln!("Other error: {}", e),
}
```

### Signing Errors
```rust
match any_signer.sign(&mut pset) {
    Err(SignerError::JadeError(jade_err)) => {
        eprintln!("Jade signing error: {}", jade_err);
    },
    Err(SignerError::LedgerError(ledger_err)) => {
        eprintln!("Ledger signing error: {}", ledger_err);
    },
    _ => { /* handle other errors */ }
}
```

## Troubleshooting

### Common Issues
1. **Device Not Found**: Check USB connection and permissions
2. **Authentication Failed**: Verify PIN and device state
3. **Signing Timeout**: Ensure user confirms on device
4. **Multisig Not Registered**: Register policy before signing

### Development Tips
1. **Use Emulators**: Start with device emulators
2. **Check Permissions**: Ensure USB device access
3. **Monitor Logs**: Enable debug logging for details
4. **Test Connectivity**: Verify communication before complex operations 