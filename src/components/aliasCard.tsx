import React, { useState } from 'react';
import { Paper, Typography, IconButton, Box, TextField, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateAlias } from '@/utils/aliasService';
import { useAuth } from '@/utils/authContext';
import { keyframes } from '@emotion/react';

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

interface AliasCardProps {
    alias: string;
    url: string;
}

const AliasCard: React.FC<AliasCardProps> = ({ alias, url }) => {
    const { token } = useAuth();

    const [displayAlias, setDisplayAlias] = useState(alias);
    const [displayUrl, setDisplayUrl] = useState(url);

    const [isEditing, setIsEditing] = useState(false);
    const [editedAlias, setEditedAlias] = useState(alias);
    const [editedUrl, setEditedUrl] = useState(url);
    const [shaking, setShaking] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedAlias(alias);
        setEditedUrl(url);
    };

    const handleSaveClick = async () => {
        try {
            await updateAlias(displayAlias, { alias: editedAlias, url: editedUrl }, token!);
            setDisplayAlias(editedAlias);
            setDisplayUrl(editedUrl);
            setIsEditing(false);
        } catch (error: any) {
            // If update fails, trigger a shake animation and show an error message.
            setShaking(true);
            setErrorMessage(error.message);
            setTimeout(() => {
                setShaking(false);
            }, 500);
        }
    };

    return (
        <>
            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    position: 'relative',
                    animation: shaking ? `${shakeAnimation} 0.5s` : 'none',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    {isEditing ? (
                        <TextField
                            value={editedAlias}
                            onChange={(e: any) => setEditedAlias(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    ) : (
                        <Typography variant="subtitle1" fontWeight="bold">
                            Alias: {displayAlias}
                        </Typography>
                    )}
                    <Box>
                        {isEditing ? (
                            <>
                                <IconButton onClick={handleSaveClick} aria-label="save">
                                    <SaveIcon />
                                </IconButton>
                                <IconButton onClick={handleCancelClick} aria-label="cancel">
                                    <CancelIcon />
                                </IconButton>
                            </>
                        ) : (
                            <IconButton onClick={handleEditClick} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                {isEditing ? (
                    <TextField
                        fullWidth
                        value={editedUrl}
                        onChange={(e: any) => setEditedUrl(e.target.value)}
                        variant="outlined"
                        size="small"
                        label="URL"
                    />
                ) : (
                    <Typography color="text.secondary">
                        URL: {displayUrl}
                    </Typography>
                )}
            </Paper>
            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={() => setErrorMessage(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AliasCard;