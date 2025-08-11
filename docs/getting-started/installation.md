---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation Guide

Get LWK up and running in your preferred development environment. Choose your language below and follow the setup instructions.

## Quick Installation

<Tabs groupId="language">
<TabItem value="python" label="Python" default>

### Prerequisites
- **Python 3.8+**
- **pip** package manager

### Install from PyPI

```bash title="Install LWK Python package"
# Install the latest stable version
pip install lwk

# Or install with specific version
pip install lwk==0.10.0
```

### Verify Installation

```python title="verify_install.py"
import lwk

# Test basic functionality
try:
    mnemonic = lwk.Mnemonic.generate()
    network = lwk.Network.testnet()
    print(f"✅ LWK Python installed successfully!")
    print(f"📝 Test mnemonic: {mnemonic}")
except ImportError as e:
    print(f"❌ Installation failed: {e}")
```

### Development Setup

```bash title="Setup development environment"
# Create virtual environment
python -m venv lwk_env
source lwk_env/bin/activate  # On Windows: lwk_env\Scripts\activate

# Install LWK
pip install lwk

# Install additional development tools
pip install jupyter ipython requests
```

</TabItem>
<TabItem value="rust" label="Rust">

### Prerequisites
- **Rust 1.70.0+**

### Install Rust

```bash title="Install Rust toolchain"
# Install Rust using rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Verify installation
rustc --version
cargo --version
```

### Add to Your Project

```toml title="Cargo.toml"
[dependencies]
# Core wallet functionality
lwk_wollet = "0.10.0"

# Transaction signing
lwk_signer = "0.10.0"

# Hardware wallet support (optional)
lwk_jade = { version = "0.10.0", optional = true }
lwk_ledger = { version = "0.10.0", optional = true }

# Common utilities
lwk_common = "0.10.0"

[features]
default = []
hardware = ["lwk_jade", "lwk_ledger"]
serial = ["lwk_jade/serial"]  # For Jade over USB/serial
```

### Verify Installation

```rust title="src/main.rs"
use lwk_wollet::{ElementsNetwork, Wollet, WolletDescriptor, NoPersist};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("✅ LWK Rust crates loaded successfully!");
    
    // Test basic functionality
    let network = ElementsNetwork::LiquidTestnet;
    println!("🌐 Network: {:?}", network);
    
    Ok(())
}
```

### Build and Run

```bash title="Build your project"
# Build the project
cargo build

# Run with output
cargo run
```

</TabItem>
<TabItem value="cli" label="CLI">

### Prerequisites
- **Rust 1.70.0+** (for building from source)

### Install CLI Tool

#### Option 1: From Source (Recommended)

```bash title="Build and install from source"
# Clone the repository
git clone https://github.com/Blockstream/lwk.git
cd lwk

# Build and install CLI
cargo install --path ./lwk_cli

# Verify installation
lwk_cli --version
```

#### Option 2: Using Cargo

```bash title="Install via cargo"
# Install directly from crates.io
cargo install lwk_cli

# Verify installation
lwk_cli --version
```

### Quick Test

```bash title="Test CLI installation"
# Test basic functionality
lwk_cli --help

# Start testnet server (in background)
lwk_cli --network testnet server start &

# Test connection
lwk_cli --network testnet server status

# Stop server
lwk_cli --network testnet server stop
```

### Shell Completion (Optional)

```bash title="Setup shell completion"
# For bash
lwk_cli completions bash > ~/.bash_completion.d/lwk_cli

# For zsh
lwk_cli completions zsh > ~/.zsh/completions/_lwk_cli

# For fish
lwk_cli completions fish > ~/.config/fish/completions/lwk_cli.fish
```

</TabItem>
<TabItem value="javascript" label="JavaScript/WASM">

### Prerequisites
- **Node.js 16+** or modern browser
- **npm** or **yarn**

### Install Package

```bash title="Install LWK WASM package"
# Using npm
npm install lwk-wasm

# Using yarn
yarn add lwk-wasm
```

### Browser Setup

```html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <title>LWK WASM Example</title>
</head>
<body>
    <script type="module">
        import init, { Mnemonic, Network } from './node_modules/lwk-wasm/lwk_wasm.js';
        
        async function main() {
            // Initialize WASM module
            await init();
            
            // Test basic functionality
            const mnemonic = Mnemonic.generate();
            const network = Network.testnet();
            
            console.log('✅ LWK WASM loaded successfully!');
            console.log('📝 Test mnemonic:', mnemonic.toString());
        }
        
        main().catch(console.error);
    </script>
</body>
</html>
```

