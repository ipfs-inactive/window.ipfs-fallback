module.exports = function getIpfs (opts) {
  opts = opts || {}

  return new Promise(function (resolve, reject) {
    if (window.ipfs) return resolve(window.ipfs)

    var onLoad = function () {
      var ipfs = new window.Ipfs(opts.ipfs)

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

    if (window.Ipfs) return onLoad()

    var script = document.createElement('script')
    script.src = opts.cdn || 'https://unpkg.com/ipfs/dist/index.min.js'
    script.onload = onLoad
    script.onerror = reject
    document.body.appendChild(script)
  })
}
