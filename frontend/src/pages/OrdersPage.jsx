
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight
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

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: 'text-[#94794D] bg-[#F5F0E6] border-[#D9CCB1]',
    label: 'Pending'
  },
  confirmed: {
    icon: CheckCircle,
    color: 'text-[#476B51] bg-[#EEF4EE] border-[#D1E0D2]',
    label: 'Confirmed'
  },
  shipped: {
    icon: Truck,
    color: 'text-[#536B83] bg-[#EDF1F5] border-[#D5DEE8]',
    label: 'Shipped'
  },
  delivered: {
    icon: Package,
    color: 'text-[#603F78] bg-[#F1EDF5] border-[#DDD1E8]',
    label: 'Delivered'
  },
}

export default function OrdersPage() {
  const { api } = useContext(AppContext)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/api/orders')
        setOrders(res.data || [])
      } catch {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [api])

  // Loading state
  if (loading) {
    return (
      <main className="min-h-[65vh] bg-[#F8F6F1] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">

          <h1 className="mb-8 font-display text-4xl font-medium text-[#302044]">
            Your Orders
          </h1>

          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse border border-[#E9E4DB] bg-white p-6"
              >
                <div className="mb-4 h-4 w-1/4 bg-[#E9E4DB]" />
                <div className="h-3 w-1/3 bg-[#E9E4DB]" />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F8F6F1] px-5 py-20">
        <div className="max-w-md text-center">

          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center border border-[#D9CCB1] bg-white text-[#A18451]">
            <Package size={34} strokeWidth={1.3} />
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
            Your Purchase History
          </span>

          <h1 className="mt-4 font-display text-4xl font-medium text-[#302044]">
            No Orders Yet
          </h1>

          <p className="mt-4 text-[13px] leading-7 text-[#89828A]">
            Your order history will appear here once you make your first purchase.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex h-12 items-center gap-3 bg-[#302044] px-7 text-[11px] font-semibold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#21152D]"
          >
            Start Shopping
            <ArrowRight size={15} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F6F1]">

      {/* Page heading */}
      <section className="border-b border-[#E9E4DB] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B39458]" />

            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
              Purchase History
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-medium text-[#302044] sm:text-5xl">
                Your Orders
              </h1>

              <p className="mt-3 text-[13px] text-[#89828A]">
                Review your purchases and keep track of your orders.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#94794D]">
              <Package size={16} strokeWidth={1.5} />
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </div>
          </div>
        </div>
      </section>

      {/* Orders list */}
      <section className="mx-auto max-w-[1440px] space-y-6 px-5 py-10 sm:px-8 lg:px-12">

        {orders.map((order) => {
          const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
          const StatusIcon = status.icon

          return (
            <article
              key={order.id}
              className="overflow-hidden border border-[#E9E4DB] bg-white"
            >

              {/* Order header */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#E9E4DB] bg-[#FBFAF7] px-5 py-5 sm:flex-row sm:items-center sm:px-6">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#94794D]">
                    Order Reference
                  </p>

                  <h2 className="mt-1 font-display text-xl font-medium text-[#302044]">
                    #{order.id}
                  </h2>

                  <p className="mt-1 text-[11px] text-[#89828A]">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:justify-end">

                  <span className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] font-semibold uppercase tracking-[1px] ${status.color}`}>
                    <StatusIcon size={14} strokeWidth={1.5} />
                    {status.label}
                  </span>

                  <div className="sm:text-right">
                    <p className="text-[9px] uppercase tracking-[1.5px] text-[#89828A]">
                      Order Total
                    </p>

                    <p className="mt-1 font-display text-xl font-semibold text-[#302044]">
                      {formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ordered products */}
              <div className="divide-y divide-[#EEEAE3] px-5 sm:px-6">

                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-5"
                  >

                    {/* Product visual */}
                    <div
                      className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center bg-gradient-to-br ${
                        item.product?.color || 'from-[#E9E4DB] to-[#D9D0C3]'
                      }`}
                    >
                      <span className="text-[29px]">
                        {item.product?.emoji || '🛍️'}
                      </span>
                    </div>

                    {/* Product details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-[12px] font-semibold leading-5 text-[#302044]">
                        {item.product?.name}
                      </h3>

                      <p className="mt-1 text-[10px] text-[#89828A]">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Item total */}
                    <p className="shrink-0 font-display text-base font-medium text-[#302044]">
                      {formatPrice(item.quantity * item.price)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="flex items-center justify-between border-t border-[#E9E4DB] bg-[#FBFAF7] px-5 py-4 sm:px-6">
                <span className="text-[10px] uppercase tracking-[1.5px] text-[#89828A]">
                  Order #{order.id}
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[#94794D]">
                  {status.label}
                </span>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
