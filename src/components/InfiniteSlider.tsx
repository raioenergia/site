import { useState, useEffect } from 'react';
import { Slider, Box, Text, Badge, Center } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

interface InfiniteSliderProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
}

export function InfiniteSlider({ value, onChange, label = "Valor da conta CEMIG" }: InfiniteSliderProps) {
    const [maxRange, setMaxRange] = useState(2000);
    const [previousMax, setPreviousMax] = useState(2000);

    // Lógica para expansão/contração do range
    useEffect(() => {
        // Expandir quando chegar próximo ao máximo (90% do range atual)
        if (value >= maxRange * 0.9 && maxRange < 10000) {
            const newMax = maxRange === 2000 ? 5000 : maxRange === 5000 ? 10000 : 20000;
            setPreviousMax(maxRange);
            setMaxRange(newMax);
        }
        // Contrair quando voltar para valores baixos
        else if (value <= 400 && maxRange > 2000) {
            setPreviousMax(maxRange);
            setMaxRange(2000);
        }
        // Contração intermediária
        else if (value <= 1500 && maxRange > 5000) {
            setPreviousMax(maxRange);
            setMaxRange(5000);
        }
    }, [value, maxRange]);

    // Função para gerar marks dinâmicas
    const generateMarks = () => {
        const marks = [{ value: 250, label: 'R$ 250' }];

        if (maxRange <= 2000) {
            marks.push(
                { value: 1000, label: 'R$ 1.000' },
                { value: 2000, label: 'R$ 2.000+' }
            );
        } else if (maxRange <= 5000) {
            marks.push(
                { value: 1250, label: 'R$ 1.250' },
                { value: 2500, label: 'R$ 2.500' },
                { value: 5000, label: 'R$ 5.000+' }
            );
        } else if (maxRange <= 10000) {
            marks.push(
                { value: 2500, label: 'R$ 2.500' },
                { value: 5000, label: 'R$ 5.000' },
                { value: 10000, label: 'R$ 10.000+' }
            );
        } else {
            marks.push(
                { value: 5000, label: 'R$ 5.000' },
                { value: 10000, label: 'R$ 10.000' },
                { value: 20000, label: 'R$ 20.000+' }
            );
        }

        return marks;
    };

    // Formatação do label do slider
    const formatSliderLabel = (val: number) => {
        return `R$ ${val.toLocaleString('pt-BR')}`;
    };

    return (
        <Box>
            <Text size="md" fw={600} c="raioDark.9" mb="md">
                {label}
            </Text>

            {/* Indicador de range atual */}
            <Center mb="sm">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={maxRange}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                    </motion.div>
                </AnimatePresence>
            </Center>

            {/* Slider principal */}
            <motion.div
                key={maxRange}
                initial={{ scaleX: 0.95 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Slider
                    value={value}
                    onChange={onChange}
                    min={250}
                    max={maxRange}
                    step={10}
                    size="lg"
                    color="raioGreen"
                    marks={generateMarks()}
                    label={formatSliderLabel}
                    styles={{
                        markLabel: {
                            fontSize: '12px',
                            fontWeight: 500,
                        },
                        mark: {
                            borderColor: '#51cf66',
                        },
                        thumb: {
                            borderWidth: '3px',
                            boxShadow: '0 4px 12px rgba(81, 207, 102, 0.3)',
                        },
                        track: {
                            height: '8px',
                        }
                    }}
                />
            </motion.div>

            {/* Valor selecionado destacado */}
            <Center mt="lg">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        duration: 0.5,
                        repeat: value !== previousMax ? 1 : 0
                    }}
                >
                    <Badge size="xl" variant="filled" color="raioGreen" mt="lg" p="lg">
                        <Text size="xl" fw={700} c="white">
                            {formatSliderLabel(value)}
                        </Text>
                    </Badge>
                </motion.div>
            </Center>

            {/* Dicas visuais */}
            <Center mt="sm">
                <Text size="xs" c="raioDark.5" ta="center">
                    {value >= maxRange * 0.9 && maxRange < 20000 &&
                        "💡 Continue deslizando para valores maiores"
                    }
                    {value <= 400 && maxRange > 2000 &&
                        "← Deslize para a esquerda para valores menores"
                    }
                </Text>
            </Center>
        </Box>
    );
}
