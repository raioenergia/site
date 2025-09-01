// src/components/Calculator.tsx
import { useState } from 'react';
import {
    Container,
    Title,
    Button,
    Text,
    TextInput,
    Stack,
    Card,
    Box,
    Badge,
    Center,
    Grid,
    FileInput,
    Progress
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconGift,
    IconBrandWhatsapp,
    IconMail,
    IconFileUpload,
    IconId,
    IconCheck,
    IconPhone
} from '@tabler/icons-react';

import { InputBase } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { WhatsAppCTA } from './WhatsAppCTA'
import { InfiniteSlider } from './InfiniteSlider';
import { submitToGoogleScript } from '../services/googleAppsScriptService'

function getDescontoFaixa(valor: number) {
    if (valor >= 800) return 15;
    if (valor >= 500) return 15;
    if (valor >= 250) return 15;
    return 0;
}

function brincadeiraEconomia(valorMensal: number) {
    // Calcular economia anual
    const valorAnual = valorMensal * 12;

    // Brincadeiras por faixa de valor anual
    const brincadeiras = {
        // Faixa alta (R$ 2.400+/ano = R$ 200+/mês)
        alta: [
            { emoji: '🏖️', text: 'fazer uma viagem incrível para o litoral' },
            { emoji: '🚗', text: 'dar entrada num carro usado' },
            { emoji: '🏠', text: 'guardar para a entrada de uma casa' },
            { emoji: '💻', text: 'comprar um notebook novo para trabalhar' },
            { emoji: '🎮', text: 'adquirir um console de videogame' },
            { emoji: '📱', text: 'trocar de celular por um modelo top' },
            { emoji: '🚴', text: 'comprar uma bicicleta maneira para pedalar' },
            { emoji: '🎧', text: 'investir em fones de ouvido profissionais' },
            { emoji: '📚', text: 'montar uma biblioteca em casa' },
            { emoji: '🛋️', text: 'trocar o sofá por um mais confortável' }
        ],

        // Faixa média-alta (R$ 1.200-2.400/ano = R$ 100-200/mês)
        mediaAlta: [
            { emoji: '🍷', text: 'conhecer pelo menos 3 restaurantes bacanas da cidade' },
            { emoji: '🎬', text: 'assistir a um lançamentos do cinema todos os meses' },
            { emoji: '🛍️', text: 'comprar no mínimo 20 camisetas básicas novas' },
            { emoji: '🎨', text: 'fazer aulas de arte e pintura' },
            { emoji: '💃', text: 'aprender a dançar como um profissional' },
            { emoji: '🌞', text: 'fazer aulas de yoga para relaxar' },
            { emoji: '🎤', text: 'montar um karaokê em casa' },
            { emoji: '📷', text: 'comprar uma câmera e aprender a tirar fotos profissionais' },
            { emoji: '🎢', text: 'conhecer um parque de diversão hilário' },
            { emoji: '🍽️', text: 'renovar o aparelho de jantar da sua casa' }
        ],

        // Faixa média (R$ 600-1.200/ano = R$ 50-100/mês)
        media: [
            { emoji: '☕', text: 'tomar café gourmet todos os dias' },
            { emoji: '🍕', text: 'comer uma pizza por mês' },
            { emoji: '🍦', text: 'tomar sorvete sempre que der vontade' },
            { emoji: '🎧', text: 'assinar dois streamings de música ou filmes' },
            { emoji: '📖', text: 'comprar livros interessantes para ler' },
            { emoji: '🕯️', text: 'encher a casa de velas cheirosas' },
            { emoji: '🌱', text: 'criar uma horta orgânica em casa' },
            { emoji: '🧩', text: 'colecionar quebra-cabeças divertidos' },
            { emoji: '🍹', text: 'curtir drinks nos fins de semana' },
            { emoji: '🌿', text: 'transformar a casa numa floresta urbana' }
        ],

        // Faixa baixa (R$ 360-600/ano = R$ 30-50/mês)
        baixa: [
            { emoji: '🍔', text: 'comer um hambúrguer artesanal todo mês' },
            { emoji: '🎟️', text: 'visitar um museus e exposições' },
            { emoji: '🍫', text: 'comprar guloseimas no supermercado' },
            { emoji: '🎂', text: 'comemorar um aniversário em grande estilo' },
            { emoji: '🚕', text: 'pagar seu plano do Uber One' },
            { emoji: '🛀', text: 'tomar banhos relaxantes com sais' },
            { emoji: '🍿', text: 'Comprar uma pipoca no cinema todo mês' },
            { emoji: '🎯', text: 'praticar arco e flecha como hobby' },
            { emoji: '🌸', text: 'decorar a casa com flores naturais' },
            { emoji: '💡', text: 'iluminar melhor todos os cômodos' }
        ],

        // Faixa muito baixa (menos de R$ 360/ano = menos de R$ 30/mês)
        muitoBaixa: [
            { emoji: '💼', text: 'comprar uma mala nova para viajar' },
            { emoji: '👜', text: 'comprar um acessórios fashion no final do ano' },
            { emoji: '💪🏼', text: 'tomar creatina todos os dias' },
            { emoji: '⚽️', text: 'jogar pelada uma vez por mês' },
            { emoji: '🌐', text: 'melhorar seu plano de internet em casa' }
        ]
    };

    // Selecionar categoria baseada no valor anual
    let categoria;
    if (valorAnual >= 2400) categoria = brincadeiras.alta;
    else if (valorAnual >= 1200) categoria = brincadeiras.mediaAlta;
    else if (valorAnual >= 600) categoria = brincadeiras.media;
    else if (valorAnual >= 360) categoria = brincadeiras.baixa;
    else categoria = brincadeiras.muitoBaixa;

    // Retornar item aleatório da categoria
    const item = categoria[Math.floor(Math.random() * categoria.length)];

    return {
        emoji: item.emoji,
        text: item.text
    };
}

