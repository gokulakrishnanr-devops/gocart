
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'

export default function AccountPage() {
  const { api, updateUser } = useContext(AppContext)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get('/api/profile')
        const profile = response.data

        setForm({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          address: profile.address || '',
        })
      } catch (err) {
        setError(
          err.response?.data?.error ||
          'Unable to load your account details.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [api])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Please complete all required fields.')
      return
    }

    try {
      setSaving(true)

      const formData = new FormData()
      formData.append('name', form.name.trim())
      formData.append('phone', form.phone.trim())
      formData.append('address', form.address.trim())

      const response = await api.put('/api/profile', formData)
      const updatedProfile = response.data

      setForm({
        name: updatedProfile.name || '',
        email: updatedProfile.email || '',
        phone: updatedProfile.phone || '',
        address: updatedProfile.address || '',
      })

      updateUser(updatedProfile)

      setSuccess('Account details updated successfully.')
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Unable to update your account details.'
      )
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[#E5DFD5] bg-white px-4 py-3 text-sm text-[#302044] outline-none transition focus:border-[#B39458] focus:ring-2 focus:ring-[#B39458]/20'

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
        <p className="text-sm text-[#77717A]">
          Loading account details...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B39458]">
            My Account
          </p>

          <h1 className="text-3xl font-semibold text-[#302044]">
            Account Settings
          </h1>

          <p className="mt-2 text-sm text-[#77717A]">
            View and manage your personal information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E9E4DC] bg-white shadow-sm">

          <div className="border-b border-[#E9E4DC] px-6 py-5 sm:px-8">
            <h2 className="text-lg font-semibold text-[#302044]">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-[#77717A]">
              Update your contact details and delivery address.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-[#302044]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#302044]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={form.email}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-[#F8F6F1] text-[#77717A]`}
                />

                <p className="mt-1 text-xs text-[#99919C]">
                  Email address cannot be changed.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#302044]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#302044]">
                  Complete Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your house number, street, area, city, state and PIN code"
                  rows={4}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

            </div>

            <div className="flex justify-end border-t border-[#E9E4DC] pt-6">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#302044] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#46315D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}
