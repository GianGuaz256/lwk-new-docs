---
id: descriptors
title: CT Descriptors
sidebar_label: Descriptors
sidebar_position: 2
---

# CT Descriptors Explained

CT (Confidential Transaction) descriptors extend Bitcoin descriptors with blinding key information for Liquid's confidential transactions. They define both the spending conditions and confidentiality parameters for wallet addresses.

## Format Structure

CT descriptors wrap Bitcoin descriptors with blinding key derivation:

```
ct(blinding_key, bitcoin_descriptor)
```

### Basic Examples

```bash
# Single-sig with SLIP77 blinding
ct(slip77(master_blinding_key), wpkh(xpub/.../0/*))

# Multi-sig with explicit blinding key  
ct(blinding_key, wsh(sortedmulti(2, xpub1, xpub2, xpub3)))
```

## Supported Script Types

- **wpkh**: Wrapped P2PKH (most common)
- **wsh**: Wrapped Script Hash for multisig
- **tr**: Taproot (Elements-compatible)
- **sh**: Legacy Script Hash

## Blinding Key Derivation

### SLIP77 (Recommended)
```bash
ct(slip77(ab5824f4477b4ebb00a132adfd8eb0b7935cf24f6ac151add5d1913db374ce92), wpkh([fingerprint/path]xpub/<0;1>/*))
```

### Explicit Key
```bash
ct(03a0434d9e47f3c86235477c7b1ae6ae5d3442d49b1943c2b752a68e2a47e247c7, wpkh(xpub/<0;1>/*))
```

## Multi-signature Descriptors

```bash
# 2-of-3 multisig with SLIP77
ct(slip77(master_key), wsh(sortedmulti(2, 
  [fp1/48'/1'/0'/2']xpub1/<0;1>/*, 
  [fp2/48'/1'/0'/2']xpub2/<0;1>/*, 
  [fp3/48'/1'/0'/2']xpub3/<0;1>/*
)))
```

## Creating Descriptors

Use standard BIP32 derivation paths:
- **44'**: Legacy addresses
- **49'**: P2SH-wrapped SegWit
- **84'**: Native SegWit (recommended)
- **48'**: Multisig wallets

The coin type for Liquid is **1** (testnet) or **0** (mainnet). 