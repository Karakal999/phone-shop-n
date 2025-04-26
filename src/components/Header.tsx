import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  Person,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { text: "Каталог", path: "/catalog" },
    { text: "Новинки", path: "/new-arrivals" },
    { text: "Розпродаж", path: "/sale" },
    { text: "Доставка", path: "/delivery" },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 0,
          }}
        >
          LOGO
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                color="inherit"
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/favorites"
            size="large"
          >
            <Favorite />
          </IconButton>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            size="large"
          >
            <Badge badgeContent={cartItemsCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/account"
            size="large"
          >
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
