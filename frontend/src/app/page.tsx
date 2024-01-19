'use client';
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { VigenereRequest, VigenereResponse } from "@/types";
import axiosApi from "@/axiosApi";

const Home = () => {
    const [formData, setFormData] = useState<VigenereRequest>({
        password: '',
        message: '',
        inputMessage: '',
    });

    const [resultEncode, setResultEncode] = useState<VigenereResponse>({});
    const [resultDecode, setResultDecode] = useState<VigenereResponse>({});

    const handleInputChange = (name: keyof VigenereRequest, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEncode = async () => {
        if (!formData.password || !formData.inputMessage) {
            console.error('Error: Missing required parameters');
            return;
        }

        try {
            const response = await axiosApi.post<VigenereResponse>('/encode', {
                password: formData.password,
                message: formData.inputMessage,
            });

            setResultEncode(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDecode = async () => {
        if (!formData.password || !formData.inputMessage) {
            console.error('Error: Missing required parameters');
            return;
        }

        try {
            const response = await axiosApi.post<VigenereResponse>('/decode', {
                password: formData.password,
                message: formData.inputMessage,
            });

            setResultDecode(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6} sx={{ margin: 'auto' }}>
                    <TextField
                        required
                        id="decode" label="Decode"
                        name="decode"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        InputProps={{
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    handleDecode();
                                }
                            },
                        }}
                    />
                </Grid>
                <Grid container direction="row" justifyContent="center" spacing={2} sx={{ margin: 2 }}>
                    <Grid item>
                        <Button
                            type="button"
                            color="secondary"
                            variant="contained"
                            onClick={handleEncode}
                        >
                            Encode
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="button"
                            color="success"
                            variant="contained"
                            onClick={handleDecode}
                        >
                            Decode
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ margin: 'auto' }}>
                    <TextField
                        required
                        id="encode" label="Encode"
                        name="encode"
                        value={formData.inputMessage}
                        onChange={(e) => handleInputChange('inputMessage', e.target.value)}
                        InputProps={{
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    handleEncode();
                                }
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={6} sx={{ margin: 'auto' }}>
                    <TextField
                        required
                        id="resultDecode" label="Result Decode"
                        name="resultDecode"
                        value={resultDecode.decoded || ''}
                        disabled
                    />
                </Grid>
                <Grid item xs={6} sx={{ margin: 'auto' }}>
                    <TextField
                        required
                        id="resultEncode" label="Result Encode"
                        name="resultEncode"
                        value={resultEncode.encoded || ''}
                        disabled
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default Home;
