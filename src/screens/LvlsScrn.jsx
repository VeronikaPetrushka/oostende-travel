import { View } from "react-native"
import Lvls from "../components/Lvls"
import M from "../components/M";

const LvlsScrn = () => {
    return (
        <View style={styles.container}>
            <Lvls />
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

export default LvlsScrn;