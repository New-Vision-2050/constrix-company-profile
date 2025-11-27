import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { SortOrder } from './types';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';

interface SortControlProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

/**
 * Dropdown control for sorting users list
 */
export default function SortControl({ sortOrder, onSortChange }: SortControlProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
        </Typography>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSortChange('desc')}>Descending</MenuItem>
        <MenuItem onClick={() => handleSortChange('asc')}>Ascending</MenuItem>
      </Menu>
    </>
  );
}

