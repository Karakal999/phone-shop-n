import React, { useState } from "react";
import { Layout } from "antd";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, Outlet, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

const { Content, Footer } = Layout;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const NavLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  marginRight: theme.spacing(3),
  "&:hover": {
    color: theme.palette.primary.light,
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
}));

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { path: "/", label: "Головна" },
    { path: "/catalog", label: "Каталог" },
    { path: "/phones", label: "Смартфони" },
    { path: "/accessories", label: "Аксесуари" },
    { path: "/gadgets", label: "Гаджети" },
    { path: "/delivery", label: "Доставка" },
    { path: "/about", label: "Про нас" },
    { path: "/contact", label: "Контакти" },
  ];

  const navigationLinks = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          sx={{
            borderBottom:
              location.pathname === item.path ? "2px solid white" : "none",
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </Box>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none" }}
          >
            CTRS
          </Typography>

          {navigationLinks}

          <IconContainer>
            <IconButton color="inherit" component={Link} to="/favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/account">
              <PersonIcon />
            </IconButton>
          </IconContainer>
        </StyledToolbar>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <Box key={item.path} sx={{ mb: 1 }}>
              <Link
                to={item.path}
                onClick={handleDrawerToggle}
                style={{
                  color: location.pathname === item.path ? "#ba5536" : "#000",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px 0",
                }}
              >
                {item.label}
              </Link>
            </Box>
          ))}
        </Box>
      </Drawer>

      <Content style={{ marginTop: 64 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#f0f2f5",
          padding: "24px 0",
        }}
      >
        ©{new Date().getFullYear()} CTRS. Всі права захищені.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
