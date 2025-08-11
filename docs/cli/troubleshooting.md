---
id: troubleshooting
title: CLI Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 9
---

# CLI Troubleshooting

This guide helps resolve common issues encountered while using LWK CLI.

## Installation Issues

### Compilation Errors

**Rust Version Incompatibility**:
```bash
# Update to latest stable Rust
rustup update stable
rustup default stable

# Check version (should be 1.75.0 or later)
rustc --version
```

**Missing System Dependencies**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y build-essential libudev-dev pkg-config

# macOS
xcode-select --install

# Check dependencies
pkg-config --version
```

**Permission Denied During Install**:
```bash
# Ensure cargo bin directory is writable
chmod 755 ~/.cargo/bin

# Alternative: Install to custom location
cargo install lwk_cli --root ~/my-tools
export PATH="$HOME/my-tools/bin:$PATH"
```

## Connection Issues

### Electrum Server Problems

**Connection Refused**:
```bash
# Test server connectivity
telnet blockstream.info 995

# Try alternative servers
lwk_cli --electrum-url "ssl://electrum.blockstream.info:995" wallet sync
lwk_cli --electrum-url "ssl://liquid.network:995" wallet sync
```

**SSL Certificate Issues**:
```bash
# Use plaintext connection (testnet only)
lwk_cli --electrum-url "tcp://electrum.liquidtestnet.com:51401" wallet sync

# Update system certificates
# Ubuntu/Debian
sudo apt update && sudo apt install ca-certificates

# macOS
brew install ca-certificates
```

**Timeout Errors**:
```bash
# Increase timeout settings
lwk_cli --timeout 60 wallet sync

# Use batch sync for better performance
lwk_cli wallet sync --batch-size 10
```

## Hardware Wallet Issues

### Jade Connection Problems

**Device Not Detected**:
```bash
# Check USB connection
lsusb | grep -i jade

# Test with different USB port/cable
# Ensure Jade is unlocked and on main menu

# For serial connection, list ports
ls /dev/tty*
lwk_cli signer jade-id --serial-port /dev/ttyUSB0
```

**Permission Issues (Linux)**:
```bash
# Add user to dialout group
sudo usermod -a -G dialout $USER

# Create udev rule for Jade
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="10c4", ATTR{idProduct}=="ea60", MODE="0666"' | sudo tee /etc/udev/rules.d/99-jade.rules
sudo udevadm control --reload-rules
```

### Ledger Connection Problems

**App Not Found**:
```bash
# Ensure Liquid app is installed and open on Ledger
# Update Ledger Live and firmware if needed

# Test connection
lwk_cli signer ledger-id
```

**Permission Issues (Linux)**:
```bash
# Install Ledger udev rules
wget -q -O - https://raw.githubusercontent.com/LedgerHQ/udev-rules/master/add_udev_rules.sh | sudo bash
```

## Wallet Issues

### Synchronization Problems

**Sync Taking Too Long**:
```bash
# Sync with smaller gap limits
lwk_cli wallet sync --wallet-name "test" --gap-limit 5

# Use incremental sync for large wallets
lwk_cli wallet sync --wallet-name "test" --incremental
```

**Missing Transactions**:
```bash
# Force full rescan
lwk_cli wallet sync --wallet-name "test" --rescan

# Check if address is in wallet
lwk_cli wallet addresses --wallet-name "test" | grep "address"

# Verify descriptor matches
lwk_cli wallet details --wallet-name "test"
```

**Balance Discrepancies**:
```bash
# Refresh UTXO set
lwk_cli wallet sync --wallet-name "test" --force-refresh

# Check for unconfirmed transactions
lwk_cli wallet txs --wallet-name "test" --unconfirmed-only

# Verify against block explorer
lwk_cli wallet address --wallet-name "test" --index 0
```

### Transaction Issues

**Insufficient Balance**:
```bash
# Check detailed balance
lwk_cli wallet balance --wallet-name "test" --detailed

# List all UTXOs
lwk_cli wallet utxos --wallet-name "test"

# Check specific asset balance
lwk_cli wallet balance --wallet-name "test" --asset "asset_id"
```

**Transaction Stuck**:
```bash
# Check transaction status
lwk_cli wallet tx --wallet-name "test" --txid "txid"

# Attempt rebroadcast
lwk_cli wallet broadcast --wallet-name "test" --pset "pset" --force

# Create replacement transaction
lwk_cli wallet send --wallet-name "test" --replace-txid "stuck_txid" --fee-rate 200
```

**PSET Signing Failures**:
```bash
# Verify PSET integrity
lwk_cli wallet pset-details --wallet-name "test" --pset "pset"

# Check signer compatibility
lwk_cli signer details --signer-name "signer"

