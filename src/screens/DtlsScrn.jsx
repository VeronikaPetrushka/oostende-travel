import { View } from "react-native"
import Dtls from "../components/Dtls"

const DtlsScrn = ({ route }) => {
    const { place } = route.params;

    return (
        <View style={styles.container}>
            <Dtls place={place} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DtlsScrn;