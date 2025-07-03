
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface AnimatedStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: number;
  delay?: number;
}

const AnimatedStatsCard = ({ title, value, icon: Icon, color, trend, delay = 0 }: AnimatedStatsCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (typeof value === 'number') {
        const duration = 1000;
        const steps = 30;
        const increment = value / steps;
        let currentValue = 0;
        
        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= value) {
            setAnimatedValue(value);
            clearInterval(counter);
          } else {
            setAnimatedValue(Math.floor(currentValue));
          }
        }, duration / steps);
        
        return () => clearInterval(counter);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const displayValue = typeof value === 'number' ? animatedValue : value;

  return (
    <Card className={`hover:shadow-lg transition-all duration-500 cursor-pointer group ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-3xl font-bold ${color} group-hover:scale-110 transition-transform duration-300`}>
              {displayValue}
            </div>
            <div className="text-sm text-gray-600 mt-1">{title}</div>
            {trend !== undefined && (
              <div className={`text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend >= 0 ? '+' : ''}{trend}% from last month
              </div>
            )}
          </div>
          <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedStatsCard;
