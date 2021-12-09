import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import {
  Actionsheet, AlertDialog, Box, Button, HStack,
  Icon,
  Pressable,
  Spacer,
  useDisclose,
  VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Path } from "react-native-svg";
import { SwipeListView } from "react-native-swipe-list-view";

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alunoSelecionado, setAlunoSelecionado] = useState();
  const cancelRef = React.useRef(null);
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const URL = "https://secret-headland-69654.herokuapp.com/alunos";

  useEffect(() => {
    consultarAlunos();
  }, []);

  const consultarAlunos = () => {
    axios.get(URL).then((response) => {
      setAlunos(response.data);
    });
  };

  const deletarAluno = () => {
    axios
    .delete(URL, { data: alunoSelecionado })
    .then((response) => {
      onClose();
      setIsOpenDelete(true);
      consultarAlunos();
    });
  };

  const renderItem = ({ item }) => {
    const clicarAluno = () => {
      setAlunoSelecionado(item);
      setAlunos([...alunos]); //aqui vai receber uma copia dos proprios alunos que ja existem, [e eh so uma atualizacao para mudar o estado da renderizacao e conseguir marcar o aluno selecionado na hora de comparar os ids na condicao abaixo
      onOpen();
    };
    return (
      <Box>
        <Pressable onPress={() => clicarAluno()} bg={item.id === alunoSelecionado?.id? "#f7b34e":"white"}>
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{ color: "warmGray.50" }}
                  bold
                >
                  {item.nome}
                </Text>
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                  {item.cidade}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                alignSelf="flex-start"
              >
                {`${item.idade} anos`}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  

  return (
    <>
      <SwipeListView data={alunos} renderItem={renderItem} />

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Aluno Deletado</AlertDialog.Header>
          <AlertDialog.Body>
            O Aluno foi deletado com sucesso!
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Opções
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="edit"
              />
            }
          >
            Editar Aluno
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                name="delete"
                color="trueGray.400"
                mr="1"
                size="6"
              />
            }
            onPress={() => deletarAluno()}
          >
            Excluir Aluno
          </Actionsheet.Item>

          <Actionsheet.Item
            p={3}
            startIcon={
              <Icon
                color="trueGray.400"
                mr="1"
                h="24"
                w="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
              </Icon>
            }
            onPress={() => {}}
          >
            Cancelar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default Alunos;
