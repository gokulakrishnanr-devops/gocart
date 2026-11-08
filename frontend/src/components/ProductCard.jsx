
import { useContext } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { AppContext } from '../App'

const USD_TO_INR = 94.14

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(price) * USD_TO_INR)
}

export default function ProductCard({ product }) {
  const { user, addToCart, wishlist, toggleWishlist } = useContext(AppContext)

  const isWishlisted = wishlist.some(p => p.id === product.id)

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0

  return (
    <article className="group overflow-hidden border border-[#E9E4DB] bg-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(33,21,45,0.07)]">

      {/* Product image area */}
      <div
        className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${
          product.color || 'from-[#F0EDE7] to-[#E5DFD4]'
        }`}
      >
        <span className="select-none text-[76px] transition-transform duration-500 group-hover:scale-105">
          {product.emoji || '🛍️'}
        </span>

        {/* Product badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 border border-[#B39458]/40 bg-[#F8F6F1] px-3 py-1 text-[9px] font-semibold uppercase tracking-[1.5px] text-[#302044]">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 bg-[#302044] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center border transition-colors ${
            isWishlisted
              ? 'border-[#B39458] bg-[#302044] text-[#D7BD84]'
              : 'border-[#E9E4DB] bg-white/95 text-[#625A65] hover:border-[#B39458] hover:text-[#B39458]'
          }`}
        >
          <Heart
            size={17}
            strokeWidth={1.6}
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Desktop add to cart */}
        {user && (
          <button
            onClick={() => addToCart(product.id)}
            aria-label="Add to cart"
            title="Add to cart"
            className="absolute bottom-3 right-3 hidden h-10 w-10 items-center justify-center bg-[#302044] text-white transition-colors hover:bg-[#B39458] md:flex"
          >
            <ShoppingCart size={17} strokeWidth={1.6} />
          </button>
        )}
      </div>

      {/* Product details */}
      <div className="space-y-3 p-4 sm:p-5">

        {/* Category and rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[10px] font-semibold uppercase tracking-[1.6px] text-[#A18A62]">
            {product.category}
          </span>

          <div className="flex shrink-0 items-center gap-1">
            <Star
              size={12}
              className="fill-[#B39458] text-[#B39458]"
            />
            <span className="text-[11px] font-medium text-[#514A55]">
              {product.rating}
            </span>
            <span className="text-[10px] text-[#969099]">
              ({product.review_count?.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Product name */}
        <h3 className="line-clamp-2 min-h-[40px] font-sans text-[14px] font-medium leading-[1.5] text-[#29252C] transition-colors group-hover:text-[#765B35]">
          {product.name}
        </h3>

        {/* Price and mobile cart */}
        <div className="flex items-end justify-between border-t border-[#EEEAE3] pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-[21px] font-semibold tracking-tight text-[#302044]">
              {formatPrice(product.price)}
            </span>

            {product.original_price > product.price && (
              <span className="text-[12px] text-[#969099] line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          <button
            onClick={() => user ? addToCart(product.id) : null}
            disabled={!user}
            aria-label={user ? 'Add to cart' : 'Sign in to add to cart'}
            title={user ? 'Add to cart' : 'Sign in to add to cart'}
            className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors md:hidden ${
              user
                ? 'bg-[#302044] text-white hover:bg-[#B39458] active:bg-[#21152D]'
                : 'cursor-not-allowed bg-[#F0EDE7] text-[#AAA3A9]'
            }`}
          >
            <ShoppingCart size={16} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </article>
  )
}
