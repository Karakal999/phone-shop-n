import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Catalog from "./Catalog";

const Accessories: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" gutterBottom>
        Аксесуари
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Catalog defaultCategory="Аксесуари" />
      </Box>
    </motion.div>
  );
};

export default Accessories;
