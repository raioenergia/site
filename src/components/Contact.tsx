// src/components/Contact.tsx
import { Box } from '@mantine/core';

export function Contact() {
    return (
        <>

            {/* Mapa Full-Width como Divisor */}
            <Box
                id='contato'
                style={{
                    position: 'relative',
                    height: '400px',
                    width: '100%'
                }}
            >
                <iframe
                    title="Raio Energia - Montes Claros"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.4890877838665!2d-43.863842!3d-16.734077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa75c28e183fff7%3A0x1234567890abcdef!2sRua%20Padre%20Augusto%2C%2016%2C%20Centro%2C%20Montes%20Claros%20-%20MG%2C%2039400-053!5e0!3m2!1spt-BR!2sbr!4v1640995200000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>
        </>
    );
}
