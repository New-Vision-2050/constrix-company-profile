import { Box, Typography } from '@mui/material';
import { PerformanceItem as PerformanceItemType } from './types';
import LayoutStack from '@/layouts/main/layout-stack';
import { useTranslations } from 'next-intl';

interface PerformanceItemProps {
  item: PerformanceItemType;
}

/**
 * Renders a single performance item with color indicator, label, and value
 */
export default function PerformanceItem({ item }: PerformanceItemProps) {
  const t = useTranslations('pages.about.whoWeAre');
  
  return (
    <LayoutStack
      direction="row"
      justifyContent="space-between"  
      alignItems="center"
      spacing={2}
      py={1.5}
      borderBottom="1px solid"
      borderColor="divider"
    >
      {/* Left side: Color indicator and label */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: item.color,
            flexShrink: 0,
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          {item.labelCount} {t(item.labelKey)}
        </Typography>
      </Box>

      {/* Right side: Value and percentage */}
      <Typography
        variant="body2"
        fontWeight={600}
        color="text.primary"
        sx={{ fontSize: '0.875rem' }}
      >
        {item.value}{' '}
        <Typography component="span" color="text.secondary" fontWeight={400}>
          ({item.percentage}%)
        </Typography>
      </Typography>
    </LayoutStack>
  );
}

