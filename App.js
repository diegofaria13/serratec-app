import React, { useState } from 'react';
import { Text, StatusBar, TextInput } from 'react-native';
import Title from './components/Title';
import { Container } from './components/Container';

export default function App() {
  const [meuTexto, setMeuTexto] = useState();
  return (
    <Container>
      <Title>Serratec app</Title>
      <Text style={{color: 'red'}}>
        Olá Mundo!
      </Text>
      <TextInput
        onChangeText={setMeuTexto}
        value={meuTexto}
        placeholder="Digite qualquer coisa"
        keyboardType="default"
      />
      <StatusBar
        backgroundColor="blue"
        style="light"
        barStyle="dark-content"
      />
    </Container>
  );
}