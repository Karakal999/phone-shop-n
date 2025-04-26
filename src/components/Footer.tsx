import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Про нас
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ми пропонуємо широкий вибір смартфонів та аксесуарів за найкращими
              цінами.
            </Typography>
          </Box>
          <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Навігація
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link component={RouterLink} to="/catalog" color="inherit">
                Каталог
              </Link>
              <Link component={RouterLink} to="/new-arrivals" color="inherit">
                Новинки
              </Link>
              <Link component={RouterLink} to="/sale" color="inherit">
                Розпродаж
              </Link>
              <Link component={RouterLink} to="/delivery" color="inherit">
                Доставка
              </Link>
            </Box>
          </Box>
          <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Контакти
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Телефон: +380 XX XXX XX XX
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Адреса: м. Київ, вул. Прикладна, 123
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} Всі права захищені
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
