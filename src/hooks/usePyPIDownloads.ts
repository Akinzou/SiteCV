import { useState, useEffect } from 'react'

// About.tsx and Projects.tsx both call this hook for the same package, so
// share one in-flight request instead of firing two identical ones at pepy.tech.
const htmlCache = new Map<string, Promise<string>>()

const fetchProjectHtml = (packageName: string): Promise<string> => {
  let promise = htmlCache.get(packageName)
  if (!promise) {
    promise = fetch(`/api/pepy/projects/${packageName}`).then((r) => r.text())
    promise.catch(() => htmlCache.delete(packageName))
    htmlCache.set(packageName, promise)
  }
  return promise
}

/**
 * Second source for when pepy.tech is down (it served a 503 "Site not available"
 * page on 2026-11-02, which left the tile on the static fallback). ClickHouse's
 * public PyPI dataset — the one behind ClickPy — answers a plain GET with CORS
 * open, and its all-time total matches pepy's.
 */
const fetchClickHouseTotal = async (packageName: string): Promise<number | null> => {
  const query = `SELECT sum(count) AS total FROM pypi.pypi_downloads WHERE project = '${packageName.replace(/[^a-z0-9._-]/gi, '')}'`
  const url = `https://sql-clickhouse.clickhouse.com/?user=demo&default_format=JSONEachRow&query=${encodeURIComponent(query)}`
  const response = await fetch(url)
  if (!response.ok) return null
  const total = parseInt(JSON.parse(await response.text()).total, 10)
  return Number.isFinite(total) && total > 0 ? total : null
}

const formatCount = (count: number) => count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const usePyPIDownloads = (packageName: string) => {
  const [downloads, setDownloads] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const html = await fetchProjectHtml(packageName).catch(() => '')

        // Extract downloads - try multiple patterns
        // Pattern 1: totalDownloads in JSON
        let match = html.match(/totalDownloads\\?"?\s*:\s*(\d+)/)
        if (match) {
          const count = parseInt(match[1], 10)
          setDownloads(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
          return
        }

        // Pattern 2: Look for download count like "36.51k" after download icon
        match = html.match(/>(\d+\.?\d*k)<\/div>/)
        if (match) {
          const raw = match[1]
          // Convert "36.51k" to "36 510"
          const num = parseFloat(raw.replace('k', '')) * 1000
          setDownloads(Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
          return
        }

        // Pattern 3: Just look for any XX.XXk pattern
        match = html.match(/(\d+\.\d+k)/)
        if (match) {
          const num = parseFloat(match[1].replace('k', '')) * 1000
          setDownloads(Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
          return
        }

        // pepy unavailable or its markup changed: ask ClickHouse instead.
        const total = await fetchClickHouseTotal(packageName)
        if (total) setDownloads(formatCount(total))
        else setDownloads('44,000+')
      } catch (error) {
        console.error('Failed to fetch PyPI downloads:', error)
        setDownloads('44,000+') // fallback
      } finally {
        setLoading(false)
      }
    }

    fetchDownloads()
  }, [packageName])

  const pepyUrl = `https://pepy.tech/projects/${packageName}`

  return { downloads, loading, pepyUrl }
}
