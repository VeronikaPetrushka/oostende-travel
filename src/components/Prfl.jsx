import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Linking } from "react-native"
import Icns from './Icns';

const { height } = Dimensions.get('window');

const Prfl = () => {

    const hpp = () => {
        const url = 'https://www.termsfeed.com/live/c46fccda-3dbd-4d32-b1f6-837200b19946';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };    

    const hra = () => {
        const url = Platform.select({
            ios: 'https://apps.apple.com/us/app/oostende-travel/id6740922984',
        });
    
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };
    
    return (
        <View style={styles.container}>

            <View style={styles.upperContainer}>
                <Text style={styles.title}>Tools</Text>
            </View>

            <View style={{width: '100%', paddingHorizontal: 16}}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Privacy Policy</Text>
                    <TouchableOpacity style={styles.policyIcon} onPress={hpp}>
                        <Icns type={'policy'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Rate us</Text>
                    <TouchableOpacity style={styles.policyIcon} onPress={hra}>
                        <Icns type={'rate'} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    upperContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 16,
        paddingTop: height * 0.07,
        backgroundColor: '#1c1c1c',
        marginBottom: 50
    },

    add: {
        width: 36,
        height: 36
    },

    title: {
        fontWeight: '800',
        fontSize: 28,
        lineHeight: 33.41,
        color: '#fff'
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 22.5,
        paddingHorizontal: 16,
        flexDirection: 'row',
        backgroundColor: '#3d3d3d',
        borderRadius: 16,
        marginBottom: 12
    },

    btnText: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19.09,
        color: '#000', 
    },

    policyIcon: {
        width: 32,
        height: 32,
    }

})

export default Prfl;