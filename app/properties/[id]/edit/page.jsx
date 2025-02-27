import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyEdit = async ({ params }) => {
  // Ensure that params.id exists
  const { id } = await params;
  if (!id) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Invalid property ID!
      </h1>
    );
  }

  // Connect to the database
  await connectDB();

  // Fetch the property document from the database
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);

  // If no property is found, show an error message
  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found!
      </h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-8 shadow-md rounded-md border md:m-0">
          {/* Pass property data to the form component */}
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEdit;
