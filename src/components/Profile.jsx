import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Linking } from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Profile = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [saved, setSaved] = useState(false);

    const loadProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem('profile');
            if (savedProfile) {
                const profileData = JSON.parse(savedProfile);
                setName(profileData.name || '');
                setImage(profileData.image || null);
                setSaved(profileData.saved || null)
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [])
    );

    const resetInput = (setter) => {
        setter('');
    };

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                setImage(response.assets[0].uri);
            }
        });
    };
    
    const resetImage = () => {
        setImage(null);
    };

    const handleSave = async () => {
    
        const profileData = {
            name,
            image,
            saved: true,
        };
    
        try {
            await AsyncStorage.setItem('profile', JSON.stringify(profileData));
            alert('Profile saved successfully!');
            console.log('Saved Profile:', profileData);

            await loadProfile();

        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save your profile. Please try again.');
        }
    };    

    const handlePrivacyPolicy = () => {
        const url = 'https://www.termsfeed.com/live/c46fccda-3dbd-4d32-b1f6-837200b19946';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };    
    
    return (
        <View style={styles.container}>

            <View style={[styles.upperContainer, !saved && {justifyContent: 'center'}]}>
                <Text style={styles.title}>Profile</Text>
                {
                    saved && (
                        <TouchableOpacity onPress={() => setSaved(false)}>
                            <Text style={{fontSize: 18, color: '#ffcc02'}}>Edit</Text>
                        </TouchableOpacity>
                    )
                }
            </View>


            <View style={{width: '90%', paddingHorizontal: 16, marginTop: 20, marginBottom: 24, backgroundColor: '#fff', borderRadius: 20, padding: 20}}>

                {
                    saved ? (
                        <View style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', width: '100%'}}>
                            <View style={[styles.imageContainer, {marginRight: 20, marginBottom: 0}]}>
                                <Image source={{ uri: image }} style={[styles.uploadedImage, {borderRadius: 300, resizeMode: 'cover'}]} />
                            </View>
                            <Text style={[styles.title, {fontSize: 24, fontWeight: '700'}]}>{name || 'User'}</Text>
                        </View>

                    ) : (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <View style={styles.imageContainer}>
                                    {image ? (
                                        <>
                                            <Image source={{ uri: image }} style={[styles.uploadedImage, {alignSelf: 'center', borderRadius: 300, resizeMode: 'cover'}]} />
                                            <TouchableOpacity style={styles.crossImg} onPress={resetImage}>
                                                <Icons type={'cross'} />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity style={styles.add} onPress={handleImagePicker}>
                                            <Icons type={'plus'} />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, name && {borderColor: '#ffcc02'}]}
                                        placeholder="Username"
                                        placeholderTextColor="#999"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                    {name ? (
                                        <TouchableOpacity style={styles.cross} onPress={() => resetInput(setName)}>
                                            <Icons type={'cross'} />
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                                

                            <TouchableOpacity style={[styles.saveBtn, (!image || !name) && {backgroundColor: '#ececec'}]} onPress={handleSave} disabled={!name || !image}>
                                <Text style={styles.saveBtnText}>Save</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }

            </View>

            <View style={styles.btn}>
                <Text style={styles.btnText}>Privacy Policy</Text>
                <TouchableOpacity style={styles.policyIcon} onPress={handlePrivacyPolicy}>
                    <Icons type={'policy'} />
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        paddingTop: height * 0.07,
        backgroundColor: '#fff',
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
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 22.5,
        paddingHorizontal: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16
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