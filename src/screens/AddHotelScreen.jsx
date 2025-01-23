import { View } from "react-native"
import AddHotel from "../components/AddHotel"

const AddHotelScreen = ({ route }) => {
    const { hotel } = route.params || {};

    return (
        <View style={styles.container}>
            <AddHotel hotel={hotel} />
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