import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const AddHotel = ({ hotel }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(hotel ? hotel.name : '');
    const [description, setDescription] = useState(hotel ? hotel.description : '');
    const [address, setAddress] = useState(hotel ? hotel.address : '');
    const [departureDate, setDepartureDate] = useState(hotel ? hotel.departureDate : '');
    const [arrivalDate, setArrivalDate] = useState(hotel ? hotel.arrivalDate : '');
    const [cover, setCover] = useState(hotel ? hotel.cover : null);
    const [images, setImages] = useState(hotel ? hotel.images : []);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const resetInput = (setter) => {
        setter('');
    };
        
    const handleCoverPicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                setCover(response.assets[0].uri);
            }
        });
    };

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                const newImages = response.assets.map(asset => asset.uri);
                setImages(prevImages => [...prevImages, ...newImages]);
            }
        });
    };
    
    const handleImageDelete = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };    
    
    const resetImage = () => {
        setCover(null);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
    
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
    
    const handleSave = async () => {
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
                const updatedHotels = hotels.map(h => 
                    h === hotel ? { ...h, ...newHotel } : h
                );
                hotels = updatedHotels;
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
                    <Icons type={'back'} />
                </TouchableOpacity>
                <Text style={[styles.label, {marginBottom: 0, fontSize: 17, lineHeight: 22}]}>Back</Text>
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
                        <TouchableOpacity style={styles.cross} onPress={() => resetInput(setName)}>
                            <Icons type={'cross'} />
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
                        <TouchableOpacity style={styles.cross} onPress={() => resetInput(setDescription)}>
                            <Icons type={'cross'} />
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
                        <TouchableOpacity style={styles.cross} onPress={() => resetInput(setAddress)}>
                            <Icons type={'cross'} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Start date</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => setShowDatePicker(true)}>
                            <TextInput
                                    style={[styles.input, {paddingLeft: 40}]}
                                    placeholder="DD.MM.YYYY"
                                    placeholderTextColor="#999"
                                    value={arrivalDate}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icons type={'calendar'} />
                                </View>
                                {arrivalDate ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resetInput(setArrivalDate)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Finish date</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => setShowDatePicker(true)}>
                            <TextInput
                                style={[styles.input, {paddingLeft: 40}]}
                                placeholder="DD.MM.YYYY"
                                placeholderTextColor="#999"
                                value={departureDate}
                                editable={false}
                            />
                            <View style={styles.dateIcon}>
                                <Icons type={'calendar'} />
                            </View>
                            {departureDate ? (
                                <TouchableOpacity style={styles.cross} onPress={() => resetInput(setDepartureDate)}>
                                    <Icons type={'cross'} />
                                </TouchableOpacity>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}

                <Text style={styles.label}>Cover</Text>
                <View style={styles.coverContainer}>
                    {cover ? (
                        <>
                            <Image source={{ uri: cover }} style={styles.uploadedImage} />
                            <TouchableOpacity style={styles.crossImg} onPress={resetImage}>
                                <Icons type={'cross'} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.add} onPress={handleCoverPicker}>
                            <Icons type={'plus'} />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.label}>Photos</Text>
                    {images.length > 0 ? (
                        <ScrollView horizontal>
                            {images.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image source={{ uri: image }} style={styles.uploadedImage} />
                                    <TouchableOpacity style={styles.crossImg} onPress={() => handleImageDelete(index)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.add} onPress={handleImagePicker}>
                                    <Icons type={'plus'} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.add} onPress={handleImagePicker}>
                                <Icons type={'plus'} />
                            </TouchableOpacity>
                        </View>
                    )}

                <View style={{height: 120}} />

            </ScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#000',
        marginBottom: 32
    },

    label: {
        fontSize: 16, 
        fontWeight: '400',
        alignSelf: 'flex-start', 
        marginBottom: 8, 
        lineHeight: 20.8, 
        color: '#000'
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
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#000',
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
        backgroundColor: '#f6f6f6',
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
        backgroundColor: '#f6f6f6',
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

export default AddHotel;