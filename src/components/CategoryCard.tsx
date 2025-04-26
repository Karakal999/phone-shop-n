import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  onClick,
}) => {
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -8 }}
      sx={{
        height: "100%",
        cursor: "pointer",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 2,
        bgcolor: "background.paper",
      }}
      onClick={onClick}
    >
      <Box sx={{ position: "relative", pt: "75%" }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent sx={{ textAlign: "center", py: 3 }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
