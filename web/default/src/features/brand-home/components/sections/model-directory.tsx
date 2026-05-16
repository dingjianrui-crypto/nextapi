import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { ModelCardGrid } from '@/features/pricing/components'
import { SORT_OPTIONS } from '@/features/pricing/constants'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'
import { filterBySearch, sortModels } from '@/features/pricing/lib/filters'

export function ModelDirectory() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const { models, isLoading, priceRate, usdExchangeRate } = usePricingData()
  const searchQuery = search.trim()

  const displayedModels = useMemo(() => {
    const searched = filterBySearch(models || [], searchQuery)
    return sortModels(searched, SORT_OPTIONS.NAME)
  }, [models, searchQuery])

  return (
    <section
      id='models'
      className='border-border/40 relative z-10 border-t px-6 py-20 md:py-28'
    >
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='border-border/60 mb-10 flex flex-col items-end justify-between gap-6 border-b pb-6 md:flex-row'>
          <div className='w-full'>
            <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
              {t('Model Directory')}
            </p>
          </div>
          <div className='relative w-full md:max-w-xs'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('Search models or providers...')}
              aria-label={t('Search models or providers...')}
              className='border-border bg-background focus:border-ring focus:ring-ring/30 w-full rounded-lg border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2'
            />
          </div>
        </AnimateInView>

        {isLoading && displayedModels.length === 0 ? (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='border-border/60 bg-card/30 animate-pulse rounded-xl border p-6'
              >
                <div className='bg-muted/60 mb-3 h-3 w-16 rounded' />
                <div className='bg-muted mb-6 h-4 w-32 rounded' />
                <div className='bg-muted/40 h-10 w-full rounded' />
              </div>
            ))}
          </div>
        ) : displayedModels.length === 0 ? (
          <p className='text-muted-foreground py-12 text-center text-sm'>
            {t('No models match your search.')}
          </p>
        ) : (
          <ModelCardGrid
            key={searchQuery}
            models={displayedModels}
            priceRate={priceRate}
            usdExchangeRate={usdExchangeRate}
            onModelClick={(modelId) =>
              navigate({
                to: '/pricing/$modelId',
                params: { modelId },
              })
            }
          />
        )}
      </div>
    </section>
  )
}
