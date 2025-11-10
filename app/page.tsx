'use client';

import { Box, Paper, Typography, Container } from "@mui/material";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="sm" sx={{ width: "100%" }}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Bienvenido
            </Typography>
          </Box>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
}
