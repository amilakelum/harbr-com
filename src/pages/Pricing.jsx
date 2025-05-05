import { useEffect } from "react";

export default function Pricing() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Pricing | Harbr";
    
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <div id="pricing" className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-lg text-center text-gray-600">
          Our pricing details will go here.
        </p>
      </div>
    </div>
  );
} 