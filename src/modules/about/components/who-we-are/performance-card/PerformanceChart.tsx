import { Box } from '@mui/material';
import { Teacher } from 'iconsax-reactjs';
import { PerformanceItem } from './types';
import LayoutStack from '@/layouts/main/layout-stack';

interface PerformanceChartProps {
  items: PerformanceItem[];
}

/**
 * Renders a circular progress chart with graduation icon in center
 * Uses SVG for smooth rendering of color segments
 */
export default function PerformanceChart({ items }: PerformanceChartProps) {
  const size = 160;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* SVG Circle Chart */}
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {items.map((item, index) => {
          const dashArray = (item.percentage / 100) * circumference;
          const dashOffset = -accumulatedPercentage * (circumference / 100);
          accumulatedPercentage += item.percentage;

          return (
            <circle
              key={item.id}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Center Icon */}
      <LayoutStack
        position="absolute"
        bgcolor="grey.100"
        borderRadius="50%"
        width={56}
        height={56}
        omitPadding={true}
        justifyContent="center"
        alignItems="center"
      >
        <Teacher size={32} color="#9e9e9e" variant="Outline" />
      </LayoutStack>
    </Box>
  );
}

