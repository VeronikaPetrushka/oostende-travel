import { View } from "react-native"
import AF from "../components/AF"

const AFScrn = ({ route }) => {
    const { flight } = route.params || {};

    return (
        <View style={styles.container}>
            <AF flight={flight} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AFScrn;