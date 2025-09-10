---
id: multisig-overview
title: Multisig Overview
sidebar_label: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Multisig Wallets in LWK

Multisig (M-of-N) wallets require multiple signatures to authorize transactions, providing enhanced security and distributed control. LWK supports multisig wallets with software and hardware signers, maintaining Liquid's confidential transaction privacy.

## Multisig Setup Flow

The multisig setup process involves three main phases:

1. **XPub Collection**: Each participant generates and shares their extended public key
2. **Descriptor Creation**: Combine XPubs into a standardized multisig descriptor  
3. **Wallet Initialization**: Create watch-only wallets using the shared descriptor

```mermaid
sequenceDiagram
    participant C as Coordinator
    participant S1 as Signer 1
    participant S2 as Signer 2
    participant S3 as Signer 3
    participant W as Wollet

    Note over C,W: Multisig Setup Process

    C->>S1: Request XPub + Fingerprint
    S1->>C: Return XPub1 + FP1
    
    C->>S2: Request XPub + Fingerprint
    S2->>C: Return XPub2 + FP2
    
    C->>S3: Request XPub + Fingerprint
    S3->>C: Return XPub3 + FP3
    
    C->>C: Generate multisig descriptor<br/>2-of-3 threshold
    C->>W: Create Wollet with descriptor
    W->>C: Multisig wallet ready
    
    Note over C,W: All parties share same descriptor<br/>for watch-only coordination
```

## Multisig Transaction Signing

Once the multisig wallet is set up, the signing process follows a coordinated workflow:

```mermaid
sequenceDiagram
    participant I as Initiator
    participant S1 as Signer 1
    participant S2 as Signer 2
    participant S3 as Signer 3
    participant N as Network

    Note over I,N: Transaction Signing (2-of-3)

    I->>I: Create PSET transaction
    I->>S1: Send PSET for signing
    I->>S2: Send PSET for signing
    I->>S3: Send PSET for signing
    
    S1->>S1: Review & sign PSET
    S1->>I: Return signed PSET
    
    S2->>S2: Review & sign PSET
    S2->>I: Return signed PSET
    
    Note over S3: Optional third signer<br/>not needed for 2-of-3
    
    I->>I: Combine signatures
    I->>I: Finalize transaction
    I->>N: Broadcast to network
    
    Note over I,N: Transaction complete<br/>with 2 signatures
```

## Key Considerations

- **Security Model**: Each signer independently validates transactions before signing. No single party can authorize transactions alone when threshold > 1.

- **Coordination**: PSETs serve as the communication medium between signers. They can be transmitted via any secure channel (encrypted messaging, secure storage, etc.).

- **Hardware Integration**: Hardware wallets must register multisig policies before they can sign transactions. This is a one-time setup per wallet.

- **Confidential Transactions**: All multisig transactions maintain Liquid's privacy features - amounts and asset types remain confidential to outside observers.