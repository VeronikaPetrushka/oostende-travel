import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icns from './Icns';

const { height } = Dimensions.get('window');

const AF = ({ flight }) => {
    const navigation = useNavigation();
    const [departure, setDeparture] = useState(flight ? flight.departure : '');
    const [arrival, setArrival] = useState(flight ? flight.arrival : '');
    const [passengers, setPassengers] = useState(flight ? flight.passengers : 1);
    const [classChosen, setClassChosen] = useState(flight ? flight.classChosen : 'Economy');
    const [departureDate, setDepartureDate] = useState(flight ? flight.departureDate : '');
    const [departureTime, setDepartureTime] = useState(flight ? flight.departureTime : '');
    const [arrivalDate, setArrivalDate] = useState(flight ? flight.arrivalDate : '');
    const [arrivalTime, setArrivalTime] = useState(flight ? flight.arrivalTime : '');
    const [duration, setDuration] = useState(flight ? flight.duration : null);
    const [cost, setCost] = useState(flight ? flight.cost : '');
    const [comment, setComment] = useState(flight ? flight.comment : '');
    const [step, setStep] = useState(1);
    const [sDP, sSDP] = useState(false);
    const [sTP, sSTP] = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);

    const resIn = (setter) => {
        setter('');
    };

    const handleNext = () => {
        if (step === 1 && (!departure || !arrival)) {
            alert('Please fill out the departure and arrival points.');
            return;
        }
    
        if (step === 2 && (!departureDate || !departureTime)) {
            alert('Please fill out the departure date and time.');
            return;
        }

        if (step === 3 && (!arrivalDate || !arrivalTime || !duration)) {
            alert('Please fill out the arrival date and time along with a flight duration.');
            return;
        }

        if (step === 4 && (!cost)) {
            alert('Please fill out the flight cost.');
            return;
        }
    
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        } else if (step === 4) {
            hS();
        }
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
    
            if (step === 2) {
                setDepartureDate(formattedDate);
            } else if (step === 3) {
                setArrivalDate(formattedDate);
            }
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

            if (step === 2) {
                setDepartureTime(formattedTime);
            } else if (step === 3) {
                setArrivalTime(formattedTime);
            }
        }
    };

    const handleDurationChange = (event, selectedTime) => {
        setShowDurationPicker(false);
    
        if (selectedTime) {
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            setDuration(formattedTime);
        }
    };    

    const hS = async () => {

        
        const newFlight = {
            departure,
            arrival,
            passengers,
            classChosen,
            departureDate,
            departureTime,
            arrivalDate,
            arrivalTime,
            duration,
            cost,
            comment
        };
    
        try {
            const existingFlights = await AsyncStorage.getItem('flights');
            let flights = existingFlights ? JSON.parse(existingFlights) : [];
    
            if (flight) {
                const flightIndex = flights.findIndex(f => f.name === flight.name);
            
                if (flightIndex !== -1) {
                    flights[flightIndex] = { ...flights[flightIndex], ...newFlight };
                }
            } else {
                flights.push(newFlight);
            }

            await AsyncStorage.setItem('flights', JSON.stringify(flights));
    
            console.log(flights);

            alert('Your flight has been added successfully');

            setStep(1);
            navigation.goBack('');

        } catch (error) {
            console.error('Error saving flight:', error);
            alert('Failed to save the flight. Please try again.');
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

            <Text style={styles.title}>Add a flight</Text>

            <ScrollView style={{width: '100%'}}>
                {
                    step === 1 && (
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Point of departure</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Point name"
                                    placeholderTextColor="#999"
                                    value={departure}
                                    onChangeText={setDeparture}
                                />
                                {departure ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setDeparture)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <Text style={styles.label}>Point of arrival</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Point name"
                                    placeholderTextColor="#999"
                                    value={arrival}
                                    onChangeText={setArrival}
                                />
                                {arrival ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setArrival)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 16}}>
                                <Text style={[styles.label, {marginBottom: 0}]}>Passengers</Text>
                                <View style={styles.countContainer}>
                                    <TouchableOpacity 
                                        style={{width: 18, height: 3, opacity: passengers === 1 ? 0.5 : 1}}
                                        disabled={passengers === 1}
                                        onPress={() => setPassengers((prev) => Math.max(prev - 1, 1))}
                                    >
                                        <Icns type={'minus'} />
                                    </TouchableOpacity>
                                        <Text style={styles.countText}>{passengers}</Text>
                                    <TouchableOpacity 
                                        style={{width: 18, height: 18}} 
                                        onPress={() => setPassengers((prev) => prev + 1)}
                                    >
                                        <Icns type={'add'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.label}>Class</Text>

                            <ScrollView contentContainerStyle={styles.panelContainer} horizontal={true}>
                                <TouchableOpacity 
                                    style={[styles.panelBtn, classChosen === 'Economy' && {backgroundColor: '#ffcc02'}]}
                                    onPress={() => setClassChosen('Economy')}
                                    >
                                    <Text style={styles.panelBtnText}>Economy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  
                                    style={[styles.panelBtn, classChosen === 'Standard' && {backgroundColor: '#ffcc02'}]}
                                    onPress={() => setClassChosen('Standard')}
                                    >
                                    <Text style={styles.panelBtnText}>Standard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.panelBtn, {borderRightWidth: 0}, classChosen === 'Business' && {backgroundColor: '#ffcc02'}]}
                                    onPress={() => setClassChosen('Business')}
                                    >
                                    <Text style={styles.panelBtnText}>Business</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    )
                }
                {
                    step === 2 && (
                        <>
                            <Text style={styles.label}>Date of departure</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => sSDP(true)}>
                                <TextInput
                                    style={[styles.input, {paddingLeft: 50}]}
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
                            {sDP && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    themeVariant="dark"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={hDC}
                                />
                            )}

                            <Text style={styles.label}>Time of departure</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => sSTP(true)}>
                                <TextInput
                                    style={[styles.input, {paddingLeft: 50}]}
                                    placeholder="HH:MM"
                                    placeholderTextColor="#999"
                                    value={departureTime}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icns type={'time'} />
                                </View>
                                {departureTime ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setDepartureTime)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </TouchableOpacity>
                            {sTP && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    themeVariant="dark"
                                    is24Hour={false}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={hTC}
                                />
                            )}
                        </>
                    )
                }
                {
                    step === 3 && (
                        <>
                            <Text style={styles.label}>Date of arrival</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => sSDP(true)}>
                                <TextInput
                                    style={[styles.input, {paddingLeft: 50}]}
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
                            {sDP && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    themeVariant="dark"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={hDC}
                                />
                            )}

                            <Text style={styles.label}>Time of arrival</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => sSTP(true)}>
                                <TextInput
                                    style={[styles.input, {paddingLeft: 50}]}
                                    placeholder="HH:MM"
                                    placeholderTextColor="#999"
                                    value={arrivalTime}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icns type={'time'} />
                                </View>
                                {arrivalTime ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setArrivalTime)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </TouchableOpacity>
                            {sTP && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    themeVariant="dark"
                                    is24Hour={false}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={hTC}
                                />
                            )}

                            <Text style={styles.label}>Duration of the flight</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDurationPicker(true)}>
                                <TextInput
                                    style={[styles.input, {paddingLeft: 50}]}
                                    placeholder="HH:MM"
                                    placeholderTextColor="#999"
                                    value={duration}
                                    editable={false}
                                />
                                <View style={styles.dateIcon}>
                                    <Icns type={'time'} />
                                </View>
                                {duration ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setDuration)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </TouchableOpacity>
                            {showDurationPicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    themeVariant="dark"
                                    is24Hour={false}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleDurationChange}
                                />
                            )}
                        </>
                    )
                }
                {
                    step === 4 && (
                        <>
                        <Text style={styles.label}>Flight cost</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    placeholder="How much did you pay in $ ?"
                                    placeholderTextColor="#999"
                                    value={cost}
                                    onChangeText={setCost}
                                />
                                {cost ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setCost)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                        <Text style={styles.label}>Comment</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Add comment to your flight"
                                    placeholderTextColor="#999"
                                    value={comment}
                                    onChangeText={setComment}
                                    multiline
                                />
                                {comment ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resIn(setComment)}>
                                        <Icns type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </>
                    )
                }

                <View style={{height: 120}} />
            </ScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={handleNext}>
                <Text style={styles.saveBtnText}>{step != 4 ? 'Next' : 'Save'}</Text>
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
        marginBottom: 24,
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

    cross: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15.5,
        right: 20,
        zIndex: 10
    },

    panelContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 16,
    },

    panelBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 100,
        marginRight: 12
    },

    panelBtnText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20.8,
        color: '#000'
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

    countContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 122,
        paddingVertical: 11,
        paddingHorizontal: 16,
        borderRadius: 40,
        backgroundColor: '#f6f6f6',
        flexDirection: 'row'
    },

    countText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginHorizontal: 22
    },

    dateIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15,
        left: 20,
        zIndex: 10
    },

})

export default AF;