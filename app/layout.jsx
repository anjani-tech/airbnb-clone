import "@/assets/styles/globals.css";

export const metadata = {
  title: "Airbnb Clone",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property!",
};

const MainComponent = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainComponent;
