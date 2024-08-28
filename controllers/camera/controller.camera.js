const Store = require('@models/store/model.store');
const Camera = require('@models/camera/model.camera');

const createCamera = async (cameraData) => {
    const { provider, count, userId } = cameraData;

    if (!provider || !count || !userId) {
        return { status: 400, error: 'Camera data incomplete!' };
    }

    try {
        const storeExists = await Store.query('userId').eq(userId).exec();
        if (storeExists.count === 0) {
            return { status: 409, error: 'You are heading too fast! Please create a store first' };
        }

        const existingCameras = await Camera.query('userId').eq(userId).exec();

        if (existingCameras.count > 0) {
            return { status: 409, error: 'A camera for this userId already exists.' };
        }

        const updatedCameraData = {
            storeId: storeExists[0].id,
            ...cameraData
        }

        const newCamera = new Camera(updatedCameraData);
        const savedCamera = await newCamera.save();

        return { status: 201, data: savedCamera };
    } catch (error) {
        return { status: 500, error: 'Error creating camera', details: error.message };
    }
};

const additionalDetails = async (additionalData) => {
    const { name, url, features, userId } = additionalData;

    if (!name || !url || !features || !userId) {
        return { status: 400, error: 'Camera data incomplete!' };
    }

    try {
        const storeExists = await Store.query('userId').eq(userId).exec();
        if (storeExists.count === 0) {
            return { status: 409, error: 'You are heading too fast! Please create a store first' };
        }

        const existingCameras = await Camera.query('userId').eq(userId).exec();

        if (existingCameras.count === 0) {
            return { status: 409, error: 'Camera for this userId does not exists.' };
        }

        const updatedCamera = await Camera.update(
            { id: existingCameras[0].id },
            {
                name: name,
                url: url,
                features: features
            }
        )

        return { status: 201, data: updatedCamera };
    } catch (error) {
        return { status: 500, error: 'Error updating camera', details: error.message };
    }
};

const fetchCamera = async ({ userId }) => {
    try {
        const existingCameras = await Camera.query('userId').eq(userId).exec();
        if (existingCameras.count > 0) {
            const camera = existingCameras[0];
            return { status: 200, data: camera };
        }
        else {
            return { status: 404, error: 'Cameras not found' };
        }
    } catch (error) {
        return { status: 500, error: 'Error fetching store', details: error.message };
    }
};

module.exports = {
    createCamera,
    additionalDetails,
    fetchCamera
};