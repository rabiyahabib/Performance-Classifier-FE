import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress } from '@mui/material';

function App() {
  const [form, setForm] = useState({ studytime: '', failures: '', absences: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/predict', form);
      setResult(res.data);
    } catch (error) {
      console.error("Prediction failed", error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Student Performance Predictor</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="studytime"
            label="Study Time"
            type="number"
            value={form.studytime}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="failures"
            label="Past Failures"
            type="number"
            value={form.failures}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="absences"
            label="Absences"
            type="number"
            value={form.absences}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Predict'}
            </Button>
          </Box>
        </form>

        {result && (
          <Box mt={4}>
            <Typography variant="h4">Result:</Typography>
            <Typography variant="h6">Prediction: {result.result}</Typography>
            <Typography variant="h6">Confidence:</Typography>
            <Typography variant="body1">Pass - {Math.round(result.confidence[1] * 100)}%</Typography>
            <Typography variant="body1">Fail - {Math.round(result.confidence[0] * 100)}%</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
