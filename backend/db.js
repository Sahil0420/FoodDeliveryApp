const mongoose = require('mongoose')

const mongoConnection = async () => {
  await mongoose.connect('mongodb://localhost:27017/shalaFood')
  console.log('connected')
  const fetchedData = await mongoose.connection.db.collection('foodItems')
  global.food_items = await fetchedData.find({}).toArray()
  // console.log(global.food_items)

  const fetchFoodCategory = await mongoose.connection.db.collection('foodCategory')
  global.food_category = await fetchFoodCategory.find({}).toArray()

}

module.exports = mongoConnection
