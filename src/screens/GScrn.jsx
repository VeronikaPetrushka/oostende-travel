import { View } from "react-native"
import G from "../components/G"

const GScrn = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <G item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default GScrn;