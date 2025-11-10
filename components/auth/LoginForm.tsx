"use client";
import { useState, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useAuth } from "@/hooks/useAuth";
import { LoginCredentials } from "@/types/auth.types";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [token, setToken] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    if (!formData.username) {
      errors.email = "El usuario es requerido";
    }
    if (!formData.password) {
      errors.password = "La contraseña es requerida";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    const result = await login(formData);
    if (result.success) {
      setToken(result.data?.access_token || "");
    }
  };

  const handleChange =
    (field: keyof LoginCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (error) {
        clearError();
      }
    };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: "100%",
      }}
    >
      {error && (
        <Alert severity="error" onClose={clearError}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Usuario"
        type="text"
        value={formData.username}
        onChange={handleChange("username")}
        error={!!validationErrors.email}
        helperText={validationErrors.email}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ),
        }}
        autoComplete="username"
      />

      <TextField
        fullWidth
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange("password")}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={isLoading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 1, height: 48 }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Iniciar Sesión"
        )}
      </Button>
      {token && (
        <TextField disabled fullWidth label="token" type="text" value={token} />
      )}
    </Box>
  );
};
