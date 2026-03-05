import { useState, useEffect } from 'react'

export const usePyPIDownloads = (packageName: string) => {
  const [downloads, setDownloads] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        // Use proxy to bypass CORS
        const response = await fetch(`/api/pepy/projects/${packageName}`)
        const html = await response.text()

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
        }
      } catch (error) {
        console.error('Failed to fetch PyPI downloads:', error)
        setDownloads('36,000+') // fallback
      } finally {
        setLoading(false)
      }
    }

    fetchDownloads()
  }, [packageName])

  const pepyUrl = `https://pepy.tech/projects/${packageName}`

  return { downloads, loading, pepyUrl }
}
