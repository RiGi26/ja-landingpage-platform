import PricingPageClient, { type PriceMap } from './PricingPageClient'

// Refresh harga dari SSOT (Core DB via superadmin) tiap 5 menit. Update harga di
// Core DB → halaman ikut, tanpa redeploy. Fetch terjadi saat regenerasi statis
// (stale-while-revalidate), bukan di jalur kritis request user.
export const revalidate = 300

const SUPERADMIN_URL = (process.env.SUPERADMIN_URL || 'https://superadmin.webzoka.com').replace(/\/+$/, '')

type ApiPlan = { platform: string; tier: string; priceMonthly: number }

async function getPriceMap(): Promise<PriceMap | undefined> {
  try {
    const res = await fetch(`${SUPERADMIN_URL}/api/public/plans`, { next: { revalidate: 300 } })
    if (!res.ok) return undefined
    const data = (await res.json()) as { plans?: ApiPlan[] }
    if (!data.plans?.length) return undefined
    const map: PriceMap = {}
    for (const p of data.plans) {
      if (typeof p.priceMonthly === 'number') map[`${p.platform}:${p.tier}`] = p.priceMonthly
    }
    return map
  } catch {
    // Gagal fetch → client pakai harga fallback hardcoded.
    return undefined
  }
}

export default async function PricingPage() {
  const priceMap = await getPriceMap()
  return <PricingPageClient priceMap={priceMap} />
}
