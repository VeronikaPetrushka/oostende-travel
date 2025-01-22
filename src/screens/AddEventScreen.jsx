import { View } from "react-native"
import AddEvent from "../components/AddEvent"

const AddEventScreen = () => {
    return (
        <View style={styles.container}>
            <AddEvent />
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