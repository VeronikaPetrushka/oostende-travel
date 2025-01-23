import { View } from "react-native"
import FavTickets from "../components/FavTickets"

const FavTicketsScreen = () => {
    return (
        <View style={styles.container}>
            <FavTickets />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FavTicketsScreen;