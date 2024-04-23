import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnonymizeClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/anonymize', { text: inputText });
      setProcessedText(response.data);
      setError('');
    } catch (err) {
      setError('Hubo un error al procesar la solicitud.');
    }
    setLoading(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Ingrese el texto con información PII"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={inputText}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAnonymizeClick}
        disabled={loading || inputText.trim() === ''}
        style={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Anonimizar'}
      </Button>
      <TextField
        label="Texto procesado"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={processedText}
        disabled
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default App;
