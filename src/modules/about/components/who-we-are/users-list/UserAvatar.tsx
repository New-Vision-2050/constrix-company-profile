import { Avatar } from '@mui/material';

interface UserAvatarProps {
  name: string;
  avatarColor: string;
  avatarSecondaryColor?: string;
}

/**
 * Renders a user avatar with colored background
 * Uses first letter of name as fallback
 */
export default function UserAvatar({
  name,
  avatarColor,
  avatarSecondaryColor,
}: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar
      sx={{
        bgcolor: avatarColor,
        background: avatarSecondaryColor
          ? `linear-gradient(135deg, ${avatarColor} 0%, ${avatarSecondaryColor} 100%)`
          : avatarColor,
        width: 40,
        height: 40,
        fontSize: '1rem',
        fontWeight: 600,
      }}
    >
      {initials}
    </Avatar>
  );
}

