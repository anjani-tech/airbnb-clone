'use server';

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User Not Found!');
    }

    const { userId } = sessionUser;
    const user = await User.findById(userId);

    let isBookMarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookMarked) {
        user.bookmarks.pull(propertyId);
        message = 'Bookmark Removed';
        isBookMarked = false;
    } else {
        user.bookmarks.push(propertyId);
        message = 'Bookmark Added';
        isBookMarked = true;
    }

    await user.save();
    revalidatePath('/properties/saved', 'page');

    return {
        message,
        isBookMarked
    };
}

export default bookmarkProperty;