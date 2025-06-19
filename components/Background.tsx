'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Background() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  const backgroundConfig = siteMetadata.background
  const isDark = resolvedTheme === 'dark'

  const getBackgroundStyle = () => {
    switch (backgroundConfig.type) {
      case 'image':
        return {
          backgroundImage: `url(${isDark ? backgroundConfig.darkImage : backgroundConfig.lightImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }
      case 'video':
        return {}
      case 'gradient':
      default:
        return {
          background: isDark ? backgroundConfig.darkGradient : backgroundConfig.lightGradient,
          backgroundAttachment: 'fixed',
        }
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 -z-10 transition-all duration-500"
        style={getBackgroundStyle()}
      />
      {backgroundConfig.type === 'video' && (
        <video
          className="fixed inset-0 -z-10 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={isDark ? backgroundConfig.darkVideo : backgroundConfig.lightVideo} type="video/mp4" />
        </video>
      )}
    </>
  )
} 