export function Calculator() {
    const WHATSAPP_NUMBER = process.env.PUBLIC_PHONE_WHATSAPP;

    // Estados do formulário
    const [whatsapp, setWhatsapp] = useState('');
    const [valorConta, setValorConta] = useState(500);
    const [email, setEmail] = useState('');
    const [contaCemig, setContaCemig] = useState<File | null>(null);
    const [documento, setDocumento] = useState<File | null>(null);

    // Estados da UI
    const [currentStep, setCurrentStep] = useState(1);
    const [resultado, setResultado] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleCalcular = async () => {
        if (!whatsapp.trim() || whatsapp.length < 10) {
            alert('Por favor, insira um WhatsApp válido');
            return;
        }

        setLoading(true);

        try {
            // ✅ Calcular os valores
            const desconto = getDescontoFaixa(valorConta);
            const valorEconomia = (valorConta * desconto) / 100;
            const brincadeira = brincadeiraEconomia(valorEconomia);

            // ✅ Atualizar o estado
            setResultado({
                valor: valorEconomia,
                desconto,
                brincadeira,
                valorConta,
                whatsapp
            });

            // ✅ PRIMEIRO ENVIO - Apenas WhatsApp e valor da conta
            // const success = await submitToGoogleScript({
            //     whatsapp,
            //     email: '',
            //     valorConta,
            //     economia: valorEconomia
            // });

            // if (success) {
            //     console.log('✅ Lead inicial capturado!');
            // } else {
            //     console.warn('⚠️ Falha no envio inicial, mas continuando...');
            // }

            setCurrentStep(2);

        } catch (error) {
            console.error('Erro no cálculo:', error);
            alert('Erro ao processar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleFinalizar = async () => {
        if (!email.trim()) {
            alert('Por favor, preencha o email');
            return;
        }

        setSubmitting(true);

        try {
            const success = await submitToGoogleScript({
                whatsapp,
                email,
                valorConta,
                economia: resultado?.valor || 0,
                contaCemig,
                documento
            });

            if (success) {
                console.log('✅ Dados salvos no Google Sheets!');
                setCurrentStep(3);
            } else {
                alert('Erro ao enviar dados. Tente novamente.');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao processar. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box py={120} bg="raioDark.9" id="calculadora"> {/* ✅ Background escuro */}
            <Container size="xl">

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Box mb={40}>
                        <Center mb="md">
                            <Badge size="lg" variant="light" color="raioGreen" radius="xl">
                                Passo {currentStep} de 3
                            </Badge>
                        </Center>
                        <Progress
                            value={(currentStep / 3) * 100}
                            size="lg"
                            radius="xl"
                            color="raioGreen"
                            style={{ maxWidth: '400px', margin: '0 auto' }}
                        />
                    </Box>
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: WhatsApp + Slider */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Center>
                                <Stack align="center" maw={700} w="100%">
                                    <Title order={2} size="3rem" fw={800} c="gray.0" ta="center">
                                        Economize em 3 passos!
                                    </Title>

                                    <Text
                                        size="md"
                                        c="gray.4"
                                        maw={500}
                                        ta="center"
                                        mb="lg"
                                    >
                                        Insira seu número de WhatsApp e o seu consumo mensal de energia
                                        para descobrir quanto você pode calcular com a Raio Energia.
                                    </Text>

                                    <Card
                                        padding="xl"
                                        radius="xl"
                                        bg="gray.0" // ✅ Card com fundo cinza muito claro
                                        shadow="sm"
                                        w="100%"
                                        style={{
                                            border: '1px solid #e9ecef'
                                        }}
                                    >
                                        <Stack gap="xl">
                                            <InputBase
                                                component={IMaskInput}
                                                mask="(00) 00000-0000"
                                                label="Seu WhatsApp"
                                                placeholder="(00) 00000-0000"
                                                value={whatsapp}
                                                onAccept={(value) => setWhatsapp(value)}
                                                size="lg"
                                                radius="lg"
                                                leftSection={<IconPhone size={20} />}
                                                required
                                                styles={{
                                                    label: { fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#212529' },
                                                    input: {
                                                        border: '2px solid #e9ecef',
                                                        fontSize: '18px',
                                                        height: '60px',
                                                        backgroundColor: 'white', // ✅ Input com fundo branco
                                                        '&:focus': {
                                                            borderColor: '#51cf66'
                                                        }
                                                    }
                                                }}
                                            />

                                            <Box>
                                                <InfiniteSlider
                                                    value={valorConta}
                                                    onChange={setValorConta}
                                                    label="Valor médio da sua conta CEMIG"
                                                />
                                            </Box>

                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    size="xl"
                                                    fullWidth
                                                    radius="xl"
                                                    h={70}
                                                    gradient={{ from: 'raioGreen.6', to: 'raioGreen.8' }} // ✅ Gradiente mais forte para contraste
                                                    variant="gradient"
                                                    onClick={handleCalcular}
                                                    loading={loading}
                                                    disabled={!whatsapp.trim()}
                                                    styles={{
                                                        root: {
                                                            fontSize: '20px',
                                                            fontWeight: 700,
                                                        }
                                                    }}
                                                >
                                                    {loading ? 'Calculando...' : 'Ver minha economia'}
                                                </Button>
                                            </motion.div>

                                            <Text ta="center" size="sm" c="raioDark.5">
                                                🔒 Seus dados estão seguros • ⚡ Resultado instantâneo
                                            </Text>
                                        </Stack>
                                    </Card>

                                    <Center mt="md">
                                        <WhatsAppCTA
                                            title="Dúvidas sobre a calculadora?"
                                            theme="dark"
                                        />
                                    </Center>
                                </Stack>
                            </Center>
                        </motion.div>
                    )}

                    {/* STEP 2: Resultado + Formulário */}
                    {currentStep === 2 && resultado && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Grid>
                                {/* Coluna do Resultado */}
                                <Grid.Col
                                    span={{ base: 12, lg: 6 }}
                                    style={{ display: 'flex' }} // ✅ Adicionar flex ao Grid.Col
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        style={{ width: '100%' }} // ✅ Garantir largura total
                                    >
                                        <Card
                                            padding="xl"
                                            radius="xl"
                                            bg="gray.0"
                                            shadow="sm"
                                            style={{
                                                border: '1px solid #e9ecef',
                                                display: 'flex', // ✅ Card como flex container
                                                flexDirection: 'column', // ✅ Direção vertical
                                                height: '100%' // ✅ Altura total
                                            }}
                                        >
                                            <Stack gap="lg" align="center" justify="center" style={{ flex: 1 }}>
                                                <motion.div
                                                    animate={{ rotate: [0, 10, -10, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                                >
                                                    <IconGift size={60} color="#51cf66" />
                                                </motion.div>

                                                <Badge
                                                    size="xl"
                                                    color="raioGreen"
                                                    variant="filled"
                                                    style={{ fontSize: '18px', fontWeight: 700 }}
                                                >
                                                    {resultado.desconto}% de desconto
                                                </Badge>

                                                <motion.div
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                                >
                                                    <Title order={1} size="3.5rem" c="raioDark.9" fw={900} ta="center">
                                                        {resultado.valor.toLocaleString('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        })}
                                                    </Title>
                                                </motion.div>

                                                <Text size="lg" c="raioDark.7" fw={600} ta="center">
                                                    de economia mensal garantida
                                                </Text>

                                                <Box
                                                    bg="raioGreen.0"
                                                    p="lg"
                                                    style={{ borderRadius: '16px', border: '2px solid #51cf66' }}
                                                    w="100%"
                                                >
                                                    <Stack align="center" gap="sm">
                                                        <Text size="3em">
                                                            {resultado.brincadeira.emoji}
                                                        </Text>
                                                        <Text ta="center" fw={600} size="md" c="raioDark.9">
                                                            No ano, com esta economia, você poderá:
                                                        </Text>
                                                        <Text ta="center" size="md" c="raioDark.8" fw={500}>
                                                            {resultado.brincadeira.text}!
                                                        </Text>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </Card>
                                    </motion.div>
                                </Grid.Col>

                                {/* Coluna do Formulário */}
                                <Grid.Col
                                    span={{ base: 12, lg: 6 }}
                                    style={{ display: 'flex' }} // ✅ Adicionar flex ao Grid.Col
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        style={{ width: '100%' }} // ✅ Garantir largura total
                                    >
                                        <Card
                                            padding="xl"
                                            radius="xl"
                                            bg="gray.0"
                                            shadow="sm"
                                            style={{
                                                border: '1px solid #e9ecef',
                                                display: 'flex', // ✅ Card como flex container
                                                flexDirection: 'column', // ✅ Direção vertical
                                                height: '100%' // ✅ Altura total
                                            }}
                                        >
                                            <Stack gap="lg" style={{ flex: 1 }}> {/* ✅ Stack ocupa espaço restante */}
                                                <Box>
                                                    <Title order={3} size="1.5rem" fw={700} c="raioDark.9" mb="sm">
                                                        Aproveite esse desconto!
                                                    </Title>
                                                    <Text size="sm" c="raioDark.6">
                                                        Preencha os dados abaixo e entraremos em contato com você.
                                                    </Text>
                                                </Box>

                                                <TextInput
                                                    label="WhatsApp"
                                                    value={whatsapp}
                                                    onChange={(e) => setWhatsapp(e.target.value)}
                                                    size="md"
                                                    radius="lg"
                                                    leftSection={<IconPhone size={16} />}
                                                    disabled
                                                    styles={{
                                                        input: { backgroundColor: '#f8f9fa' }
                                                    }}
                                                />

                                                <TextInput
                                                    label="E-mail"
                                                    placeholder="email@exemplo.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    size="md"
                                                    radius="lg"
                                                    leftSection={<IconMail size={16} />}
                                                    required
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'white',
                                                            border: '2px solid #e9ecef',
                                                            '&:focus': {
                                                                borderColor: '#51cf66'
                                                            }
                                                        }
                                                    }}
                                                />

                                                <FileInput
                                                    label="Última conta CEMIG"
                                                    placeholder="Clique para enviar"
                                                    value={contaCemig}
                                                    onChange={setContaCemig}
                                                    size="md"
                                                    radius="lg"
                                                    leftSection={<IconFileUpload size={16} />}
                                                    accept="image/*,application/pdf"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'white',
                                                            border: '2px solid #e9ecef'
                                                        }
                                                    }}
                                                />

                                                <FileInput
                                                    label="Documento de identificação"
                                                    placeholder="RG, CNH ou CPF"
                                                    value={documento}
                                                    onChange={setDocumento}
                                                    size="md"
                                                    radius="lg"
                                                    leftSection={<IconId size={16} />}
                                                    accept="image/*,application/pdf"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'white',
                                                            border: '2px solid #e9ecef'
                                                        }
                                                    }}
                                                />

                                                {/* Botão com margin-top auto para ficar no final */}
                                                <Box style={{ marginTop: 'auto' }}>
                                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <Button
                                                            size="lg"
                                                            fullWidth
                                                            radius="xl"
                                                            h={60}
                                                            gradient={{ from: 'raioGreen.6', to: 'raioGreen.8' }}
                                                            variant="gradient"
                                                            onClick={handleFinalizar}
                                                            loading={submitting}
                                                            disabled={!email}
                                                            styles={{
                                                                root: {
                                                                    fontSize: '18px',
                                                                    fontWeight: 700,
                                                                }
                                                            }}
                                                        >
                                                            {submitting ? 'Finalizando...' : 'Solicitar contato!'}
                                                        </Button>
                                                    </motion.div>

                                                    <Text ta="center" size="xs" c="raioDark.5" mt="sm">
                                                        🔒 Dados criptografados e seguros
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </Card>
                                    </motion.div>
                                </Grid.Col>
                            </Grid>

                            <Center mt="xl">
                                <WhatsAppCTA
                                    title="Dúvidas sobre como economizar?"
                                    theme="light"
                                />
                            </Center>
                        </motion.div>
                    )}


                    {/* STEP 3: Sucesso */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Center>
                                <Card
                                    padding="3rem"
                                    radius="2xl"
                                    bg="gray.0" // ✅ Fundo cinza claro
                                    shadow="xl"
                                    maw={600}
                                    style={{
                                        border: '1px solid #e9ecef'
                                    }}
                                >
                                    <Stack align="center" gap="xl">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 360, 0]
                                            }}
                                        >
                                            <IconCheck size={80} color="#51cf66" />
                                        </motion.div>

                                        <Title order={2} size="2.5rem" fw={800} c="raioDark.9" ta="center">
                                            Entraremos em contato!
                                        </Title>

                                        <Text size="lg" c="raioDark.7" ta="center" lh={1.6}>
                                            Parabéns! Seus dados foram enviados com sucesso.
                                            Nossa equipe entrará em contato pelo WhatsApp <strong>{whatsapp}</strong> para
                                            confirmar sua economia de <strong style={{ color: '#51cf66' }}>
                                                R$ {
                                                    resultado?.valor.toLocaleString('pt-BR', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}/mês
                                            </strong>.
                                        </Text>

                                        <Button
                                            size="xl"
                                            radius="xl"
                                            gradient={{ from: 'raioGreen.6', to: 'raioGreen.8' }} // ✅ Gradiente mais forte
                                            variant="gradient"
                                            leftSection={<IconBrandWhatsapp size={24} />}
                                            component="a"
                                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Finalizei minha contratação para economia de R$ ${resultado?.valor.toFixed(2)}/mês. WhatsApp: ${whatsapp}`}
                                            target="_blank"
                                            styles={{
                                                root: {
                                                    fontSize: '18px',
                                                    fontWeight: 700,
                                                    boxShadow: '0 4px 15px rgba(81, 207, 102, 0.4)'
                                                }
                                            }}
                                        >
                                            Falar com especialista agora
                                        </Button>

                                        <Text ta="center" size="sm" c="raioDark.5">
                                            ⚡ Aprovação em até 48h • 🎯 Economia garantida
                                        </Text>
                                    </Stack>
                                </Card>
                            </Center>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </Box>
    );
}
