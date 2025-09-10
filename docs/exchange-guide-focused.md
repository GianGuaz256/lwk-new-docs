# Exchange Guide: Liquid and AMP0 Integration

## Installation

```bash
npm install lwk-wasm@latest
```

## 1. Create Standard Liquid Wallet

```javascript
import { Network, WolletDescriptor, Wollet, Mnemonic, Signer } from 'lwk-wasm';

// Create standard Liquid wallet
function createLiquidWallet(mnemonicWords, isTestnet = true) {
    const network = isTestnet ? Network.testnet() : Network.mainnet();
    const mnemonic = new Mnemonic(mnemonicWords);
    const signer = new Signer(mnemonic, network);
    
    // Generate standard descriptor
    const descriptor = signer.wpkhSlip77Descriptor();
    const wollet = new Wollet(network, descriptor, null);
    
    return { wollet, signer, network };
}
```

## 2. Create AMP0 Wallet

```javascript
import { Amp0 } from 'lwk-wasm';

// Create AMP0 wallet for regulated assets
async function createAMP0Wallet(username, password, mnemonicWords, isTestnet = true) {
    const network = isTestnet ? Network.testnet() : Network.mainnet();
    const amp0 = await Amp0.newWithNetwork(network, username, password, "");
    const wollet = amp0.wollet();
    
    const mnemonic = new Mnemonic(mnemonicWords);
    const signer = new Signer(mnemonic, network);
    
    return { amp0, wollet, signer, network };
}
```

## 3. Create Signers

```javascript
// Standard signer for regular Liquid assets
function createStandardSigner(mnemonicWords, network) {
    const mnemonic = new Mnemonic(mnemonicWords);
    return new Signer(mnemonic, network);
}

// AMP0 signer (same as standard but used with AMP0 context)
function createAMP0Signer(mnemonicWords, network) {
    const mnemonic = new Mnemonic(mnemonicWords);
    return new Signer(mnemonic, network);
}
```

## 4. Receive L-BTC (Standard Wallet)

```javascript
import { EsploraClient } from 'lwk-wasm';

async function receiveLBTC_Standard(wollet, network) {
    // Generate receive address
    const address = wollet.address(0);
    console.log("L-BTC receive address:", address.address());
    
    // Sync wallet
    const client = EsploraClient.new("https://blockstream.info/liquidtestnet/api", network);
    const update = await client.fullScan(wollet);
    
    if (update) {
        wollet.applyUpdate(update);
    }
    
    // Get L-BTC balance
    const balance = wollet.balance();
    const lbtcAsset = network.policyAsset();
    const lbtcBalance = balance[lbtcAsset] || 0;
    
    return { address: address.address(), balance: lbtcBalance };
}
```

## 5. Send L-BTC (Standard Wallet)

```javascript
import { TxBuilder } from 'lwk-wasm';

async function sendLBTC_Standard(wollet, signer, network, recipientAddress, amountSats) {
    // Build transaction
    const builder = TxBuilder.new(network);
    builder.addLbtcRecipient(recipientAddress, amountSats);
    const pset = builder.finish(wollet);
    
    // Sign transaction
    const signedPset = signer.sign(pset);
    
    // Broadcast
    const client = network.defaultEsploraClient();
    const txid = await client.broadcastTx(signedPset.extractTx());
    
    return txid;
}
```

## 6. Receive USDT (Standard Wallet)

```javascript
async function receiveUSDT_Standard(wollet, network) {
    // Generate receive address (same as L-BTC)
    const address = wollet.address(1);
    console.log("USDT receive address:", address.address());
    
    // Sync wallet
    const client = EsploraClient.new("https://blockstream.info/liquidtestnet/api", network);
    const update = await client.fullScan(wollet);
    
    if (update) {
        wollet.applyUpdate(update);
    }
    
    // Get USDT balance (replace with actual USDT asset ID)
    const balance = wollet.balance();
    const usdtAsset = "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"; // Testnet USDT
    const usdtBalance = balance[usdtAsset] || 0;
    
    return { address: address.address(), balance: usdtBalance };
}
```

