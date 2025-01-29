import { View } from "react-native"
import H from "../components/H"
import M from "../components/M";

const HScrn = () => {
    return (
        <View style={styles.container}>
            <H />
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

export default HScrn;