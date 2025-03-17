import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { createAlias } from '@/utils/aliasService';
import { useAuth } from '@/utils/authContext';

const LinkShortener: React.FC = () => {
  const { token } = useAuth();

  const [link, setLink] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const alias = await createAlias({ url: link }, token!);
      console.log(alias);
    } catch (error) {
      setError('Failed to shorten link');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={8}
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Link Shortener Dashboard
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter your link"
            type="url"
            value={link}
            onChange={(e: any) => setLink(e.target.value)}
            required
            variant="outlined"
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Shorten Link
          </Button>
        </form>
        {shortUrl && (
          <Box mt={4}>
            <Typography variant="h6">Shortened URL:</Typography>
            <Typography variant="body1">{shortUrl}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LinkShortener;