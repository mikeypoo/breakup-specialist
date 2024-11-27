import { useEffect, useState } from 'react'

export const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = event => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return (
    <div
      style={{
        position: 'fixed',
        top: mousePosition.y - 50 + 'px',
        left: mousePosition.x - 50 + 'px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )

}
