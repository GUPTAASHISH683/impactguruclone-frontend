import { useEffect, useRef } from 'react'

export function useScrollReveal(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const el = ref.current
    if (el) {
      // Observe the element itself and all .reveal children
      const targets = el.querySelectorAll('.reveal')
      targets.forEach((t) => observer.observe(t))
      if (el.classList.contains('reveal')) observer.observe(el)
    }

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
