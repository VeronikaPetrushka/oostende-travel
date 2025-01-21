import { View } from "react-native"
import Details from "../components/Details"

const DetailsScreen = ({ route }) => {
    const { place } = route.params;

    return (
        <View style={styles.container}>
            <Details place={place} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DetailsScreen;