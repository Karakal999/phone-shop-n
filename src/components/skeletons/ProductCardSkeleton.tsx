import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";
import { motion } from "framer-motion";

interface ProductCardSkeletonProps {
  delay?: number;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  delay = 0,
}) => {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
        sx={{ bgcolor: "grey.100" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
        <Box
          sx={{
            mt: "auto",
            pt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width="30%" height={32} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2,
        p: 2,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} delay={index * 0.05} />
      ))}
    </Box>
  );
};

export default ProductCardSkeleton;
