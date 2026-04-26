import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParticleTextEffect } from '../components/ui/particle-text-effect'

const PARTICLE_WORDS = ["IEEE-SJCE"]

export default function EntryPage() {
  const navigate = useNavigate()

  const handleComplete = () => {
    navigate('/home')
  }

  // Keyboard shortcut support (for impatient users)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter') navigate('/home')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black fade-in">
      <div className="absolute inset-0 pointer-events-none">
        <ParticleTextEffect 
          words={PARTICLE_WORDS} 
          loop={false}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}

