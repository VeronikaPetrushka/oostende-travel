import { View } from "react-native"
import Tickets from "../components/Tickets"
import Menu from "../components/Menu";

const TicketsScreen = () => {
    return (
        <View style={styles.container}>
            <Tickets />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0
    }
}

export default TicketsScreen;