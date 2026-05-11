import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { BRAND_API_BASE, BRAND_API_KEY_PLACEHOLDER } from '../../constants'

export function CodeShowcase() {
  const { t } = useTranslation()

  const bullets = [
    t('One unified monthly invoice'),
    t('Automatic provider failover'),
    t('Enterprise-grade rate limits'),
  ]

  return (
    <section className='border-border/40 relative z-10 border-t bg-zinc-950 px-6 py-24 text-zinc-50 dark:bg-zinc-950 md:py-32'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16'>
        <AnimateInView animation='fade-right'>
          <h2 className='text-2xl leading-tight font-semibold tracking-tight md:text-3xl'>
            {t('Standardized implementation.')}
          </h2>
          <p className='mt-5 max-w-md text-sm leading-relaxed text-zinc-400 md:text-base'>
            {t(
              'Switch between GPT, Claude, and Gemini without changing a single line of logic. Use your favorite SDKs with our unified base URL.'
            )}
          </p>
          <ul className='mt-8 space-y-3'>
            {bullets.map((b) => (
              <li key={b} className='flex items-center gap-3 text-sm'>
                <span
                  aria-hidden
                  className='size-1.5 shrink-0 rounded-full bg-blue-400'
                />
                <span className='text-zinc-200'>{b}</span>
              </li>
            ))}
          </ul>
        </AnimateInView>

        <AnimateInView animation='fade-left'>
          <pre className='overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6 font-mono text-[13px] leading-relaxed'>
            <code>
              <span className='text-violet-400'>import</span>{' '}
              <span className='text-zinc-100'>openai</span>
              {'\n\n'}
              <span className='text-zinc-100'>client</span>{' '}
              <span className='text-zinc-500'>=</span>{' '}
              <span className='text-zinc-100'>openai.OpenAI(</span>
              {'\n  '}
              <span className='text-zinc-100'>base_url=</span>
              <span className='text-emerald-400'>{`"${BRAND_API_BASE}"`}</span>
              <span className='text-zinc-100'>,</span>
              {'\n  '}
              <span className='text-zinc-100'>api_key=</span>
              <span className='text-emerald-400'>{`"${BRAND_API_KEY_PLACEHOLDER}"`}</span>
              {'\n'}
              <span className='text-zinc-100'>)</span>
              {'\n\n'}
              <span className='text-zinc-500'>
                {t('# Switch models instantly via the ID')}
              </span>
              {'\n'}
              <span className='text-zinc-100'>
                response = client.chat.completions.create(
              </span>
              {'\n  '}
              <span className='text-zinc-100'>model=</span>
              <span className='text-emerald-400'>"openai/gpt-5.5"</span>
              <span className='text-zinc-100'>,</span>
              {'\n  '}
              <span className='text-zinc-100'>messages=[</span>
              <span className='text-zinc-100'>{'{'}</span>
              <span className='text-emerald-400'>"role"</span>
              <span className='text-zinc-100'>: </span>
              <span className='text-emerald-400'>"user"</span>
              <span className='text-zinc-100'>, </span>
              <span className='text-emerald-400'>"content"</span>
              <span className='text-zinc-100'>: </span>
              <span className='text-emerald-400'>
                "{t('Analyze trend data...')}"
              </span>
              <span className='text-zinc-100'>{'}'}</span>
              <span className='text-zinc-100'>]</span>
              {'\n'}
              <span className='text-zinc-100'>)</span>
            </code>
          </pre>
        </AnimateInView>
      </div>
    </section>
  )
}
