---
id: installation
title: CLI Installation
sidebar_label: Installation
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LWK CLI Installation

This guide covers the installation of `lwk_cli`, the command-line interface for the Liquid Wallet Kit.

## Prerequisites

### System Requirements

- **Operating System**: Linux, macOS, or Windows
- **Architecture**: x86_64 or ARM64
- **RAM**: Minimum 512MB available
- **Storage**: At least 1GB free space for blockchain data

### Required Dependencies

<Tabs>
<TabItem value="linux" label="Linux" default>

**Rust Installation**:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

**System Dependencies**:
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y libudev-dev pkg-config

# CentOS/RHEL/Fedora
sudo yum install -y libudev-devel pkgconf-pkg-config
```

</TabItem>
<TabItem value="macos" label="macOS">

**Rust Installation**:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

**Xcode Command Line Tools**:
```bash
xcode-select --install
```

</TabItem>
<TabItem value="windows" label="Windows">

**Rust Installation**:
1. Download and run [rustup-init.exe](https://rustup.rs/)
2. Follow the installation wizard
3. Restart your terminal

**Visual Studio Build Tools**:
Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) or Visual Studio with C++ support.

</TabItem>
</Tabs>

## Installation Methods

### Method 1: Install from Crates.io (Recommended)

Install the latest stable release directly from the Rust package registry:

<Tabs>
<TabItem value="basic" label="Basic Installation" default>

```bash
cargo install lwk_cli
```

</TabItem>
<TabItem value="serial" label="With Jade Serial Support">

For Jade hardware wallet serial communication:

```bash
cargo install lwk_cli --features serial
```

</TabItem>
<TabItem value="all-features" label="All Features">

Install with all available features:

```bash
cargo install lwk_cli --all-features
```

</TabItem>
</Tabs>

### Method 2: Build from Source

For the latest development version or custom builds:

```bash
# Clone the repository
git clone https://github.com/Blockstream/lwk.git
cd lwk

# Build release version
cargo build --release

# Create convenient alias
alias lwk_cli="$(pwd)/target/release/lwk_cli"

# Or add to PATH permanently
export PATH="$(pwd)/target/release:$PATH"
```

### Method 3: Development Build

For development and testing:

```bash
git clone https://github.com/Blockstream/lwk.git
cd lwk

# Build debug version (faster compilation)
cargo build

# Create alias for debug binary
alias lwk_cli="$(pwd)/target/debug/lwk_cli"
```

## Version Management

### Update Rust Toolchain

If you encounter build errors, update your Rust installation:

```bash
rustup update
rustup default stable
```

### Specific Rust Version

For compatibility with older systems:

```bash
rustup install 1.75.0
rustup default 1.75.0
```

### Update LWK CLI

Update to the latest version:

```bash
cargo install lwk_cli --force
```

## Verification

Verify your installation:

```bash
# Check version
lwk_cli --version

# View available commands
lwk_cli --help

# Test server start (Ctrl+C to stop)
lwk_cli server start
```

Expected output:
```
lwk_cli 0.7.0
LWK CLI - Liquid Wallet Kit Command Line Interface
```

## Configuration

### Environment Variables

Customize LWK CLI behavior with environment variables:

```bash
# Custom Electrum server
export LWK_ELECTRUM_URL="ssl://blockstream.info:995"

# Custom data directory
export LWK_DATA_DIR="$HOME/.lwk"

# Network selection
export LWK_NETWORK="liquidtestnet"
```

### Data Directory

By default, LWK CLI stores data in:

<Tabs>
<TabItem value="linux" label="Linux" default>

```bash
$HOME/.lwk/
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
$HOME/.lwk/
```

</TabItem>
<TabItem value="windows" label="Windows">

```cmd
%APPDATA%\lwk\
```

</TabItem>
</Tabs>

## Hardware Wallet Setup

### Jade Hardware Wallet

<Tabs>
<TabItem value="usb" label="USB Connection" default>

No additional setup required. Jade will be detected automatically when connected via USB.

```bash
# Test Jade detection
lwk_cli signer jade-id
```

</TabItem>
<TabItem value="serial" label="Serial Connection">

For serial connections, install with serial feature:

```bash
cargo install lwk_cli --features serial
```

Then connect via serial port:

```bash
# List available serial ports
lwk_cli signer jade-id --serial-port /dev/ttyUSB0
```

</TabItem>
</Tabs>

### Ledger Hardware Wallet

Install Ledger app dependencies:

<Tabs>
<TabItem value="linux" label="Linux" default>

```bash
# Add udev rules for Ledger
sudo wget -q -O /etc/udev/rules.d/20-hw1.rules \
  https://raw.githubusercontent.com/LedgerHQ/udev-rules/master/20-hw1.rules
sudo udevadm control --reload-rules
```

</TabItem>
<TabItem value="macos" label="macOS">

No additional setup required for USB connections.

</TabItem>
<TabItem value="windows" label="Windows">

Install Ledger Live or the standalone driver from Ledger's website.

</TabItem>
</Tabs>

## Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Update Rust and retry
rustup update
cargo clean
cargo build --release
```

**Permission Errors** (Linux):
```bash
# Add user to dialout group for hardware wallets
sudo usermod -a -G dialout $USER
# Log out and back in
```

**Missing Dependencies**:
```bash
# Ubuntu/Debian
sudo apt install -y build-essential libudev-dev pkg-config
```

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/Blockstream/lwk/issues)
2. Review the [troubleshooting guide](./troubleshooting.md)
3. Join the community discussions

## Next Steps

With LWK CLI installed, you're ready to:

1. **[Start the Server](./server-management.md)** - Launch the LWK background service
2. **[Manage Signers](./signer-operations.md)** - Set up software and hardware signers
3. **[Create Wallets](./wallet-operations.md)** - Build your first Liquid wallet
4. **[Explore Assets](./asset-operations.md)** - Issue and manage Liquid assets

The installation is complete! LWK CLI is now ready to manage your Liquid wallets and assets.