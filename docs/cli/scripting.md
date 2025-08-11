---
id: scripting
title: Scripting and Automation
sidebar_label: Scripting
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scripting and Automation

LWK CLI is designed for automation and integration into larger systems. This guide covers scripting patterns, automation workflows, and integration techniques for production environments.

## CLI Design Principles

### JSON Output Format

All LWK CLI commands return structured JSON for easy parsing:

```bash
# Basic command with JSON output
lwk_cli wallet balance --wallet-name "treasury"
```

**Output**:
```json
{
  "balance": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": 1000000
  }
}
```

### Error Handling

Commands return appropriate exit codes for scripting:

```bash
# Check command success
if lwk_cli wallet balance --wallet-name "treasury" > /dev/null 2>&1; then
  echo "Wallet accessible"
else
  echo "Wallet not found or server down"
  exit 1
fi
```

## Basic Scripting Patterns

### JSON Processing with jq

Extract specific values from JSON responses:

<Tabs>
<TabItem value="balance" label="Balance Extraction" default>

```bash
#!/bin/bash
# Extract L-BTC balance
LBTC_ASSET="144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49"
BALANCE=$(lwk_cli wallet balance --wallet-name "treasury" | jq -r ".balance[\"$LBTC_ASSET\"]")

if [ "$BALANCE" = "null" ]; then
  echo "No L-BTC balance found"
  exit 1
fi

echo "L-BTC Balance: $BALANCE satoshis"
```

</TabItem>
<TabItem value="transactions" label="Transaction Parsing">

```bash
#!/bin/bash
# Get recent transaction IDs
lwk_cli wallet txs --wallet-name "treasury" --limit 5 | \
  jq -r '.txs[].txid' | \
  while read txid; do
    echo "Processing transaction: $txid"
    # Process each transaction
  done
```

</TabItem>
<TabItem value="signers" label="Signer Management">

```bash
#!/bin/bash
# Check if required signers are loaded
REQUIRED_SIGNERS=("alice" "bob" "charlie")
LOADED_SIGNERS=$(lwk_cli signer list | jq -r '.signers[].name')

for signer in "${REQUIRED_SIGNERS[@]}"; do
  if ! echo "$LOADED_SIGNERS" | grep -q "^$signer$"; then
    echo "Error: Signer $signer not loaded"
    exit 1
  fi
done

echo "All required signers are loaded"
```

</TabItem>
</Tabs>

### Environment Configuration

Use environment variables for configuration:

```bash
#!/bin/bash
# Configuration via environment variables
export LWK_WALLET_NAME="${LWK_WALLET_NAME:-treasury}"
export LWK_NETWORK="${LWK_NETWORK:-liquidtestnet}"
export LWK_ELECTRUM_URL="${LWK_ELECTRUM_URL:-ssl://blockstream.info:465}"

# Start server with environment configuration
lwk_cli server start \
  --network "$LWK_NETWORK" \
  --electrum-url "$LWK_ELECTRUM_URL"
```

## Automated Workflows

### Asset Issuance Pipeline

Complete automated asset issuance:

