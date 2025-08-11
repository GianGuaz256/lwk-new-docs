---
id: signing-flow
title: Signing Flow
sidebar_label: Signing Flow
sidebar_position: 4
---

# Step-by-Step Signing Process

The complete PSET signing workflow involves validation, signature generation, and coordination across multiple signers for different script types.

## PSET Creation to Finalization

### 1. PSET Creation
```rust
// Build PSET with TxBuilder
let mut pset = TxBuilder::new()
    .add_recipient(&address, amount)?
    .finish(&wollet)?;
```

### 2. Input Validation
```rust
// Validate PSET inputs
for (index, input) in pset.inputs().iter().enumerate() {
    // Check UTXO exists
    if input.witness_utxo.is_none() {
        return Err("Missing witness UTXO".into());
    }
    
    // Verify amounts
    let utxo = input.witness_utxo.as_ref().unwrap();
    if utxo.value.is_explicit() {
        println!("Input {}: {} sats", index, utxo.value.explicit());
    }
}
```

### 3. Signature Generation
```rust
// Sign with any signer type
let signed_inputs = signer.sign(&mut pset)?;
println!("Signed {} inputs", signed_inputs);
```

### 4. Finalization
```rust
// Extract final transaction
let final_tx = pset.extract_tx()?;
println!("Transaction ready for broadcast: {}", final_tx.txid());
```

## Script Type Handling

### P2WPKH (Wrapped P2PKH)
```rust
// Most common script type - handled automatically
// No special configuration needed
let signed = signer.sign(&mut pset)?;
```

### P2WSH (Wrapped Script Hash) - Multisig
```rust
// Requires witness script and redeem script
// Multiple signers coordinate
let signed1 = signer1.sign(&mut pset)?;
let signed2 = signer2.sign(&mut pset)?;

// Check signature threshold
let threshold_met = pset.inputs().iter().all(|input| {
    input.partial_sigs.len() >= required_sigs
});
```

### Taproot (TR)
```rust
// Taproot support (when available)
// Single signature for key-path spending
let signed = signer.sign(&mut pset)?;
```

## Multi-signature Coordination

### Partial Signing Workflow
```rust
// 2-of-3 multisig example
let signers = vec![signer1, signer2, signer3];
let mut signatures_collected = 0;

for signer in &signers {
    if let Ok(count) = signer.sign(&mut pset) {
        signatures_collected += count;
        println!("Signer contributed {} signatures", count);
        
        // Check if we have enough signatures
        if signatures_collected >= 2 {
            println!("Threshold reached!");
            break;
        }
    }
}
```

### Signature Collection
```rust
// Track signature progress
fn check_multisig_progress(pset: &PartiallySignedTransaction, threshold: usize) -> bool {
    pset.inputs().iter().all(|input| {
        input.partial_sigs.len() >= threshold
    })
}

let is_ready = check_multisig_progress(&pset, 2);
```

## Input Validation Details

### Script Verification
```rust
// Verify input scripts match expected patterns
for input in pset.inputs() {
    if let Some(witness_script) = &input.witness_script {
        // Validate witness script structure
        match witness_script.len() {
            71 => println!("P2WPKH script"),
            _ => println!("Custom script: {} bytes", witness_script.len()),
        }
    }
}
```

### Amount Checking
```rust
// Verify input/output amounts
let input_total: u64 = pset.inputs().iter()
    .map(|input| input.witness_utxo.as_ref().unwrap().value.explicit())
    .sum();

let output_total: u64 = pset.outputs().iter()
    .map(|output| output.value.explicit())
    .sum();

let fee = input_total - output_total;
println!("Transaction fee: {} sats", fee);
```

### Blinding Factor Validation
```rust
// Validate confidential transaction blinding
for (index, output) in pset.outputs().iter().enumerate() {
    if output.blinding_key.is_some() {
        println!("Output {} has blinding key", index);
    }
    
    if output.value_commitment.is_some() {
        println!("Output {} is confidential", index);
    }
}
```

## Error Handling

### Invalid PSET Errors
```rust
match signer.sign(&mut pset) {
    Err(SignError::InvalidPset(msg)) => {
        eprintln!("PSET validation failed: {}", msg);
        // Check PSET structure, inputs, outputs
    },
    Err(SignError::InsufficientFunds) => {
        eprintln!("Not enough funds for transaction");
        // Review input selection
    },
    Ok(count) => println!("Successfully signed {} inputs", count),
    Err(e) => eprintln!("Other signing error: {}", e),
}
```

### Signature Verification Failures
```rust
// Verify signatures after signing
fn verify_signatures(pset: &PartiallySignedTransaction) -> Result<(), Box<dyn std::error::Error>> {
    for (index, input) in pset.inputs().iter().enumerate() {
        for (pubkey, signature) in &input.partial_sigs {
            // Verify each signature
            if !verify_signature(signature, pubkey, input) {
                return Err(format!("Invalid signature for input {}", index).into());
            }
        }
    }
    Ok(())
}
```

### Common Error Recovery
```rust
// Retry with corrected parameters
fn retry_signing(mut pset: PartiallySignedTransaction, signer: &dyn Signer) -> Result<u32, SignError> {
    // Clear previous failed signatures
    for input in pset.inputs_mut() {
        input.partial_sigs.clear();
    }
    
    // Retry signing
    signer.sign(&mut pset)
}
```

## Best Practices

1. **Validate Early**: Check PSET structure before signing
2. **Progress Tracking**: Monitor signature collection in multisig
3. **Error Recovery**: Implement retry mechanisms for transient failures
4. **Security Checks**: Verify amounts and recipients before signing
5. **State Management**: Track signing progress across sessions 