import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Account: React.FC = () => {
  const { userData, setUserData, deleteUserData } = useUser();
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    city: userData?.city || "",
    address: userData?.address || "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserData(formData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Failed to save changes. Please try again.");
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      deleteUserData();
      setLoading(false);
      setError(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("Failed to delete account. Please try again.");
      setLoading(false);
      setOpenDialog(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Завантаження..." />;
  }

  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Увійдіть в систему для перегляду особистого кабінету
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ mt: 2 }}
          >
            Увійти
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Особистий кабінет
          </Typography>
        </Box>

        <Paper sx={{ mt: 4 }}>
          <Tabs value={value} onChange={handleChange} aria-label="account tabs">
            <Tab label="Особисті дані" />
            <Tab label="Мої замовлення" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                name="firstName"
                label="Ім'я"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="lastName"
                label="Прізвище"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="phone"
                label="Телефон"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="city"
                label="Місто"
                value={formData.city}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="address"
                label="Адреса"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
              />

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                  disabled={loading}
                >
                  Зберегти зміни
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenDialog(true)}
                >
                  Видалити акаунт
                </Button>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <List>
              <ListItem>
                <ListItemText
                  primary="У вас поки немає замовлень"
                  secondary="Тут будуть відображатися ваші замовлення"
                />
              </ListItem>
            </List>
          </TabPanel>
        </Paper>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви впевнені, що хочете видалити свій акаунт? Цю дію неможливо
            скасувати.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Скасувати</Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Account;
