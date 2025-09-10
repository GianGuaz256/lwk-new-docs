---
id: signer-operations
title: Signer Operations
sidebar_label: Signer Operations
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Signer Operations

Signers are the cryptographic entities that create digital signatures for transactions. LWK CLI supports both software signers (using mnemonics) and hardware signers (Jade and Ledger devices). This guide covers signer management and usage.

## Signer Types

```mermaid
graph TB
    A[LWK Signers] --> B[Software Signers]
    A --> C[Hardware Signers]
    B --> D[Mnemonic-based]
    B --> E[Private Key]
    C --> F[Jade HWW]
    C --> G[Ledger HWW]
    C --> H[External Signers]
```

## Software Signers

### Generating New Signers

Create new software signers with random mnemonics:

```bash
# Generate new mnemonic
lwk_cli signer generate
```

**Example Output**:
```json
{
  "mnemonic": "sheriff pass mechanic old near spring over pioneer rural wealth symptom cook"
}
```

### Loading Software Signers

Import existing mnemonics as named signers:

<Tabs>
<TabItem value="mnemonic" label="From Mnemonic" default>

```bash
# Load signer with name (temporary, not persisted)
lwk_cli signer load-software \
  --signer "alice" \
  --mnemonic "sheriff pass mechanic old near spring over pioneer rural wealth symptom cook" \
  --persist false
```

</TabItem>
<TabItem value="persisted" label="Persisted Signer">

```bash
# Create persisted signer (survives restarts)
lwk_cli signer load-software \
  --signer "treasury" \
  --mnemonic "your twelve word mnemonic phrase goes here today example test" \
  --persist true
```

</TabItem>
<TabItem value="external" label="External Signer">

```bash
# Load external signer (e.g., from another system)
lwk_cli signer load-external \
  --signer "external_alice" \
  --fingerprint "deadbeef"
```

</TabItem>
</Tabs>

### Extracting Public Keys

Get extended public keys (xpubs) for descriptor creation:

```bash
# Get xpub for BIP84 derivation
lwk_cli signer xpub --signer "alice" --kind bip84

# Get xpub for BIP87 (multisig)
lwk_cli signer xpub --signer "alice" --kind bip87
```

**Example Output**:
```json
{
  "keyorigin_xpub": "[2a0b5159/84h/1h/0h]tpubDDdqx3Ytv8SHAvQYqnh3NgoixyND49wSwcpMiaLMGuGFLC7gUZ4ibabz4R3qtTFYvR3G1n8MxFMtpue1qmKBz4i61J54chUxeTJ9Ma8f16M"
}
```

## Hardware Signers

### Jade Hardware Wallet

Jade is Blockstream's open-source hardware wallet with native Liquid support.

#### Device Discovery

<Tabs>
<TabItem value="usb" label="USB Connection" default>

```bash
# Discover connected Jade devices
lwk_cli signer jade-id

# Unlock and get device ID
lwk_cli signer jade-id --unlock
```

</TabItem>
<TabItem value="serial" label="Serial Connection">

```bash
# Connect via serial port
lwk_cli signer jade-id --serial-port /dev/ttyUSB0

# List available serial ports
ls /dev/ttyUSB* /dev/ttyACM*
```

</TabItem>
<TabItem value="network" label="Network Connection">

```bash
# Connect to networked Jade
lwk_cli signer jade-id --network-address "192.168.1.100:8080"
```

</TabItem>
</Tabs>

#### Loading Jade Signers

```bash
# Load Jade signer
lwk_cli signer load-jade \
  --signer "jade_alice" \
  --id "0123456789abcdef"
```

#### Jade Multisig Registration

Register multisig policies with Jade for enhanced security:

```bash
# Register 2-of-3 multisig
lwk_cli signer register-multisig \
  --signer "jade_alice" \
  --wallet "treasury"
```

### Ledger Hardware Wallet

LWK CLI does not have direct `load-ledger` commands. Ledger support is implemented through external signer loading with fingerprints.

## Signer Management

### Listing Signers

View all loaded signers:

```bash
# List all signers
lwk_cli signer list
```

**Example Output**:
```json
{
  "signers": [
    {
      "fingerprint": "acecd89a",
      "name": "jade_alice",
      "type": "jade"
    },
    {
      "fingerprint": "4fc853a4",
      "name": "software_bob",
      "type": "software"
    }
  ]
}
```

