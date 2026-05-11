import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { BRAND_NAME } from '../constants'

interface BrandFooterProps {
  className?: string
}

type FooterLink = { label: string; href: string; external?: boolean }
type FooterColumn = { title: string; links: FooterLink[] }

export function BrandFooter(props: BrandFooterProps) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const columns: FooterColumn[] = [
    {
      title: t('Platform'),
      links: [
        { label: t('Models'), href: '/pricing' },
        { label: t('Pricing'), href: '/pricing' },
        { label: t('Console'), href: '/dashboard' },
      ],
    },
    {
      title: t('Resources'),
      links: [{ label: t('API Reference'), href: '/about' }],
    },
    {
      title: t('Company'),
      links: [{ label: t('About'), href: '/about' }],
    },
  ]

  return (
    <footer
      className={cn('border-border/40 relative z-10 border-t', props.className)}
    >
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-20'>
        <div className='grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-16'>
          <div>
            <div className='flex items-center gap-2.5'>
              <span
                aria-hidden
                className='border-foreground relative size-[18px] rounded-full border-[1.5px]'
              >
                <span className='bg-primary absolute top-[3px] left-[3px] size-1 rounded-full' />
              </span>
              <span className='text-sm font-semibold tracking-tight'>
                {BRAND_NAME}
              </span>
            </div>
            <p className='text-muted-foreground mt-3 max-w-[260px] text-sm leading-relaxed'>
              {t(
                'Aggregating intelligence for the next generation of software engineering.'
              )}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className='text-foreground mb-4 text-sm font-semibold'>
                {col.title}
              </p>
              <ul className='space-y-2.5'>
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-border/40 mt-14 flex flex-col items-center justify-between gap-3 border-t pt-8 sm:flex-row'>
          <p className='text-muted-foreground/70 text-xs'>
            &copy; {currentYear} {BRAND_NAME}. {t('All models unified.')}
          </p>
          <p className='text-muted-foreground/70 text-xs'>
            {t('Status: All Systems Operational')}
          </p>
        </div>
      </div>
    </footer>
  )
}
