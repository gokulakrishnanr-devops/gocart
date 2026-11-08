
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  Crown,
  TrendingUp
} from 'lucide-react'
import { AppContext } from '../App'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  { name: 'Electronics', emoji: '🔌', color: 'from-[#E8E4EC] to-[#D8D0E0]', count: '50+ items' },
  { name: 'Clothing', emoji: '👔', color: 'from-[#EFE5E1] to-[#E4D4CD]', count: '30+ items' },
  { name: 'Accessories', emoji: '💎', color: 'from-[#F0E9D9] to-[#E6D9B9]', count: '25+ items' },
  { name: 'Food & Drinks', emoji: '🍕', color: 'from-[#E6EADF] to-[#D6E0CF]', count: '20+ items' },
  { name: 'Sports', emoji: '⚽', color: 'from-[#E9E2EF] to-[#DCD0E8]', count: '15+ items' },
  { name: 'Home & Living', emoji: '🏠', color: 'from-[#E6E8E5] to-[#D5DDD5]', count: '20+ items' },
]

const STATS = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Premium Products' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Customer Support' },
]

const FEATURES = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    desc: 'On orders over $50'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Protected checkout'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: '30-day return policy'
  },
  {
    icon: Crown,
    title: 'Curated Quality',
    desc: 'Selected with care'
  },
]

const TESTIMONIALS = [
  {
    name: 'Arun Kumar',
    product: 'Wireless Noise-Cancelling Headphones',
    comment: 'Using these during my office commute. Noise cancellation is good, but the ear cushions get a little warm.',
    rating: 4.5
  },
  {
    name: 'Priya Sharma',
    product: 'Classic Denim Jacket',
    comment: 'The jacket looks just like the pictures. I ordered my usual size and it fits well. Delivery took four days.',
    rating: 4.3
  },
  {
    name: 'Kavin Raj',
    product: 'Mechanical Gaming Keyboard',
    comment: 'Keys feel nice and the RGB looks good at night. A little noisy, but I actually like that.',
    rating: 4.6
  },
  {
    name: 'Meera Krishnan',
    product: 'Scented Soy Candle Set',
    comment: 'The vanilla candle smells really nice. The other fragrance is a bit strong for my room.',
    rating: 4.2
  },
  {
    name: 'Ananya Reddy',
    product: 'Premium Cotton T-Shirt',
    comment: 'The cloth is okay, but the fitting is tighter than I expected. Should have gone for a larger size.',
    rating: 4.0
  },
  {
    name: 'Rahul Verma',
    product: 'Portable Bluetooth Speaker',
    comment: 'Honestly expected better bass. It works fine indoors, but the battery does not last very long.',
    rating: 2.8
  },
  {
    name: 'Emily Thomas',
    product: 'Smart Fitness Watch',
    comment: 'Got this during the weekend sale. The discount was good and the watch has been working perfectly so far.',
    rating: 5.0
  },
  {
    name: 'Vikram S',
    product: 'Running Sneakers Pro',
    comment: 'ரொம்ப comfortable-ஆ இருக்கு. தினமும் walking போகும்போது use பண்றேன். நல்ல purchase!',
    rating: 5.0
  },
  {
    name: 'Nisha Patel',
    product: 'Canvas Laptop Backpack',
    comment: 'Fits my laptop, charger and lunch box. I have been carrying it to college every day. No issues.',
    rating: 5.0
  },
  {
    name: 'Aarav Mehta',
    product: 'Dark Chocolate Gift Box',
    comment: 'My little brother finished most of the box before I could even try it. He wants another one now!',
    rating: 5.0
  },
]

