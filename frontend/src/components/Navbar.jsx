
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Package,
  Store
} from 'lucide-react'
import { AppContext } from '../App'

export default function Navbar() {
  const { user, cartCount, wishlist, logout, setCartOpen } = useContext(AppContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Collection' },
    ...(user ? [{ path: '/orders', label: 'My Orders' }] : [])
  ]

  const linkStyle = (path) =>
    `relative py-2 text-[13px] tracking-wide transition-colors duration-200 ${
      isActive(path)
        ? 'text-[#302044] font-semibold'
        : 'text-[#716B73] hover:text-[#302044]'
    }`

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${
        scrolled
          ? 'bg-[#F8F6F1]/95 shadow-[0_4px_18px_rgba(33,21,45,0.06)] backdrop-blur-md'
          : 'bg-[#F8F6F1]'
      }`}
    >
      <div className="border-b border-[#E9E4DB]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex h-[76px] items-center justify-between">

            {/* Brand */}
            <Link to="/" className="group flex items-center gap-3 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center border border-[#B39458]/50 text-[#302044]">
                <Store size={19} strokeWidth={1.5} />
              </div>

              <div className="flex flex-col leading-none">
                <span className="font-display text-[25px] font-semibold tracking-[-0.8px] text-[#302044]">
                  GoCart
                </span>
                <span className="mt-1.5 text-[8px] font-medium uppercase tracking-[3px] text-[#A18A62]">
                  Curated Living
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-9 lg:gap-11">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={linkStyle(link.path)}
                >
                  {link.label}

                  {isActive(link.path) && (
                    <span className="absolute -bottom-[27px] left-0 h-[2px] w-full bg-[#B39458]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-3">

              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className={`relative flex h-10 w-10 items-center justify-center transition-colors ${
                  isActive('/wishlist')
                    ? 'text-[#B39458]'
                    : 'text-[#514A55] hover:text-[#B39458]'
                }`}
              >
                <Heart size={19} strokeWidth={1.5} />

                {wishlist.length > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#302044] px-1 text-[9px] font-medium text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Shopping cart"
                className="relative flex h-10 w-10 items-center justify-center text-[#514A55] transition-colors hover:text-[#B39458]"
              >
                <ShoppingCart size={19} strokeWidth={1.5} />

                {cartCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#B39458] px-1 text-[9px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Authenticated user */}
              {user ? (
                <div className="hidden md:flex items-center gap-3 border-l border-[#E5DED2] pl-4 ml-1">

                  {/* Customer account link */}
                  <Link
                    to="/account"
                    aria-label="Account settings"
                    title="Account Settings"
                    className="flex items-center gap-3 group"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                      isActive('/account')
                        ? 'bg-[#B39458] text-white'
                        : 'bg-[#302044] text-[#E5D3A8] group-hover:bg-[#B39458] group-hover:text-white'
                    }`}>
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <span className="max-w-[100px] truncate text-[12px] font-medium text-[#302044] group-hover:text-[#B39458]">
                      {user.name}
                    </span>
                  </Link>

                  {/* My Orders */}
                  <Link
                    to="/orders"
                    aria-label="My orders"
                    className="text-[#716B73] transition-colors hover:text-[#B39458]"
                  >
                    <Package size={18} strokeWidth={1.5} />
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="text-[#716B73] transition-colors hover:text-red-700"
                  >
                    <LogOut size={17} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden md:flex h-10 items-center justify-center gap-2 bg-[#302044] px-5 text-[12px] font-medium tracking-wide text-white transition-colors hover:bg-[#21152D]"
                >
                  <User size={15} strokeWidth={1.6} />
                  Sign In
                </Link>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="ml-1 flex h-10 w-10 items-center justify-center text-[#302044] md:hidden"
              >
                {mobileOpen
                  ? <X size={21} strokeWidth={1.5} />
                  : <Menu size={21} strokeWidth={1.5} />
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-b border-[#E9E4DB] bg-[#F8F6F1] px-5 py-5 md:hidden">
          <div className="mx-auto max-w-[1440px] space-y-1">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block border-b border-[#E9E4DB] py-3 text-[13px] ${
                  isActive(link.path)
                    ? 'font-semibold text-[#302044]'
                    : 'text-[#716B73]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-b border-[#E9E4DB] py-3 text-[13px] text-[#716B73]"
            >
              Wishlist
              {wishlist.length > 0 && (
                <span className="text-[#B39458]">{wishlist.length}</span>
              )}
            </Link>

            {user ? (
              <>
                {/* Mobile account settings */}
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className={`block border-b border-[#E9E4DB] py-3 text-[13px] ${
                    isActive('/account')
                      ? 'font-semibold text-[#302044]'
                      : 'text-[#716B73]'
                  }`}
                >
                  Account Settings
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-[#E9E4DB] py-3 text-[13px] text-[#716B73]"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 py-3 text-left text-[13px] text-red-700"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex h-11 items-center justify-center bg-[#302044] text-[13px] font-medium text-white"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
