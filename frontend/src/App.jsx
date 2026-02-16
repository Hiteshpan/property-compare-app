import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

function App() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!address1 || !address2) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/compare`,
        {
          address1,
          address2,
        },
      );

      console.log(" response:", response.data);

      // small delay for better UX
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 800);
    } catch (error) {
      alert("Backend not running!");
      setLoading(false);
    }
  };

  // return (
  //   <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4">
  //     {/* Heading */}
  //     <div className="text-center mt-12">
  //       <h1 className="text-3xl sm:text-4xl font-bold">
  //         🏠 Property Comparison
  //       </h1>
  //       <p className="text-gray-500 mt-2 text-sm sm:text-base">
  //         Compare two properties instantly
  //       </p>
  //     </div>

  //     {/* Search Section */}
  //     <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-10 w-full max-w-4xl">
  //       {/* First Input */}
  //       <div className="relative w-full md:w-80">
  //         <Search className="absolute left-3 top-4 text-gray-400" size={18} />
  //         <input
  //           type="text"
  //           placeholder="Enter First Address"
  //           className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  //           value={address1}
  //           onChange={(e) => setAddress1(e.target.value)}
  //         />
  //       </div>

  //       {/* VS */}
  //       <div className="text-lg font-bold text-gray-400 hidden md:block">
  //         VS
  //       </div>

  //       {/* Second Input */}
  //       <div className="relative w-full md:w-80">
  //         <Search className="absolute left-3 top-4 text-gray-400" size={18} />
  //         <input
  //           type="text"
  //           placeholder="Enter Second Address"
  //           className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  //           value={address2}
  //           onChange={(e) => setAddress2(e.target.value)}
  //         />
  //       </div>
  //     </div>

  //     {/* Compare Button */}
  //     <div className="flex justify-center mt-6">
  //       <button
  //         onClick={handleCompare}
  //         disabled={!address1 || !address2}
  //         className={`px-8 py-3 rounded-lg text-white font-semibold transition
  //       ${
  //         !address1 || !address2
  //           ? "bg-gray-400 cursor-not-allowed"
  //           : "bg-blue-600 hover:bg-blue-700"
  //       }`}
  //       >
  //         Compare
  //       </button>
  //     </div>

  //     {/* Loader */}
  //     {loading && (
  //       <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
  //         <h2 className="text-2xl sm:text-3xl font-bold animate-pulse">
  //           Comparing...
  //         </h2>
  //       </div>
  //     )}

  //     {/* Result Section */}
  //     {result && (
  //       <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-16 gap-6 max-w-6xl pb-16">
  //         {/* Property 1 */}
  //         <div className="w-full lg:w-[45%] bg-white p-6 sm:p-8 rounded-xl shadow-lg border">
  //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
  //             <h2 className="text-lg sm:text-xl font-semibold break-words">
  //               {result.property1.address}
  //             </h2>

  //             <p className="text-xl sm:text-2xl font-bold text-green-600">
  //               ₹ {result.property1.predicted_price.toLocaleString()}
  //             </p>
  //           </div>

  //           <div className="space-y-2 text-sm">
  //             {Object.entries(result.property1.features).map(([key, value]) => (
  //               <div key={key} className="flex justify-between border-b pb-1">
  //                 <span className="capitalize">{key.replace("_", " ")}</span>
  //                 <span className="font-medium">{value.toString()}</span>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* VS Circle Desktop Only */}
  //         <div className="text-lg font-bold text-gray-400 hidden md:block">
  //           VS
  //         </div>

  //         {/* Property 2 */}
  //         <div className="w-full lg:w-[45%] bg-white p-6 sm:p-8 rounded-xl shadow-lg border">
  //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
  //             <h2 className="text-lg sm:text-xl font-semibold break-words">
  //               {result.property2.address}
  //             </h2>

  //             <p className="text-xl sm:text-2xl font-bold text-green-600">
  //               ₹ {result.property2.predicted_price.toLocaleString()}
  //             </p>
  //           </div>

  //           <div className="space-y-2 text-sm">
  //             {Object.entries(result.property2.features).map(([key, value]) => (
  //               <div key={key} className="flex justify-between border-b pb-1">
  //                 <span className="capitalize">{key.replace("_", " ")}</span>
  //                 <span className="font-medium">{value.toString()}</span>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-800 flex flex-col items-center px-4">
      {/* Heading */}
      <div className="text-center mt-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Property Comparison
        </h1>
        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Compare two properties instantly and intelligently
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-12 w-full max-w-4xl">
        {/* First Input */}
        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Enter First Address"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>

        {/* VS Badge */}
        <div className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md">
          VS
        </div>

        {/* Second Input */}
        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Enter First Address"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleCompare}
          disabled={!address1 || !address2}
          className={`px-10 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform
        ${
          !address1 || !address2
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-xl"
        }`}
        >
          Compare Now
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-blue-600">
              Comparing Properties...
            </p>
          </div>
        </div>
      )}

      {result && (
        <div className="w-full mt-20 max-w-6xl pb-16 relative">
          {/* Price Difference Badge */}
          <div className="flex justify-center mb-8">
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg">
              Price Difference: ₹{" "}
              {Math.abs(
                result.property1.predicted_price -
                  result.property2.predicted_price,
              ).toLocaleString()}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10">
            {/* Property Card 1 */}
            <div
              className={`w-full lg:w-[45%] p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02]
        ${
          result.property1.predicted_price < result.property2.predicted_price
            ? "bg-emerald-50 border-emerald-400 shadow-emerald-200 shadow-xl"
            : "bg-white shadow-xl border-gray-200"
        }`}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 break-words">
                  {result.property1.address}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="text-3xl font-extrabold text-emerald-600">
                    ₹ {result.property1.predicted_price.toLocaleString()}
                  </p>

                  {result.property1.predicted_price <
                    result.property2.predicted_price && (
                    <span className="px-3 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-full">
                      Better Deal
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(result.property1.features).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                    >
                      <span className="text-gray-500 text-sm capitalize">
                        {key.replace("_", " ")}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {value.toString()}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* VS Badge */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-2xl">
                VS
              </div>
            </div>

            {/* Property Card 2 */}
            <div
              className={`w-full lg:w-[45%] p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02]
        ${
          result.property2.predicted_price < result.property1.predicted_price
            ? "bg-emerald-50 border-emerald-400 shadow-emerald-200 shadow-xl"
            : "bg-white shadow-xl border-gray-200"
        }`}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 break-words">
                  {result.property2.address}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="text-3xl font-extrabold text-emerald-600">
                    ₹ {result.property2.predicted_price.toLocaleString()}
                  </p>

                  {result.property2.predicted_price <
                    result.property1.predicted_price && (
                    <span className="px-3 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-full">
                      Better Deal
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(result.property2.features).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                    >
                      <span className="text-gray-500 text-sm capitalize">
                        {key.replace("_", " ")}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {value.toString()}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
