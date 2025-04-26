import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { ShoppingCart, ArrowBack } from "@mui/icons-material";
import { useCart, Product } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Mock product data
  const product: Product = {
    name: "Смартфон iPhone 15 Pro",
    price: 49999,
    description:
      "Найновіший iPhone з потужним процесором A17 Pro та професійною системою камер.",
    image: "/images/iphone15pro.jpg",
    category: "Смартфони",
    quantity: 1,
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>

        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="/">
            Головна
          </Link>
          <Link underline="hover" color="inherit" href="/catalog">
            Каталог
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Product Image */}
            <Box sx={{ flex: 1 }}>
              <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Paper>
            </Box>

            {/* Product Details */}
            <Box sx={{ flex: 1 }}>
              <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  {product.price.toLocaleString()} ₴
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  size="large"
                  fullWidth
                >
                  Додати в кошик
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
