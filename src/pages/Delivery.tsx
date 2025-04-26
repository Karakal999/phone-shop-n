import React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";
import { Timeline } from "antd";
import { motion } from "framer-motion";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Delivery: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" gutterBottom>
        Доставка та оплата
      </Typography>

      <Grid container spacing={3}>
        <Grid component="div" item xs={12} md={8}>
          <Paper sx={{ p: 4, mb: 3 }}>
            <Typography variant="h2" gutterBottom>
              Способи доставки
            </Typography>
            <Timeline
              items={[
                {
                  color: "#ba5536",
                  dot: <LocalShippingIcon />,
                  children: (
                    <Box>
                      <Typography variant="h6">Нова Пошта</Typography>
                      <Typography>
                        Доставка до відділення або поштомату Нової Пошти по всій
                        Україні
                      </Typography>
                    </Box>
                  ),
                },
                {
                  color: "#693d3d",
                  dot: <LocationOnIcon />,
                  children: (
                    <Box>
                      <Typography variant="h6">Самовивіз</Typography>
                      <Typography>
                        Безкоштовний самовивіз з нашого магазину в Києві
                      </Typography>
                    </Box>
                  ),
                },
              ]}
            />
          </Paper>

          <Paper sx={{ p: 4 }}>
            <Typography variant="h2" gutterBottom>
              Способи оплати
            </Typography>
            <Timeline
              items={[
                {
                  color: "#ba5536",
                  dot: <PaymentIcon />,
                  children: (
                    <Box>
                      <Typography variant="h6">Оплата при отриманні</Typography>
                      <Typography>
                        Оплата готівкою або карткою при отриманні замовлення
                      </Typography>
                    </Box>
                  ),
                },
                {
                  color: "#693d3d",
                  dot: <PaymentIcon />,
                  children: (
                    <Box>
                      <Typography variant="h6">Онлайн оплата</Typography>
                      <Typography>
                        Оплата карткою Visa/Mastercard через безпечний платіжний
                        шлюз
                      </Typography>
                    </Box>
                  ),
                },
              ]}
            />
          </Paper>
        </Grid>

        <Grid component="div" item xs={12} md={4}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h2" gutterBottom>
              Важлива інформація
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Термін доставки
              </Typography>
              <Typography>1-3 робочих дні по Україні</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Вартість доставки
              </Typography>
              <Typography>За тарифами перевізника</Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Безкоштовна доставка
              </Typography>
              <Typography>При замовленні від 3000 грн</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Delivery;
