
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ReactNode } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  className?: string;
}

const ScrollAnimationWrapper = ({ 
  children, 
  animation = 'fadeIn', 
  delay = 0,
  className = ""
}: ScrollAnimationWrapperProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const getAnimationClass = () => {
    if (!isIntersecting) return 'opacity-0';
    
    const delayClass = delay > 0 ? ` animation-delay-${delay}` : '';
    
    switch (animation) {
      case 'fadeIn':
        return `animate-fade-in${delayClass}`;
      case 'slideUp':
        return `animate-[slide-up_0.6s_ease-out${delay > 0 ? `_${delay}ms` : ''}]`;
      case 'slideLeft':
        return `animate-[slide-left_0.6s_ease-out${delay > 0 ? `_${delay}ms` : ''}]`;
      case 'slideRight':
        return `animate-[slide-right_0.6s_ease-out${delay > 0 ? `_${delay}ms` : ''}]`;
      case 'scaleIn':
        return `animate-scale-in${delayClass}`;
      default:
        return `animate-fade-in${delayClass}`;
    }
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
