import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Catalog from "./Catalog";

const Phones: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" gutterBottom>
        Смартфони
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Catalog defaultCategory="Смартфони" />
      </Box>
    </motion.div>
  );
};

export default Phones;