## 7. Send USDT (Standard Wallet)

```javascript
async function sendUSDT_Standard(wollet, signer, network, recipientAddress, amountSats) {
    const usdtAsset = "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"; // Testnet USDT
    
    // Build transaction
    const builder = TxBuilder.new(network);
    builder.addRecipient(recipientAddress, amountSats, usdtAsset);
    const pset = builder.finish(wollet);
    
    // Sign transaction
    const signedPset = signer.sign(pset);
    
    // Broadcast
    const client = network.defaultEsploraClient();
    const txid = await client.broadcastTx(signedPset.extractTx());
    
    return txid;
}
```

## 8. Receive AMP0 Assets

```javascript
async function receiveAMP0Assets(amp0, wollet, network) {
    // Generate AMP0 address
    const address = await amp0.address(null);
    console.log("AMP0 receive address:", address.address());
    
    // Sync AMP0 wallet
    const client = EsploraClient.new("https://blockstream.info/liquidtestnet/api", network);
    const lastIndex = amp0.lastIndex();
    const update = await client.fullScanToIndex(wollet, lastIndex);
    
    if (update) {
        wollet.applyUpdate(update);
    }
    
    // Get AMP0 asset balances
    const balance = wollet.balance();
    
    return { address: address.address(), balance: balance };
}
```

## 9. Send AMP0 Assets

```javascript
import { Amp0Pset } from 'lwk-wasm';

async function sendAMP0Assets(amp0, wollet, signer, network, recipientAddress, amountSats, assetId) {
    // Build AMP0 transaction
    const builder = TxBuilder.new(network);
    builder.addRecipient(recipientAddress, amountSats, assetId);
    const amp0pset = builder.finishForAmp0(wollet);
    
    // Sign with user key
    const pset = signer.sign(amp0pset.pset());
    
    // Request AMP0 cosignature
    const signedAmp0pset = new Amp0Pset(pset, amp0pset.blindingNonces());
    const finalTx = await amp0.sign(signedAmp0pset);
    
    // Broadcast
    const client = network.defaultEsploraClient();
    const txid = await client.broadcastTx(finalTx);
    
    return txid;
}
```

## 10. Monitor All Balances

```javascript
class ExchangeBalanceMonitor {
    constructor() {
        this.standardWallet = null;
        this.amp0Wallet = null;
        this.network = null;
    }
    
    async initialize(standardWallet, amp0Wallet, network) {
        this.standardWallet = standardWallet;
        this.amp0Wallet = amp0Wallet;
        this.network = network;
    }
    
    async monitorBalances() {
        const balances = {
            standard: {},
            amp0: {},
            timestamp: new Date().toISOString()
        };
        
        // Monitor standard wallet
        if (this.standardWallet) {
            const client = EsploraClient.new("https://blockstream.info/liquidtestnet/api", this.network);
            const update = await client.fullScan(this.standardWallet.wollet);
            
            if (update) {
                this.standardWallet.wollet.applyUpdate(update);
            }
            
            balances.standard = this.standardWallet.wollet.balance();
        }
        
        // Monitor AMP0 wallet
        if (this.amp0Wallet) {
            const client = EsploraClient.new("https://blockstream.info/liquidtestnet/api", this.network);
            const lastIndex = this.amp0Wallet.amp0.lastIndex();
            const update = await client.fullScanToIndex(this.amp0Wallet.wollet, lastIndex);
            
            if (update) {
                this.amp0Wallet.wollet.applyUpdate(update);
            }
            
            balances.amp0 = this.amp0Wallet.wollet.balance();
        }
        
        return this.formatBalances(balances);
    }
    
    formatBalances(balances) {
        const lbtcAsset = this.network.policyAsset();
        const usdtAsset = "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2";
        
        return {
            lbtc: {
                standard: balances.standard[lbtcAsset] || 0,
                amp0: balances.amp0[lbtcAsset] || 0
            },
            usdt: {
                standard: balances.standard[usdtAsset] || 0,
                amp0: balances.amp0[usdtAsset] || 0
            },
            other_assets: {
                standard: Object.keys(balances.standard).filter(id => id !== lbtcAsset && id !== usdtAsset),
                amp0: Object.keys(balances.amp0).filter(id => id !== lbtcAsset && id !== usdtAsset)
            },
            timestamp: balances.timestamp
        };
    }
    
    async startMonitoring(intervalSeconds = 30) {
        const monitoringInterval = setInterval(async () => {
            try {
                const balances = await this.monitorBalances();
                console.log("Balance Update:", balances);
                
                // Emit event for external listeners
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('balanceUpdate', { detail: balances }));
                }
            } catch (error) {
                console.error("Balance monitoring error:", error);
            }
        }, intervalSeconds * 1000);
        
        return () => clearInterval(monitoringInterval);
    }
}
```

