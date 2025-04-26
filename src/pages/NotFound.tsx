import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main" }} />
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: { xs: "4rem", md: "6rem" } }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Сторінку не знайдено
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/")}
            sx={{ mr: 2 }}
          >
            На головну
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
