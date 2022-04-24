interface LocalStorage extends Storage {
  readonly length: number
  clear(): void
  getItem(key: string): string | null
  key(index: number): string | null
  removeItem(key: string): void
  setItem(key: string, value: string): void
  [name: string]: any
}

let store: Record<string, any> = {}

const virtualStorage = (): LocalStorage => ({
  getItem(key: string) {
    return store[key] || null
  },
  setItem(key: string, value: string) {
    store[key] = value.toString()
  },
  removeItem(key: string) {
    delete store[key]
  },
  clear() {
    store = {}
  },
  key(_: number) {
    return null
  },
  length: Object.keys(store).length,
})

const isAvailable = () => {
  const test = 'test'

  try {
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)

    return true
  } catch (e) {
    return false
  }
}

const getLocalStorage = () => {
  return isAvailable() ? window.localStorage : virtualStorage()
}

const decodeValue = (value: any) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (_) {
      //
    }
  }

  return value
}

const encodeValue = (val: any) => {
  if (typeof val === 'string') {
    return val
  }

  return JSON.stringify(val)
}

export const useLocalStorage = () => {
  const localStorage = getLocalStorage()

  const getItem = (key: string) => {
    const value = localStorage.getItem(key)
    return decodeValue(value)
  }

  const setItem = (key: string, value: any) => {
    return localStorage.setItem(key, encodeValue(value))
  }

  const removeItem = (key: string) => {
    return localStorage.removeItem(key)
  }

  return {
    decodeValue,
    encodeValue,
    getLocalStorage: getItem,
    setLocalStorage: setItem,
    removeLocalStorage: removeItem,
  }
}
