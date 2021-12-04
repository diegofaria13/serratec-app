import { Button, Collapse, Input } from "native-base";
import React, { useState, useContext } from "react";
import "react-native-gesture-handler";
import Title from "../components/Title";
import { Container } from "../components/Container";
import axios from "axios";
import {
  Stack,
  Alert,
  IconButton,
  HStack,
  VStack,
  CloseIcon,
  Text,
  Center,
  NativeBaseProvider,
} from "native-base";
import { UsuarioContext } from "../context/inex";

const Login = () => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [mostrarMensagemErro, setMostrarMensagemErro] = useState(false);
  const { setUsuario} = useContext(UsuarioContext);


  const efetuarLogin = () => {
    axios
      .post("https://secret-headland-69654.herokuapp.com/logar", {
        email,
        senha,
      })
      .then((result) => {
        setUsuario(result.data);
      })
      .catch((erro) => {
        setMostrarMensagemErro(true);
      });
  };

  return (
    <Container>
      <Title>Serratec app</Title>
      <Input
        mx="3"
        placeholder="Seu e-mail"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setEmail}
        value={email}
        keyboardType="default"
      />
      <Input
        mx="3"
        placeholder="Sua senha"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setSenha}
        value={senha}
        type="password"
      />
      <Button margin="2" size="lg" onPress={() => efetuarLogin()}>
        Login
      </Button>
      {
        <Collapse isOpen={mostrarMensagemErro}>
          <Alert w="100%" status={"error"} mt="5">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {"Usuário ou senha incorretos"}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                  onPress={() => {
                    setMostrarMensagemErro(false);
                  }}
                />
              </HStack>
            </VStack>
          </Alert>
        </Collapse>
      }
    </Container>
  );
};

export default Login;
