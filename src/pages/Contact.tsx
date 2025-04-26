import React from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import { Form, Input, message } from "antd";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const Contact: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      message.success("Message sent successfully!");
      form.resetFields();
    } catch {
      message.error("Please fill in all required fields.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" gutterBottom>
        Contact Us
      </Typography>

      <StyledPaper>
        <Form form={form} layout="vertical">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ flex: "1 1 calc(50% - 12px)", minWidth: "250px" }}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" size="large" />
              </Form.Item>
            </Box>

            <Box sx={{ flex: "1 1 calc(50% - 12px)", minWidth: "250px" }}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your Email" size="large" />
              </Form.Item>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Form.Item
                name="subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input placeholder="Subject" size="large" />
              </Form.Item>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea
                  placeholder="Your Message"
                  rows={6}
                  size="large"
                />
              </Form.Item>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                fullWidth
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Form>
      </StyledPaper>
    </motion.div>
  );
};

export default Contact;
