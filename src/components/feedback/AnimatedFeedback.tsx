import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

type FeedbackType = "success" | "error" | "info";

interface AnimatedFeedbackProps {
  type: FeedbackType;
  message: string;
  show: boolean;
  onComplete?: () => void;
  duration?: number;
}

const AnimatedFeedback: React.FC<AnimatedFeedbackProps> = ({
  type,
  message,
  show,
  onComplete,
  duration = 2000,
}) => {
  const theme = useTheme();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon />;
      case "error":
        return <ErrorIcon />;
      case "info":
        return <InfoIcon />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "success":
        return theme.palette.success.main;
      case "error":
        return theme.palette.error.main;
      case "info":
        return theme.palette.info.main;
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: theme.zIndex.snackbar,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "background.paper",
              color: getColor(),
              py: 1.5,
              px: 3,
              borderRadius: 2,
              boxShadow: theme.shadows[4],
              minWidth: 200,
              maxWidth: "90vw",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {getIcon()}
            </motion.div>
            <Typography
              variant="body1"
              component={motion.p}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {message}
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for using the feedback component
export const useFeedback = () => {
  const [feedbackState, setFeedbackState] = React.useState<{
    show: boolean;
    type: FeedbackType;
    message: string;
    duration: number;
  }>({
    show: false,
    type: "info",
    message: "",
    duration: 2000,
  });

  const showFeedback = (
    type: FeedbackType,
    message: string,
    duration = 2000
  ) => {
    setFeedbackState({ show: true, type, message, duration });
  };

  return {
    FeedbackComponent: (
      <AnimatedFeedback
        {...feedbackState}
        onComplete={() =>
          setFeedbackState((prev) => ({ ...prev, show: false, message: "" }))
        }
      />
    ),
    showFeedback,
  };
};

export default AnimatedFeedback;
