import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface ProductCardProps {
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  oldPrice,
  image,
  category,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart({
      name,
      price,
      image,
      category,
      quantity: 1,
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${encodeURIComponent(name)}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(name)) {
      removeFromFavorites(name);
    } else {
      addToFavorites({
        name,
        price,
        oldPrice,
        image,
        category,
      });
    }
  };

  const discountPercentage = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          position: "relative",
          maxWidth: 345,
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.2s ease-in-out",
          },
        }}
        onClick={handleCardClick}
      >
        <IconButton
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
          onClick={handleFavoriteClick}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isFavorite(name) ? "favorite" : "notFavorite"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isFavorite(name) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </motion.div>
          </AnimatePresence>
        </IconButton>

        {discountPercentage && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "error.main",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              zIndex: 1,
            }}
          >
            -{discountPercentage}%
          </Box>
        )}
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ objectFit: "contain", p: 2 }}
        />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {category}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="h6"
              component="div"
              color={oldPrice ? "error.main" : "text.primary"}
              sx={{ fontWeight: "bold" }}
            >
              {price} ₴
            </Typography>
            {oldPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {oldPrice} ₴
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            sx={{ mt: 2 }}
          >
            Додати в кошик
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
