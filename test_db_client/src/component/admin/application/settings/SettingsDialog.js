import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Divider, FormControl, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

function SettingsDialog({ open, onClose }) {
    const [maxWidth,] = React.useState('md');
    const [fullWidth,] = React.useState(true);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const switchContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth={fullWidth}>
            <DialogTitle><Typography variant='h5'
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            > Tetapan Borang</Typography></DialogTitle>
            <DialogContent

            >
                <Container
                >
                    <div class="row">
                        <div class="col"
                            style={{
                                textAlign: "left",
                            }}
                        >
                            <Typography></Typography>
                        </div>
                        <div class="col"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <Typography>Status</Typography>
                        </div>
                    </div>
                    <Divider
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    />
                    <div class="row">
                        <div class="col"
                            style={{
                                textAlign: "left",
                            }}
                        >
                            <Typography>Borang Makanan</Typography>
                        </div>
                        <div class="col">
                            <div style={switchContainerStyle}>
                                <FormGroup>
                                    <Switch {...label} defaultChecked />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <Divider
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}></Divider>
                    <div class="row">
                        <div class="col"
                            style={{
                                textAlign: "left",
                            }}
                        >
                            <Typography>Borang Khairat Kematian</Typography>
                        </div>
                        <div class="col">
                            <div style={switchContainerStyle}>
                                <FormGroup>
                                    <Switch {...label} defaultChecked />
                                </FormGroup>
                            </div>
                        </div>
                    </div>

                </Container>
            </DialogContent>
            <DialogActions
            >
                <Button onClick={onClose} variant='contained'
                    style={{
                        backgroundColor: "gray",
                        color: "white",
                        marginRight: 10,
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SettingsDialog;