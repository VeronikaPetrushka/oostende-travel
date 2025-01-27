import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Linking } from "react-native"
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Profile = () => {

    const handlePrivacyPolicy = () => {
        const url = 'https://www.termsfeed.com/live/c46fccda-3dbd-4d32-b1f6-837200b19946';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };    

    const handleRateApp = () => {
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
                    <TouchableOpacity style={styles.policyIcon} onPress={handlePrivacyPolicy}>
                        <Icons type={'policy'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Rate us</Text>
                    <TouchableOpacity style={styles.policyIcon} onPress={handleRateApp}>
                        <Icons type={'rate'} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ececec',
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
        backgroundColor: '#fff',
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
        color: '#000'
    },

    label: {
        fontSize: 20, 
        fontWeight: '700',
        alignSelf: 'flex-start', 
        marginBottom: 16, 
        lineHeight: 23.87, 
        color: '#000'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },

    input: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 16.5,
    },

    cross: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 10
    },

    imageContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#ececec',
        borderWidth: 0.5,
        borderRadius: 300,
        borderColor: "#000",
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    crossImg: {
        width: 27,
        height: 27,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        padding: 3,
        backgroundColor: '#ececec',
        borderRadius: 30
    },

    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    saveBtn: {
        width: '100%',
        backgroundColor: '#ffcc02',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16.5,
        borderRadius: 16
    },

    saveBtnText: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19,
        color: '#000',
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 22.5,
        paddingHorizontal: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
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

export default Profile;