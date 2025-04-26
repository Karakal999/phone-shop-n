import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckoutForm from "../components/CheckoutForm";

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (
    name: string,
    delta: number,
    currentQuantity: number
  ) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(name, newQuantity);
    } else {
      removeFromCart(name);
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Кошик порожній
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          Додайте товари до кошика для оформлення замовлення
        </Typography>
      </Container>
    );
  }

  if (isCheckingOut) {
    return <CheckoutForm />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Кошик
        </Typography>

        <Box sx={{ mt: 4 }}>
          {items.map((item) => (
            <Paper
              key={item.name}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {item.price} ₴
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() =>
                    handleQuantityChange(item.name, -1, item.quantity)
                  }
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleQuantityChange(item.name, 1, item.quantity)
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Typography
                variant="h6"
                sx={{ minWidth: 100, textAlign: "right" }}
              >
                {item.price * item.quantity} ₴
              </Typography>

              <IconButton
                color="error"
                onClick={() => removeFromCart(item.name)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h5">Загальна сума: {total} ₴</Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsCheckingOut(true)}
          >
            Оформити замовлення
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Cart;
