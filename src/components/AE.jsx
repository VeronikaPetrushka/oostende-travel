import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icns from './Icns';

const { height } = Dimensions.get('window');

const AE = ({ event }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(event ? event.name : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [date, setDate] = useState(event ? event.date : '');
    const [startTime, setStartTime] = useState(event ? event.startTime : '');
    const [endTime, setEndTime] = useState(event ? event.endTime : '');
    const [cover, setCover] = useState(event ? event.cover : null);
    const [sDP, sSDP] = useState(false);
    const [sTP, sSTP] = useState(false);

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

            setDate(formattedDate)

        }
    };    

    const hTC = (event, selectedTime) => {
        sSTP(false);

        if (selectedTime) {
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

            if (!startTime) {
                setStartTime(formattedTime);
            } else {
                setEndTime(formattedTime);
            }
        }
    };

    const hS = async () => {
        if (!name || !description || !date || !startTime || !endTime || !cover) {
            alert('Please fill out all fields to proceed.');
            return;
        }
    
    
        const newEvent = {
            name,
            description,
            date,
            startTime,
            endTime,
            cover,
        };
    
        try {
            const existingEvents = await AsyncStorage.getItem('events');
            let events = existingEvents ? JSON.parse(existingEvents) : [];
    
            if (event) {
                const eventIndex = events.findIndex(e => e.name === event.name);
            
                if (eventIndex !== -1) {
                    events[eventIndex] = { ...events[eventIndex], ...newEvent };
                }
            } else {
                events.push(newEvent);
            }
    
            await AsyncStorage.setItem('events', JSON.stringify(events));
    
            console.log(events);
            
            navigation.goBack('');

        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save the event. Please try again.');
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

            <Text style={styles.title}>Add a event</Text>

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.label}>Name of the event</Text>
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

                <Text style={styles.label}>Date</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={() => sSDP(true)}>
                    <TextInput
                        style={[styles.input, {paddingLeft: 50}]}
                        placeholder="DD.MM.YYYY"
                        placeholderTextColor="#999"
                        value={date}
                        editable={false}
                    />
                    <View style={styles.dateIcon}>
                        <Icns type={'calendar'} />
                    </View>
                    {date ? (
                        <TouchableOpacity style={styles.cross} onPress={() => resIn(setDate)}>
                            <Icns type={'cross'} />
                        </TouchableOpacity>
                    ) : null}
                </TouchableOpacity>
                {sDP && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        themeVariant='dark'
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={hDC}
                    />
                )}

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Start time</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => sSTP(true)}>
                            <TextInput
                                style={[styles.input, {paddingLeft: 40}]}
                                placeholder="HH:MM"
                                placeholderTextColor="#999"
                                value={startTime}
                                editable={false}
                            />
                            <View style={styles.dateIcon}>
                                <Icns type={'time'} />
                            </View>
                            {startTime ? (
                                <TouchableOpacity style={styles.cross} onPress={() => resIn(setStartTime)}>
                                    <Icns type={'cross'} />
                                </TouchableOpacity>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>End time</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => sSTP(true)}>
                            <TextInput
                                    style={[styles.input, {paddingLeft: 40}]}
                                    placeholder="HH:MM"
                                    placeholderTextColor="#999"
                                    value={endTime}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icns type={'time'} />
                                </View>
                                {endTime ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setEndTime)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
                {sTP && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        themeVariant='dark'
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={hTC}
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

export default AE;