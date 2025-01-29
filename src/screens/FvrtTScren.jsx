import { View } from "react-native"
import FvrtT from "../components/FvrtT"

const FvrtTScrn = () => {
    return (
        <View style={styles.container}>
            <FvrtT />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FvrtTScrn;