## Complete Exchange Example

```javascript
async function exchangeExample() {
    try {
        const network = Network.testnet();
        
        // 1. Create wallets
        const standardWallet = createLiquidWallet("standard wallet mnemonic", true);
        const amp0Wallet = await createAMP0Wallet("amp0_username", "amp0_password", "amp0 wallet mnemonic", true);
        
        // 2. Set up monitoring
        const monitor = new ExchangeBalanceMonitor();
        await monitor.initialize(standardWallet, amp0Wallet, network);
        
        // 3. Generate receive addresses
        const standardLBTCAddress = await receiveLBTC_Standard(standardWallet.wollet, network);
        const standardUSDTAddress = await receiveUSDT_Standard(standardWallet.wollet, network);
        const amp0Address = await receiveAMP0Assets(amp0Wallet.amp0, amp0Wallet.wollet, network);
        
        console.log("Receive Addresses:");
        console.log("Standard L-BTC:", standardLBTCAddress.address);
        console.log("Standard USDT:", standardUSDTAddress.address);
        console.log("AMP0 Assets:", amp0Address.address);
        
        // 4. Start balance monitoring
        const stopMonitoring = await monitor.startMonitoring(30);
        
        // 5. Check balances
        const balances = await monitor.monitorBalances();
        console.log("Current Balances:", balances);
        
        // 6. Send transactions (if sufficient balance)
        if (balances.lbtc.standard > 10000) {
            const txid = await sendLBTC_Standard(
                standardWallet.wollet, 
                standardWallet.signer, 
                network, 
                standardLBTCAddress.address, 
                5000
            );
            console.log("L-BTC transaction:", txid);
        }
        
        if (balances.usdt.standard > 1000000) {
            const txid = await sendUSDT_Standard(
                standardWallet.wollet, 
                standardWallet.signer, 
                network, 
                standardUSDTAddress.address, 
                500000
            );
            console.log("USDT transaction:", txid);
        }
        
        // Stop monitoring after 10 minutes
        setTimeout(stopMonitoring, 10 * 60 * 1000);
        
    } catch (error) {
        console.error("Exchange example error:", error);
    }
}

// Run the example
exchangeExample();
```

## Asset IDs Reference

```javascript
const ASSET_IDS = {
    LBTC_MAINNET: "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
    LBTC_TESTNET: "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
    USDT_TESTNET: "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"
};
```

## Error Handling

```javascript
function handleError(error, operation) {
    console.error(`${operation} failed:`, error);
    
    if (error.message.includes('Invalid address index for AMP0')) {
        console.log("Use amp0.address(null) for new addresses");
    } else if (error.message.includes('delayed_signature')) {
        console.log("AMP0 server rejected transaction - check compliance");
    } else if (error.message.includes('Insufficient funds')) {
        console.log("Insufficient balance for transaction");
    }
    
    throw error;
}
```

This focused guide covers exactly what you requested: creating wallets, signers, and handling L-BTC, USDT, and AMP0 assets with balance monitoring - all in JavaScript.
