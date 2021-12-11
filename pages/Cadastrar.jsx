import axios from "axios";
import { Alert, Button, CloseIcon, Collapse, HStack, IconButton, Input, Text, VStack } from "native-base";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { Container } from "../components/Container";
import Title from "../components/Title";


const Cadastrar = ({navigation}) => {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [mostrarMensagemErro, setMostrarMensagemErro] = useState(false);
  const [ usuario, setUsuario ] = useState();

  const telaLogin = () => {
    navigation.navigate("Login");
  };

  const efetuarCadastro = () => {
    
    if ((nome != "") && (email != "") && (senha != "")) {
      axios
        .post("https://secret-headland-69654.herokuapp.com/usuario", {
          nome,
          email,
          senha
        })
        .then((result) => {
            if (result.status === 201) {
                axios.get("https://secret-headland-69654.herokuapp.com/usuario").then((result) => {
                    setUsuario(result.data);
                });                
                // Swal.fire(
                //     result?.data?.message,
                //     "Cadastro Realizado!",
                //     "success"
                //   );
                limparCampos();
                telaLogin();
              }
        })
        .catch((erro) => {
          setMostrarMensagemErro(true);
        });
    } else {
      setMostrarMensagemErro(true);
    }
  };

  const limparCampos = () => {
    //seta todos os estados para vazio novamente
    setNome("");
    setEmail("");
    setSenha("");
  };

  return (
    <Container>
      <Title>Cadastrar</Title>
      <Input
        mx="3"
        placeholder="Seu Nome"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setNome}
        value={nome}
        keyboardType="default"
      />
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
      <Button margin="2" size="lg" onPress={() => efetuarCadastro()}>
        Cadastrar
      </Button>
      <Button margin="2" size="lg" onPress={() => telaLogin()}>
        Voltar
      </Button>
      {
        <Collapse isOpen={mostrarMensagemErro}>
          <Alert w="100%" status={"error"} mt="5">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {"Nome, usuário ou senha inválidos"}
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
export default Cadastrar;
