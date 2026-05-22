import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    const { MONGODB_URI } = useRuntimeConfig();

    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URI, {
                dbName: 'soap',
            });
            console.log('✅ MongoDB connected');
        }
    } catch (e) {
        throw createError({
            statusCode: 500,
            statusMessage: 'MongoDB connection error',
            data: {
                rawError: e,
            },
        });
    }
});
