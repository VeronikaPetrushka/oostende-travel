import { View } from "react-native"
import AE from "../components/AE"

const AEScrn = ({ route }) => {
    const { event } = route.params || {};

    return (
        <View style={styles.container}>
            <AE event={event} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AEScrn;