### Node.js Setup

```javascript title="test.js"
import init, { Mnemonic, Network } from 'lwk-wasm';

async function main() {
    // Initialize WASM module
    await init();
    
    // Test basic functionality
    const mnemonic = Mnemonic.generate();
    const network = Network.testnet();
    
    console.log('✅ LWK WASM loaded successfully!');
    console.log('📝 Test mnemonic:', mnemonic.toString());
}

main().catch(console.error);
```

### Build Setup

```json title="package.json"
{
  "name": "lwk-app",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "lwk-wasm": "^0.10.0"
  },
  "scripts": {
    "start": "node test.js",
    "serve": "npx http-server . -p 8080"
  }
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin/Android">

### Prerequisites
- **Android Studio** or **IntelliJ IDEA**
- **Android SDK 26+**
- **Gradle 7.0+**

### Add to Android Project

```kotlin title="build.gradle.kts (Module: app)"
dependencies {
    // LWK Android bindings
    implementation("com.blockstream:lwk-android:0.10.0")
    
    // Required dependencies
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
}
```

### Gradle Setup

```kotlin title="build.gradle.kts (Project)"
allprojects {
    repositories {
        google()
        mavenCentral()
        // Add if using snapshot builds
        maven("https://oss.sonatype.org/content/repositories/snapshots/")
    }
}
```

### Permissions

```xml title="AndroidManifest.xml"
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- For hardware wallet support (optional) -->
<uses-permission android:name="android.permission.USB_PERMISSION" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

### Verify Installation

```kotlin title="MainActivity.kt"
import com.blockstream.lwk.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        try {
            // Test basic functionality
            val mnemonic = Mnemonic.generate()
            val network = Network.testnet()
            
            Log.d("LWK", "✅ LWK Android installed successfully!")
            Log.d("LWK", "📝 Test mnemonic: $mnemonic")
        } catch (e: Exception) {
            Log.e("LWK", "❌ Installation failed: ${e.message}")
        }
    }
}
```

</TabItem>
<TabItem value="swift" label="Swift/iOS">

### Prerequisites
- **Xcode 14.0+**
- **iOS 13.0+** or **macOS 10.15+**
- **Swift 5.7+**

### Swift Package Manager

```swift title="Package.swift"
// swift-tools-version: 5.7
import PackageDescription

let package = Package(
    name: "LWKApp",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15)
    ],
    dependencies: [
        .package(
            url: "https://github.com/Blockstream/lwk-swift.git",
            from: "0.10.0"
        )
    ],
    targets: [
        .target(
            name: "LWKApp",
            dependencies: [
                .product(name: "LiquidWalletKit", package: "lwk-swift")
            ]
        )
    ]
)
```

### Xcode Integration

1. **Open Xcode** and create/open your project
2. **File → Add Package Dependencies**
3. **Enter URL**: `https://github.com/Blockstream/lwk-swift.git`
4. **Select version** `0.10.0` or later
5. **Add to target**

### Verify Installation

```swift title="ContentView.swift"
import SwiftUI
import LiquidWalletKit

struct ContentView: View {
    @State private var status = "Testing..."
    
    var body: some View {
        VStack {
            Text(status)
                .onAppear {
                    testLWK()
                }
        }
    }
    
    func testLWK() {
        do {
            // Test basic functionality
            let mnemonic = Mnemonic.generate()
            let network = Network.testnet()
            
            status = "✅ LWK Swift installed successfully!"
            print("📝 Test mnemonic: \(mnemonic)")
        } catch {
            status = "❌ Installation failed: \(error.localizedDescription)"
        }
    }
}
```

### Info.plist Configuration

```xml title="Info.plist"
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    <!-- Or configure specific domains for Electrum/Esplora -->
</dict>
```

</TabItem>
</Tabs>

## Next Steps

Now that LWK is installed, continue with:

- **[Essential Concepts](./concepts)** - Learn the fundamentals
- **[First Wallet](./first-wallet)** - Create your first wallet
- **[Tutorials](../tutorials/)** - Explore specific use cases 