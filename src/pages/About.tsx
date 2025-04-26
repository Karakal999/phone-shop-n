import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Про нас
          </Typography>

          <Paper sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Наша місія
            </Typography>
            <Typography paragraph>
              Ми прагнемо надавати нашим клієнтам найкращі технологічні рішення
              за доступними цінами. Наш магазин спеціалізується на продажу
              смартфонів та аксесуарів від провідних світових виробників.
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Чому обирають нас
            </Typography>
            <Typography paragraph>
              • Широкий асортимент товарів від перевірених брендів
              <br />
              • Конкурентні ціни та регулярні акції
              <br />
              • Професійна консультація та підтримка
              <br />
              • Швидка доставка по всій Україні
              <br />• Гарантія на всі товари
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Наші переваги
            </Typography>
            <Typography paragraph>
              Ми працюємо на ринку електроніки вже багато років і знаємо, що
              важливо для наших клієнтів. Кожен покупець для нас особливий, і ми
              робимо все можливе, щоб забезпечити найкращий сервіс та підтримку
              на кожному етапі покупки.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </motion.div>
  );
};

export default About;
