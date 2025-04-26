import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: "cash" | "card";
  deliveryMethod: "novaPoshta" | "pickup";
  novaPoshtaOffice?: string;
}

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "cash",
    deliveryMethod: "novaPoshta",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) newErrors.firstName = "Обов'язкове поле";
    if (!formData.lastName) newErrors.lastName = "Обов'язкове поле";
    if (!formData.email) {
      newErrors.email = "Обов'язкове поле";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    if (!formData.phone) {
      newErrors.phone = "Обов'язкове поле";
    } else if (!/^\+380\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Формат: +380XXXXXXXXX";
    }
    if (!formData.city) newErrors.city = "Обов'язкове поле";
    if (
      formData.deliveryMethod === "novaPoshta" &&
      !formData.novaPoshtaOffice
    ) {
      newErrors.novaPoshtaOffice = "Оберіть відділення";
    }
    if (formData.deliveryMethod === "pickup" && !formData.address) {
      newErrors.address = "Вкажіть адресу";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Здесь можно добавить отправку заказа на бэкенд
    const order = {
      ...formData,
      items,
      total,
      orderDate: new Date().toISOString(),
      status: "pending",
    };

    console.log("Order placed:", order);

    // Очищаем корзину и показываем сообщение об успехе
    clearCart();
    setShowSuccess(true);

    // Перенаправляем на главную страницу через 2 секунды
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto", my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Оформлення замовлення
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              fullWidth
              label="Ім'я"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              label="Прізвище"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Телефон"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone || "Формат: +380XXXXXXXXX"}
            />
          </Box>

          <TextField
            fullWidth
            label="Місто"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            error={!!errors.city}
            helperText={errors.city}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Спосіб доставки</FormLabel>
            <RadioGroup
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="novaPoshta"
                control={<Radio />}
                label="Нова Пошта"
              />
              <FormControlLabel
                value="pickup"
                control={<Radio />}
                label="Самовивіз"
              />
            </RadioGroup>
          </FormControl>

          {formData.deliveryMethod === "novaPoshta" && (
            <TextField
              fullWidth
              label="Відділення Нової Пошти"
              name="novaPoshtaOffice"
              value={formData.novaPoshtaOffice || ""}
              onChange={handleInputChange}
              error={!!errors.novaPoshtaOffice}
              helperText={errors.novaPoshtaOffice}
            />
          )}

          {formData.deliveryMethod === "pickup" && (
            <TextField
              fullWidth
              label="Адреса"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          )}

          <FormControl component="fieldset">
            <FormLabel component="legend">Спосіб оплати</FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Оплата при отриманні"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Оплата картою"
              />
            </RadioGroup>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Сума до сплати: {total} ₴</Typography>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Оформити замовлення
            </Button>
          </Box>
        </Stack>
      </form>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Замовлення успішно оформлено!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CheckoutForm;
