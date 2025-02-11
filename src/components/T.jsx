import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icns from "./Icns";

const { height } = Dimensions.get('window');

const T = () => {
    const navigation = useNavigation();
    const [button, setButton] = useState('Flights');
    const [data, setData] = useState({ hotels: [], flights: [], events: [] });
    const [filteredData, setFilteredData] = useState([]);
    const [date, setDate] = useState(null);

    const [favHotels, setFavHotels] = useState([]);
    const [favEvents, setFavEvents] = useState([]);

    const [moreInfoFlight, setMoreInfoFlight] = useState(null);
    const [moreInfoHotel, setMoreInfoHotel] = useState(false);

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

    const fF = async () => {
        const hotels = await gF('favHotels');
        const events = await gF('favEvents');
        setFavHotels(hotels);
        setFavEvents(events);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
            fF();
        }, [])
    );

    useEffect(() => {
        if (button === 'Flights') {
            setFilteredData(data.flights);
        } else if (button === 'Hotels') {
            setFilteredData(data.hotels);
        } else if (button === 'Events') {
            setFilteredData(data.events);
        }
    }, [button, data]);

    console.log('filteredData: ', filteredData)

    const hAI = () => {
        if(button === 'Flights') {
            navigation.navigate('AFScrn')
        } else if (button === 'Hotels') {
            navigation.navigate('AHScrn')
        } else if (button === 'Events') {
            navigation.navigate('AEScrn')
        }
    };

    const handleMoreInfoFlight = (index) => {
        setMoreInfoFlight((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleMoreInfoHotel = (index) => {
        setMoreInfoHotel((prevIndex) => (prevIndex === index ? null : index));
    };

    const gF = async (key) => {
        try {
            const favorites = await AsyncStorage.getItem(key);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Error retrieving favorites:', error);
            return [];
        }
    };    

    const areItemsEqual = (item1, item2) => {
        return JSON.stringify(item1) === JSON.stringify(item2);
    };

    const ifF = (favorites, item) => {
        return favorites.some(fav => areItemsEqual(fav, item));
    };

    const tF = async (key, item, setFavorites) => {
        try {
            const favorites = await gF(key);
    
            if (ifF(favorites, item)) {
                const updatedFavorites = favorites.filter(fav => !areItemsEqual(fav, item));
                await AsyncStorage.setItem(key, JSON.stringify(updatedFavorites));
                setFavorites(updatedFavorites);
            } else {
                const updatedFavorites = [...favorites, item];
                await AsyncStorage.setItem(key, JSON.stringify(updatedFavorites));
                setFavorites(updatedFavorites);
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };    

    const fBD = date
    ? filteredData.filter(item => {
        if (button === 'Flights') {
            const flightDate = item.arrivalDate;
            console.log(flightDate)
            return flightDate === date;
        } else if (button === 'Hotels') {
            const hotelDate = item.arrivalDate;
            return hotelDate === date;
        } else if (button === 'Events') {
            const eventDate = item.date;
            return eventDate === date;
        }
        return false;
    })
    : filteredData;

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [itemToEdit, setIdemToEdit] = useState(null);

    const handleDeleteDots = async (item) => {
        setDeleteModalVisible(true);
        setIdemToEdit(item);
        setSelectedItemToDelete(item);
    };
    
    const deleteItem = async () => {
        console.log('selectedItemToDelete: ', selectedItemToDelete)
        if (selectedItemToDelete) {
            try {
                if (button === 'Flights') {
                    const updatedFlights = data.flights.filter((flight, index) => index !== selectedItemToDelete);
                    setData(prevData => ({ ...prevData, flights: updatedFlights }));
                    await AsyncStorage.setItem('flights', JSON.stringify(updatedFlights));
                    console.log('Flight deleted successfully from flights storage!');
                } else if (button === 'Hotels') {
                    const updatedHotels = data.hotels.filter((hotel, index) => index !== selectedItemToDelete);
                    const updatedFavHotels = favHotels.filter((favHotel, index) => index !== selectedItemToDelete);
                    setData(prevData => ({ ...prevData, hotels: updatedHotels }));
                    setFavHotels(updatedFavHotels);
                    await AsyncStorage.setItem('hotels', JSON.stringify(updatedHotels));
                    await AsyncStorage.setItem('favHotels', JSON.stringify(updatedFavHotels));
                    console.log('Hotel deleted successfully from hotels and favHotels storage!');
                } else if (button === 'Events') {
                    const updatedEvents = data.events.filter((event, index) => index !== selectedItemToDelete);
                    const updatedFavEvents = favEvents.filter((favEvent, index) => index !== selectedItemToDelete);
                    setData(prevData => ({ ...prevData, events: updatedEvents }));
                    setFavEvents(updatedFavEvents);
                    await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
                    await AsyncStorage.setItem('favEvents', JSON.stringify(updatedFavEvents));
                    console.log('Event deleted successfully from events and favEvents storage!');
                }

                setDeleteModalVisible(false);

                await fetchData();
                await fF();

            } catch (error) {
                console.error('Error deleting item or favorite:', error);
            }
        }
    };
    
    const renderHotels = (hotel, index) => (
        <View key={`hotel-${index}`} style={styles.hotelCard}>
            <TouchableOpacity style={styles.dots} onPress={() => handleDeleteDots(index)}>
                <Icns type={'dots'} />
            </TouchableOpacity>
            <Image source={{uri: hotel.cover}} style={styles.hotelCover} />
            <View style={styles.hotelUpperContainer}>
                <View style={{alignItems: 'flex-start', width: '85%'}}>
                    <Text style={styles.hotelName} numberOfLines={1} ellipsizeMode='tail'>{hotel.name}</Text>
                    {
                        moreInfoHotel ? (
                            <Text style={styles.hotelDesc}>{hotel.description}</Text>
                        ) : (
                            <Text style={styles.hotelDesc} numberOfLines={1} ellipsizeMode='tail'>{hotel.description}</Text>
                        )
                    }
                </View>
                <TouchableOpacity 
                    style={{width: 27, height: 24}}
                    onPress={() => tF('favHotels', hotel, setFavHotels)}
                    >
                    <Icns type={ifF(favHotels, hotel) ? 'fav-saved' : 'fav-not'} light={ifF(favHotels, hotel)} />
                </TouchableOpacity>
            </View>

            <View style={styles.moreInfoContainer}>
                <Text style={styles.moreInfoText}>Additional information</Text>
                <TouchableOpacity style={{width: 14, height: 12}} onPress={() => handleMoreInfoHotel(index)}>
                    <Icns type={moreInfoHotel === index ? 'less' : 'more'} />
                </TouchableOpacity>
            </View>

            {
                moreInfoHotel === index && (
                    <View style={{width: '100%', paddingHorizontal: 16}}>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexDirection: 'row'}}>
                            <Text style={styles.hotelSubTitle}>Address</Text>
                            <Text style={[styles.hotelSubTitle, {width: '80%', textAlign: 'right'}]} numberOfLines={1} ellipsizeMode='tail'>{hotel.address}</Text>
                        </View>

                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexDirection: 'row'}}>
                            <Text style={styles.hotelSubTitle}>Dates</Text>
                            <Text style={[styles.hotelSubTitle, {width: '80%', textAlign: 'right'}]} numberOfLines={1} ellipsizeMode='tail'>{hotel.arrivalDate} - {hotel.departureDate}</Text>
                        </View>

                        {hotel.images && (
                            <View style={{width: '100%', alignItems: 'flex-start', paddingBottom: 16}}>
                                <Text style={[styles.hotelSubTitle, {marginBottom: 12}]}>Photos</Text>
                                <ScrollView horizontal>
                                    {
                                        hotel.images.map((photo, index) => (
                                            <Image key={index} source={{uri: photo}} style={styles.hotelImage} />
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        )}
                    </View>
                )
            }

        </View>
    );

    const renderFlights = (flight, index) => (
        <View key={`flight-${index}`} style={styles.flightCard}>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 12}}>
                <View style={{width: '70%', alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={[styles.flightDate, {marginRight: 10}]}>{flight.departureDate}</Text>
                    <Text style={styles.flightDate}>{flight.departureTime}</Text>
                </View>
                <Text style={styles.flightClass}>{flight.classChosen}</Text>
            </View>

            <View style={{width: '100%', alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
                <View style={{alignItems: 'flex-start', width: '70%'}}>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginBottom: 20}}>
                        <Text style={styles.flightPoint}>A</Text>
                        <Text style={styles.flightDate} numberOfLines={1} ellipsizeMode='tail'>{flight.departure}</Text>
                    </View>
                    <View style={styles.flightLine} />
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <Text style={[styles.flightPoint, {backgroundColor: '#ececec'}]}>B</Text>
                        <Text style={styles.flightDate} numberOfLines={1} ellipsizeMode='tail'>{flight.arrival}</Text>
                    </View>
                </View>
                <Text style={{color: '#fff'}}>{flight.cost} $</Text>
            </View>

            <View style={[styles.moreInfoContainer, {padding: 0, marginBottom: 12}]}>
                <Text style={styles.moreInfoText}>Additional information</Text>
                <TouchableOpacity style={{width: 14, height: 12}} onPress={() => handleMoreInfoFlight(index)}>
                    <Icns type={moreInfoFlight === index ? 'less' : 'more'} />
                </TouchableOpacity>
            </View>

            {
                moreInfoFlight === index && (
                    <View style={{width: '100%'}}>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexDirection: 'row'}}>
                            <Text style={[styles.hotelSubTitle, {fontWeight: '700'}]}>On the way</Text>
                            <Text style={styles.hotelSubTitle}>{flight.duration}</Text>
                        </View>

                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexDirection: 'row'}}>
                            <Text style={[styles.hotelSubTitle, {fontWeight: '700'}]}>Passengers</Text>
                            <Text style={styles.hotelSubTitle}>{flight.passengers}</Text>
                        </View>

                        {flight.comment && (
                            <View style={{width: '100%', marginBottom: 12}}>
                                <Text style={[styles.hotelSubTitle, {fontWeight: '700', marginBottom: 12}]}>Comment</Text>
                                <Text style={styles.hotelSubTitle}>{flight.comment}</Text>
                            </View>
                        )}
                        <TouchableOpacity style={styles.dotsFlight} onPress={() => handleDeleteDots(index)}>
                            <Icns type={'dots'} />
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    );

    const renderEvents = (event, index) => (
        <View key={`event-${index}`} style={styles.hotelCard}>
            <TouchableOpacity style={styles.dots} onPress={() => handleDeleteDots(index)}>
                <Icns type={'dots'} />
            </TouchableOpacity>
            <Image source={{uri: event.cover}} style={styles.hotelCover} />
            <View style={styles.hotelUpperContainer}>
                <View style={{alignItems: 'flex-start', width: '85%'}}>
                    <Text  style={styles.hotelName} numberOfLines={1} ellipsizeMode='tail'>{event.name}</Text>
                    {event.description && (
                        <Text  style={styles.hotelDesc}>{event.description}</Text>
                    )}
                </View>
                <TouchableOpacity 
                    style={{width: 27, height: 24}}
                    onPress={() => tF('favEvents', event, setFavEvents)}
                    >
                    <Icns type={ifF(favEvents, event) ? 'fav-saved' : 'fav-not'} light={ifF(favEvents, event)} />
                </TouchableOpacity>
            </View>

            <View style={{width: '100%', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventDate}>{event.startTime} - {event.endTime}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 16}}>
                <View style={styles.upperPanel}>
                    <Text style={styles.upperText}>Oostende Travel</Text>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.favIcon} onPress={() => navigation.navigate('FvrtTScrn')}>
                            <Icns type={'fav'} />
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

                    <ScrollView style={{ width: '100%', padding: 16, backgroundColor: '#000' }}>
                        {fBD.map((item, index) =>
                            button === 'Flights'
                                ? renderFlights(item, index)
                                : button === 'Hotels'
                                ? renderHotels(item, index)
                                : renderEvents(item, index)
                        )}
                        {
                            fBD.length === 0 && (
                                <View style={{width: '100%', marginTop: 100, alignItems: 'center'}}>
                                    <Image source={require('../assets/nothing.png')} style={{width: 120, height: 120, marginBottom: 24, resizeMode: 'contain'}} />
                                    <Text style={styles.nothingText}>{`There aren’t any ${button === 'Flights' ? 'flights' : button === 'Hotels' ? 'hotels' : 'events'} you add yet, you can do it now`}</Text>
                                </View>
                            )
                        }
                        <View style={{ height: 120 }} />
                    </ScrollView>

            <TouchableOpacity style={styles.addBtn} onPress={hAI}>
                <Icns type={'plus'} />
            </TouchableOpacity>

            <Modal
                    transparent={true}
                    animationType="fade"
                    visible={deleteModalVisible}
                    onRequestClose={() => setDeleteModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.flightClass, {fontSize: 16, marginBottom: 16}]}>Last chance</Text>
                            <Text style={styles.modalText}>Are you sure you want to delete this record ?</Text>
                            <TouchableOpacity
                                style={[styles.modalButton, {borderWidth: 1, borderColor: '#ff0e0a', width: '90%', borderRadius: 16, marginBottom: 7}]}
                                onPress={deleteItem}
                            >
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { borderColor: '#ffcc02', backgroundColor: '#ffcc02', width: '90%', borderRadius: 16, marginBottom: 16}]}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={[styles.modalButtonText, {fontWeight: '500', color: '#000'}]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        alignItems: 'center',
        backgroundColor: '#000'
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
        color: '#fff',
        lineHeight: 33.41
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
        color: '#ffcc02',
        textAlign: 'center',
        fontWeight: '400'
    },

    hotelCard: {
        width: '100%',
        backgroundColor: '#1c1c1c',
        borderRadius: 22,
        alignItems: 'center',
        marginBottom: 24
    },

    hotelCover: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
    },

    hotelUpperContainer: {
        padding: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },

    hotelName: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 17.9,
        color: '#fff',
        marginBottom: 6,
        width: '100%'
    },

    hotelDesc: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 15.5,
        color: '#fff',
        width: '100%'
    },

    moreInfoContainer: {
        padding: 16,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    moreInfoText: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 14.32,
        color: '#ffcc02',
    },

    hotelSubTitle: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.32,
        color: '#fff',
    },

    hotelImage: {
        width: 77,
        height: 116,
        marginRight: 16,
        borderRadius: 12,
        resizeMode: 'cover'
    },

    flightCard: {
        width: '100%',
        padding: 16,
        backgroundColor: '#1c1c1c',
        borderRadius: 22,
        alignItems: 'center',
        marginBottom: 24
    },

    flightDate: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16.7,
        color: '#fff',
    },

    flightClass: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 100,
        backgroundColor: '#ffcc02',
        fontSize: 12,
        fontWeight: '700',
        color: '#000'
    },

    flightPoint: {
        width: 14,
        height: 14,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 2,
        borderRadius: 100,
        backgroundColor: '#ffcc02',
        fontSize: 8,
        fontWeight: '700',
        color: '#000',
        marginRight: 7,
        zIndex: 10
    },

    flightLine: {
        borderWidth: 1,
        borderColor: '#ffcc02',
        height: 40,
        borderStyle: 'dashed',
        position: 'absolute',
        left: 5,
        top: 2
    },

    eventDate: {
        fontSize: 12,
        fontWeight: '400',
        color: '#999',
        lineHeight: 14.32
    },

    dots: {
        width: 44,
        height: 44,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10
    },

    dotsFlight: {
        width: 44,
        height: 44,
        zIndex: 10
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingTop: 16,
        alignItems: 'center',
    },

    modalButton: {
        width: '100%',
        paddingVertical: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalButtonText: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        color: '#ff0e0a',
    },

    modalTitle: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        color: '#000',
        marginBottom: 5
    },

    modalText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#000',
        marginBottom: 16,
        textAlign: 'center'
    },


})

export default T;