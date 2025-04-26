import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Catalog from "./Catalog";

const Gadgets: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" gutterBottom>
        Гаджети
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Catalog defaultCategory="Гаджети" />
      </Box>
    </motion.div>
  );
};

export default Gadgets;
