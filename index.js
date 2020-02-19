module.exports = function getIpfs (opts) {
  opts = opts || {}

  return new Promise(function (resolve, reject) {
    if (window.ipfs) {
      // forward-compatible migration
      // https://github.com/ipfs-shipyard/ipfs-companion/issues/589
      if (typeof window.ipfs.enable === 'function') {
        return resolve(window.ipfs.enable(opts.permissions))
      }
      // backward-compatible
      return resolve(window.ipfs)
    }

    var onLoad = async function () {
      try {
        if (opts.api) {
          var httpIpfs = window.IpfsHttpClient(opts.ipfs)
          return resolve(httpIpfs)
        } else {
          var localIpfs = await window.Ipfs.create(opts.ipfs)
          return resolve(localIpfs)
        }
      } catch (err) {
        return reject(err)
      }
    }

    if (clientAvailable(opts.api)) return onLoad()

    var script = document.createElement('script')
    script.src = opts.cdn || getCdnUrl(opts.api)
    script.onload = onLoad
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function clientAvailable (api) {
  return api ? window.IpfsHttpClient : window.Ipfs
}

function getCdnUrl (api) {
  return api
    ? 'https://unpkg.com/ipfs-http-client/dist/index.min.js'
    : 'https://unpkg.com/ipfs/dist/index.min.js'
}
