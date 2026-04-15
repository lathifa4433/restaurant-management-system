const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const Table = require('./models/Table');
const Order = require('./models/Order');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const menuItems = [
    { name: 'Masala Dosa', price: 120, category: 'South Indian', description: 'Crispy crepe made from rice and lentils with potato filling.', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&h=400&fit=crop' },
    { name: 'Idli Sambar', price: 80, category: 'South Indian', description: 'Steamed rice cakes served with lentil soup.', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&h=400&fit=crop' },
    { name: 'Vada Sambar', price: 90, category: 'South Indian', description: 'Deep fried lentil doughnuts served with hot sambar.', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&h=400&fit=crop' },
    { name: 'Uttapam', price: 110, category: 'South Indian', description: 'Thick pancake made from rice flour tooped with onions and tomatoes.', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&h=400&fit=crop' },
    { name: 'Butter Chicken', price: 350, category: 'North Indian', description: 'Chicken simmered in a creamy tomato gravy.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=400&fit=crop' },
    { name: 'Paneer Tikka', price: 250, category: 'North Indian', description: 'Marinated cottage cheese cubes grilled to perfection.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop' },
    { name: 'Dal Makhani', price: 200, category: 'North Indian', description: 'Black lentils cooked overnight with butter and cream.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop' },
    { name: 'Garlic Naan', price: 50, category: 'North Indian', description: 'Freshly baked flatbread topped with garlic and butter.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop' },
    { name: 'Chole Bhature', price: 180, category: 'North Indian', description: 'Spicy chickpeas served with deep fried bread.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop' },
    { name: 'Hakka Noodles', price: 190, category: 'Chinese', description: 'Stir fried noodles with veggies and soy sauce.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=400&fit=crop' },
    { name: 'Chilli Chicken', price: 280, category: 'Chinese', description: 'Crispy fried chicken tossed in spicy chilli sauce.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=400&fit=crop' },
    { name: 'Manchow Soup', price: 150, category: 'Chinese', description: 'Dark brown spicy soup originating from Meghalaya.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=400&fit=crop' },
    { name: 'Spring Rolls', price: 160, category: 'Chinese', description: 'Crispy fried rolls stuffed with vegetables.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=400&fit=crop' },
    { name: 'Gulab Jamun', price: 80, category: 'Desserts', description: 'Fried milk dumplings dipped in sugar syrup.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=400&fit=crop' },
    { name: 'Rasmalai', price: 100, category: 'Desserts', description: 'Flattened paneer balls soaked in malai flavored with cardamom.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=400&fit=crop' },
    { name: 'Ice Cream', price: 120, category: 'Desserts', description: 'Choice of vanilla, chocolate or strawberry.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=400&fit=crop' },
    { name: 'Brownie Sizzler', price: 250, category: 'Desserts', description: 'Hot chocolate brownie topped with ice cream on a sizzler plate.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=400&fit=crop' },
    { name: 'Cold Coffee', price: 150, category: 'Beverages', description: 'Chilled coffee blended with milk and ice cream.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=400&fit=crop' },
    { name: 'Fresh Lime Soda', price: 90, category: 'Beverages', description: 'Refreshing lime drink with soda.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=400&fit=crop' },
    { name: 'Mango Lassi', price: 110, category: 'Beverages', description: 'Sweet yogurt drink with mango pulp.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=400&fit=crop' }
];

const tables = [
    { number: 1, capacity: 2, x: 10, y: 10 },
    { number: 2, capacity: 4, x: 30, y: 10 },
    { number: 3, capacity: 4, x: 50, y: 10 },
    { number: 4, capacity: 6, x: 70, y: 10 },
    { number: 5, capacity: 2, x: 10, y: 40 },
    { number: 6, capacity: 4, x: 30, y: 40 },
    { number: 7, capacity: 8, x: 50, y: 40 },
    { number: 8, capacity: 2, x: 70, y: 40 },
];

const seedDatabase = async () => {
    try {
        const menuCount = await Menu.countDocuments();
        if (menuCount === 0) {
            await Menu.insertMany(menuItems);
            console.log('Sample menus inserted.');
        }

        const tableCount = await Table.countDocuments();
        if (tableCount === 0) {
            await Table.insertMany(tables);
            console.log('Sample tables inserted.');
        }

        const userCount = await User.countDocuments();
        if (userCount === 0) {
            const passwordHash = await bcrypt.hash('password123', 10);
            await User.create([
                { name: 'Manager', email: 'manager@rest.com', password: passwordHash, role: 'manager' },
                { name: 'Guest', email: 'guest@rest.com', password: passwordHash, role: 'customer' }
            ]);
            console.log('Sample users inserted.');
        }

        const orderCount = await Order.countDocuments();
        if (orderCount === 0) {
            const insertedMenus = await Menu.find().limit(2);
            await Order.insertMany([
                { items: [{ menuItem: insertedMenus[0]._id, name: insertedMenus[0].name, quantity: 2, price: insertedMenus[0].price }], totalAmount: insertedMenus[0].price * 2, type: 'dine-in', tableNumber: 1, status: 'ready' },
                { items: [{ menuItem: insertedMenus[1]._id, name: insertedMenus[1].name, quantity: 1, price: insertedMenus[1].price }], totalAmount: insertedMenus[1].price, type: 'parcel', status: 'preparing' },
                { items: [{ menuItem: insertedMenus[0]._id, name: insertedMenus[0].name, quantity: 1, price: insertedMenus[0].price }], totalAmount: insertedMenus[0].price, type: 'dine-in', tableNumber: 2, status: 'pending' },
                { items: [{ menuItem: insertedMenus[1]._id, name: insertedMenus[1].name, quantity: 3, price: insertedMenus[1].price }], totalAmount: insertedMenus[1].price * 3, type: 'parcel', status: 'pending' },
                { items: [{ menuItem: insertedMenus[0]._id, name: insertedMenus[0].name, quantity: 1, price: insertedMenus[0].price }], totalAmount: insertedMenus[0].price, type: 'dine-in', tableNumber: 3, status: 'delivered' },
            ]);
            console.log('Sample orders inserted.');
        }
    } catch (err) {
        console.error('Migration error:', err);
    }
};

module.exports = seedDatabase;
