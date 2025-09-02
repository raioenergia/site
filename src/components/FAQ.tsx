import { Container, Title, Text, Box, Stack, Accordion } from '@mantine/core';
import { motion } from 'framer-motion';
import { WhatsAppCTA } from './WhatsAppCTA';

const faqData = [
    {
        question: 'Como funciona o desconto na minha conta de luz?',
        answer: 'A Raio Energia vai adicionar créditos de energia solar diretamente na sua conta da CEMIG. Esses créditos são utilizados automaticamente, gerando desconto na sua fatura mensal. O desconto poderá ser visto tanto na conta da CEMIG quanto na Fatura Raio Energia, enviada a você mensalmente.'
    },
    {
        question: 'Preciso instalar algum equipamento na minha casa?',
        answer: 'Não! Você não precisa instalar placas solares, inversor ou qualquer equipamento. Continuará sendo atendido normalmente pela CEMIG, mas pagando menos na conta de luz. Após assinatura da sua adesão, a Raio Energia fará todo o processo para que você garanta seus benefícios.'
    },
    {
        question: 'Quanto posso economizar por mês?',
        answer: 'A economia varia conforme seu consumo, mas nossos clientes economizam até 15% na conta de luz. O desconto é aplicado sobre o valor da energia consumida, ou seja: aplicamos o desconto no preço que a CEMIG determina mensalmente. Assim, com a Raio Energia você sempre estará pagando menos do que pagaria comparando com o preço da CEMIG.'
    },
    {
        question: 'Há taxa de adesão ou mensalidade?',
        answer: 'Não há taxa de adesão nem mensalidade fixa. Você paga apenas pelos créditos de energia solar que utilizar, sempre com desconto garantido sobre o preço da CEMIG.'
    },
    {
        question: 'Posso cancelar quando quiser?',
        answer: 'Sim! O contrato é por prazo indeterminado, sem fidelidade mínima. Você pode cancelar a qualquer momento, quitando apenas os créditos de energia já enviados para sua conta. Esta quitação será feita conforme os créditos forem utilizados mensalmente.'
    },
    {
        question: 'Como sei que estou realmente economizando?',
        answer: 'Você poderá continuar acompanhar a quantidade de energia que consumiu mensalmente na sua conta da CEMIG. Lá, você verá também quantos kilowatts foram compensados pela Raio Energia. Já na fatura Raio Energia, você também verá todo este detalhamento e o preço que foi cobrado pelo kilowatt (com desconto em relação ao da CEMIG).'
    },
    {
        question: 'E se minha conta vier zerada?',
        answer: 'Mesmo se sua conta vier zerada (quando os créditos cobrem todo o consumo), você ainda pagará a taxa mínima da CEMIG, que inclui iluminação pública, consumo mínimo, doações que porventura fizer e outros encargos obrigatórios.'
    }
];

export function FAQ() {
    return (
        <Box py={120} bg="gray.0" id="faq"> {/* ✅ Mudou para bg claro */}
            <Container size="lg">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Stack align="center" mb={60}>
                        <Title order={2} size="3rem" fw={800} c="raioDark.9" ta="center"> {/* ✅ Mudou para escuro */}
                            Ainda tem dúvidas?
                        </Title>

                        <Text size="xl" c="raioDark.6" ta="center" maw={600}> {/* ✅ Mudou para cinza escuro */}
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
                                backgroundColor: 'white', // ✅ Fundo branco
                                border: '1px solid #e9ecef', // ✅ Borda clara
                                marginBottom: '12px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                '&[dataActive]': {
                                    backgroundColor: 'rgba(81, 207, 102, 0.05)', // ✅ Verde claro quando ativo
                                    borderColor: '#51cf66',
                                    boxShadow: '0 4px 12px rgba(81, 207, 102, 0.1)'
                                },
                            },
                            control: {
                                color: '#212529', // ✅ Texto escuro
                                fontSize: '16px',
                                fontWeight: 600,
                                padding: '16px 20px',
                                '&:hover': {
                                    backgroundColor: 'rgba(81, 207, 102, 0.02)'
                                }
                            },
                            chevron: {
                                color: '#51cf66',
                            },
                            panel: {
                                color: '#495057', // ✅ Cinza escuro
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
                    theme="light" // ✅ Mudou para tema claro
                />
            </Container>
        </Box>
    );
}
