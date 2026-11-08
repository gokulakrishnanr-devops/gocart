
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Store,
  ShieldCheck,
  Phone,
  MapPin
} from 'lucide-react'
import { AppContext } from '../App'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, register } = useContext(AppContext)
  const navigate = useNavigate()

  // Clear all authentication form fields
  const clearForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setPhone('')
    setAddress('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!isLogin && !/^[0-9]{10,15}$/.test(phone)) {
      setError('Enter a valid phone number')
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        const registrationData = new FormData()

        registrationData.append('name', name)
        registrationData.append('email', email)
        registrationData.append('password', password)
        registrationData.append('phone', phone)
        registrationData.append('address', address)

        await register(registrationData)
      }

      clearForm()
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8F6F1] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[440px]">

        {/* Brand */}
        <div className="text-center mb-9">
          <div className="w-14 h-14 mx-auto mb-6 bg-[#302044] flex items-center justify-center">
            <Store size={23} strokeWidth={1.5} className="text-[#C6B28D]" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.28em] text-[#94794D] font-semibold mb-3">
            GoCart · Curated Living
          </p>

          <h1 className="text-[34px] sm:text-[38px] text-[#21152D] font-medium">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h1>

          <p className="text-sm text-[#77717A] mt-3">
            {isLogin
              ? 'Sign in to continue your shopping experience.'
              : 'Create an account to discover your next favourite.'}
          </p>
        </div>

        {/* Authentication panel */}
        <section className="bg-white border border-[#E9E4DB] p-7 sm:p-9">

          {/* Form heading */}
          <div className="mb-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#94794D] font-semibold mb-2">
              {isLogin ? 'Your Account' : 'Membership'}
            </p>

            <h2 className="text-xl text-[#21152D]">
              {isLogin ? 'Sign In' : 'Registration Details'}
            </h2>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 bg-red-50 text-red-700 border border-red-100 px-4 py-3 mb-6 text-sm"
            >
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            autoComplete="off"
          >

            {/* Name */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#29252C] mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={17}
                    strokeWidth={1.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94794D]"
                  />

                  <input
                    type="text"
                    name="gocart-name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-[#FAF9F6] border border-[#E9E4DB] text-sm text-[#29252C] placeholder:text-[#A39DA5] outline-none transition-colors focus:border-[#94794D]"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#29252C] mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94794D]"
                />

                <input
                  type="email"
                  name="gocart-email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#FAF9F6] border border-[#E9E4DB] text-sm text-[#29252C] placeholder:text-[#A39DA5] outline-none transition-colors focus:border-[#94794D]"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#29252C] mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    strokeWidth={1.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94794D]"
                  />

                  <input
                    type="tel"
                    name="gocart-phone"
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-[#FAF9F6] border border-[#E9E4DB] text-sm text-[#29252C] placeholder:text-[#A39DA5] outline-none transition-colors focus:border-[#94794D]"
                    placeholder="Enter your phone number"
                    maxLength={15}
                    required
                  />
                </div>
              </div>
            )}

            {/* Complete Address */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#29252C] mb-2">
                  Complete Address
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    strokeWidth={1.6}
                    className="absolute left-4 top-4 text-[#94794D]"
                  />

                  <textarea
                    name="gocart-address"
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full min-h-24 py-3 pl-11 pr-4 bg-[#FAF9F6] border border-[#E9E4DB] text-sm text-[#29252C] placeholder:text-[#A39DA5] outline-none transition-colors focus:border-[#94794D] resize-y"
                    placeholder="House / Apartment, Street, Area, Town / City, District, State, PIN code, Country"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#29252C] mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94794D]"
                />

                <input
                  type="password"
                  name="gocart-password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#FAF9F6] border border-[#E9E4DB] text-sm text-[#29252C] placeholder:text-[#A39DA5] outline-none transition-colors focus:border-[#94794D]"
                  placeholder="Min 6 characters"
                  minLength={6}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#29252C] mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    strokeWidth={1.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94794D]"
                  />

                  <input
                    type="password"
                    name="gocart-confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-[#FAF9F6] border border-[#E9E4DB] text-sm text-[#29252C] placeholder:text-[#A39DA5] outline-none transition-colors focus:border-[#94794D]"
                    placeholder="Re-enter your password"
                    minLength={6}
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-[#302044] text-white flex items-center justify-center gap-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors hover:bg-[#21152D] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>
                {loading
                  ? 'Please Wait...'
                  : isLogin
                    ? 'Sign In'
                    : 'Create Account'}
              </span>

              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Login / registration toggle */}
          <div className="mt-7 pt-6 border-t border-[#E9E4DB] text-center">
            <p className="text-sm text-[#77717A]">
              {isLogin
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                clearForm()
              }}
              className="mt-2 text-xs uppercase tracking-[0.12em] font-semibold text-[#94794D] hover:text-[#302044] transition-colors"
            >
              {isLogin ? 'Create an Account' : 'Sign In Instead'}
            </button>
          </div>
        </section>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 mt-7 text-[#77717A]">
          <ShieldCheck size={15} strokeWidth={1.6} />

          <span className="text-[11px] tracking-wide">
            Secured Account Access
          </span>
        </div>

        <div className="w-12 h-px bg-[#B39458] mx-auto mt-7" />
      </div>
    </main>
  )
}
