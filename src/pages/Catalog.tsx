import React, { useState, useMemo, useEffect } from "react";
import {
  Typography,
  Box,
  Alert,
  Snackbar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  InputAdornment,
  Chip,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingSpinner from "../components/LoadingSpinner";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 59999,
    image: "https://picsum.photos/seed/iphone15/400",
    category: "Смартфони",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 54999,
    image: "https://picsum.photos/seed/s24ultra/400",
    category: "Смартфони",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 44999,
    image: "https://picsum.photos/seed/pixel8/400",
    category: "Смартфони",
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: 39999,
    image: "https://picsum.photos/seed/oneplus12/400",
    category: "Смартфони",
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    price: 9999,
    image: "https://picsum.photos/seed/airpods/400",
    category: "Аксесуари",
  },
  {
    id: 6,
    name: "Galaxy Watch 6 Pro",
    price: 12999,
    image: "https://picsum.photos/seed/watch6/400",
    category: "Гаджети",
  },
  {
    id: 7,
    name: "MagSafe Charger",
    price: 1499,
    image: "https://picsum.photos/seed/magsafe/400",
    category: "Аксесуари",
  },
  {
    id: 8,
    name: "Samsung Galaxy Buds2 Pro",
    price: 6999,
    image: "https://picsum.photos/seed/buds2pro/400",
    category: "Аксесуари",
  },
];

type SortOption = "name_asc" | "name_desc" | "price_asc" | "price_desc";

const ITEMS_PER_PAGE = 8;

const CatalogContent: React.FC<{ defaultCategory?: string }> = ({
  defaultCategory = "",
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        setLoading(true);
        // Имитируем загрузку данных
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        console.error("Error loading catalog data:", err);
        setError(true);
        setLoading(false);
      }
    };

    loadCatalogData();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const currentProducts = filteredAndSortedProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    window.location.reload();
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          gap: 3,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="error">
          Помилка завантаження каталогу
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRetry}>
          Спробувати знову
        </Button>
      </Box>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Завантаження каталогу..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            py: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Каталог
          </Typography>

          {/* Popular Categories */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }}>
              Популярні категорії
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Chip
                label="Всі категорії"
                onClick={() => setSelectedCategory("")}
                color={selectedCategory === "" ? "primary" : "default"}
                variant={selectedCategory === "" ? "filled" : "outlined"}
              />
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? "primary" : "default"}
                  variant={
                    selectedCategory === category ? "filled" : "outlined"
                  }
                />
              ))}
            </Stack>
          </Paper>

          {/* Filters and Sort */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              sx={{
                flexWrap: "wrap",
                gap: 2,
                width: "100%",
                justifyContent: "space-between",
              }}
              alignItems="center"
            >
              <TextField
                label="Пошук"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  width: { xs: "100%", sm: "300px" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl
                sx={{
                  width: { xs: "100%", sm: "200px" },
                }}
              >
                <InputLabel>Сортувати за</InputLabel>
                <Select
                  value={sortBy}
                  label="Сортувати за"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <MenuItem value="name_asc">За назвою (А-Я)</MenuItem>
                  <MenuItem value="name_desc">За назвою (Я-А)</MenuItem>
                  <MenuItem value="price_asc">За ціною (від дешевших)</MenuItem>
                  <MenuItem value="price_desc">
                    За ціною (від дорожчих)
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Paper>

          {/* Products Grid */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: { xs: 2, sm: 3 },
                px: 2,
                "& > *": {
                  minWidth: 0,
                  width: "100%",
                },
              }}
            >
              {currentProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    aspectRatio: "1/1.2",
                    width: "100%",
                  }}
                >
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* No Results Message */}
          {filteredAndSortedProducts.length === 0 && (
            <Paper
              elevation={2}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Товари не знайдено
              </Typography>
              <Typography color="text.secondary">
                Спробуйте змінити параметри пошуку
              </Typography>
            </Paper>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

interface CatalogProps {
  defaultCategory?: string;
}

const Catalog: React.FC<CatalogProps> = ({ defaultCategory = "" }) => {
  return (
    <ErrorBoundary>
      <CatalogContent defaultCategory={defaultCategory} />
    </ErrorBoundary>
  );
};

export default Catalog;
