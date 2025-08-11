---
id: extending-hardware-wallets
title: Extending Hardware Support
sidebar_label: Extending Support
sidebar_position: 5
---

# Adding New Hardware Wallet Support

LWK's modular architecture allows adding support for new hardware wallets by implementing the `Signer` trait and integrating device-specific communication protocols.

## Implementation Requirements

### Core Signer Trait
```rust
use lwk_common::Signer;
use elements::bitcoin::bip32::{DerivationPath, Fingerprint, Xpub};
use elements::pset::PartiallySignedTransaction;
use elements_miniscript::slip77::MasterBlindingKey;

impl Signer for NewHardwareWallet {
    type Error = NewHardwareError;
    
    fn sign(&self, pset: &mut PartiallySignedTransaction) -> Result<u32, Self::Error> {
        // Device-specific signing implementation
    }
    
    fn derive_xpub(&self, path: &DerivationPath) -> Result<Xpub, Self::Error> {
        // Key derivation implementation
    }
    
    fn slip77_master_blinding_key(&self) -> Result<MasterBlindingKey, Self::Error> {
        // SLIP77 blinding key extraction
    }
    
    fn fingerprint(&self) -> Result<Fingerprint, Self::Error> {
        // Master key fingerprint
    }
}
```

## Communication Protocols

### USB/HID Transport
```rust
pub struct UsbTransport {
    device: HidDevice,
    vendor_id: u16,
    product_id: u16,
}

impl UsbTransport {
    pub fn new(vendor_id: u16, product_id: u16) -> Result<Self, TransportError> {
        let api = HidApi::new()?;
        let device = api.open(vendor_id, product_id)?;
        Ok(Self { device, vendor_id, product_id })
    }
}
```

### Serial Transport
```rust
pub struct SerialTransport {
    port: Box<dyn SerialPort>,
}

impl SerialTransport {
    pub fn new(path: &str, baud_rate: u32) -> Result<Self, TransportError> {
        let port = SerialPortBuilder::new(path)
            .baud_rate(baud_rate)
            .open()?;
        Ok(Self { port })
    }
}
```

## Device-Specific Features

### Liquid Requirements
- Confidential transaction support
- Asset issuance/reissuance handling
- SLIP77 blinding key derivation
- Elements-specific script types

## Testing Strategy

### Unit Tests
```rust
#[test]
fn test_key_derivation() {
    let device = MockDevice::new();
    let path = DerivationPath::from_str("m/84'/1'/0'").unwrap();
    let xpub = device.derive_xpub(&path).unwrap();
    assert!(!xpub.to_string().is_empty());
}
```

### Emulator Support
```rust
pub struct DeviceEmulator {
    tcp_stream: TcpStream,
}

impl DeviceEmulator {
    pub fn connect(addr: &str) -> Result<Self, EmulatorError> {
        let stream = TcpStream::connect(addr)?;
        Ok(Self { tcp_stream: stream })
    }
}
``` 