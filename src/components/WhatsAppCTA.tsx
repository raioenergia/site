import { Text, Box, Stack, Button, Group } from '@mantine/core';

import {
    IconBrandWhatsapp,
    IconBolt
} from '@tabler/icons-react';

import { motion } from 'framer-motion';

export function WhatsAppCTA({
    theme = 'light',
    title = 'Fale com a Raio Energia agora!'
}) {
    const WHATSAPP_NUMBER = process.env.PUBLIC_PHONE_WHATSAPP;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
        >
            <Box mt={60} ta="center">
                <Stack align="center" gap="lg">
                    <Text
                        size="xl"
                        c={theme === "dark" ? "white" : "raioDark.9"}
                        fw={600}
                    >
                        {title}
                    </Text>

                    <Text
                        size="md"
                        c={theme === "dark" ? "gray.4" : "raioDark.6"}
                        maw={500}
                        ta="center"
                    >
                        Fale direto com nossos especialistas pelo WhatsApp!
                    </Text>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            size="lg"
                            radius="xl"
                            leftSection={<IconBrandWhatsapp size={24} />}
                            component="a"
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em economizar na minha conta de luz com a Raio Energia. Podem me explicar melhor como funciona?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                                border: 'none',
                                transition: 'all 0.3s ease',
                                fontSize: '18px',
                                fontWeight: 600,
                                padding: '16px 32px',
                                height: 'auto'
                            }}
                            styles={{
                                root: {
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 40px rgba(37, 211, 102, 0.3)'
                                    }
                                }
                            }}
                        >
                            Falar no WhatsApp
                        </Button>
                    </motion.div>

                    <Group gap="lg" mt="sm">
                        <Group gap="xs">
                            <IconBolt size={16} color="#51cf66" />
                            <Text
                                size="sm"
                                c={theme === "dark" ? "gray.4" : "raioDark.5"}
                            >
                                Resposta rápida
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <IconBolt size={16} color="#51cf66" />
                            <Text
                                size="sm"
                                c={theme === "dark" ? "gray.4" : "raioDark.5"}
                            >
                                Sem compromisso
                            </Text>
                        </Group>
                    </Group>
                </Stack>
            </Box>
        </motion.div>
    );
}