const mongoose = require('mongoose');
require('dotenv').config();
const Table = require('./models/Table');

const seedTables = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        await Table.deleteMany({});
        
        const tablesData = [
            { number: 1, capacity: 2, status: 'available', x: 20, y: 30 },
            { number: 2, capacity: 4, status: 'occupied', x: 50, y: 25 },
            { number: 3, capacity: 6, status: 'reserved', x: 80, y: 35 },
            { number: 4, capacity: 4, status: 'available', x: 25, y: 65 },
            { number: 5, capacity: 2, status: 'available', x: 55, y: 60 },
            { number: 6, capacity: 8, status: 'available', x: 85, y: 70 },
            { number: 7, capacity: 4, status: 'reserved', x: 40, y: 85 },
            { number: 8, capacity: 2, status: 'occupied', x: 70, y: 85 }
        ];

        await Table.insertMany(tablesData);
        console.log('Tables re-seeded successfully: 8 Tables spawned with exact (X,Y) coordinates.');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedTables();
