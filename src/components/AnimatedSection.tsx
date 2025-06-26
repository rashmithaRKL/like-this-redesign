
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeIn',
  delay = 0,
  duration = 600
}: AnimatedSectionProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const animationClasses = {
    fadeIn: 'opacity-0 translate-y-8',
    slideUp: 'opacity-0 translate-y-16',
    slideLeft: 'opacity-0 translate-x-16',
    slideRight: 'opacity-0 -translate-x-16',
    scaleIn: 'opacity-0 scale-95',
    rotateIn: 'opacity-0 rotate-6 scale-95'
  };

  const activeClasses = {
    fadeIn: 'opacity-100 translate-y-0',
    slideUp: 'opacity-100 translate-y-0',
    slideLeft: 'opacity-100 translate-x-0',
    slideRight: 'opacity-100 translate-x-0',
    scaleIn: 'opacity-100 scale-100',
    rotateIn: 'opacity-100 rotate-0 scale-100'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        animationClasses[animation],
        isIntersecting && activeClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
