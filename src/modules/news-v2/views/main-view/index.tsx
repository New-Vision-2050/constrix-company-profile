"use client";

import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import NewsCard from "../../components/news-card";
import SearchBar from "../../components/search-bar";
import Categories from "../../components/categories";
import RecentPosts from "../../components/recent-posts";
import PopularTags from "../../components/popular-tags";
import AdBanner from "../../components/ad-banner";

// Mock data - replace with actual API data
const mockNews = [
  {
    id: "1",
    image: "/assets/images/cover/cover-1.webp",
    date: "12 Aug 2024",
    readTime: "8 min read",
    title: "Understanding Blockchain Technology: Beyond Cryptocurrency",
    excerpt:
      "Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit no. Sed et aliquid sit voluptatem",
    author: {
      name: "Reece Chung",
      avatar: "/assets/images/avatar/avatar-1.webp",
    },
    category: "Technology",
  },
  {
    id: "2",
    image: "/assets/images/cover/cover-2.webp",
    date: "12 Aug 2024",
    readTime: "8 min read",
    title: "The Future of Renewable Energy: Innovations and Challenges Ahead",
    excerpt:
      "At aut sunt eum dignissim accusamus aut. Inciduet at molestiae ut facere aut. Est aut error consequatur quaerat omnis nihil tenetur facilis",
    author: {
      name: "Jaydon Simon",
      avatar: "/assets/images/avatar/avatar-2.webp",
    },
  },
  {
    id: "3",
    image: "/assets/images/cover/cover-3.webp",
    date: "12 Aug 2024",
    readTime: "8 min read",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    excerpt:
      "Non rerum modi. Accusamus voluptatem odit nihil in. Quidem ut vero numquam veniam culpa aperiam odio est nam. Quia ut dolores. Laboris",
    author: {
      name: "Lainey Davidson",
      avatar: "/assets/images/avatar/avatar-3.webp",
    },
  },
  {
    id: "4",
    image: "/assets/images/cover/cover-4.webp",
    date: "12 Aug 2024",
    readTime: "8 min read",
    title:
      "Exploring the Impact of Artificial Intelligence on Modern Healthcare",
    excerpt:
      "Aliquip aeque diacimus minima distinctio velit. Laborum ex veniam est laboriosam officia. Odit nostrum qui Laboris culpa commodi",
    author: {
      name: "Lucian Obrien",
      avatar: "/assets/images/avatar/avatar-4.webp",
    },
  },
  {
    id: "5",
    image: "/assets/images/cover/cover-5.webp",
    date: "12 Aug 2024",
    readTime: "8 min read",
    title: "Climate Change and Its Effects on Global Food Security",
    excerpt:
      "Rerum eius velit dolores. Explicabo ea nemo quisquam veniam curpa. Totan molestias et coneequatur aperiam quam et consequatur eius fugit",
    author: {
      name: "Deja Brady",
      avatar: "/assets/images/avatar/avatar-5.webp",
    },
  },
  {
    id: "6",
    image: "/assets/images/cover/cover-6.webp",
    date: "12 Aug 2024",
    readTime: "8 min read",
    title: "Sustainable Fashion: How the Industry is Going Green",
    excerpt:
      "Eat enim et si non impedit aperiam curpe animi. Aut autem numquam veniam culpa. Totan molestias ut consequatur eius fugit doleres moeliores",
    author: {
      name: "Cristopher Cardenas",
      avatar: "/assets/images/avatar/avatar-6.webp",
    },
  },
];

const mockCategories = [
  { id: "1", name: "Marketing", count: 5 },
  { id: "2", name: "Community", count: 3 },
  { id: "3", name: "Tutorials", count: 8 },
  { id: "4", name: "Business", count: 12 },
  { id: "5", name: "Management", count: 4 },
];

const mockRecentPosts = [
  {
    id: "1",
    title:
      "The Evolution of E-Commerce: Trends Shaping the Online Retail Landscape",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-7.webp",
  },
  {
    id: "2",
    title:
      "Cybersecurity in the 21st Century: Protecting Data in a Digital World",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-8.webp",
  },
  {
    id: "3",
    title: "The Role of Big Data in Transforming Business Strategies",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-9.webp",
  },
  {
    id: "4",
    title: "Genetic Engineering: Ethical Considerations and Future Prospects",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-10.webp",
  },
];

const mockTags = [
  "Technology",
  "Health and Wellness",
  "Travel",
  "Finance",
  "Education",
  "Food and Beverage",
  "Fashion",
  "Home and Garden",
];

function NewsV2MainView() {
  const t = useTranslations("newsV2");
  return (
    <MainPageContent title={t("title")}>
      <LayoutStack spacing={8}>
        <PageSection>
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Grid container spacing={3}>
                {mockNews.map((news) => (
                  <Grid key={news.id} size={{ xs: 12, sm: 6 }}>
                    <NewsCard {...news} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Sidebar */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                <SearchBar />
                <Categories categories={mockCategories} />
                <RecentPosts posts={mockRecentPosts} />
                <PopularTags tags={mockTags} />
                <AdBanner />
              </Stack>
            </Grid>
          </Grid>
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default NewsV2MainView;
