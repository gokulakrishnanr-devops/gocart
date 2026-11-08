
import { useState, useEffect, useContext } from 'react'
import { Search, SlidersHorizontal, Package, X } from 'lucide-react'
import { AppContext } from '../App'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Accessories',
  'Food & Drinks',
  'Sports',
  'Home & Living'
]

export default function ProductsPage() {
  const { api } = useContext(AppContext)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        const params = {}

        if (category !== 'All') params.category = category
        if (search) params.search = search

        const res = await api.get('/api/products', { params })
        setProducts(res.data || [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchProducts, 300)

    return () => clearTimeout(debounce)
  }, [api, search, category])

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'newest') return b.id - a.id
    return 0
  })

  return (
    <main className="min-h-screen bg-[#F8F6F1]">

      {/* Page heading */}
      <section className="border-b border-[#E9E4DB] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B39458]" />

            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
              The GoCart Collection
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight text-[#302044] sm:text-5xl">
                All Products
              </h1>

              <p className="mt-3 max-w-lg text-[13px] leading-7 text-[#89828A]">
                Discover our complete collection of carefully selected products.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#89828A]">
              <Package size={15} className="text-[#A18451]" />
              <span>Explore our collection</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12">

        <div className="border border-[#E9E4DB] bg-white p-4 sm:p-5">

          <div className="flex flex-col gap-4 md:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={17}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A49CA5]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the collection..."
                aria-label="Search products"
                className="h-12 w-full border border-[#E9E4DB] bg-[#F8F6F1] pl-11 pr-11 text-[12px] text-[#302044] outline-none transition-colors placeholder:text-[#A49CA5] focus:border-[#B39458]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#89828A] hover:text-[#302044]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex h-12 items-center gap-3 border border-[#E9E4DB] bg-white px-4 md:min-w-[225px]">
              <SlidersHorizontal
                size={16}
                strokeWidth={1.5}
                className="shrink-0 text-[#A18451]"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="w-full bg-transparent text-[12px] text-[#514A55] outline-none"
              >
                <option value="default">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Category navigation */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#EEEAE3] pt-5">
            <span className="mr-1 text-[9px] font-semibold uppercase tracking-[2px] text-[#A18451]">
              Categories
            </span>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`relative py-1 text-[11px] transition-colors ${
                  category === cat
                    ? 'font-semibold text-[#302044]'
                    : 'text-[#89828A] hover:text-[#302044]'
                }`}
              >
                {cat}

                {category === cat && (
                  <span className="absolute -bottom-[2px] left-0 h-[2px] w-full bg-[#B39458]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results information */}
        {!loading && (
          <div className="flex flex-wrap items-center justify-between gap-3 py-6">
            <p className="text-[12px] text-[#89828A]">
              Showing{' '}
              <span className="font-semibold text-[#302044]">
                {sorted.length}
              </span>{' '}
              {sorted.length === 1 ? 'product' : 'products'}

              {category !== 'All' && (
                <>
                  {' '}in{' '}
                  <span className="font-semibold text-[#94794D]">
                    {category}
                  </span>
                </>
              )}
            </p>

            {(search || category !== 'All') && (
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('All')
                }}
                className="flex items-center gap-1.5 text-[11px] font-medium text-[#94794D] hover:text-[#302044]"
              >
                <X size={13} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Product grid */}
        <div className="pb-16">

          {loading ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse border border-[#E9E4DB] bg-white"
                >
                  <div className="h-56 bg-[#E9E4DB]" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-1/3 bg-[#E9E4DB]" />
                    <div className="h-4 w-3/4 bg-[#E9E4DB]" />
                    <div className="h-5 w-1/2 bg-[#E9E4DB]" />
                  </div>
                </div>
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="border border-[#E9E4DB] bg-white px-5 py-20 text-center">

              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-[#E9E4DB] text-[#A18451]">
                <Search size={23} strokeWidth={1.4} />
              </div>

              <h2 className="font-display text-2xl font-medium text-[#302044]">
                No Products Found
              </h2>

              <p className="mt-3 text-[12px] text-[#89828A]">
                Try another search term or explore a different category.
              </p>

              <button
                onClick={() => {
                  setSearch('')
                  setCategory('All')
                }}
                className="mt-7 inline-flex h-11 items-center bg-[#302044] px-6 text-[11px] font-medium tracking-wide text-white transition-colors hover:bg-[#21152D]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {sorted.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
