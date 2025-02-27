'use server';

const { default: cloudinary } = require("@/config/cloudinary");
const { default: connectDB } = require("@/config/database");
const { default: Property } = require("@/models/Property");
const { getSessionUser } = require("@/utils/getSessionUser");
const { revalidatePath } = require("next/cache");

async function deleteProperty(propertyId) {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User Id is required');
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId);
    if (!property) {
        throw new Error('Property not found!');
    }

    if (property.owner.toString() !== userId) {
        throw new Error('UnAuthorized!');
    }


    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/');
        return parts.at(-1).split('.').at(0);
    });

    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('airbnb/' + publicId);
        }
    }

    await property.deleteOne();

    revalidatePath('/', 'layout');

}

export default deleteProperty;