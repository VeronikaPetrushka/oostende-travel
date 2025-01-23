import { View } from "react-native"
import Levels from "../components/Levels"
import Menu from "../components/Menu";

const LevelsScreen = () => {
    return (
        <View style={styles.container}>
            <Levels />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0
    }
}

export default LevelsScreen;