import { Container, Title, Text, Box, Grid, Card, Center, Stack, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconCurrencyReal, IconCalendar, IconSolarPanel } from '@tabler/icons-react';

const benefits = [
    {
        icon: IconCurrencyReal,
        title: 'Zero Taxa, Zero Mensalidade',
        highlight: 'Pague apenas o que usar',
        description: 'Sem taxa de adesão ou mensalidade fixa. Você paga apenas pelos créditos utilizados, sempre com desconto garantido sobre a CEMIG.',
        badge: 'Economia Real'
    },
    {
        icon: IconCalendar,
        title: 'Liberdade Total',
        highlight: 'Sem fidelidade nem amarras',
        description: 'Contrato por prazo indeterminado. Cancele quando quiser, sem multa, quitando apenas os créditos já enviados.',
        badge: 'Flexibilidade'
    },
    {
        icon: IconSolarPanel,
        title: 'Zero Investimento',
        highlight: 'Sem instalação, sem obras',
        description: 'Nada de placas solares ou mudanças na sua instalação. Continue sendo atendido pela CEMIG, mas pagando menos.',
        badge: 'Sem Complicação'
    }
];

export function HowItWorks() {
    return (
        <Box py={120} bg="gray.0" id="como-funciona">
            <Container size="xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Stack align="center" mb={60}>
                        <Title order={2} size="3rem" fw={800} c="raioDark.9" ta="center">
                            Por que escolher a Raio Energia?
                        </Title>
                        <Text size="xl" c="raioDark.6" ta="center" maw={700}>
                            Descubra como economizar na conta de luz sem complicação,
                            sem investimento e com total liberdade
                        </Text>
                    </Stack>
                </motion.div>

                <Grid>
                    {benefits.map((benefit, index) => (
                        <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -15,
                                    scale: 1.02
                                }}
                            >
                                <Card
                                    padding="xl"
                                    radius="xl"
                                    h={{ base: 'auto', md: 380 }}
                                    style={{
                                        border: '2px solid transparent',
                                        background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #51cf66, #339af0) border-box',
                                        transition: 'all 0.4s ease',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                                    }}
                                    bg="white"
                                >
                                    <Stack h="100%" justify="space-between">
                                        <Stack align="center" gap="md">
                                            <Badge
                                                variant="filled"
                                                color="raioGreen.6"
                                                radius="xl"
                                                size="sm"
                                            >
                                                {benefit.badge}
                                            </Badge>

                                            <Box
                                                bg="linear-gradient(135deg, #51cf66, #339af0)"
                                                p="lg"
                                                style={{ borderRadius: '50%' }}
                                            >
                                                <benefit.icon size={32} color="white" stroke={2.5} />
                                            </Box>

                                            <Stack gap="xs" align="center">
                                                <Text fw={700} size="lg" c="raioDark.9" ta="center">
                                                    {benefit.title}
                                                </Text>

                                                <Text
                                                    fw={600}
                                                    size="md"
                                                    c="raioGreen.7"
                                                    ta="center"
                                                    style={{
                                                        fontStyle: 'italic',
                                                        textDecoration: 'underline',
                                                        textDecorationColor: '#51cf66'
                                                    }}
                                                >
                                                    {benefit.highlight}
                                                </Text>
                                            </Stack>
                                        </Stack>

                                        <Box>
                                            <Text c="raioDark.6" ta="center" size="sm" lh={1.6}>
                                                {benefit.description}
                                            </Text>

                                            <Center mt="lg">
                                                <Box
                                                    w={60}
                                                    h={4}
                                                    bg="linear-gradient(90deg, #51cf66, #339af0)"
                                                    style={{ borderRadius: '2px' }}
                                                />
                                            </Center>
                                        </Box>
                                    </Stack>
                                </Card>
                            </motion.div>
                        </Grid.Col>
                    ))}
                </Grid>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box mt={60} ta="center">
                        <Text size="lg" c="raioDark.7" fw={500} mb="md">
                            Pronto para começar a economizar? É mais simples do que você imagina!
                        </Text>
                        <Text size="sm" c="raioDark.5">
                            ⚡ Aprovação em até 48h • ⚡ Sem burocracia • ⚡ 100% digital
                        </Text>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
