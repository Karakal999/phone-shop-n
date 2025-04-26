import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface ResponsiveGridProps {
  items: React.ReactNode[];
  loading?: boolean;
  LoadingComponent?: React.ComponentType<{ count?: number }>;
  loadingCount?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  minItemWidth?: number;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  items,
  loading = false,
  LoadingComponent,
  loadingCount = 8,
  columnSpacing = 2,
  rowSpacing = 2,
  minItemWidth = 280,
}) => {
  const theme = useTheme();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (loading && LoadingComponent) {
    return <LoadingComponent count={loadingCount} />;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
        },
        gap: theme.spacing(rowSpacing, columnSpacing),
        width: "100%",
        p: theme.spacing(2),
      }}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            layout
            style={{ height: "100%" }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default ResponsiveGrid;
