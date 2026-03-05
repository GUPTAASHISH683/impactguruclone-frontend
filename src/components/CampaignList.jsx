// CampaignList.jsx - API-driven with pagination
// Fetches campaigns from backend; shows 10 per page

import { useState, useEffect, useCallback } from 'react'
import CampaignCard        from './CampaignCard'
import { endpoints }       from '../api/client'
import { useScrollReveal } from '../hooks/useScrollReveal'

const DEFAULT_FILTERS = [
  { label: 'All Causes',  value: 'all'         },
  { label: 'Medical',     value: 'medical'      },
  { label: 'Education',   value: 'education'    },
  { label: 'Disaster',    value: 'disaster'     },
  { label: 'Animals',     value: 'animals'      },
  { label: 'Environment', value: 'environment'  },
]

const LIMIT = 10

export default function CampaignList() {
  const [filter,    setFilter]    = useState('all')
  const [page,      setPage]      = useState(1)
  const [campaigns, setCampaigns] = useState([])
  const [meta,      setMeta]      = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  const ref = useScrollReveal([campaigns])

  const fetchCampaigns = useCallback(async (currentPage, currentFilter) => {
    setLoading(true)
    setError(null)
    try {
      const res = await endpoints.campaigns({
        page:     currentPage,
        limit:    LIMIT,
        category: currentFilter === 'all' ? undefined : currentFilter,
      })
      setCampaigns(res.data)
      setMeta(res.meta)
    } catch (err) {
      console.error('[CampaignList]', err)
      setError('Failed to load campaigns. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCampaigns(page, filter)
  }, [page, filter, fetchCampaigns])

  const handleFilterChange = (value) => {
    setFilter(value)
    setPage(1)
  }

  return (
    <section
      id="campaigns"
      aria-labelledby="campaigns-heading"
      className="py-20 bg-white"
      ref={ref}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="max-w-7xl mx-auto px-6">

        <header className="text-center mb-14 reveal">
          <span className="section-tag" aria-hidden="true">Featured Campaigns</span>
          <h2 id="campaigns-heading" className="section-title" itemProp="name">
            Fundraising Campaigns That Need Your Support
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base" itemProp="description">
            Real people, real emergencies across India. Every donation — no matter how small — changes a life.
          </p>
        </header>

        {/* Filter controls */}
        <nav aria-label="Filter campaigns by cause" className="flex gap-2 flex-wrap justify-center mb-10 reveal">
          {DEFAULT_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              aria-pressed={filter === f.value}
              aria-label={`Filter by ${f.label}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-150 ${
                filter === f.value
                  ? 'bg-brand-orange border-brand-orange text-white'
                  : 'border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange bg-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {/* Screen-reader live region */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {loading
            ? 'Loading campaigns…'
            : `Showing ${campaigns.length} of ${meta?.total ?? 0} ${filter === 'all' ? 'campaigns' : `${filter} campaigns`}`
          }
        </p>

        {/* Error state */}
        {error && (
          <div className="text-center py-12 text-red-500" role="alert">
            <p>{error}</p>
            <button
              onClick={() => fetchCampaigns(page, filter)}
              className="mt-4 btn-primary text-sm px-6 py-2"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        )}

        {/* Campaign grid */}
        {!loading && !error && (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              role="list"
              aria-label="Fundraising campaigns"
            >
              {campaigns.map((c, i) => (
                <div
                  role="listitem"
                  key={c.id}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={String(i + 1)} />
                  <CampaignCard campaign={c} delay={i * 0.05} headingLevel={3} />
                </div>
              ))}
            </div>

            {/* Empty state */}
            {campaigns.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No campaigns found for this filter.</p>
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12" aria-label="Pagination">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!meta.hasPrevPage}
                  className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-500 font-semibold text-sm
                    hover:border-brand-orange hover:text-brand-orange disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-150"
                  aria-label="Previous page"
                >
                  ← Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold border-2 transition-all duration-150 ${
                      p === page
                        ? 'bg-brand-orange border-brand-orange text-white'
                        : 'border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={!meta.hasNextPage}
                  className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-500 font-semibold text-sm
                    hover:border-brand-orange hover:text-brand-orange disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-150"
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Total count */}
            {meta && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Showing {((page - 1) * LIMIT) + 1}-{Math.min(page * LIMIT, meta.total)} of {meta.total} campaigns
              </p>
            )}
          </>
        )}

      </div>
    </section>
  )
}