```bash
#!/bin/bash
# Automated Asset Issuance Pipeline

set -euo pipefail  # Exit on error, undefined variables, pipe failures

# Configuration
WALLET_NAME="treasury"
ISSUER_DOMAIN="example.com"
ISSUER_PUBKEY="020202020202020202020202020202020202020202020202020202020202020202"

# Function to create asset contract
create_asset_contract() {
  local name="$1"
  local ticker="$2"
  local precision="$3"
  
  lwk_cli asset contract \
    --domain "$ISSUER_DOMAIN" \
    --issuer-pubkey "$ISSUER_PUBKEY" \
    --name "$name" \
    --ticker "$ticker" \
    --precision "$precision"
}

# Function to issue asset with complete workflow
issue_asset() {
  local contract="$1"
  local amount="$2"
  local tokens="$3"
  
  # Create unsigned PSET
  local pset
  pset=$(lwk_cli wallet issue \
    --wallet-name "$WALLET_NAME" \
    --satoshi-asset "$amount" \
    --satoshi-token "$tokens" \
    --contract "$contract")
  
  # Sign with all required signers
  local signed_pset="$pset"
  for signer in alice bob; do
    signed_pset=$(lwk_cli signer sign \
      --signer-name "$signer" \
      --pset "$signed_pset")
  done
  
  # Broadcast transaction
  local txid
  txid=$(lwk_cli wallet broadcast \
    --wallet-name "$WALLET_NAME" \
    --pset "$signed_pset" | jq -r '.txid')
  
  echo "$txid"
}

# Main issuance process
main() {
  echo "Starting automated asset issuance..."
  
  # Check server status
  if ! lwk_cli server status > /dev/null 2>&1; then
    echo "Starting LWK server..."
    lwk_cli server start &
    sleep 5
  fi
  
  # Create asset contract
  echo "Creating asset contract..."
  CONTRACT=$(create_asset_contract "Stable Dollar" "USD" 2)
  
  # Issue asset
  echo "Issuing asset..."
  TXID=$(issue_asset "$CONTRACT" 100000000 2)
  
  echo "Asset issued successfully!"
  echo "Transaction ID: $TXID"
  echo "Contract: $CONTRACT" | jq .
}

main "$@"
```

### Automated Payment Processing

Process batch payments from CSV file:

```bash
#!/bin/bash
# Automated Payment Processor

WALLET_NAME="payments"
PAYMENT_FILE="payments.csv"
LOG_FILE="payment_log.txt"

# Function to process single payment
process_payment() {
  local address="$1"
  local amount="$2"
  local asset="$3"
  local memo="$4"
  
  echo "Processing payment: $address - $amount - $memo" | tee -a "$LOG_FILE"
  
  # Create transaction
  local pset
  pset=$(lwk_cli wallet send \
    --wallet-name "$WALLET_NAME" \
    --recipient "$address:$amount:$asset" 2>&1)
  
  if [[ $? -ne 0 ]]; then
    echo "Error creating transaction for $address: $pset" | tee -a "$LOG_FILE"
    return 1
  fi
  
  # Sign transaction (assuming automated signer setup)
  local signed_pset
  signed_pset=$(lwk_cli signer sign \
    --signer-name "payment_signer" \
    --pset "$pset" 2>&1)
  
  if [[ $? -ne 0 ]]; then
    echo "Error signing transaction for $address: $signed_pset" | tee -a "$LOG_FILE"
    return 1
  fi
  
  # Broadcast transaction
  local result
  result=$(lwk_cli wallet broadcast \
    --wallet-name "$WALLET_NAME" \
    --pset "$signed_pset" 2>&1)
  
  if [[ $? -ne 0 ]]; then
    echo "Error broadcasting transaction for $address: $result" | tee -a "$LOG_FILE"
    return 1
  fi
  
  local txid
  txid=$(echo "$result" | jq -r '.txid')
  
  # Add memo
  lwk_cli wallet set-tx-memo \
    --wallet-name "$WALLET_NAME" \
    --txid "$txid" \
    --memo "$memo" > /dev/null
  
  echo "Payment completed: $txid" | tee -a "$LOG_FILE"
  return 0
}

# Main processing loop
main() {
  echo "Starting batch payment processing..." | tee -a "$LOG_FILE"
  
  local processed=0
  local failed=0
  
  # Process each line in CSV file
  while IFS=',' read -r address amount asset memo; do
    # Skip header line
    if [[ "$address" == "address" ]]; then
      continue
    fi
    
    if process_payment "$address" "$amount" "$asset" "$memo"; then
      ((processed++))
    else
      ((failed++))
    fi
    
    # Rate limiting
    sleep 2
  done < "$PAYMENT_FILE"
  
  echo "Payment processing complete:" | tee -a "$LOG_FILE"
  echo "Processed: $processed" | tee -a "$LOG_FILE"
  echo "Failed: $failed" | tee -a "$LOG_FILE"
}

main "$@"
```

## System Integration

### Monitoring and Alerting

Monitor wallet status and send alerts:

