import { Box, Typography, List, Paper } from '@mui/material';
import UserListItem from './UserListItem';
import SortControl from './SortControl';
import { useUserSort } from './useUserSort';
import { mockUsers } from './mockData';
import LayoutStack from '@/layouts/main/layout-stack';
import { useTranslations } from 'next-intl';

/**
 * Main component displaying sorted list of users with their marks
 * Follows Single Responsibility Principle by delegating to smaller components
 */
export default function UsersList() {
  const { sortedUsers, sortOrder, setSortOrder } = useUserSort(mockUsers);
  const t = useTranslations('pages.about.whoWeAre');

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header with title and sort control */}
      <LayoutStack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h6" fontWeight={600}>
          {t('users-list-title')}
        </Typography>
        <SortControl sortOrder={sortOrder} onSortChange={setSortOrder} />
      </LayoutStack>

      {/* Users list */}
      <List
        sx={{
          p: 0,
          maxHeight: 'calc(6 * 72px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'grey.100',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'grey.400',
            borderRadius: '10px',
            '&:hover': {
              bgcolor: 'grey.500',
            },
          },
        }}
      >
        {sortedUsers.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </List>
    </Paper>
  );
}

