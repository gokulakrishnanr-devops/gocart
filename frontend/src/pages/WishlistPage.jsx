
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { AppContext } from '../App'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { wishlist } = useContext(AppContext)

  if (wishlist.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F8F6F1] px-5 py-20">
        <div className="max-w-md text-center">

          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center border border-[#D9CCB1] bg-white text-[#A18451]">
            <Heart size={34} strokeWidth={1.3} />
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
            Your Personal Collection
          </span>

          <h1 className="mt-4 font-display text-4xl font-medium text-[#302044]">
            Your Wishlist is Empty
          </h1>

          <p className="mx-auto mt-4 max-w-xs text-[13px] leading-7 text-[#89828A]">
            Save the pieces you love and keep your favourite selections close.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex h-12 items-center gap-3 bg-[#302044] px-7 text-[11px] font-semibold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#21152D]"
          >
            Explore Collection
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
              Saved Items
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-medium text-[#302044] sm:text-5xl">
                Your Wishlist
              </h1>

              <p className="mt-3 text-[13px] text-[#89828A]">
                A collection of things worth keeping.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#94794D]">
              <Heart size={15} strokeWidth={1.5} />

              <span>
                {wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Saved products */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">

        <div className="mb-7 flex items-center justify-between border-b border-[#E9E4DB] pb-4">
          <h2 className="font-display text-xl font-medium text-[#302044]">
            Your Saved Collection
          </h2>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#94794D] transition-colors hover:text-[#302044]"
          >
            Discover More
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
