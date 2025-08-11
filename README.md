# LWK Documentation

This is the comprehensive documentation for the Liquid Wallet Kit (LWK), built with [Docusaurus](https://docusaurus.io/).

## Documentation Structure

The documentation is organized according to the comprehensive plan outlined in [`DOCUMENTATION_PLAN.md`](../DOCUMENTATION_PLAN.md) and covers:

### Main Sections

- **Getting Started** - Installation, first wallet creation, and essential concepts
- **Architecture** - High-level overview, component relationships, and security model
- **Core Components** - Detailed coverage of Wollet, Signer, Hardware Wallets, and App Server
- **Transactions** - PSETs, transaction building, fee estimation, and blinding
- **Assets** - Asset management, issuance, reissuance, and registry integration
- **Multisig** - Multisig setup, descriptor creation, and transaction coordination
- **Integrations** - Language-specific guides for Python, Kotlin, Swift, C#, and WASM
- **Blockchain Backends** - Electrum, Esplora, and Elements RPC integration
- **Advanced Topics** - LiquiDEX, peg-ins, privacy, and performance optimization
- **CLI** - Command-line interface usage and automation
- **Tutorials** - Complete step-by-step project tutorials
- **Deployment** - Production deployment and security considerations
- **Development** - Contributing, building, testing, and debugging
- **Reference** - Complete API reference, CLI commands, and configuration options

## Development

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Content Guidelines

- All markdown files follow the frontmatter format with `id`, `title`, `sidebar_label`, and `sidebar_position`
- Code examples should be provided in multiple languages using tabbed interfaces
- Each concept should be immediately followed by relevant working code examples
- Documentation should be accessible to different skill levels
- All external links should be properly maintained

## Contributing

When adding new documentation:

1. Follow the established file structure
2. Use the frontmatter format consistently
3. Add entries to `sidebars.ts` for navigation
4. Include working code examples
5. Test the build locally before committing

For more details, see the [Development Documentation](docs/development/contributing.md).
