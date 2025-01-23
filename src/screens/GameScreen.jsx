import { View } from "react-native"
import Game from "../components/Game"

const GameScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Game item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default GameScreen;