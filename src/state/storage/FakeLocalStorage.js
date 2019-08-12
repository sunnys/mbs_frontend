// fake localStorage - i use this with edux-persist when localStorage/localForage isn't available
export default class FakeLocalStorage {
  constructor() {
    this.storage = {}
  }

  setItem(key, value, callback) {
    return new Promise((resolve, reject) => {
      this.storage[key] = value
      // eslint-disable-next-line no-console
      console.debug('setItem called with ', key, value)
      if (callback) callback(null, value)
      resolve(value)
    })
  }

  getItem(key, callback) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-console
      console.debug('getItem called with ', key)
      const value = this.storage[key]
      if (callback) callback(null, value)
      resolve(value)
    })
  }

  removeItem(key, callback) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-console
      console.debug('removeItem called with ', key)
      const value = this.storage[key]
      delete this.storage[key]
      if (callback) callback(null, value)
      resolve(value)
    })
  }

  getAllKeys(callback) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-console
      console.debug('getAllKeys called')
      const keys = Object.keys(this.storage)
      if (callback) callback(null, keys)
      resolve(keys)
    })
  }
}