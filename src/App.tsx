import React from 'react';
import { Container, Center, Stack, Title } from '@mantine/core';

const App: React.FC = () => {
  return (
    <Container size="md" py="xl">
      <Center>
        <Stack gap="sm" ta="center">
          <Title
            order={1}
            size="3rem"
            fw={900}
            c="blue"
          >
            Raio Energia
          </Title>
        </Stack>
      </Center>
    </Container>
  );
};

export default App;
