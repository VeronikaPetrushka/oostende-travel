import { View } from "react-native"
import AddEvent from "../components/AddEvent"

const AddEventScreen = ({ route }) => {
    const { event } = route.params || {};

    return (
        <View style={styles.container}>
            <AddEvent event={event} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddEventScreen;