# window.ipfs-fallback

[![Build Status](https://travis-ci.org/tableflip/window.ipfs-fallback.svg?branch=master)](https://travis-ci.org/tableflip/window.ipfs-fallback) [![dependencies Status](https://david-dm.org/tableflip/window.ipfs-fallback/status.svg)](https://david-dm.org/tableflip/window.ipfs-fallback) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Get `window.ipfs` with fallback to CDN if unavailable

The [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion) web extension provides a `window.ipfs` object to web pages you visit.

This module will detects the presence of `window.ipfs` and automatically falls back to downloading the latest version of IPFS from `https://unpkg.com/ipfs/dist/index.min.js` if it's unavailable. Note: can be configured to fallback to IPFS API.

## Usage

```js
import getIpfs from 'window.ipfs-fallback'

const ipfs = await getIpfs()

console.log(await ipfs.id())
```

## API

### `getIpfs([options])`

If `window.ipfs` is available, the promise is resolved with that node.

If `window.ipfs` is unavailable, a `<script src="https://unpkg.com/ipfs/dist/index.min.js" />` is inserted into the document and when the script has loaded a new IPFS node is created and the promise is resolved.

* `options.cdn` - (String) URL of a CDN to load IPFS from. Use this option if you want to use a different CDN, or request a specific version, or a non-minifed version
* `options.ipfs` - (Object) Options to pass to the fallback IPFS constructor
* `options.api` - (Boolean) Fallback to IPFS API (https://unpkg.com/ipfs-api/dist/index.min.js by default)

## Contribute

Feel free to dive in! [Open an issue](https://github.com/tableflip/window.ipfs-fallback/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
