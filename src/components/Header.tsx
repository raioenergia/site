// src/components/Header.tsx
import { Group, Image, Text, Button, Container, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scroll';

export function Header() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        close();
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #e9ecef',
                transition: 'all 0.3s ease'
            }}
        >
            <Container size="xl">
                <Group justify="space-between" py="md">
                    <Group style={{ cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
                        <Image
                            onClick={() => handleNavClick('hero')}
                            src="/raio-logo.jpg"
                            w={scrolled ? 80 : 100}
                            h={scrolled ? 40 : 50}
                            style={{
                                transition: 'all 0.3s ease',
                                objectFit: 'contain'
                            }}
                        />
                    </Group>

                    <Group gap="xl" visibleFrom="md">
                        <Text
                            onClick={() => handleNavClick('como-funciona')}
                            size="sm"
                            fw={500}
                            style={{
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                            c="raioDark.7"
                            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#666666'}
                        >
                            Benefícios
                        </Text>
                        <Text
                            onClick={() => handleNavClick('faq')}
                            size="sm"
                            fw={500}
                            style={{
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                            c="raioDark.7"
                            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#666666'}
                        >
                            FAQ
                        </Text>
                        <Text
                            onClick={() => handleNavClick('contato')}
                            size="sm"
                            fw={500}
                            style={{
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                            c="raioDark.7"
                            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#666666'}
                        >
                            Contato
                        </Text>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="gradient"
                                gradient={{ from: 'raioGreen.5', to: 'raioGreen.6' }}
                                radius="xl"
                                size="sm"
                                onClick={() => handleNavClick('calculadora')}
                                style={{
                                    boxShadow: '0 2px 8px rgba(0, 255, 136, 0.2)'
                                }}
                            >
                                Calcular sua economia
                            </Button>
                        </motion.div>
                    </Group>

                    <Burger opened={opened} onClick={toggle} hiddenFrom="md" />
                </Group>
            </Container>

            <Drawer opened={opened} onClose={close} title="Menu" position="right">
                <Stack gap="lg" p="md">
                    <Text
                        onClick={() => handleNavClick('como-funciona')}
                        style={{ cursor: 'pointer' }}
                    >
                        Como funciona
                    </Text>
                    <Text
                        onClick={() => handleNavClick('calculadora')}
                        style={{ cursor: 'pointer' }}
                    >
                        Calculadora
                    </Text>
                    <Text
                        onClick={() => handleNavClick('contato')}
                        style={{ cursor: 'pointer' }}
                    >
                        Contato
                    </Text>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'raioGreen.5', to: 'raioGreen.6' }}
                        onClick={() => handleNavClick('calculadora')}
                    >
                        Calcular Desconto
                    </Button>
                </Stack>
            </Drawer>
        </motion.div>
    );
}
