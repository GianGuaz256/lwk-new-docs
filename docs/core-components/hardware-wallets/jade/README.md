---
id: jade-readme
title: Jade Hardware Wallet
sidebar_label: Overview
sidebar_position: 1
---

# Jade Hardware Wallet Integration

Jade is Blockstream's premier hardware wallet designed specifically for Bitcoin and Liquid Network support. This section covers everything you need to know about integrating Jade with LWK applications.

## Features

### Security Features
- **Air-gapped signing**: Private keys never leave the device
- **PIN protection**: Multiple attempts lockout with increasing delays
- **Secure element**: Hardware-backed key storage
- **Blind signature support**: Enhanced privacy for Liquid transactions

### Liquid Network Support
- **Native Liquid support**: Built-in understanding of confidential transactions
- **Asset management**: Support for all Liquid asset operations
- **Multisig wallets**: Full multisig coordination and registration
- **Address verification**: On-device address confirmation

### Connectivity Options
- **USB connection**: Primary connection method
- **Serial connection**: Alternative for embedded systems
- **Bluetooth**: Wireless connectivity (model dependent)

## Quick Start

### Basic Setup
```bash
# Detect connected Jade
lwk_cli signer jade-id

# Register for multisig operations
lwk_cli signer register-multisig \
  --signer-name "jade1" \
  --descriptor "ct(slip77(...),elwsh(sortedmulti(...)))"
```

### First Transaction
```bash
# Create unsigned transaction
PSET=$(lwk_cli wallet send \
  --wallet-name "treasury" \
  --recipient "address:amount:asset_id")

# Sign with Jade
SIGNED=$(lwk_cli signer sign \
  --signer-name "jade1" \
  --pset "$PSET")

# Broadcast transaction
lwk_cli wallet broadcast \
  --wallet-name "treasury" \
  --pset "$SIGNED"
```

## Integration Guides

### [Getting Started](../jade.md)
Complete setup guide from device initialization to first transaction.

### Multisig Setup
Step-by-step multisig wallet creation and management.

### Asset Operations
Using Jade for asset issuance, reissuance, and management.

### Advanced Features
Enterprise features and custom integrations.

## Development Resources

### Code Examples
- Basic signing workflow
- Multisig coordination
- Asset operations
- Error handling

### API Reference
- Jade client API
- Connection management
- Signing methods
- Device utilities

## Support

### Troubleshooting
- Connection issues
- Signing problems
- Firmware updates

### Community
- [GitHub repository](https://github.com/Blockstream/jade)
- [Community forum](https://help.blockstream.com)
- [Developer documentation](https://jade.readthedocs.io)

Jade provides enterprise-grade security for Liquid Network applications with seamless LWK integration.
