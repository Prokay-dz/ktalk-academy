import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[...Array(5)].map((_, i) => {
        const isFilled = i < fullStars;
        return (
          <Star
            key={i}
            size={16}
            fill={isFilled ? '#F5A623' : 'none'}
            color={isFilled ? '#F5A623' : '#CBD5E1'}
            strokeWidth={2}
          />
        );
      })}
      <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155', marginLeft: '6px' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
