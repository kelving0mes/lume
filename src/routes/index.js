import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./stack.routes";

export default function Routes() {
    return (
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    )
  }