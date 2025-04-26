import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Box } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { UserProvider } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import NewArrivals from "./pages/NewArrivals";
import Sale from "./pages/Sale";
import Delivery from "./pages/Delivery";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#ba5536",
      light: "#c97d66",
      dark: "#823b26",
    },
    secondary: {
      main: "#693d3d",
      light: "#8c6464",
      dark: "#492b2b",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <UserProvider>
      <CartProvider>
        <FavoritesProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Router>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    minHeight: "100vh",
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Header />
                  <Box
                    component="main"
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      backgroundColor: "background.default",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: "1440px",
                        margin: "0 auto",
                        padding: { xs: 2, sm: 3 },
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <ErrorBoundary>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/catalog" element={<Catalog />} />
                          <Route
                            path="/new-arrivals"
                            element={<NewArrivals />}
                          />
                          <Route path="/sale" element={<Sale />} />
                          <Route path="/delivery" element={<Delivery />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/favorites" element={<Favorites />} />
                          <Route path="/account" element={<Account />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route
                            path="/product/:name"
                            element={<ProductDetail />}
                          />
                        </Routes>
                      </ErrorBoundary>
                    </Box>
                  </Box>
                  <Footer />
                </Box>
              </ThemeProvider>
            </Router>
          </Box>
        </FavoritesProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
