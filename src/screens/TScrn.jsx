import { View } from "react-native"
import T from "../components/T"
import M from "../components/M";

const TScrn = () => {
    return (
        <View style={styles.container}>
            <T />
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

export default TScrn;