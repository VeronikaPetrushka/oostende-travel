import { View } from "react-native"
import AddFlight from "../components/AddFlight"

const AddFlightScreen = ({ route }) => {
    const { flight } = route.params || {};

    return (
        <View style={styles.container}>
            <AddFlight flight={flight} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddFlightScreen;