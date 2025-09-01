// src/components/Footer.tsx
import {
    Container,
    Group,
    Text,
    Stack,
    Grid,
    Anchor,
    Divider,
    Box,
    Image
} from '@mantine/core';
import {
    IconBrandWhatsapp,
    IconMail,
    IconMapPin,
    IconSun,
    IconShield,
    IconBolt
} from '@tabler/icons-react';
import { scrollToSection } from '../utils/scroll';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        close();
    };

    return (
        <Box
            style={{
                background: 'linear-gradient(135deg, #1A1D20 0%, #2C2C2C 100%)',
                color: 'white',
                id: 'footer'
            }}
        >
            <Container size="xl" py="xl">
                <Grid>
                    {/* Logo e descrição */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack gap="md">
                            <Group>
                                <Image src="/logo-400x200-white-bkg-border-radius.png" w={60} h={30} />
                                <Text fw={800} size="xl" c="white">
                                    Raio Energia
                                </Text>
                            </Group>

                            <Text c="gray.4" size="sm">
                                Consórcio comercializador de créditos de energia elétrica em Minas Gerais.
                            </Text>
                        </Stack>
                    </Grid.Col>

                    {/* Links rápidos */}
                    <Grid.Col span={{ base: 12, md: 2 }}>
                        <Stack gap="md">
                            <Text fw={600} c="white" size="sm">
                                Links Rápidos
                            </Text>
                            <Stack gap="xs">
                                <Anchor
                                    onClick={() => handleNavClick('como-funciona')}
                                    c="gray.4"
                                    size="xs"
                                    td="none"
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#ADB5BD'}
                                >
                                    Benefícios
                                </Anchor>
                                <Anchor
                                    onClick={() => handleNavClick('faq')}
                                    c="gray.4"
                                    size="xs"
                                    td="none"
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#ADB5BD'}
                                >
                                    FAQ
                                </Anchor>
                                <Anchor
                                    onClick={() => handleNavClick('calculadora')}
                                    c="gray.4"
                                    size="xs"
                                    td="none"
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#ADB5BD'}
                                >
                                    Calcule sua economia
                                </Anchor>
                            </Stack>
                        </Stack>
                    </Grid.Col>

                    {/* Benefícios */}
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <Stack gap="md">
                            <Text fw={600} c="white" size="sm">
                                Nossos Benefícios
                            </Text>
                            <Stack gap="xs">
                                <Group gap="xs">
                                    <IconBolt size={14} color="#00FF88" />
                                    <Text c="gray.4" size="xs">Processo digital e sem burocracia</Text>
                                </Group>
                                <Group gap="xs">
                                    <IconSun size={14} color="#00FF88" />
                                    <Text c="gray.4" size="xs">Energia 100% renovável</Text>
                                </Group>
                                <Group gap="xs">
                                    <IconShield size={14} color="#00FF88" />
                                    <Text c="gray.4" size="xs">Sem fidelidade nem pegadinhas</Text>
                                </Group>
                                <Group gap="xs">
                                    <IconMapPin size={14} color="#00FF88" />
                                    <Text c="gray.4" size="xs">Exclusivo para MG</Text>
                                </Group>
                            </Stack>
                        </Stack>
                    </Grid.Col>

                    {/* Contato */}
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <Stack gap="md">
                            <Text fw={600} c="white" size="sm">
                                Contato
                            </Text>
                            <Stack gap="xs">
                                <Group gap="xs">
                                    <IconMapPin size={14} color="#00FF88" />
                                    <Text c="gray.4" size="xs">
                                        Rua Padre Augusto, 16<br />
                                        Centro, Montes Claros / MG
                                    </Text>
                                </Group>

                                <Group gap="xs">
                                    <IconBrandWhatsapp size={14} color="#25D366" />
                                    <Anchor
                                        href="https://wa.me/5531988618498"
                                        target="_blank"
                                        c="gray.4"
                                        size="xs"
                                        td="none"
                                        style={{ transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#ADB5BD'}
                                    >
                                        (31) 98861-8498
                                    </Anchor>
                                </Group>

                                <Group gap="xs">
                                    <IconMail size={14} color="#00FF88" />
                                    <Anchor
                                        href="mailto:contato@raioenergia.com.br?subject=Contato%20do%20site&body=Olá,%20gostaria%20de%20entrar%20em%20contato."
                                        c="gray.4"
                                        size="xs"
                                        td="none"
                                        rel="noopener noreferrer"
                                        style={{ transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FF88'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#ADB5BD'}
                                    >
                                        contato@raioenergia.com.br
                                    </Anchor>
                                </Group>
                            </Stack>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Divider my="xl" color="gray.7" />

                {/* Copyright e informações legais */}
                <Group justify="space-between" align="center">
                    <Text size="xs" c="gray.5">
                        © {currentYear} Raio Energia. Todos os direitos reservados.
                    </Text>

                    <Group gap="lg">
                        <Text size="xs" c="gray.5">
                            RAIO ENERGIA SOLAR CONSÓRCIO
                        </Text>
                        <Text size="xs" c="gray.5">
                            CNPJ: 61.643.563/0001-92
                        </Text>
                    </Group>
                </Group>

                <Text ta="center" size="xs" c="gray.6" mt="md">
                    Desenvolvido com energia renovável ⚡
                </Text>
            </Container>
        </Box>
    );
}
