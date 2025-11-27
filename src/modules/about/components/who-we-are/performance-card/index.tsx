import { Box, Typography, Paper } from '@mui/material';
import PerformanceChart from './PerformanceChart';
import PerformanceItem from './PerformanceItem';
import { mockPerformanceData } from './mockData';
import LayoutStack from '@/layouts/main/layout-stack';
import { useTranslations } from 'next-intl';

/**
 * Main component displaying performance statistics with circular chart
 * Follows Single Responsibility Principle by delegating to smaller components
 */
export default function PerformanceCard() {
  const { items } = mockPerformanceData;
  const t = useTranslations('pages.about.whoWeAre');

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 280,
        p: 3,
        borderRadius: 2,
        transform: 'translate(-29px, -9px)',
        zIndex: 1,
        bgcolor: 'background.paper',
        position: 'absolute',
        top: '8%',
        left: '-41%',
        display: { xs: 'none', sm: 'block' },
      }}
    >
      {/* Title */}
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {t('performance-title')}
      </Typography>

      {/* Circular Chart */}
      <LayoutStack
        justifyContent="center"
        spacing={2}
      >
        <PerformanceChart items={items} />
      </LayoutStack>

      {/* Performance Items List */}
      <Box>
        {items.map((item) => (
          <PerformanceItem key={item.id} item={item} />
        ))}
      </Box>
    </Paper>
  );
}

