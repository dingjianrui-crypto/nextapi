export const BRAND_NAME = 'Model Sphere'
export const BRAND_TAGLINE = 'The Universe of AI Models'
export const BRAND_DESCRIPTION =
  'Integrate every frontier model through a single OpenAI-compatible endpoint. Model Sphere converges the intelligence of the world into one hub.'
export const BRAND_API_BASE = 'https://api.modelsphere.ai/v1'
export const BRAND_API_KEY_PLACEHOLDER = 'MS_PRO_KEY'

export type FeaturedModel = {
  name: string
  provider: string
  desc: string
  context: string
  price: string
}

export const FEATURED_MODELS_FALLBACK: FeaturedModel[] = [
  {
    name: 'Claude 3.7 Opus',
    provider: 'Anthropic',
    desc: 'Highest intelligence tier for strategic reasoning and deep analysis.',
    context: '200k',
    price: '$15.00',
  },
  {
    name: 'Claude 3.6 Opus',
    provider: 'Anthropic',
    desc: 'SOTA performance for complex architectural and engineering tasks.',
    context: '200k',
    price: '$10.00',
  },
  {
    name: 'GPT-5.5',
    provider: 'OpenAI',
    desc: 'Next-gen foundation model with breakthrough recursive reasoning.',
    context: '512k',
    price: '$8.00',
  },
  {
    name: 'GPT-5.4',
    provider: 'OpenAI',
    desc: 'High-efficiency frontier intelligence for production workflows.',
    context: '256k',
    price: '$4.00',
  },
  {
    name: 'GPT-Image-2',
    provider: 'OpenAI',
    desc: 'Native multimodal generation with pixel-perfect coherence.',
    context: '128k',
    price: '$2.50',
  },
  {
    name: 'Llama 3.2 405B',
    provider: 'Meta',
    desc: 'The flagship open-weights model for private enterprise deployments.',
    context: '128k',
    price: '$0.80',
  },
  {
    name: 'Gemini 3.1 Pro Preview',
    provider: 'Google',
    desc: 'Advanced multimodal reasoning with massive long-context retrieval.',
    context: '5M',
    price: '$5.00',
  },
  {
    name: 'Gemini 3.0 Pro Image Preview',
    provider: 'Google',
    desc: 'Studio-grade visual synthesis integrated into the Pro core.',
    context: '2M',
    price: '$3.50',
  },
  {
    name: 'Gemini 2.5 Flash Image',
    provider: 'Google',
    desc: 'Sub-100ms visual intelligence for real-time video and image ops.',
    context: '1M',
    price: '$0.25',
  },
]
