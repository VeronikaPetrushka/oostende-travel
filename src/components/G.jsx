import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icns from './Icns';

const { height } = Dimensions.get('window');

const G = ({ item }) => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    useEffect(() => {
        resetFailStatus();
    }, []);

    const resetFailStatus = async () => {
        try {
            const storedLevels = await AsyncStorage.getItem('levels');
            if (storedLevels) {
                const levels = JSON.parse(storedLevels);
                const currentLevelIndex = levels.findIndex(level => level.level === item.level);

                if (currentLevelIndex !== -1) {
                    levels[currentLevelIndex].fail = false;
                    await AsyncStorage.setItem('levels', JSON.stringify(levels));
                    console.log('Fail status reset for level:', item.level);
                }

                console.log('fail status: ', levels[currentLevelIndex].fail)
            }

        } catch (error) {
            console.error('Error resetting fail status:', error);
        }
    };

    const hOP = (isCorrect, index) => {
        setSelectedOptionIndex(index);

        let updatedCorrectAnswers = correctAnswers;
        if (isCorrect) {
            updatedCorrectAnswers += 1;
            setCorrectAnswers(updatedCorrectAnswers);
        }
    
        setTimeout(() => {
            if (currentQuestionIndex <= item.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOptionIndex(null);
            }
            
            if (item.questions.length + 1) {
                updateLevelStatus(updatedCorrectAnswers);
                setSelectedOptionIndex(null);
            }

        }, 1000);
    };
    
    const updateLevelStatus = async (finalCorrectAnswers) => {
        try {
            const storedLevels = await AsyncStorage.getItem('levels');
            const levels = JSON.parse(storedLevels);

            const currentLevelIndex = levels.findIndex(level => level.level === item.level);

            if (finalCorrectAnswers === item.questions.length) {
                levels[currentLevelIndex].success = true;
                levels[currentLevelIndex].fail = false;
                if (levels[currentLevelIndex + 1]) {
                    levels[currentLevelIndex + 1].open = true;
                }
            } else {
                levels[currentLevelIndex].fail = true;
            }

            console.log('correctAnswers: ', finalCorrectAnswers)
            console.log('current level: ', currentLevelIndex)
            console.log('levels: ', levels)

            await AsyncStorage.setItem('levels', JSON.stringify(levels));
        } catch (error) {
            console.error('Error updating level status:', error);
        }
    };

    const hTA = () => {
        setCorrectAnswers(0);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        resetFailStatus();
    }

    const rQ = () => {
        const currentQuestion = item.questions[currentQuestionIndex];

        return (
            <View style={{width: '100%'}}>

                <Image source={currentQuestion.image} style={styles.image} />

                <Text style={styles.question}>{currentQuestion.question}</Text>

                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOptionIndex === index;
                    const optionStyle = isSelected
                    ? option.correct
                        ? styles.correctOption
                        : styles.wrongOption
                    : styles.option;

                    return (
                    <TouchableOpacity
                        key={index}
                        style={optionStyle}
                        onPress={() => hOP(option.correct, index)}
                        disabled={selectedOptionIndex !== null}
                    >
                        <Text style={styles.optionText}>{option.option}</Text>
                    </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    
    const renderFinishScreen = () => (
        <View style={{width: '100%', alignItems: 'center'}}>
            {
                correctAnswers === item.questions.length ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.finishTitle}>Success !</Text>
                        <Text style={styles.finishText}>{correctAnswers}/{item.questions.length} are correct.</Text>
                        <Image source={require('../assets/success.png')} style={{width: height * 0.25, height: height * 0.25, resizeMode: 'contain', marginBottom: height * 0.1}} />
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.finishTitle}>Nice try !</Text>
                        <Text style={styles.finishText}>{correctAnswers}/{item.questions.length} are correct.</Text>
                        <Image source={require('../assets/fail.png')} style={{width: height * 0.25, height: height * 0.25, resizeMode: 'contain', marginBottom: height * 0.1}} />
                    </View>
                )
            }
            <TouchableOpacity
                style={styles.tryAgainBtn}
                onPress={hTA}
            >
                <Text style={[styles.finishBtnText, {fontWeight: '600'}]}>Try again</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.finishBtnText}>Close</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack('')}>
                    <View style={{width: 17, height: 22, marginRight: 7}}>
                        <Icns type={'back'} light />
                    </View>
                    <Text style={styles.upperText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.upperText}>{currentQuestionIndex + 1}/{item.questions.length + 1}</Text>
            </View>

            {currentQuestionIndex < item.questions.length ? rQ() : renderFinishScreen()}

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#000'
    },

    upperText: {
        fontSize: 17,
        color: '#ffcc02',
        fontWeight: '400',
        lineHeight: 22
    },

    image: {
        width: '100%',
        height: 300,
        marginBottom: height * 0.016,
        resizeMode: 'cover',
        borderRadius: 16
    },

    question: {
        fontSize: 24,
        color: '#fff',
        marginBottom: height * 0.02,
        fontWeight: '700',
        lineHeight: 28.64
    },

    option: {
        width: '100%',
        backgroundColor: '#3d3d3d',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.016,
        padding: height * 0.022
    },

    correctOption: {
        width: '100%',
        backgroundColor: '#ffcc02',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.016,
        padding: height * 0.022
    },

    wrongOption: {
        width: '100%',
        backgroundColor: '#f53636',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.016,
        padding: height * 0.022
    },

    optionText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700',
        lineHeight: 19.1
    },

    finishTitle: {
        fontSize: 32,
        color: '#ffcc02',
        fontWeight: '700',
        lineHeight: 38.2,
        marginBottom: 32,
        marginTop: 52,
        textAlign: 'center'
    },

    finishText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 23.87,
        marginBottom: 32,
        textAlign: 'center'
    },

    tryAgainBtn: {
        width: '100%',
        padding: 14.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffcc02',
        borderRadius: 12,
        marginBottom: 24
    },

    closeBtn: {
        width: '100%',
        padding: 14.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#3d3d3d',
        borderRadius: 12,
        marginBottom: 24
    },

    finishBtnText: {
        fontSize: 16,
        color: '#3d3d3d',
        fontWeight: '500',
        lineHeight: 19.09,
    }


})

export default G;