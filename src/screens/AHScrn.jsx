import { View } from "react-native"
import AH from "../components/AH"

const AHScrn = ({ route }) => {
    const { hotel } = route.params || {};

    return (
        <View style={styles.container}>
            <AH hotel={hotel} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AHScrn;