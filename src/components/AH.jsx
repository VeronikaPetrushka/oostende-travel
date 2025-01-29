import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icns from './Icns';

const { height } = Dimensions.get('window');

const AH = ({ hotel }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(hotel ? hotel.name : '');
    const [description, setDescription] = useState(hotel ? hotel.description : '');
    const [address, setAddress] = useState(hotel ? hotel.address : '');
    const [departureDate, setDepartureDate] = useState(hotel ? hotel.departureDate : '');
    const [arrivalDate, setArrivalDate] = useState(hotel ? hotel.arrivalDate : '');
    const [cover, setCover] = useState(hotel ? hotel.cover : null);
    const [images, setImages] = useState(hotel ? hotel.images : []);
    const [sDP, sSDP] = useState(false);

    const resIn = (setter) => {
        setter('');
    };
        
    const handleCoverPicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                setCover(response.assets[0].uri);
            }
        });
    };

    const hImP = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                const newImages = response.assets.map(asset => asset.uri);
                setImages(prevImages => [...prevImages, ...newImages]);
            }
        });
    };
    
    const hImD = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };    
    
    const resIm = () => {
        setCover(null);
    };

    const hDC = (event, selectedDate) => {
        sSDP(false);
    
        if (selectedDate) {
            const now = new Date();
    
            if (selectedDate < now) {
                alert("Please select a future date.");
                return;
            }
    
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear();
    
            const formattedDate = `${day}.${month}.${year}`;
    
            if (!arrivalDate) {
                setArrivalDate(formattedDate);
            } else {
                setDepartureDate(formattedDate);
            }
        }
    };
    
    const hS = async () => {
        if (!name || !description || !address || !departureDate || !arrivalDate || !cover) {
            alert('Please fill out all fields to proceed.');
            return;
        }
    
    
        const newHotel = {
            name,
            description,
            address,
            departureDate,
            arrivalDate,
            cover,
            images,
        };
    
        try {
            const existingHotels = await AsyncStorage.getItem('hotels');
            let hotels = existingHotels ? JSON.parse(existingHotels) : [];
    
            if (hotel) {
                const hotelIndex = hotels.findIndex(h => h.name === hotel.name);
    
                if (hotelIndex !== -1) {
                    hotels[hotelIndex] = { ...hotels[hotelIndex], ...newHotel };
                }
            } else {
                hotels.push(newHotel);
            }
    
            await AsyncStorage.setItem('hotels', JSON.stringify(hotels));
    
            console.log(hotels);
            
            navigation.goBack('');

        } catch (error) {
            console.error('Error saving hotel:', error);
            alert('Failed to save the hotel. Please try again.');
        }
    };
    
    return (
        <View style={styles.container}>

            <View style={styles.upperContainer}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icns type={'back'} light />
                </TouchableOpacity>
                <Text style={[styles.label, {marginBottom: 0, fontSize: 17, lineHeight: 22, color: '#ffcc02'}]}>Back</Text>
            </View>

            <Text style={styles.title}>Add a hotel</Text>

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.label}>Name of the hotel</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />
                    {name ? (
                        <TouchableOpacity style={styles.cross} onPress={() => resIn(setName)}>
                            <Icns type={'cross'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <Text style={styles.label}>Description</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Comment"
                        placeholderTextColor="#999"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    {description ? (
                        <TouchableOpacity style={styles.cross} onPress={() => resIn(setDescription)}>
                            <Icns type={'cross'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <Text style={styles.label}>Address of the hotel</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        placeholderTextColor="#999"
                        value={address}
                        onChangeText={setAddress}
                    />
                    {address ? (
                        <TouchableOpacity style={styles.cross} onPress={() => resIn(setAddress)}>
                            <Icns type={'cross'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Start date</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => sSDP(true)}>
                            <TextInput
                                    style={[styles.input, {paddingLeft: 40}]}
                                    placeholder="DD.MM.YYYY"
                                    placeholderTextColor="#999"
                                    value={arrivalDate}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icns type={'calendar'} />
                                </View>
                                {arrivalDate ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setArrivalDate)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Finish date</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => sSDP(true)}>
                            <TextInput
                                style={[styles.input, {paddingLeft: 40}]}
                                placeholder="DD.MM.YYYY"
                                placeholderTextColor="#999"
                                value={departureDate}
                                editable={false}
                            />
                            <View style={styles.dateIcon}>
                                <Icns type={'calendar'} />
                            </View>
                            {departureDate ? (
                                <TouchableOpacity style={styles.cross} onPress={() => resIn(setDepartureDate)}>
                                    <Icns type={'cross'} />
                                </TouchableOpacity>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
                {sDP && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        themeVariant="dark"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={hDC}
                    />
                )}

                <Text style={styles.label}>Cover</Text>
                <View style={styles.coverContainer}>
                    {cover ? (
                        <>
                            <Image source={{ uri: cover }} style={styles.uploadedImage} />
                            <TouchableOpacity style={styles.crossImg} onPress={resIm}>
                                <Icns type={'cross'} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.add} onPress={handleCoverPicker}>
                            <Icns type={'plus'} />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.label}>Photos</Text>
                    {images.length > 0 ? (
                        <ScrollView horizontal>
                            {images.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image source={{ uri: image }} style={styles.uploadedImage} />
                                    <TouchableOpacity style={styles.crossImg} onPress={() => hImD(index)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.add} onPress={hImP}>
                                    <Icns type={'plus'} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.add} onPress={hImP}>
                                <Icns type={'plus'} />
                            </TouchableOpacity>
                        </View>
                    )}

                <View style={{height: 120}} />

            </ScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={hS}>
                <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
        paddingTop: height * 0.07,
    },

    upperContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 15,
    },

    back: {
        width: 17,
        height: 22,
        marginRight: 7
    },

    title: {
        fontWeight: '600',
        fontSize: 32,
        color: '#fff',
        marginBottom: 32
    },

    label: {
        fontSize: 16, 
        fontWeight: '400',
        alignSelf: 'flex-start', 
        marginBottom: 8, 
        lineHeight: 20.8, 
        color: '#fff'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24
    },

    input: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        backgroundColor: '#3d3d3d',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#1c1c1c',
        paddingHorizontal: 20,
        paddingVertical: 16.5,
    },

    dateIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15,
        left: 10,
        zIndex: 10
    },

    cross: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15.5,
        right: 10,
        zIndex: 10
    },

    coverContainer: {
        width: '100%',
        height: 191,
        backgroundColor: '#3d3d3d',
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        width: 100,
        height: 150,
        backgroundColor: '#3d3d3d',
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },

    imageWrapper: {
        position: 'relative',
        marginRight: 10, 
    },

    add: {
        width: 44,
        height: 44
    },

    crossImg: {
        width: 27,
        height: 27,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
        padding: 3,
        backgroundColor: '#ececec',
        borderRadius: 30
    },

    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },

    saveBtn: {
        width: '100%',
        backgroundColor: '#ffcc02',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16.5,
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center'
    },

    saveBtnText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19,
        color: '#000',
    },

})

export default AH;