export default function HomePage() {
  const { api } = useContext(AppContext)
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/products')
        setFeatured((res.data || []).slice(0, 8))
      } catch {
        setFeatured([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [api])

  return (
    <main className="bg-[#F8F6F1]">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E9E4DB]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">

          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B39458]" />
              <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
                Welcome to GoCart
              </span>
            </div>

            <h1 className="max-w-[650px] font-display text-[44px] font-medium leading-[1.12] tracking-[-1.5px] text-[#21152D] sm:text-6xl lg:text-[68px]">
              Discover Your
              <span className="mt-2 block text-[#9B7A45]">
                Perfect Style.
              </span>
            </h1>

            <p className="mt-7 max-w-[480px] text-[14px] leading-8 text-[#77717A] sm:text-[15px]">
              Explore our curated collection of premium products. From tech gadgets to everyday essentials, find everything you need in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex h-12 items-center gap-3 bg-[#302044] px-7 text-[12px] font-medium tracking-wide text-white transition-colors hover:bg-[#21152D]"
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/products"
                className="inline-flex h-12 items-center border-b border-[#B39458] px-3 text-[12px] font-semibold tracking-wide text-[#302044] transition-colors hover:text-[#94794D]"
              >
                Browse Categories
              </Link>
            </div>

            {/* Store statistics */}
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#E5DED2] pt-7 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[25px] font-medium text-[#302044]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-[#89828A]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial hero visual */}
          <div className="relative hidden min-h-[480px] items-center justify-center lg:flex">
            <div className="absolute inset-8 border border-[#D9CCB1]" />
            <div className="absolute inset-14 border border-[#E8E0D2]" />

            <div className="relative grid w-[390px] grid-cols-2 gap-3">
              {[
                { emoji: '🎧', label: 'Audio', color: 'from-[#E5DDEB] to-[#D1C5DB]' },
                { emoji: '⌚', label: 'Wearables', color: 'from-[#E5E6DD] to-[#D1D8C8]' },
                { emoji: '👟', label: 'Sports', color: 'from-[#E9DDD2] to-[#DCC9B9]' },
                { emoji: '💻', label: 'Technology', color: 'from-[#DDE3E9] to-[#C8D3DD]' },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`flex aspect-square flex-col items-center justify-center bg-gradient-to-br ${item.color} ${
                    index % 2 === 0 ? 'translate-y-5' : '-translate-y-5'
                  }`}
                >
                  <span className="text-[57px]">{item.emoji}</span>
                  <span className="mt-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#514A55]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-2 right-0 border border-[#D9CCB1] bg-[#F8F6F1] px-6 py-4">
              <p className="font-display text-lg text-[#302044]">
                Considered. Curated. Yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service benefits */}
      <section className="border-b border-[#E9E4DB] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-6 px-5 py-8 sm:px-8 lg:grid-cols-4 lg:px-12">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center gap-4 ${
                index !== 0 ? 'lg:border-l lg:border-[#E9E4DB] lg:pl-8' : ''
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E9E4DB] text-[#A18451]">
                <feature.icon size={19} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="font-sans text-[12px] font-semibold text-[#302044]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-[11px] text-[#89828A]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#B39458]" />
            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
              Browse by Category
            </span>
            <span className="h-px w-7 bg-[#B39458]" />
          </div>

          <h2 className="font-display text-3xl font-medium text-[#302044] sm:text-[40px]">
            Explore Our Collection
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[13px] leading-7 text-[#89828A]">
            Find exactly what you are looking for in our diverse collection.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to="/products"
              className="group text-center"
            >
              <div className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br ${cat.color} transition-transform duration-300 group-hover:-translate-y-1`}>
                <span className="text-[48px] transition-transform duration-300 group-hover:scale-105">
                  {cat.emoji}
                </span>

                <span className="absolute bottom-3 right-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#514A55]/70">
                  {cat.count}
                </span>
              </div>

              <h3 className="mt-3 font-sans text-[12px] font-semibold text-[#302044]">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y border-[#E9E4DB] bg-[#F1EEE8] py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp size={15} className="text-[#A18451]" />
                <span className="text-[10px] font-semibold uppercase tracking-[2.5px] text-[#94794D]">
                  Trending at GoCart
                </span>
              </div>

              <h2 className="font-display text-3xl font-medium text-[#302044] sm:text-[40px]">
                Featured Products
              </h2>

              <p className="mt-2 text-[12px] text-[#89828A]">
                Handpicked for You
              </p>
            </div>

            <Link
              to="/products"
              className="hidden items-center gap-2 border-b border-[#B39458] pb-1 text-[11px] font-semibold text-[#302044] transition-colors hover:text-[#94794D] sm:flex"
            >
              View All Products
              <ArrowRight size={14} />
            </Link>
          </div>

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
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="border border-[#E9E4DB] bg-white py-16 text-center">
              <p className="font-display text-xl text-[#302044]">
                Products are currently unavailable.
              </p>
              <p className="mt-2 text-[12px] text-[#89828A]">
                Please check back later.
              </p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-b border-[#B39458] pb-1 text-[12px] font-semibold text-[#302044]"
            >
              View All Products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional banners */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2">

          <div className="relative flex min-h-[280px] flex-col items-start justify-center overflow-hidden bg-[#302044] p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full border border-white/10" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-2 text-[#D5BD8C]">
                <span className="h-px w-6 bg-[#B39458]" />
                <span className="text-[10px] font-semibold uppercase tracking-[2.5px]">
                  Flash Sale
                </span>
              </div>

              <h3 className="font-display text-3xl font-medium text-white sm:text-[38px]">
                Up to 40% Off
              </h3>

              <p className="mt-3 max-w-xs text-[12px] leading-6 text-[#D2C9D9]">
                On selected electronics and accessories.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex h-11 items-center gap-3 bg-[#C1A46B] px-6 text-[11px] font-semibold tracking-wide text-[#21152D] transition-colors hover:bg-[#D4BD91]"
              >
                Shop the Sale
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[280px] flex-col items-start justify-center overflow-hidden border border-[#D9CCB1] bg-[#EDE7DB] p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#B39458]/20" />
            <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full border border-[#B39458]/20" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-2 text-[#94794D]">
                <Crown size={15} strokeWidth={1.5} />
                <span className="text-[10px] font-semibold uppercase tracking-[2.5px]">
                  Premium Selection
                </span>
              </div>

              <h3 className="font-display text-3xl font-medium text-[#302044] sm:text-[38px]">
                New Arrivals
              </h3>

              <p className="mt-3 max-w-xs text-[12px] leading-6 text-[#77717A]">
                Check out the latest premium collection.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex h-11 items-center gap-3 bg-[#302044] px-6 text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-[#21152D]"
              >
                Explore Now
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - continuously moving carousel */}
      <section className="overflow-hidden border-y border-[#E9E4DB] bg-white py-16 lg:py-20">
        <style>{`
          @keyframes testimonial-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .testimonial-track {
            display: flex;
            width: max-content;
            animation: testimonial-scroll 50s linear infinite;
          }
          .testimonial-track:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .testimonial-track { animation: none; }
          }
        `}</style>

        <div className="mx-auto mb-10 max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#B39458]" />
            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#94794D]">
              Testimonials
            </span>
            <span className="h-px w-7 bg-[#B39458]" />
          </div>

          <h2 className="font-display text-3xl font-medium text-[#302044] sm:text-[40px]">
            What Our Customers Say
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="testimonial-track gap-5 px-3">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                aria-hidden={index >= TESTIMONIALS.length}
                className="flex w-[320px] shrink-0 flex-col border border-[#E9E4DB] bg-[#F8F6F1] p-7 sm:w-[390px]"
              >
                <div className="mb-5 flex items-center gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={13}
                      className={
                        starIndex < Math.round(testimonial.rating)
                          ? 'fill-[#B39458] text-[#B39458]'
                          : 'text-[#D9CCB1]'
                      }
                    />
                  ))}
                  <span className="ml-2 text-[11px] text-[#625B65]">
                    {testimonial.rating.toFixed(1)}/5
                  </span>
                </div>

                <p className="min-h-[100px] flex-1 text-[13px] leading-7 text-[#625B65]">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                <div className="mt-6 border-t border-[#E5DED2] pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.3px] text-[#94794D]">
                    {testimonial.product}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B39458]/40 bg-[#EDE7DB] font-display text-sm text-[#302044]">
                      {testimonial.name.charAt(0)}
                    </div>
                    <p className="text-[12px] font-semibold text-[#302044]">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-[#21152D] px-5 py-16 text-center sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#B39458]" />
            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#C6AE7C]">
              The GoCart Experience
            </span>
            <span className="h-px w-7 bg-[#B39458]" />
          </div>

          <h2 className="font-display text-3xl font-medium text-white sm:text-[42px]">
            Ready to Start Shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[13px] leading-7 text-[#C8BECE]">
            Join thousands of happy customers and discover amazing deals every day.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/auth"
              className="inline-flex h-12 items-center justify-center gap-3 bg-[#C1A46B] px-7 text-[12px] font-semibold text-[#21152D] transition-colors hover:bg-[#D4BD91]"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/products"
              className="inline-flex h-12 items-center justify-center border border-white/30 px-7 text-[12px] font-medium text-white transition-colors hover:border-[#C1A46B] hover:text-[#D5BD8C]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E9E4DB] bg-[#F8F6F1]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-[#B39458] text-[#302044]">
                  <Crown size={17} strokeWidth={1.5} />
                </div>

                <span className="font-display text-[23px] font-semibold text-[#302044]">
                  GoCart
                </span>
              </Link>

              <p className="mt-5 max-w-[260px] text-[12px] leading-7 text-[#89828A]">
                Your one-stop destination for premium products at unbeatable prices.
              </p>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[2px] text-[#302044]">
                Shop
              </h4>

              <div className="space-y-3">
                {['All Products', 'Electronics', 'Clothing', 'Accessories'].map((item) => (
                  <Link
                    key={item}
                    to="/products"
                    className="block text-[12px] text-[#77717A] transition-colors hover:text-[#A18451]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[2px] text-[#302044]">
                Support
              </h4>

              <div className="space-y-3">
                {['Help Center', 'Shipping Info', 'Returns', 'Contact Us'].map((item) => (
                  <span
                    key={item}
                    className="block text-[12px] text-[#77717A]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[2px] text-[#302044]">
                Company
              </h4>

              <div className="space-y-3">
                {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <span
                    key={item}
                    className="block text-[12px] text-[#77717A]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#E5DED2] pt-7 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] text-[#89828A]">
              &copy; 2026 GoCart. All rights reserved.
            </p>

            <p className="text-[10px] tracking-wide text-[#89828A]">
              Built with React + Go + Kubernetes
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
