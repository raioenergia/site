import { Container, Title, Text, Box, Stack, Accordion } from '@mantine/core';
import { motion } from 'framer-motion';
import { WhatsAppCTA } from './WhatsAppCTA';

const faqData = [
    {
        question: 'Como funciona o desconto na minha conta de luz?',
        answer: 'Você receberá créditos de energia solar diretamente na sua conta da CEMIG. Esses créditos são aplicados automaticamente, gerando desconto na sua fatura mensal. O desconto aparece discriminado na sua conta como "Compensação de Energia Elétrica".'
    },
    {
        question: 'Preciso instalar algum equipamento na minha casa?',
        answer: 'Não! Esse é o grande diferencial da Raio Energia. Você não precisa instalar placas solares, inversor ou qualquer equipamento. Continuará sendo atendido normalmente pela CEMIG, mas pagando menos na conta de luz.'
    },
    {
        question: 'Quanto posso economizar por mês?',
        answer: 'A economia varia conforme seu consumo, mas nossos clientes economizam em média entre 10% a 15% na conta de luz. O desconto é aplicado sobre o valor da energia consumida, sempre com preços menores que a CEMIG.'
    },
    {
        question: 'Há taxa de adesão ou mensalidade?',
        answer: 'Não há taxa de adesão nem mensalidade fixa. Você paga apenas pelos créditos de energia solar que utilizar, sempre com desconto garantido sobre o preço da CEMIG.'
    },
    {
        question: 'Posso cancelar quando quiser?',
        answer: 'Sim! O contrato é por prazo indeterminado, sem fidelidade mínima. Você pode cancelar a qualquer momento, quitando apenas os créditos de energia já enviados para sua conta.'
    },
    {
        question: 'Como sei que estou realmente economizando?',
        answer: 'O desconto aparece discriminado na sua própria conta da CEMIG. Você pode acompanhar mês a mês quanto está economizando através da "Compensação de Energia Elétrica" que aparece na sua fatura.'
    },
    {
        question: 'E se minha conta vier zerada?',
        answer: 'Mesmo se sua conta vier zerada (quando os créditos cobrem todo o consumo), você ainda pagará a taxa mínima da CEMIG, que inclui iluminação pública e outros encargos obrigatórios.'
    }
];

export function FAQ() {

    return (
        <Box py={120} bg="raioDark.9" id="faq">
            <Container size="lg">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Stack align="center" mb={60}>

                        <Title order={2} size="3rem" fw={800} c="white" ta="center">
                            Ainda tem dúvidas?
                        </Title>

                        <Text size="xl" c="gray.4" ta="center" maw={600}>
                            Tire todas suas dúvidas sobre como economizar
                            na conta de luz com a Raio Energia
                        </Text>
                    </Stack>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Accordion
                        variant="separated"
                        radius="md"
                        styles={{
                            item: {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                marginBottom: '12px',
                                '&[dataActive]': {
                                    backgroundColor: 'rgba(81, 207, 102, 0.1)',
                                    borderColor: '#51cf66',
                                },
                            },
                            control: {
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 600,
                                padding: '16px 20px',
                            },
                            chevron: {
                                color: '#51cf66',
                            },
                            panel: {
                                color: '#ced4da',
                                fontSize: '14px',
                                lineHeight: 1.5,
                                padding: '0 20px 16px 20px',
                            },
                            content: {
                                padding: 0,
                            }
                        }}
                    >
                        {faqData.map((faq, index) => (
                            <Accordion.Item value={`faq-${index}`} key={index}>
                                <Accordion.Control>
                                    {faq.question}
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {faq.answer}
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </motion.div>

                {/* CTA Section */}
                <WhatsAppCTA
                    title="Ainda tem dúvidas?"
                    theme="dark"
                />
            </Container>
        </Box>
    );
}