```bash
#!/bin/bash
# Wallet Monitoring Script

WALLET_NAME="treasury"
MIN_LBTC_BALANCE=1000000  # 0.01 L-BTC minimum

# Function to check wallet balance
check_balance() {
  local balance
  balance=$(lwk_cli wallet balance --wallet-name "$WALLET_NAME" 2>/dev/null | \
    jq -r '.balance["144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49"] // 0')
  
  if [[ "$balance" -lt "$MIN_LBTC_BALANCE" ]]; then
    echo "Alert: Low L-BTC balance in wallet $WALLET_NAME: $balance satoshis"
  fi
}

# Function to check server status
check_server() {
  if ! lwk_cli server status > /dev/null 2>&1; then
    echo "Alert: LWK server is not responding"
    return 1
  fi
  return 0
}

# Main monitoring function
main() {
  echo "Starting wallet monitoring..."
  
  if check_server; then
    check_balance
  fi
  
  echo "Monitoring check complete"
}

# Run as cron job: */5 * * * * /path/to/monitor.sh
main "$@"
```

## Error Handling Best Practices

Robust error handling patterns:

```bash
#!/bin/bash
# Robust Error Handling

set -euo pipefail

# Function to handle errors
handle_error() {
  local exit_code=$?
  local line_number=$1
  echo "Error on line $line_number: Command exited with status $exit_code" >&2
  exit $exit_code
}

# Set error trap
trap 'handle_error $LINENO' ERR

# Function to retry commands
retry_command() {
  local max_attempts=$1
  local delay=$2
  shift 2
  local command=("$@")
  
  for ((i=1; i<=max_attempts; i++)); do
    if "${command[@]}"; then
      return 0
    fi
    
    if [[ $i -lt $max_attempts ]]; then
      echo "Command failed (attempt $i/$max_attempts), retrying in ${delay}s..."
      sleep "$delay"
    fi
  done
  
  echo "Command failed after $max_attempts attempts"
  return 1
}

# Example usage
retry_command 3 5 lwk_cli wallet balance --wallet-name "treasury"
```

## Production Deployment

### Docker Integration

```bash
#!/bin/bash
# Container startup script

set -euo pipefail

# Wait for dependencies
while ! curl -s "$LWK_ELECTRUM_URL" > /dev/null 2>&1; do
  echo "Waiting for Electrum server..."
  sleep 5
done

# Start LWK server
exec lwk_cli server start \
  --network "${LWK_NETWORK:-liquid}" \
  --electrum-url "${LWK_ELECTRUM_URL}" \
  --rpc-bind "0.0.0.0:3000"
```

### Configuration Management

```bash
#!/bin/bash
# Configuration Management

# Set defaults
set_defaults() {
  export LWK_WALLET_NAME="${LWK_WALLET_NAME:-treasury}"
  export LWK_NETWORK="${LWK_NETWORK:-liquid}"
  export LWK_ELECTRUM_URL="${LWK_ELECTRUM_URL:-ssl://blockstream.info:995}"
}

# Validate configuration
validate_config() {
  if [[ -z "$LWK_WALLET_NAME" ]]; then
    echo "Error: LWK_WALLET_NAME is required"
    exit 1
  fi
  
  if [[ ! "$LWK_NETWORK" =~ ^(liquid|liquidtestnet|liquidregtest)$ ]]; then
    echo "Error: LWK_NETWORK must be liquid, liquidtestnet, or liquidregtest"
    exit 1
  fi
}

# Initialize configuration
init_config() {
  set_defaults
  validate_config
  
  echo "Configuration loaded:"
  echo "  Wallet: $LWK_WALLET_NAME"
  echo "  Network: $LWK_NETWORK"
  echo "  Electrum: $LWK_ELECTRUM_URL"
}
```

## Server Management

Always gracefully shutdown when finished:

```bash
# Stop the LWK server
lwk_cli server stop
```

## Next Steps

With scripting and automation mastered:

1. **Production Deployment** - Deploy LWK in production environments
2. **Custom Applications** - Build applications using LWK CLI as backend
3. **Advanced Integration** - Integrate with existing enterprise systems

LWK CLI's automation capabilities enable sophisticated financial infrastructure built on the Liquid Network, providing the foundation for scalable digital asset solutions.