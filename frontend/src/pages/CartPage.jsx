
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Truck
} from 'lucide-react'
import { AppContext } from '../App'

const USD_TO_INR = 94.14

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(price) * USD_TO_INR)
}

export default function CartPage() {
  const {
    cart,
    cartTotal,
    updateCartItem,
    removeCartItem,
    placeOrder
  } = useContext(AppContext)

  const [ordering, setOrdering] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const navigate = useNavigate()

  const tax = cartTotal * 0.08
  const total = cartTotal + tax

  const handlePlaceOrder = async () => {
    setOrdering(true)

    try {
      await placeOrder()
      setOrderPlaced(true)
      setTimeout(() => navigate('/orders'), 2000)
    } catch {
      setOrdering(false)
    }
  }

  // Order confirmation
  if (orderPlaced) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F8F6F1] px-5 py-20">
        <div className="max-w-md text-center">

          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center border border-[#B39458] bg-white text-[#94794D]">
            <CheckCircle size={37} strokeWidth={1.3} />
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
            GoCart Confirmation
          </span>

          <h1 className="mt-4 font-display text-4xl font-medium text-[#302044]">
            Order Placed
          </h1>

          <p className="mt-4 text-[13px] leading-7 text-[#89828A]">
            Your order has been successfully submitted. You will be redirected to your orders shortly.
          </p>

          <div className="mt-8 h-px bg-[#E9E4DB]" />

          <p className="mt-5 text-[10px] uppercase tracking-[2px] text-[#94794D]">
            Thank you for shopping with GoCart
          </p>
        </div>
      </main>
    )
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F8F6F1] px-5 py-20">
        <div className="max-w-md text-center">

          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center border border-[#D9CCB1] bg-white text-[#A18451]">
            <ShoppingBag size={34} strokeWidth={1.3} />
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
            Your Selection
          </span>

          <h1 className="mt-4 font-display text-4xl font-medium text-[#302044]">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-[13px] leading-7 text-[#89828A]">
            Looks like you haven't added anything yet. Explore our collection and find something you love.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex h-12 items-center gap-3 bg-[#302044] px-7 text-[11px] font-semibold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#21152D]"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F6F1]">

      {/* Page heading */}
      <section className="border-b border-[#E9E4DB] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B39458]" />

            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
              Your Selection
            </span>
          </div>

          <h1 className="font-display text-4xl font-medium text-[#302044] sm:text-5xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-[12px] text-[#89828A]">
            Review your selected items before placing your order.
          </p>
        </div>
      </section>

      {/* Cart content */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">

        <div className="grid items-start gap-8 lg:grid-cols-3">

          {/* Cart items */}
          <div className="space-y-4 lg:col-span-2">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-medium text-[#302044]">
                Your Items
              </h2>

              <span className="text-[10px] uppercase tracking-[1.5px] text-[#94794D]">
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {cart.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 border border-[#E9E4DB] bg-white p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
              >

                {/* Product visual */}
                <div
                  className={`flex h-28 w-full shrink-0 items-center justify-center bg-gradient-to-br ${
                    item.product.color || 'from-[#E9E4DB] to-[#D9D0C3]'
                  } sm:h-28 sm:w-28`}
                >
                  <span className="text-[43px]">
                    {item.product.emoji || '🛍️'}
                  </span>
                </div>

                {/* Product information */}
                <div className="min-w-0 flex-1">

                  <p className="text-[9px] font-semibold uppercase tracking-[2px] text-[#A18451]">
                    {item.product.category}
                  </p>

                  <h3 className="mt-2 line-clamp-2 font-display text-lg font-medium text-[#302044]">
                    {item.product.name}
                  </h3>

                  <p className="mt-2 font-display text-xl font-medium text-[#302044]">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                  <div className="flex h-9 items-center border border-[#E9E4DB]">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateCartItem(item.id, item.quantity - 1)
                          : removeCartItem(item.id)
                      }
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center text-[#514A55] transition-colors hover:bg-[#F1EEE8]"
                    >
                      <Minus size={13} />
                    </button>

                    <span className="w-8 text-center text-[12px] font-semibold text-[#302044]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateCartItem(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center text-[#514A55] transition-colors hover:bg-[#F1EEE8]"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <p className="font-display text-lg font-semibold text-[#302044]">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                {/* Remove item */}
                <button
                  onClick={() => removeCartItem(item.id)}
                  aria-label={`Remove ${item.product.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center self-end text-[#A49CA5] transition-colors hover:bg-red-50 hover:text-red-700 sm:self-center"
                >
                  <Trash2 size={17} strokeWidth={1.5} />
                </button>
              </article>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 pt-3 text-[11px] font-semibold tracking-wide text-[#94794D] transition-colors hover:text-[#302044]"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24">
            <div className="border border-[#E9E4DB] bg-white">

              <div className="border-b border-[#E9E4DB] px-6 py-5">
                <h2 className="font-display text-2xl font-medium text-[#302044]">
                  Order Summary
                </h2>

                <p className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#94794D]">
                  Payment Overview
                </p>
              </div>

              <div className="space-y-5 p-6">

                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#89828A]">
                    Subtotal ({cart.length} items)
                  </span>

                  <span className="font-medium text-[#302044]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#89828A]">
                    Shipping
                  </span>

                  <span className="font-medium text-[#94794D]">
                    Free
                  </span>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#89828A]">
                    Tax (8%)
                  </span>

                  <span className="font-medium text-[#302044]">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="border-t border-[#E9E4DB] pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-semibold text-[#302044]">
                      Total
                    </span>

                    <span className="font-display text-[27px] font-semibold text-[#302044]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-[#89828A]">
                    Inclusive of calculated tax.
                  </p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={ordering}
                  className="flex h-12 w-full items-center justify-center bg-[#302044] text-[11px] font-semibold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#21152D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {ordering ? 'Processing Order...' : 'Place Order'}
                </button>

                <p className="text-center text-[10px] text-[#89828A]">
                  Your order will be submitted securely.
                </p>

                <div className="space-y-4 border-t border-[#E9E4DB] pt-5">

                  <div className="flex items-center gap-3">
                    <ShieldCheck
                      size={17}
                      strokeWidth={1.5}
                      className="text-[#A18451]"
                    />

                    <span className="text-[11px] text-[#77717A]">
                      Secure checkout
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Truck
                      size={17}
                      strokeWidth={1.5}
                      className="text-[#A18451]"
                    />

                    <span className="text-[11px] text-[#77717A]">
                      Free shipping on orders over {formatPrice(50)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
