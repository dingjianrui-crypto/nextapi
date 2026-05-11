import { createFileRoute } from '@tanstack/react-router'
import { BrandHome } from '@/features/brand-home'

export const Route = createFileRoute('/')({
  component: BrandHome,
})
