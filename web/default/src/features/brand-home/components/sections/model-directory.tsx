import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'
import type { PricingModel } from '@/features/pricing/types'
import { FEATURED_MODELS_FALLBACK, type FeaturedModel } from '../../constants'

interface ModelDirectoryProps {
  /** Maximum number of cards to show (defaults to 9) */
  limit?: number
}

const MAX_DISPLAY_DEFAULT = 9

function formatContextLength(tokens?: number): string | undefined {
  if (!tokens || tokens <= 0) return undefined
  if (tokens >= 1_000_000) {
    const m = tokens / 1_000_000
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`
  }
  if (tokens >= 1_000) {
    const k = tokens / 1_000
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`
  }
  return tokens.toString()
}

function formatPricePerMillion(model: PricingModel): string | undefined {
  // Mirrors features/pricing/lib/price.ts: input USD per 1M tokens = model_ratio * 2
  // We render at default group ratio (1) for an indicative marketing value.
  if (typeof model.model_ratio !== 'number' || model.model_ratio <= 0) {
    return undefined
  }
  const usd = model.model_ratio * 2
  if (!Number.isFinite(usd)) return undefined
  if (usd >= 100) return `$${usd.toFixed(0)}`
  if (usd >= 1) return `$${usd.toFixed(2)}`
  return `$${usd.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}`
}

function liveModelToFeatured(model: PricingModel): FeaturedModel | null {
  if (!model.model_name) return null
  const provider = model.vendor_name || 'Unknown'
  const desc =
    model.description ||
    model.vendor_description ||
    'Available through the unified gateway.'
  const context = formatContextLength(model.context_length)
  const price = formatPricePerMillion(model)
  return {
    name: model.model_name,
    provider,
    desc,
    context: context ?? '—',
    price: price ?? '—',
  }
}

export function ModelDirectory(props: ModelDirectoryProps) {
  const { t } = useTranslation()
  const limit = props.limit ?? MAX_DISPLAY_DEFAULT
  const [search, setSearch] = useState('')

  const { models: liveModels, isLoading } = usePricingData()

  const liveCount = liveModels?.length ?? 0

  const featured = useMemo<FeaturedModel[]>(() => {
    if (liveModels && liveModels.length > 0) {
      return liveModels
        .map(liveModelToFeatured)
        .filter((m): m is FeaturedModel => m !== null)
    }
    return FEATURED_MODELS_FALLBACK
  }, [liveModels])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = query
      ? featured.filter(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            m.provider.toLowerCase().includes(query)
        )
      : featured
    return list.slice(0, limit)
  }, [featured, search, limit])

  return (
    <section
      id='models'
      className='border-border/40 relative z-10 border-t px-6 py-20 md:py-28'
    >
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-10 flex flex-col items-end justify-between gap-6 border-b border-border/60 pb-6 md:flex-row'>
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
              className='border-border bg-background focus:border-ring focus:ring-ring/30 w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2'
            />
          </div>
        </AnimateInView>

        {isLoading && filtered.length === 0 ? (
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
        ) : filtered.length === 0 ? (
          <p className='text-muted-foreground py-12 text-center text-sm'>
            {t('No models match your search.')}
          </p>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {filtered.map((m, i) => (
              <AnimateInView
                key={`${m.provider}-${m.name}`}
                delay={i * 40}
                animation='scale-in'
                className='border-border/60 bg-card/40 hover:border-border group rounded-xl border p-6 transition-colors'
              >
                <div className='mb-4 flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='text-muted-foreground text-[10px] font-medium tracking-widest uppercase'>
                      {m.provider}
                    </p>
                    <p className='mt-1 truncate text-sm font-semibold'>
                      {m.name}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className='border-border relative size-4 shrink-0 rounded-full border'
                  >
                    <span className='bg-primary absolute top-[3px] left-[3px] size-[6px] rounded-full opacity-80' />
                  </span>
                </div>
                <p className='text-muted-foreground mb-5 line-clamp-2 h-[2.6em] text-sm leading-tight'>
                  {m.desc}
                </p>
                <div className='grid grid-cols-2 gap-4 font-mono text-xs'>
                  <div>
                    <p className='text-muted-foreground mb-1 text-[10px] tracking-widest uppercase'>
                      {t('Context')}
                    </p>
                    <p className='font-medium tabular-nums'>{m.context}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground mb-1 text-[10px] tracking-widest uppercase'>
                      {t('Price/1M')}
                    </p>
                    <p className='font-medium tabular-nums'>{m.price}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        )}

        {liveCount > limit && (
          <div className='mt-10 flex justify-center'>
            <Link
              to='/pricing'
              className='text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 text-sm font-medium transition-colors'
            >
              {t('View all {{count}} models', { count: liveCount })}
              <ArrowRight className='size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
