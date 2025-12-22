import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { BE_NewsCategory } from "@/types/api/base/news";
import { useTranslations } from "next-intl";
import { ProjectsFilters as FilterTypes } from "@/services/api/projects";
type PropsT = {
    filters: FilterTypes,
    categories: BE_NewsCategory[]
    onCategoryChange: (categoryId: string | undefined) => void
}

export default function CategoriesFilters({ filters, categories, onCategoryChange }: PropsT) {
    // get translations
    const t = useTranslations("pages.projects");

    // handle category change
    const handleCategoryChange = (categoryId: string) => {
        if (filters?.website_project_setting_id != categoryId)
            onCategoryChange(categoryId);
        else
            onCategoryChange(undefined);
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">{t("categories")}</Typography>
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
                    categories?.map((category) => (
                        <ListItem
                            key={category.id}
                            disablePadding
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            <ListItemText
                                primary={category.name}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    color: filters?.website_project_setting_id == category.id ? 'primary' : 'text.secondary',
                                    fontWeight: filters?.website_project_setting_id == category.id ? 600 : 400,
                                    sx: {
                                        cursor: 'pointer',
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