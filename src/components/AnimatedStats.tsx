
import { useEffect, useRef, useState } from 'react';
import { Users, Award, Clock, Star } from 'lucide-react';

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    customers: 0,
    awards: 0,
    experience: 0,
    rating: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      value: 5000,
      suffix: '+',
      label: 'Happy Customers',
      key: 'customers'
    },
    {
      icon: <Award className="w-8 h-8 text-pink-500" />,
      value: 15,
      suffix: '+',
      label: 'Awards Won',
      key: 'awards'
    },
    {
      icon: <Clock className="w-8 h-8 text-pink-500" />,
      value: 8,
      suffix: '+',
      label: 'Years Experience',
      key: 'experience'
    },
    {
      icon: <Star className="w-8 h-8 text-pink-500" />,
      value: 4.9,
      suffix: '',
      label: 'Average Rating',
      key: 'rating'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCount = (key: string, target: number, duration: number = 2000) => {
      const start = 0;
      const startTime = Date.now();

      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;

        setCounts(prevCounts => ({
          ...prevCounts,
          [key]: key === 'rating' ? Math.round(current * 10) / 10 : Math.floor(current)
        }));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    };

    // Start animations with slight delays
    animateCount('customers', 5000, 2500);
    setTimeout(() => animateCount('awards', 15, 1500), 200);
    setTimeout(() => animateCount('experience', 8, 1200), 400);
    setTimeout(() => animateCount('rating', 4.9, 1800), 600);
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {counts[stat.key as keyof typeof counts]}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedStats;
