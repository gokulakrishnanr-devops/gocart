
import { useState, useEffect, createContext, useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import WishlistPage from './pages/WishlistPage'
import AccountPage from './pages/AccountPage'

const API_URL = import.meta.env.VITE_API_URL || ''

export const AppContext = createContext()

const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  const [wishlist, setWishlist] = useState(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      try {
        const currentUser = JSON.parse(savedUser)

        return JSON.parse(
          localStorage.getItem(`wishlist_${currentUser.id}`) || '[]'
        )
      } catch {
        return []
      }
    }

    return []
  })

  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/api/cart')
      setCart(res.data || [])
    } catch {
      setCart([])
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      try {
        const currentUser = JSON.parse(savedUser)
        setUser(currentUser)
        fetchCart()
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setLoading(false)
  }, [fetchCart])

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(
        `wishlist_${user.id}`,
        JSON.stringify(wishlist)
      )
    }
  }, [wishlist, user])

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', {
      email,
      password
    })

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    setWishlist(
      JSON.parse(
        localStorage.getItem(`wishlist_${res.data.user.id}`) || '[]'
      )
    )

    setUser(res.data.user)

    await fetchCart()

    return res.data
  }

  const register = async (registrationData) => {
    const res = await api.post(
      '/api/auth/register',
      registrationData
    )

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    setWishlist(
      JSON.parse(
        localStorage.getItem(`wishlist_${res.data.user.id}`) || '[]'
      )
    )

    setUser(res.data.user)

    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    setCart([])
    setWishlist([])
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return

    const res = await api.post('/api/cart', {
      product_id: productId,
      quantity
    })

    await fetchCart()
    setCartOpen(true)

    return res.data
  }

  const updateCartItem = async (itemId, quantity) => {
    await api.put(`/api/cart/${itemId}`, { quantity })
    await fetchCart()
  }

  const removeCartItem = async (itemId) => {
    await api.delete(`/api/cart/${itemId}`)
    await fetchCart()
  }

  const placeOrder = async () => {
    const res = await api.post('/api/orders')
    setCart([])
    return res.data
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id)

      if (exists) {
        return prev.filter(p => p.id !== product.id)
      }

      return [...prev, product]
    })
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  // Initial application loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center">
        <div className="w-12 h-12 bg-[#302044] flex items-center justify-center mb-5">
          <span className="font-display text-xl text-[#C6B28D]">G</span>
        </div>

        <div className="w-24 h-px bg-[#E9E4DB] overflow-hidden">
          <div className="h-full w-1/2 bg-[#B39458] animate-pulse" />
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#77717A]">
          GoCart
        </p>
      </div>
    )
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        cart,
        wishlist,
        cartTotal,
        cartCount,
        api,
        login,
        register,
        logout,
        addToCart,
        updateCartItem,
        removeCartItem,
        fetchCart,
        placeOrder,
        toggleWishlist,
        setCartOpen,
      }}
    >
      <div className="min-h-screen bg-[#F8F6F1]">
        <Navbar />

        <CartSidebar
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/products" element={<ProductsPage />} />

            <Route
              path="/auth"
              element={user ? <Navigate to="/" /> : <AuthPage />}
            />

            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/auth" />}
            />

            <Route
              path="/orders"
              element={user ? <OrdersPage /> : <Navigate to="/auth" />}
            />

            <Route
              path="/account"
              element={user ? <AccountPage /> : <Navigate to="/auth" />}
            />

            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  )
}

export default App
