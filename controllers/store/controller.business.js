const Store = require('@models/store/model.store');
const Business = require('@models/store/model.business');

const createBusiness = async (businessData) => {
  const { type, locations, role, userId } = businessData;

  if (!type || !locations || !role || !userId) {
    return { status: 400, error: 'Business data incomplete!' };
  }

  try {
    const storeExists = await Store.query('userId').eq(userId).exec();
    if(storeExists.count === 0) {
      return { status: 409, error: 'You are heading too fast! Please create a store first' };
    }

    const existingBusinesses = await Business.query('userId').eq(userId).exec();

    if (existingBusinesses.count > 0) {
      return { status: 409, error: 'Business information for this userId already exists.' };
    }

    const newBusinessInfo = new Business(businessData);
    const savedBusinessInfo = await newBusinessInfo.save();

    return { status: 201, data: savedBusinessInfo };
  } catch (error) {
    return { status: 500, error: 'Error adding business information', details: error.message };
  }
};

const fetchBusiness = async ({ userId }) => {
  try {
    const existingBusinesses = await Business.query('userId').eq(userId).exec();
    if (existingBusinesses.count > 0) {
      const store = existingBusinesses[0];
      return { status: 200, data: store };
    }
    else {
      return { status: 404, error: 'Business not found' };
    }
  } catch (error) {
    return { status: 500, error: 'Error fetching business', details: error.message };
  }
};

module.exports = {
  createBusiness,
  fetchBusiness
};