import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

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
          Обране
        </Typography>

        {favorites.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            У вас поки немає обраних товарів
          </Typography>
        ) : (
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
            {favorites.map((product) => (
              <ProductCard
                key={product.name}
                {...product}
                oldPrice={product.oldPrice}
              />
            ))}
          </Box>
        )}
      </Container>
    </motion.div>
  );
};

export default Favorites;
