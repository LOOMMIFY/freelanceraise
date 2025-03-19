
import { useEffect, useRef } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';

/**
 * Hook to add scroll-based animations to elements
 * @param animationType Type of animation to apply
 * @param threshold Percentage of element that needs to be visible (0-1)
 * @param delay Optional delay before animation starts (ms)
 * @returns Reference to attach to the target element
 */
export const useScrollAnimation = (
  animationType: AnimationType = 'fade-up',
  threshold: number = 0.2,
  delay: number = 0
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Don't apply animations if user prefers reduced motion
    }

    const element = ref.current;
    if (!element) return;

    const className = `scroll-${animationType}`;
    element.classList.add(className);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply animation after optional delay
            setTimeout(() => {
              element.classList.add('scroll-visible');
            }, delay);
            
            // Unobserve after animation is triggered
            observer.unobserve(element);
          }
        });
      },
      {
        threshold, // Trigger when this percentage of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in view
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [animationType, threshold, delay]);

  return ref;
};
