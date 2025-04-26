import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const NewArrivals: React.FC = () => {
  const newProducts = [
    {
      name: "iPhone 15 Pro Max",
      price: 49999,
      image: "https://picsum.photos/seed/iphone15promax/800/800",
      category: "Смартфони",
    },
    {
      name: "AirPods Pro 2",
      price: 11999,
      image: "https://picsum.photos/seed/airpodspro2/800/800",
      category: "Аксесуари",
    },
    {
      name: "Apple Watch Series 9",
      price: 19999,
      image: "https://picsum.photos/seed/watch9/800/800",
      category: "Гаджети",
    },
    {
      name: "MacBook Pro M3",
      price: 74999,
      image: "https://picsum.photos/seed/macbookm3/800/800",
      category: "Ноутбуки",
    },
    {
      name: "iPad Air 6",
      price: 24999,
      image: "https://picsum.photos/seed/ipadair6/800/800",
      category: "Планшети",
    },
    {
      name: "Apple Vision Pro",
      price: 89999,
      image: "https://picsum.photos/seed/visionpro/800/800",
      category: "Гаджети",
    },
    {
      name: "iPhone 15",
      price: 41999,
      image: "https://picsum.photos/seed/iphone15/800/800",
      category: "Смартфони",
    },
    {
      name: "HomePod 2",
      price: 9999,
      image: "https://picsum.photos/seed/homepod2/800/800",
      category: "Гаджети",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 500,
          }}
        >
          Новинки
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {newProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </Box>
      </Container>
    </motion.div>
  );
};

export default NewArrivals;
