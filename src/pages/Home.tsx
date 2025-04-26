import React from "react";
import { Typography, Box, Button, Container, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Смартфони",
      image: "https://picsum.photos/seed/phones/800/400",
      link: "/catalog?category=phones",
    },
    {
      title: "Аксесуари",
      image: "https://picsum.photos/seed/accessories/800/400",
      link: "/catalog?category=accessories",
    },
    {
      title: "Гаджети",
      image: "https://picsum.photos/seed/gadgets/800/400",
      link: "/catalog?category=gadgets",
    },
  ];

  const saleProducts = [
    {
      name: "iPhone 13 Pro",
      price: 29999,
      oldPrice: 35999,
      image: "https://picsum.photos/seed/iphone13/800/800",
      category: "Смартфони",
    },
    {
      name: "AirPods Pro",
      price: 7999,
      oldPrice: 9999,
      image: "https://picsum.photos/seed/airpods/800/800",
      category: "Аксесуари",
    },
    {
      name: "Apple Watch Series 7",
      price: 12999,
      oldPrice: 15999,
      image: "https://picsum.photos/seed/watch7/800/800",
      category: "Гаджети",
    },
    {
      name: "MacBook Air M1",
      price: 34999,
      oldPrice: 39999,
      image: "https://picsum.photos/seed/macbook/800/800",
      category: "Ноутбуки",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: 400,
          mb: 6,
        }}
      >
        <CardMedia
          component="img"
          image="https://picsum.photos/seed/hero/1920/1080"
          alt="Hero image"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 500,
          }}
        >
          Популярні категорії
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              onClick={() => navigate(category.link)}
            />
          ))}
        </Box>
      </Container>

      {/* Sales Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 500,
          }}
        >
          Розпродаж
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
          }}
        >
          {saleProducts.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
              oldPrice={product.oldPrice}
            />
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate("/sales")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1.1rem",
            }}
          >
            Всі акції
          </Button>
        </Box>
      </Container>

      {/* About Section */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          py: { xs: 6, md: 8 },
          borderRadius: 2,
          mx: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 500,
            }}
          >
            Про нас
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              maxWidth: 800,
              mx: "auto",
              mb: 4,
              color: "text.secondary",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            CTRS - це український магазин техніки Apple та аксесуарів, який
            пропонує широкий вибір смартфонів, планшетів та аксесуарів. Ми
            забезпечуємо найкращий сервіс та гарантію на всю продукцію, щоб ви
            могли насолоджуватися своїми пристроями без турбот.
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/about")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: "1.1rem",
              }}
            >
              Дізнатися більше
            </Button>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Home;
