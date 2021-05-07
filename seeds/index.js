const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0;i < 300;i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '607ae590c675982c6ccda679',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident in sunt est voluptate ex, neque vitae ut laboriosam, aliquam maxime inventore voluptates, quas libero vel dolore. Quae excepturi facilis commodi.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dphuamerw/image/upload/v1619458018/YelpCamp/tent.jpg',
                    filename: 'YelpCamp/tent.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dphuamerw/image/upload/v1619380527/YelpCamp/nncsse6pqorm8fwthrhu.jpg',
                    filename: 'YelpCamp/nncsse6pqorm8fwthrhu'
                },
                {
                    url: 'https://res.cloudinary.com/dphuamerw/image/upload/v1619380528/YelpCamp/jhqqcbskcrad1y9ncz8a.jpg',
                    filename: 'YelpCamp/jhqqcbskcrad1y9ncz8a'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});