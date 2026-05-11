import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { PublicLayout } from '@/components/layout'
import { Markdown } from '@/components/ui/markdown'
import { useHomePageContent } from '@/features/home/hooks'
import { BrandFooter } from './components/brand-footer'
import { BrandHero } from './components/sections/brand-hero'
import { CodeShowcase } from './components/sections/code-showcase'
import { ModelDirectory } from './components/sections/model-directory'

export function BrandHome() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const { content, isLoaded, isUrl } = useHomePageContent()

  if (!isLoaded) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='flex min-h-screen items-center justify-center'>
          <div className='text-muted-foreground'>{t('Loading...')}</div>
        </main>
      </PublicLayout>
    )
  }

  if (content) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='overflow-x-hidden'>
          {isUrl ? (
            <iframe
              src={content}
              className='h-screen w-full border-none'
              title={t('Custom Home Page')}
            />
          ) : (
            <div className='container mx-auto py-8'>
              <Markdown className='custom-home-content'>{content}</Markdown>
            </div>
          )}
        </main>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false}>
      <BrandHero isAuthenticated={isAuthenticated} />
      <ModelDirectory />
      <CodeShowcase />
      <BrandFooter />
    </PublicLayout>
  )
}
