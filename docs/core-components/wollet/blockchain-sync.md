---
id: blockchain-sync
title: Blockchain Synchronization
sidebar_label: Blockchain Sync
sidebar_position: 5
---

# Synchronizing with Blockchain Backends

Wollet synchronizes with the Liquid blockchain through Electrum or Esplora backends to maintain up-to-date transaction history and UTXO state.

## Backend Types

### Electrum (Recommended)
```rust
use lwk_wollet::{ElectrumClient, ElectrumUrl};

let url = ElectrumUrl::new("blockstream.info:465", true, true);
let client = ElectrumClient::new(&url)?;
```

### Esplora
```rust
use lwk_wollet::blocking::EsploraClient;

let client = EsploraClient::new("https://blockstream.info/liquidtestnet/api")?;
```

## Sync Strategies

### Full Scan (Initial Sync)
```rust
// Scan entire wallet with gap limit
let update = full_scan_with_electrum_client(&client, &wollet, 20, 20)?;
wollet.apply_update(update)?;
```

### Incremental Sync
```rust
// Get new transactions since last sync
let update = client.sync(&wollet, 20)?;
wollet.apply_update(update)?;
```

## Network Configuration

### Mainnet
```rust
let network = ElementsNetwork::Liquid;
let url = ElectrumUrl::new("blockstream.info:700", false, true);
```

### Testnet
```rust
let network = ElementsNetwork::LiquidTestnet;
let url = ElectrumUrl::new("blockstream.info:465", true, true);
```

### Regtest
```rust
let network = ElementsNetwork::ElementsRegtest;
let url = ElectrumUrl::new("localhost:60401", false, false);
```

## Performance Optimization

### Parallel Requests
```rust
// Increase parallel requests for faster sync
let update = client.full_scan(&wollet, stop_gap: 20, parallel_requests: 50)?;
```

### Gap Limits
- **Small Gap (5-10)**: Faster sync, may miss transactions
- **Large Gap (20-50)**: Comprehensive but slower
- **Adaptive**: Start small, increase if needed

## Error Handling

### Network Connectivity
```rust
// Retry with exponential backoff
let mut retries = 0;
loop {
    match client.full_scan(&wollet, 20, 20) {
        Ok(update) => {
            wollet.apply_update(update)?;
            break;
        }
        Err(e) if retries < 3 => {
            retries += 1;
            std::thread::sleep(Duration::from_secs(2_u64.pow(retries)));
        }
        Err(e) => return Err(e),
    }
}
```

## Progress Tracking

```rust
// Monitor sync progress
let total_addresses = wollet.script_count();
let mut synced = 0;

for chunk in address_chunks {
    sync_chunk(chunk)?;
    synced += chunk.len();
    println!("Progress: {}/{}", synced, total_addresses);
}
``` 