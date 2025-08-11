---
id: ledger-readme
title: Ledger Hardware Wallet
sidebar_label: Overview
sidebar_position: 1
---

# Ledger Hardware Wallet Integration

Ledger hardware wallets provide robust security for Liquid Network applications through LWK's comprehensive integration. This section covers setup, usage, and advanced features for Ledger devices.

## Supported Devices

### Ledger Nano S Plus
- **Liquid app support**: Full transaction signing capability
- **Display**: Transaction details verification
- **Storage**: Multiple wallet support
- **Connectivity**: USB-C connection

### Ledger Nano X
- **Liquid app support**: Complete feature set
- **Display**: Enhanced transaction review
- **Storage**: Extended capacity for multiple apps
- **Connectivity**: USB-C and Bluetooth

### Ledger Stax
- **Liquid app support**: Latest features
- **Display**: Large touchscreen for detailed review
- **Storage**: Maximum capacity
- **Connectivity**: USB-C and Bluetooth

## Features

### Security Features
- **Secure Element**: CC EAL5+ certified chip
- **PIN protection**: Device-level security
- **Recovery phrase**: 24-word backup
- **App isolation**: Separate secure environments

### Liquid Network Support
- **Confidential transactions**: Full CT support
- **Asset operations**: Issuance and transfers
- **Multisig wallets**: Coordinate multisig signing
- **Address verification**: On-device confirmation

### Integration Features
- **PSBT support**: Partial signature coordination
- **Blind signature**: Privacy-preserving operations
- **Custom derivation**: Flexible key management
- **Batch operations**: Efficient multi-transaction flows

## Quick Start

### Device Setup
```bash
# Install Liquid app via Ledger Live
# Connect device and unlock

# Detect Ledger device
lwk_cli signer ledger-id

# Get extended public key
lwk_cli signer xpub \
  --signer-name "ledger1" \
  --path "m/84'/1776'/0'"
```

### First Transaction
```bash
# Create transaction to sign
PSET=$(lwk_cli wallet send \
  --wallet-name "vault" \
  --recipient "address:amount:asset_id")

# Sign with Ledger (requires device confirmation)
SIGNED=$(lwk_cli signer sign \
  --signer-name "ledger1" \
  --pset "$PSET")

# Broadcast signed transaction
lwk_cli wallet broadcast \
  --wallet-name "vault" \
  --pset "$SIGNED"
```

## Integration Guides

### [Getting Started](../ledger.md)
Complete setup from app installation to first transaction.

### Multisig Configuration
Creating and managing multisig wallets with Ledger devices.

### Asset Management
Asset issuance, reissuance, and management workflows.

### Enterprise Deployment
Large-scale deployment considerations and best practices.

## Development Resources

### Code Examples
- Basic operations
- Multisig workflows
- Asset operations
- Error handling

### API Documentation
- Ledger client API
- Transport protocols
- APDU commands
- Derivation paths

### Testing
- Device emulation
- Unit testing
- Integration testing

## Advanced Topics

### Custom Applications
- Building custom Ledger apps
- Protocol extensions
- Performance optimization

### Security Considerations
- Firmware verification
- Supply chain security
- Best practices

## Troubleshooting

### Common Issues
- Connection problems
- App installation
- Signing failures
- Firmware updates

### Support Resources
- [Ledger Support](https://support.ledger.com)
- [Community forum](https://www.reddit.com/r/ledger)
- [Developer documentation](https://developers.ledger.com)

## Compatibility

### LWK Versions
| LWK Version | Ledger App Version | Features |
|-------------|-------------------|----------|
| 0.7.0+ | 2.1.0+ | Full CT support |
| 0.6.0+ | 2.0.0+ | Basic operations |
| 0.5.0+ | 1.0.0+ | Limited support |

### Platform Support
- **Desktop**: Linux, macOS, Windows
- **Mobile**: Android (via USB OTG), iOS (limited)
- **Web**: WebHID/WebUSB support
- **Server**: Headless operation with TCP transport

Ledger integration provides enterprise-grade security with extensive platform compatibility for Liquid Network applications.
