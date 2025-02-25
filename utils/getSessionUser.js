const { getServerSession } = require("next-auth/next");
const { authOptions } = require("./authOptions");

export const getSessionUser = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return null;
    }

    return {
        user: session.user,
        userId: session.user.id
    }
}