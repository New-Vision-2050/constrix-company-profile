import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { BE_NewsCategory } from "@/types/api/base/news";

type PropsT = {
    categories: BE_NewsCategory[]
    onCategoryChange: (categoryId: string) => void
}

export default function CategoriesFilters({ categories, onCategoryChange }: PropsT) {
    // handle category change
    const handleCategoryChange = (categoryId: string) => {
        onCategoryChange(categoryId);
    }
    
    return (
        <Stack spacing={2}>
            <Typography variant="h6">Categories</Typography>
            <List 
                sx={{ 
                    py: 0,
                    '& .MuiListItem-root': {
                        py: 0.5,
                        pl: 2,
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                        },
                        '&:hover': {
                            '& .MuiListItemText-primary': {
                                color: 'primary.main',
                            },
                        },
                    },
                }}
            >
                {
                    categories.map((category) => (
                        <ListItem 
                            key={category.id} 
                            disablePadding
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            <ListItemText 
                                primary={category.name}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'text.secondary',
                                    sx: { 
                                        transition: 'color 0.2s ease',
                                    },
                                }}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </Stack>
    );
}