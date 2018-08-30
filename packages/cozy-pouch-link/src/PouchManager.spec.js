/* global jest */

import PouchManager from './PouchManager'
import * as mocks from './__tests__/mocks'

jest.mock('PouchDB')

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

describe('PouchManager', () => {
  let manager, getReplicationURL

  beforeEach(() => {
    getReplicationURL = () => 'replicationURL'
    manager = new PouchManager(['io.cozy.todos'], {
      replicationDelay: 16,
      getReplicationURL: () => getReplicationURL()
    })
    const pouch = manager.getPouch('io.cozy.todos')
    jest
      .spyOn(pouch.replicate, 'from')
      .mockImplementation(mocks.pouchReplication)
  })

  afterEach(() => {
    manager.destroy()
  })

  it('should create pouches', () => {
    expect(Object.values(manager.pouches).length).toBe(1)
  })

  it('should periodically call replicate', async () => {
    manager.startReplicationLoop()
    await sleep(1000)
    const pouch = manager.getPouch('io.cozy.todos')
    expect(pouch.replicate.from.mock.calls.length).toBeGreaterThan(5)
  })

  it('should stop in case of error', async () => {
    getReplicationURL = () => {
      throw new Error()
    }
    jest.spyOn(console, 'warn').mockReturnValue()
    jest.spyOn(manager, 'stopReplicationLoop')
    manager.startReplicationLoop()
    try {
      await manager.waitForCurrentReplications()
    } catch (e) {
      /* continue regardless of error */
    }
    expect(manager.stopReplicationLoop).toHaveBeenCalled()
  })
})
