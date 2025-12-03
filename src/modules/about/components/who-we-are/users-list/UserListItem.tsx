import { Typography, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import UserAvatar from './UserAvatar';
import { User } from './types';

interface UserListItemProps {
  user: User;
}

/**
 * Renders a single user list item with avatar, name, and mark
 */
export default function UserListItem({ user }: UserListItemProps) {
  return (
    <ListItem
      sx={{
        py: 2,
        px: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <ListItemAvatar>
        <UserAvatar
          name={user.name}
          avatarColor={user.avatarColor}
          avatarSecondaryColor={user.avatarSecondaryColor}
        />
      </ListItemAvatar>

      <ListItemText
        primary={user.name}
        primaryTypographyProps={{
          fontSize: '1rem',
          fontWeight: 500,
          color: 'text.primary',
        }}
      />

      <Typography
        variant="h6"
        fontWeight={600}
        color="text.primary"
        sx={{ minWidth: 50, textAlign: 'right' }}
      >
        {user.averageMark.toFixed(1)}
      </Typography>
    </ListItem>
  );
}

