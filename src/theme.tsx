// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
    colors: {
        raioGreen: [
            '#E8FFF2',
            '#D1FFE5',
            '#A3FFD1',
            '#74FFBC',
            '#4AFFA8',
            '#00FF88', // Cor principal da logo
            '#00E675',
            '#00CC62',
            '#00B34F',
            '#00993C'
        ],
        raioDark: [
            '#F8F9FA',
            '#E9ECEF',
            '#DEE2E6',
            '#CED4DA',
            '#ADB5BD',
            '#6C757D',
            '#495057',
            '#343A40',
            '#212529',
            '#1A1D20' // Cor bem escura para máximo contraste
        ]
    },
    primaryColor: 'raioGreen',
    fontFamily: 'Inter, system-ui, sans-serif',
    headings: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: '700',
    },
});
