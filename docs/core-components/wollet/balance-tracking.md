---
id: balance-tracking
title: Balance Tracking
sidebar_label: Balance Tracking
sidebar_position: 4
---

# Balance and UTXO Management

Wollet tracks balances across L-BTC and all Liquid assets with automatic confidential transaction unblinding and asset registry integration.

## Balance Queries

### Get All Balances
```rust
let balances = wollet.balance()?;
for (asset_id, amount) in balances {
    println!("Asset {}: {} satoshis", asset_id, amount);
}
```

### L-BTC Balance
```rust
let lbtc_balance = wollet.balance()?.get(&ElementsNetwork::liquid_asset_id())?;
```

## Asset Types

### L-BTC (Liquid Bitcoin)
- Primary network asset
- Used for transaction fees
- Asset ID: `6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`

### Issued Assets
- Custom tokens on Liquid
- Unique asset IDs from issuance transactions
- Support for reissuance and burning

## UTXO Management

### Available UTXOs
```rust
let utxos = wollet.utxos()?;
for utxo in utxos {
    println!("UTXO: {}:{} - {} sats of {}", 
             utxo.outpoint.txid, 
             utxo.outpoint.vout,
             utxo.unblinded.value,
             utxo.unblinded.asset);
}
```

### Coin Selection
```rust
// TxBuilder automatically selects appropriate UTXOs
let mut tx_builder = TxBuilder::new();
tx_builder.add_recipient(&recipient_addr, amount)?;
let pset = tx_builder.finish(&wollet)?;
```

## Confidential Transaction Handling

### Automatic Unblinding
- Wollet automatically unblinds received transactions
- Uses derived blinding keys from CT descriptor
- Stores unblinded values securely

### Transaction History
```rust
let transactions = wollet.transactions()?;
for tx in transactions {
    match tx.type_ {
        TransactionType::Incoming => println!("Received"),
        TransactionType::Outgoing => println!("Sent"),
        TransactionType::Issuance => println!("Asset issuance"),
        TransactionType::Reissuance => println!("Asset reissuance"),
        TransactionType::Burn => println!("Asset burn"),
    }
}
``` 