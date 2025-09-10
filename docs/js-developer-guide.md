# JavaScript Developer Guide: AMP0 Integration with LWK 0.11.0

## Installation

```bash
npm install lwk-wasm@latest
```

## Basic Setup

```javascript
import { Amp0, Network, Mnemonic, Signer } from 'lwk-wasm';

async function initializeAMP0(username, password, mnemonicWords) {
    const network = Network.testnet();
    const amp0 = await Amp0.newWithNetwork(network, username, password, "");
    const wollet = amp0.wollet();
    
    const mnemonic = new Mnemonic(mnemonicWords);
    const signer = new Signer(mnemonic, network);
    
    return { amp0, wollet, signer, network };
}
```

## Address Generation

```javascript
async function generateAddress(amp0) {
    const newAddress = await amp0.address(null);
    return {
        address: newAddress.address(),
        index: newAddress.index()
    };
}
```

## Wallet Sync

```javascript
import { EsploraClient } from 'lwk-wasm';

async function syncWallet(wollet, amp0, network) {
    const client = EsploraClient.new("https://blockstream.info/liquidtestnet/api", network);
    const lastIndex = amp0.lastIndex();
    const update = await client.fullScanToIndex(wollet, lastIndex);
    
    if (update) {
        wollet.applyUpdate(update);
    }
    
    return wollet.balance();
}
```

## Send Transaction

```javascript
import { TxBuilder, Amp0Pset } from 'lwk-wasm';

async function sendLBTC(wollet, amp0, signer, network, recipientAddress, amountSats) {
    const builder = TxBuilder.new(network);
    builder.addLbtcRecipient(recipientAddress, amountSats);
    const amp0pset = builder.finishForAmp0(wollet);
    
    const pset = signer.sign(amp0pset.pset());
    const signedAmp0pset = new Amp0Pset(pset, amp0pset.blindingNonces());
    const finalTx = await amp0.sign(signedAmp0pset);
    
    const client = network.defaultEsploraClient();
    return await client.broadcastTx(finalTx);
}
```

## Complete Example

```javascript
async function completeExample() {
    try {
        // Initialize
        const { amp0, wollet, signer, network } = await initializeAMP0(
            "username", "password", "mnemonic words"
        );
        
        // Generate address
        const address = await generateAddress(amp0);
        console.log("Address:", address);
        
        // Sync wallet
        const balance = await syncWallet(wollet, amp0, network);
        console.log("Balance:", balance);
        
        // Send transaction (if sufficient balance)
        const policyAsset = network.policyAsset();
        if (balance[policyAsset] > 10000) {
            const txid = await sendLBTC(wollet, amp0, signer, network, address.address, 5000);
            console.log("Transaction:", txid);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
```