### Signer Details

Get detailed information about a signer:

```bash
# View signer details
lwk_cli signer details --signer "alice"
```

**Example Output**:
```json
{
  "name": "alice",
  "fingerprint": "2a0b5159",
  "type": "software",
  "derivation_paths": {
    "bip84": "m/84'/1'/0'",
    "bip87": "m/87'/1'/0'"
  },
  "loaded_at": "2024-01-15T10:30:00Z"
}
```

### Unloading Signers

Remove signers from memory:

```bash
# Unload specific signer
lwk_cli signer unload --signer "alice"
```

## Signing Operations

### PSET Signing

Sign Partially Signed Elements Transactions (PSETs):

<Tabs>
<TabItem value="basic" label="Basic Signing" default>

```bash
# Sign PSET with software signer
lwk_cli signer sign \
  --signer "alice" \
  --pset "cHNldP8BAgQCAAAAAQQBAQEFAQRPAQQ1h88DV6y9foAA..."
```

</TabItem>
<TabItem value="hardware" label="Hardware Signing">

```bash
# Sign PSET with Jade (requires device confirmation)
lwk_cli signer sign \
  --signer "jade_alice" \
  --pset "cHNldP8BAgQCAAAAAQQBAQEFAQRPAQQ1h88DV6y9foAA..."
```

</TabItem>
<TabItem value="file" label="File-based Signing">

```bash
# Sign PSET from file (Note: CLI uses --pset parameter, not files)
lwk_cli signer sign \
  --signer "alice" \
  --pset "$(cat transaction.pset)"
```

</TabItem>
</Tabs>

### Batch Signing

Sign multiple PSETs efficiently:

```bash
# Sign multiple PSETs
for pset_file in *.pset; do
  lwk_cli signer sign \
    --signer "alice" \
    --pset "$(cat "$pset_file")" > "signed_$pset_file"
done
```

## Descriptor Creation

### Single-signature Descriptors

Create descriptors for single-signature wallets:

```bash
# Generate singlesig descriptor
lwk_cli signer singlesig-desc \
  --signer "alice" \
  --descriptor-blinding-key slip77 \
  --kind wpkh
```

### Multi-signature Descriptors

Create multisig descriptors from multiple signers:

<Tabs>
<TabItem value="2of2" label="2-of-2 Multisig" default>

```bash
# Create 2-of-2 multisig descriptor
lwk_cli wallet multisig-desc \
  --descriptor-blinding-key slip77 \
  --kind wsh \
  --threshold 2 \
  --keyorigin-xpub "[2a0b5159/84h/1h/0h]tpubDD..." \
  --keyorigin-xpub "[6295429d/84h/1h/0h]tpubDD..."
```

</TabItem>
<TabItem value="2of3" label="2-of-3 Multisig">

```bash
# Create 2-of-3 multisig descriptor
lwk_cli wallet multisig-desc \
  --descriptor-blinding-key slip77 \
  --kind wsh \
  --threshold 2 \
  --keyorigin-xpub "[alice/84h/1h/0h]tpub..." \
  --keyorigin-xpub "[bob/84h/1h/0h]tpub..." \
  --keyorigin-xpub "[charlie/84h/1h/0h]tpub..."
```

</TabItem>
<TabItem value="enterprise" label="Enterprise 3-of-5">

```bash
# Create enterprise 3-of-5 multisig
lwk_cli wallet multisig-desc \
  --descriptor-blinding-key elip151 \
  --kind wsh \
  --threshold 3 \
  --keyorigin-xpub "[ceo/87h/1h/0h]tpub..." \
  --keyorigin-xpub "[cto/87h/1h/0h]tpub..." \
  --keyorigin-xpub "[cfo/87h/1h/0h]tpub..." \
  --keyorigin-xpub "[hsm1/87h/1h/0h]tpub..." \
  --keyorigin-xpub "[hsm2/87h/1h/0h]tpub..."
```

</TabItem>
</Tabs>

## Next Steps

With signers configured, you can:

1. **[Create Wallets](./wallet-operations.md)** - Use signers to create wallet descriptors
2. **[Perform Transactions](./transaction-operations.md)** - Sign and broadcast transactions
3. **[Manage Assets](./asset-operations.md)** - Issue and manage Liquid assets

Signers form the foundation of wallet security in LWK, providing the cryptographic capabilities needed for secure Liquid Network operations.