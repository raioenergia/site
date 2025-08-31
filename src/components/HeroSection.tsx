// src/components/HeroSection.tsx
import { Button, Container, Stack, Title, Text, Box, Grid, Card, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBolt, IconLeaf, IconShield } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { scrollToSection } from '../utils/scroll';

export function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        close();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Box
            id='hero'
            style={{
                minHeight: 'clamp(100vh, 80vh, 100vh)', // Altura fluida
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'url(/hero-bkg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center', // Centraliza melhor
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'scroll', // Remove fixed completamente
            }}
        >
            {/* Overlay escuro para melhor contraste */}
            <Box
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(26, 29, 32, 0.85) 0%, rgba(52, 58, 64, 0.8) 30%, rgba(0, 255, 136, 0.3) 70%, rgba(0, 230, 117, 0.6) 100%)',
                    zIndex: 1
                }}
            />

            <Container size="xl" style={{ position: 'relative', zIndex: 3 }}>
                <Grid align="center">
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Stack gap="xl">
                                <Title
                                    order={1}
                                    fw={900}
                                    c="white"
                                    style={{
                                        fontSize: 'clamp(3.5rem, 8vw, 6rem)', // Escala fluida
                                        lineHeight: 1.1,
                                        textShadow: '0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    Economize na sua conta de energia!
                                </Title>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    <Text
                                        size="xl"
                                        c="white"
                                        fw={500}
                                        style={{
                                            textShadow: '0 3px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)'
                                        }}
                                    >
                                        Energia limpa sem burocracia e sem investimento inicial
                                    </Text>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    <Group>
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                size="xl"
                                                color="white"
                                                c="raioDark.9"
                                                radius="xl"
                                                component="a"
                                                onClick={() => handleNavClick('calculadora')}
                                                leftSection={<IconBolt size={20} />}
                                                styles={{
                                                    root: {
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                                                        border: 'none',
                                                        fontSize: '18px',
                                                        height: '60px',
                                                        paddingLeft: '30px',
                                                        paddingRight: '30px',
                                                        backgroundColor: 'white',
                                                        '&:hover': {
                                                            backgroundColor: '#f8f9fa'
                                                        }
                                                    }
                                                }}
                                            >
                                                Calcule sua economia
                                            </Button>
                                        </motion.div>
                                    </Group>
                                </motion.div>
                            </Stack>
                        </motion.div>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    );
}
