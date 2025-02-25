import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const propertyId = params.id;

        const property = await Property.findById(propertyId);

        if (!property) {
            return new Response("Property not found!", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(property), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Something went wrong", { status: 500 });
    }
};
