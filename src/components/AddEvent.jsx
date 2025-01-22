import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const AddEvent = ({ event }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(event ? event.name : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [date, setDate] = useState(event ? event.date : '');
    const [startTime, setStartTime] = useState(event ? event.startTime : '');
    const [endTime, setEndTime] = useState(event ? event.endTime : '');
    const [cover, setCover] = useState(event ? event.cover : null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

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
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const month = monthNames[selectedDate.getMonth()];
            const year = selectedDate.getFullYear();
    
            const formattedDate = `${month} ${day}, ${year}`;

            setDate(formattedDate)

        }
    };    

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);

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

    const handleSave = async () => {
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
                const updatedEvents = events.map(e => 
                    e === event ? { ...e, ...newEvent } : e
                );
                events = updatedEvents;
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
                    <Icons type={'back'} />
                </TouchableOpacity>
                <Text style={[styles.label, {marginBottom: 0, fontSize: 17, lineHeight: 22}]}>Back</Text>
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

                <Text style={styles.label}>Date</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={[styles.input, {paddingLeft: 50}]}
                        placeholder="DD.MM.YYYY"
                        placeholderTextColor="#999"
                        value={date}
                        editable={false}
                    />
                    <View style={styles.dateIcon}>
                        <Icons type={'calendar'} />
                    </View>
                    {date ? (
                        <TouchableOpacity style={styles.cross} onPress={() => resetInput(setDate)}>
                            <Icons type={'cross'} />
                        </TouchableOpacity>
                    ) : null}
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Start time</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => setShowTimePicker(true)}>
                            <TextInput
                                style={[styles.input, {paddingLeft: 40}]}
                                placeholder="HH:MM"
                                placeholderTextColor="#999"
                                value={startTime}
                                editable={false}
                            />
                            <View style={styles.dateIcon}>
                                <Icons type={'time'} />
                            </View>
                            {startTime ? (
                                <TouchableOpacity style={styles.cross} onPress={() => resetInput(setStartTime)}>
                                    <Icons type={'cross'} />
                                </TouchableOpacity>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '47%', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>End time</Text>
                        <TouchableOpacity style={[styles.inputContainer, {marginBottom: 0}]} onPress={() => setShowTimePicker(true)}>
                            <TextInput
                                    style={[styles.input, {paddingLeft: 40}]}
                                    placeholder="HH:MM"
                                    placeholderTextColor="#999"
                                    value={endTime}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icons type={'time'} />
                                </View>
                                {endTime ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resetInput(setEndTime)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
                {showTimePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleTimeChange}
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

export default AddEvent;