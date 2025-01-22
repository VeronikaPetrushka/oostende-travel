import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Tickets = () => {
    const navigation = useNavigation();
    const [button, setButton] = useState('Flights');
    const [calendar, setCalendar] = useState(false);
    const [data, setData] = useState({ hotels: [], flights: [], events: [] });
    const [filteredData, setFilteredData] = useState([]);
    const [date, setDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotels = await AsyncStorage.getItem('hotels');
                const flights = await AsyncStorage.getItem('flights');
                const events = await AsyncStorage.getItem('events');

                setData({
                    hotels: hotels ? JSON.parse(hotels) : [],
                    flights: flights ? JSON.parse(flights) : [],
                    events: events ? JSON.parse(events) : [],
                });
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (button === 'Flights') {
            setFilteredData(data.flights);
        } else if (button === 'Hotels') {
            setFilteredData(data.hotels);
        } else if (button === 'Events') {
            setFilteredData(data.events);
        }
    }, [button, data]);

    console.log(filteredData)

    const handleAddItem = () => {
        if(button === 'Flights') {
            navigation.navigate('AddFlightScreen')
        } else if (button === 'Hotels') {
            navigation.navigate('AddHotelScreen')
        } else if (button === 'Events') {
            navigation.navigate('AddEventScreen')
        }
    };

    const handleCalendar = () => {
        if(calendar) {
            setCalendar(false);
        } else {
            setCalendar(true);
        }
    };

    const handleDayPress = (day) => {
        const selectedDate = new Date(day.dateString);
        setDate(selectedDate);
        setCalendar(false);
    };
    
    const cancelFilter = () => {
        setDate(null);
        setCalendar(false);
    };    

    // 

    const renderHotels = (hotel, index) => (
        <View key={index} style={styles.itemContainer}>
            <Image source={{uri: hotel.cover}} />
            <View>
                <View>
                    <Text>{hotel.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail'>{hotel.description}</Text>
                </View>
                <TouchableOpacity>
                    <Icons type={'fav-no'} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.itemTitle}>Additional information</Text>
                <TouchableOpacity>
                    <Icons type={'more'} />
                </TouchableOpacity>
            </View>

            <View>
                <Text>Address</Text>
                <Text>{hotel.address}</Text>
            </View>

            <View>
                <Text>Dates</Text>
                <Text>{hotel.arrivalDate} - {hotel.departureDate}</Text>
            </View>

            {hotel.images && (
                <View>
                    <Text>Photos</Text>
                    <ScrollView horizontal>
                        {
                            hotel.images.map((photo, index) => (
                                <View key={index}>
                                    <Image source={{uri: photo}} />
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            )}

        </View>
    );

    const renderFlights = (flight, index) => (
        <View key={index} style={styles.itemContainer}>
            <View>
                <View>
                    <Text style={styles.itemTitle}>{flight.departureDate}</Text>
                    <Text style={styles.itemTitle}>{flight.departureTime}</Text>
                </View>
                <Text style={styles.itemTitle}>{flight.classChosen}</Text>
            </View>

            <View>
                <View>
                    <Text style={styles.itemTitle}>{flight.departure}</Text>
                    <Text style={styles.itemTitle}>{flight.arrival}</Text>
                </View>
                <Text style={styles.itemTitle}>{flight.cost} $</Text>
            </View>

            <View>
                <Text style={styles.itemTitle}>Additional information</Text>
                <TouchableOpacity>
                    <Icons type={'more'} />
                </TouchableOpacity>
            </View>

            <View>
                <Text>On the way</Text>
                <Text>{flight.duration}</Text>
            </View>

            <View>
                <Text>Passengers</Text>
                <Text>{flight.passengers}</Text>
            </View>

            {flight.comment && (
                <View>
                    <Text>Comment</Text>
                    <Text>{flight.comment}</Text>
                </View>
            )}

        </View>
    );

    const renderEvents = (event, index) => (
        <View key={index} style={styles.itemContainer}>
            <Image source={{uri: event.cover}} />
            <View>
                <View>
                    <Text>{event.name}</Text>
                    {event.description && (
                        <Text numberOfLines={1} ellipsizeMode='tail'>{event.description}</Text>
                    )}
                </View>
                <TouchableOpacity>
                    <Icons type={'fav-no'} />
                </TouchableOpacity>
            </View>

            <View>
                <Text>{event.date}</Text>
                <Text>{event.startTime} - {event.endTime}</Text>
            </View>
        </View>
    );

    // 

    return (
        <View style={styles.container}>

            <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 16}}>
                <View style={styles.upperPanel}>
                    <Text style={styles.upperText}>Oostende Travel</Text>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.calendarIcon} onPress={handleCalendar}>
                            <Icons type={'calendar'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.favIcon} onPress={() => navigation.navigate('FavoritesScreen')}>
                            <Icons type={'fav'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.toolsContainer}>
                    <TouchableOpacity style={[styles.toolBtn, button === 'Flights' && {backgroundColor: '#ffcc02'}]} onPress={() => setButton('Flights')}>
                        <Text style={styles.toolBtnText}>Flights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toolBtn, button === 'Hotels' && {backgroundColor: '#ffcc02'}]}  onPress={() => setButton('Hotels')}>
                        <Text style={styles.toolBtnText}>Hotels</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toolBtn, button === 'Events' && {backgroundColor: '#ffcc02'}]}  onPress={() => setButton('Events')}>
                        <Text style={styles.toolBtnText}>Events</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {
                calendar ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Calendar
                            style={{ width: width * 0.88, borderRadius: 16, backgroundColor: '#f6f6f6', overflow: 'hidden', padding: 5}}
                                            onDayPress={handleDayPress}
                                            markedDates={
                                                date
                                                    ? { [date.toISOString().split('T')[0]]: { selected: true, selectedColor: '#ffcc02' } }
                                                    : {}
                                            }
                            theme={{
                                selectedDayBackgroundColor: '#ffcc02',
                                todayTextColor: '#ffcc02',
                                arrowColor: '#ffcc02',
                                textDayFontWeight: '500',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '500',
                            }}
                        />
                        {
                            date && (
                                <View style={{ padding: 16, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={cancelFilter} style={styles.resetBtn}>
                                        <Text style={styles.resetBtnText}>Reset dates</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                ) : (
                    <ScrollView style={{ width: '100%', padding: 16, backgroundColor: '#ececec' }}>
                        {filteredData.map((item, index) =>
                            button === 'Flights'
                                ? renderFlights(item, index)
                                : button === 'Hotels'
                                ? renderHotels(item, index)
                                : renderEvents(item, index)
                        )}
                        {
                            filteredData.length === 0 && (
                                <View style={{width: '100%', marginTop: 150, alignItems: 'center'}}>
                                    <Image source={'../assets/nothing.png'} style={{width: 120, height: 120, marginBottom: 24}} />
                                    <Text style={styles.nothingText}>{`There aren’t any ${button === 'Flights' ? 'flights' : button === 'Hotels' ? 'hotels' : 'events'} you add yet, you can do it now`}</Text>
                                </View>
                            )
                        }
                        <View style={{ height: 120 }} />
                    </ScrollView>
                )
            }

            <TouchableOpacity style={styles.addBtn} onPress={handleAddItem}>
                <Icons type={'plus'} />
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        alignItems: 'center'
    },

    upperPanel: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },

    upperText: {
        fontSize: 27,
        fontWeight: '800',
        color: '#000',
        lineHeight: 33.41
    },

    calendarIcon: {
        backgroundColor: '#fff', 
        width: 47,
        height: 44,
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    favIcon: {
        width: 47,
        height: 44,
        padding: 11,
        borderRadius: 12,
        backgroundColor: '#ffcc02'
    },

    toolsContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 2,
        backgroundColor: '#ececec',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },

    toolBtn: {
        width: '33.33%',
        padding: 9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },

    toolBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
        lineHeight: 18
    },

    addBtn: {
        width: 64,
        height: 64,
        padding: 16,
        borderRadius: 100,
        backgroundColor: '#ffcc02',
        position: 'absolute',
        bottom: 130,
        right: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    nothingText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        fontWeight: '400'
    }

})

export default Tickets;