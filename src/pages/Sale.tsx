import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const Sale: React.FC = () => {
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
    {
      name: "iPad Pro 12.9",
      price: 27999,
      oldPrice: 32999,
      image: "https://picsum.photos/seed/ipadpro/800/800",
      category: "Планшети",
    },
    {
      name: "Magic Keyboard",
      price: 8999,
      oldPrice: 11999,
      image: "https://picsum.photos/seed/magickeyboard/800/800",
      category: "Аксесуари",
    },
    {
      name: "iPhone 14",
      price: 31999,
      oldPrice: 37999,
      image: "https://picsum.photos/seed/iphone14/800/800",
      category: "Смартфони",
    },
    {
      name: "Apple Watch Ultra",
      price: 22999,
      oldPrice: 27999,
      image: "https://picsum.photos/seed/watchultra/800/800",
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
          Розпродаж
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
          {saleProducts.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
              oldPrice={product.oldPrice}
            />
          ))}
        </Box>
      </Container>
    </motion.div>
  );
};

export default Sale;
