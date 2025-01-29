import { View } from "react-native"
import Fvrts from "../components/Fvrts"

const FvrtsScrn = () => {
    return (
        <View style={styles.container}>
            <Fvrts />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FvrtsScrn;