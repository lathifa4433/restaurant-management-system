const mongoose = require('mongoose');
require('dotenv').config();
const Menu = require('./models/Menu');

const defaultImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop';

const UnsplashImages = {
  'South Indian': 'https://images.unsplash.com/photo-1627308595229-7830f5c9066b?w=500&h=400&fit=crop', // dosa
  'North Indian': 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&h=400&fit=crop', // curry
  'Chinese': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=400&fit=crop', // noodles
  'Desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=400&fit=crop', // dessert
  'Beverages': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=400&fit=crop' // drink
};

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const menus = await Menu.find({});
        for (let menu of menus) {
            const fallback = UnsplashImages[menu.category] || defaultImage;
            // update even if seemingly valid just to ensure 100% working fresh images.
            menu.image = fallback;
            await menu.save();
        }
        console.log('Images updated successfully in DB');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateImages();
