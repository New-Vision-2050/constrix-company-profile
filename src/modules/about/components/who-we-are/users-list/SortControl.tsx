import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { SortOrder } from './types';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useTranslations } from 'next-intl';

interface SortControlProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

/**
 * Dropdown control for sorting users list
 */
export default function SortControl({ sortOrder, onSortChange }: SortControlProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const t = useTranslations('pages.about.whoWeAre');

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (order: SortOrder) => {
    onSortChange(order);
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: 0.5,
        }}
      >
        <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
          {sortOrder === 'desc' ? t('sort-descending') : t('sort-ascending')}
        </Typography>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSortChange('desc')}>{t('sort-descending')}</MenuItem>
        <MenuItem onClick={() => handleSortChange('asc')}>{t('sort-ascending')}</MenuItem>
      </Menu>
    </>
  );
}

