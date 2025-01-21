import { View } from "react-native"
import Favorites from "../components/Favorites"

const FavoritesScreen = () => {
    return (
        <View style={styles.container}>
            <Favorites />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FavoritesScreen;