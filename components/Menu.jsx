import { AntDesign } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { UsuarioContext } from "../context/inex";
import Login from "../pages/Login";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "Alunos":
      return "user";
    case "Login":
      return "login";
    case "Matérias":
      return "book";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            {props.usuario?.nome} {/*? se nao tiver nada ele retorna undefined */}
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
          {props.usuario?.email}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(255, 94, 1, 0.1)"
                    : "orange.200"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
                key={index}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={<AntDesign name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyDrawer({ usuario }) {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => (
        <CustomDrawerContent usuario={ usuario } {...props} />
        )}
      >
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Alunos" component={Login} />
        <Drawer.Screen name="Matérias" component={Login} />
      </Drawer.Navigator>
    </Box>
  );
}
export default function Menu() {
  const { usuario } = useContext(UsuarioContext);
  return (
    <NavigationContainer>
      <MyDrawer usuario={usuario}/>
    </NavigationContainer>
  );
}
