const Store = require('@models/store/model.store');

const createStore = async (storeData) => {
  const { name, address, phone, email, userId } = storeData;
  
  if (!name || !address || !phone || !email || !userId) {
    return { status: 400, error: 'Store data incomplete!' };
  }
  
  try {
    const existingStores = await Store.query('userId').eq(userId).exec();

    if (existingStores.count > 0) {
      return { status: 409, error: 'A store for this userId already exists.' };
    }

    const newStore = new Store(storeData);
    const savedStore = await newStore.save();

    return { status: 201, data: savedStore };
  } catch (error) {
    return { status: 500, error: 'Error creating store', details: error.message };
  }
};

module.exports = {
  createStore,
};