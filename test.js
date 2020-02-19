import test from 'ava'
import getIpfs from '.'

test.beforeEach(() => {
  global.window = {}
  global.document = {}
})

test.serial('should use window.ipfs if available', async t => {
  window.ipfs = {}
  const ipfs = await getIpfs()
  t.is(ipfs, window.ipfs)
})

test.serial('should use window.ipfs.enable if available', async t => {
  window.ipfs = { enable: async args => args }
  const permissions = Object.freeze({
    foo: ['a', 'b', 'c'],
    bar: ['1', '2', '3'],
    buzz: false
  })
  const ipfs = await getIpfs({ permissions })
  t.deepEqual(ipfs, permissions)
})

test.serial('should use window.Ipfs if available', async t => {
  const instance = {}

  window.Ipfs = {
    create: () => instance
  }

  const ipfs = await getIpfs()
  t.is(ipfs, instance)
})

test.serial('should load IPFS from CDN if window.ipfs unavailable', async t => {
  const instance = {}

  document.createElement = () => ({})
  document.body = {
    appendChild (el) {
      process.nextTick(() => {
        window.Ipfs = {
          create: () => instance
        }
        el.onload()
      })
    }
  }

  const ipfs = await getIpfs()
  t.is(ipfs, instance)
})

test.serial('should load IPFS HTTP Client', async t => {
  const instance = {}

  document.createElement = () => ({})
  document.body = {
    appendChild (el) {
      process.nextTick(() => {
        window.IpfsHttpClient = function () {
          return instance
        }
        el.onload()
      })
    }
  }

  const ipfs = await getIpfs({ api: true })
  t.is(ipfs, instance)
})