# Try signing with verbose output
lwk_cli signer sign --signer-name "signer" --pset "pset" --verbose
```

## Configuration Issues

### Data Directory Problems

**Corrupted Wallet Data**:
```bash
# Backup existing data
cp -r ~/.lwk ~/.lwk.backup

# Recreate wallet from descriptor
lwk_cli wallet restore --wallet-name "test" --descriptor "descriptor"

# Resync from scratch
lwk_cli wallet sync --wallet-name "test" --rescan
```

**Permission Issues**:
```bash
# Fix data directory permissions
chmod -R 700 ~/.lwk

# Use custom data directory
export LWK_DATA_DIR="/custom/path"
lwk_cli wallet list
```

**Disk Space Issues**:
```bash
# Check available space
df -h ~/.lwk

# Clean old data
lwk_cli wallet cleanup --older-than "30d"

# Use different data directory
lwk_cli --data-dir "/external/storage" wallet list
```

## Network Issues

### Mainnet vs Testnet Confusion

**Wrong Network**:
```bash
# Check current network
lwk_cli status

# Switch to correct network
export LWK_NETWORK="liquidtestnet"  # or "liquid" for mainnet
lwk_cli wallet list

# Recreate wallet for correct network
lwk_cli wallet delete --wallet-name "test" --force
lwk_cli wallet restore --wallet-name "test" --descriptor "descriptor" --network liquidtestnet
```

### Asset Issues

**Unknown Asset ID**:
```bash
# Query asset registry
lwk_cli asset details --asset-id "asset_id"

# Check if asset is registered
lwk_cli asset registry --search "asset_name"

# Manual asset registration
lwk_cli asset register --asset-id "asset_id" --name "Asset Name"
```

## Performance Issues

### Slow Operations

**Large Wallet Sync**:
```bash
# Use parallel sync
lwk_cli wallet sync --wallet-name "test" --parallel 4

# Optimize gap limits
lwk_cli wallet sync --wallet-name "test" --gap-limit 20 --batch-size 50

# Enable caching
lwk_cli --cache-size 100MB wallet sync --wallet-name "test"
```

**Memory Usage**:
```bash
# Limit memory usage
lwk_cli --memory-limit 512MB wallet sync --wallet-name "test"

# Use streaming mode for large operations
lwk_cli wallet txs --wallet-name "test" --stream
```

## Debugging

### Enable Verbose Logging

```bash
# Set log level
export RUST_LOG=debug
lwk_cli wallet sync --wallet-name "test"

# Component-specific logging
export RUST_LOG=lwk_wollet=trace,lwk_signer=debug
lwk_cli signer sign --signer-name "test" --pset "pset"

# Log to file
lwk_cli wallet sync --wallet-name "test" 2>&1 | tee sync.log
```

### State Inspection

```bash
# Check system status
lwk_cli status --detailed

# Verify configuration
lwk_cli config --show-all

# Test connectivity
lwk_cli test-connection --electrum-url "ssl://blockstream.info:995"
```

## Common Error Messages

### `Error: Descriptor parsing failed`

**Cause**: Invalid descriptor format
**Solution**:
```bash
# Validate descriptor separately
lwk_cli validate-descriptor "ct(slip77(...))"

# Check for typos in descriptor string
# Ensure proper CT descriptor format
```

### `Error: Electrum server connection failed`

**Cause**: Network connectivity or server issues
**Solution**:
```bash
# Test different servers
lwk_cli --electrum-url "ssl://liquid.network:995" wallet sync

# Check firewall settings
# Verify DNS resolution
```

### `Error: Hardware wallet not found`

**Cause**: Device connection or permission issues
**Solution**:
```bash
# Check device connection
lsusb | grep -i "jade\|ledger"

# Verify udev rules (Linux)
cat /etc/udev/rules.d/*hw*.rules

# Try different USB port/cable
```

### `Error: Insufficient funds`

**Cause**: Not enough balance for transaction
**Solution**:
```bash
# Check detailed balance
lwk_cli wallet balance --wallet-name "test" --detailed

# Verify UTXOs are confirmed
lwk_cli wallet utxos --wallet-name "test" --confirmed-only

# Reduce transaction amount or fee
```

## Getting Additional Help

### Community Resources

- **GitHub Issues**: [Report bugs and feature requests](https://github.com/Blockstream/lwk/issues)
- **Documentation**: Latest guides and tutorials
- **Community Forum**: Discussion and support

### Diagnostic Information

When reporting issues, include:

```bash
# LWK version
lwk_cli --version

# System information
uname -a
rustc --version

# Configuration
lwk_cli status --detailed

# Recent logs (remove sensitive information)
export RUST_LOG=debug
lwk_cli [command] 2>&1 | tail -100
```

### Professional Support

For enterprise deployments:
- Contact Blockstream support
- Consider professional consulting
- Review enterprise support options

Most issues can be resolved by following the troubleshooting steps above. If problems persist, the community and support resources are available to help.