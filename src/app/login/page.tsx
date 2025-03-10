"use client";
import { login } from '@/utils/authService';
import { useAuth } from '@/utils/authContext';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { token, setToken } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setToken(await login({ username: identifier, password }));
      router.push('/dashboard');
    } catch (error) {
      setError('Login failed');  
    }
  }

  return (
    <Container maxWidth="sm">
      <Box 
        mt={8} 
        p={4} 
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
        sx={{
          '& .MuiTextField-root': { mb: 2 },
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          textAlign="center"
          color="primary"
          mb={4}
        >
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username or Email"
            type="text"
            value={identifier}
            onChange={(e: any) => setIdentifier(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
            variant="outlined"
          />
          {error && (
            <Typography color="error" variant="body2" mb={2}>
              {error}
            </Typography>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            size="large"
            sx={{ 
              mt: 2,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;