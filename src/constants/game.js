const game = [
    {
        level: 1,
        questions: [
            {
                question: 'This famous monument is located in Paris. What is it?',
                options: [
                    { option: 'Eiffel Tower ', correct: true },
                    { option: 'Colosseum ', correct: false },
                    { option: 'Statue of Liberty ', correct: false },
                ],
                image: require('../assets/game/1.png')
            },
            {
                question: 'What building is depicted in the picture?  ',
                options: [
                    { option: 'Taj Mahal', correct: false },
                    { option: 'Big Ben', correct: true },
                    { option: 'St. Peter`s Basilica', correct: false },
                ],
                image: require('../assets/game/2.png')
            },   
            {
                question: 'What is shown in this picture?',
                options: [
                    { option: 'Statue of Liberty', correct: true },
                    { option: 'Leaning Tower of Pisa', correct: false },
                    { option: 'Sydney Opera House', correct: false },
                ],
                image: require('../assets/game/3.png')
            },           
        ],
    },
    {
        level: 2,
        questions: [
            {
                question: 'Which historical monument is depicted in the picture?',
                options: [
                    { option: 'Stonehenge', correct: false },
                    { option: 'St. Basil`s Cathedral', correct: false },
                    { option: 'Machu Picchu', correct: true },
                ],
                image: require('../assets/game/4.png')
            },
            {
                question: 'This picture shows a famous square. What is the name of this square?',
                options: [
                    { option: 'Revolution Square', correct: false },
                    { option: 'St. Mark`s Square', correct: true },
                    { option: 'Times Square', correct: false },
                ],
                image: require('../assets/game/5.png')
            },   
            {
                question: 'What building is shown in this image?',
                options: [
                    { option: 'Sagrada Familia', correct: true },
                    { option: 'Taj Mahal', correct: false },
                    { option: 'Capitol Building in Washington, D.C.', correct: false },
                ],
                image: require('../assets/game/6.png')
            },           
        ],
    },
    {
        level: 3,
        questions: [
            {
                question: 'What place is depicted in the picture?',
                options: [
                    { option: 'Neuschwanstein Castle', correct: true },
                    { option: 'Edinburgh Castle', correct: false },
                    { option: 'Hohenzollern Castle', correct: false },
                ],
                image: require('../assets/game/7.png')
            },
            {
                question: 'What landmark is shown in this photo?',
                options: [
                    { option: 'Lotus Temple', correct: true },
                    { option: 'Karnak Temple', correct: false },
                    { option: 'Temple of Olympian Zeus', correct: false },
                ],
                image: require('../assets/game/8.png')
            },   
            {
                question: 'What is this place?',
                options: [
                    { option: 'Grand Canyon', correct: false },
                    { option: 'Yosemite National Park', correct: false },
                    { option: 'Banff National Park', correct: true },
                ],
                image: require('../assets/game/9.png')
            },           
        ],
    },
    {
        level: 4,
        questions: [
            {
                question: 'What place is this?',
                options: [
                    { option: 'Golden Gate Bridge', correct: true },
                    { option: 'Chicago Bridge', correct: false },
                    { option: 'Brooklyn Bridge', correct: false },
                ],
                image: require('../assets/game/10.png')
            },
            {
                question: 'What is depicted in this image?',
                options: [
                    { option: 'Carcassonne Fortress', correct: false },
                    { option: 'Nimrod Fortress', correct: false },
                    { option: 'Alhambra Fortress', correct: true },
                ],
                image: require('../assets/game/11.png')
            },   
            {
                question: 'What is the name of this historical site?',
                options: [
                    { option: 'Atacama-Salvador', correct: false },
                    { option: 'Easter Island', correct: true },
                    { option: 'Malta Island', correct: false },
                ],
                image: require('../assets/game/12.png')
            },           
        ],
    },
    {
        level: 5,
        questions: [
            {
                question: 'What place is this?',
                options: [
                    { option: 'Schönbrunn Palace', correct: false },
                    { option: 'Potala Palace', correct: true },
                    { option: 'Palace of Versailles', correct: false },
                ],
                image: require('../assets/game/13.png')
            },
            {
                question: 'What monument is shown in this picture?',
                options: [
                    { option: 'Boudhanath Stupa', correct: true },
                    { option: 'Suvarnabhumi Stupa', correct: false },
                    { option: 'Shwedagon Pagoda', correct: false },
                ],
                image: require('../assets/game/14.png')
            },   
            {
                question: 'What is the name of this place?',
                options: [
                    { option: 'Finding Temple in Japan', correct: false },
                    { option: 'Christ the Savior Cathedral in Moscow', correct: true },
                    { option: 'Sun Temple in Texas', correct: false },
                ],
                image: require('../assets/game/15.png')
            },           
        ],
    },
];

export default game;