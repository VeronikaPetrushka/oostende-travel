import { View } from "react-native"
import Prfl from "../components/Prfl"
import M from "../components/M";

const PrflScreen = () => {
    return (
        <View style={styles.container}>
            <Prfl />
            <View style={styles.M}>
                <M />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    M: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0
    }
}

export default PrflScreen;