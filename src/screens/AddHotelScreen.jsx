import { View } from "react-native"
import AddHotel from "../components/AddHotel"

const AddHotelScreen = () => {
    return (
        <View style={styles.container}>
            <AddHotel />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddHotelScreen;