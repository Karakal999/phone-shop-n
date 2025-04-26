import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Паролі не співпадають");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Пароль повинен містити мінімум 6 символів");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Введіть коректну email адресу");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Здесь будет реальная логика регистрации
      // Сейчас просто имитируем успешную регистрацию
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
      };

      setUserData(userData);
      navigate("/account");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Помилка реєстрації. Будь ласка, спробуйте знову.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Реєстрація
          </Typography>
          <Paper sx={{ p: 4, mt: 4 }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="Ім'я"
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Прізвище"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Stack>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email адреса"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Номер телефону"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="Місто"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Адреса"
                  name="address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Підтвердження паролю"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Stack>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Завантаження..." : "Зареєструватися"}
              </Button>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Вже маєте акаунт?{" "}
                  <Button
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{ textTransform: "none" }}
                  >
                    Увійти
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Register;
