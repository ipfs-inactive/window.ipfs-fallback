module.exports = function getIpfs (opts) {
  opts = opts || {}

  return new Promise(function (resolve, reject) {
    if (window.ipfs) return resolve(window.ipfs)

    var onLoad = function () {
      var Ipfs = getConstructor(opts.api)
      var ipfs = new Ipfs(opts.ipfs)

      if (opts.api) return resolve(ipfs)

      var onReady = function () {
        ipfs.removeListener('error', onError)
        resolve(ipfs)
      }

      var onError = function (err) {
        ipfs.removeListener('ready', onReady)
        reject(err)
      }

      ipfs.once('ready', onReady).once('error', onError)
    }

    if (getConstructor(opts.api)) return onLoad()

    var script = document.createElement('script')
    script.src = opts.cdn || getCdnUrl(opts.api)
    script.onload = onLoad
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function getConstructor (api) {
  return api ? window.IpfsApi : window.Ipfs
}

function getCdnUrl (api) {
  return api
    ? 'https://unpkg.com/ipfs-api/dist/index.min.js'
    : 'https://unpkg.com/ipfs/dist/index.min.js'
}
