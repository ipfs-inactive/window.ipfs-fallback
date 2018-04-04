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

test.serial('should use window.Ipfs if available', async t => {
  const instance = {
    once (event, handler) {
      if (event === 'ready') process.nextTick(() => handler())
      return instance
    },
    removeListener: () => instance
  }

  window.Ipfs = function () { return instance }

  const ipfs = await getIpfs()
  t.is(ipfs, instance)
})

test.serial('should load IPFS from CDN if window.ipfs unavailable', async t => {
  const instance = {
    once (event, handler) {
      if (event === 'ready') process.nextTick(() => handler())
      return instance
    },
    removeListener: () => instance
  }

  document.createElement = () => ({})
  document.body = {
    appendChild (el) {
      process.nextTick(() => {
        window.Ipfs = function () { return instance }
        el.onload()
      })
    }
  }

  const ipfs = await getIpfs()
  t.is(ipfs, instance)
})
