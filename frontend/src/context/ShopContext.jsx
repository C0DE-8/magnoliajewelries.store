import { createContext, useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext(null)
function read(key) { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : [] } catch { return [] } }
export function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState(() => read('magnolia-favorites').filter(Number.isInteger))
  const [bag, setBag] = useState(() => read('magnolia-bag').filter(item => item && Number.isInteger(item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && typeof item.size === 'string'))
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Continue in memory when storage is disabled. */ } }
  const toggleFavorite = id => setFavorites(previous => { const next = previous.includes(id) ? previous.filter(x => x !== id) : [...previous, id]; save('magnolia-favorites', next); return next })
  const addToBag = (id, size) => setBag(previous => { const found = previous.find(x => x.id === id && x.size === size); const next = found ? previous.map(x => x === found ? { ...x, quantity: x.quantity + 1 } : x) : [...previous, { id, size, quantity: 1 }]; save('magnolia-bag', next); return next })
  const updateQuantity = (id, size, quantity) => setBag(previous => { const next = previous.map(x => x.id === id && x.size === size ? { ...x, quantity } : x).filter(x => x.quantity > 0); save('magnolia-bag', next); return next })
  return <ShopContext.Provider value={{ favorites, toggleFavorite, bag, addToBag, updateQuantity }}>{children}</ShopContext.Provider>
}

