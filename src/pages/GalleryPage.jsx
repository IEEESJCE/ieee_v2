import { useEffect } from 'react'
import GallerySection from '../components/GallerySection'

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <GallerySection />
}
