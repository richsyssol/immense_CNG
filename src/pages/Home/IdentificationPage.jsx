import { motion } from "framer-motion";
import { useState } from "react";
import cylinderTypes from "../../constants/identificationCylinder";

const IdentificationCylinder = () => {
  const [step, setStep] = useState(1);
  const [cylinderType, setCylinderType] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectCylinder = (type) => {
    setCylinderType(type);
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            Cylinder Identification Process
          </h1>
          <p className="mt-2">Follow the steps to identify your gas cylinder</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between px-6 pt-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${
                  step >= stepNumber
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              <span
                className={`text-xs mt-2 ${
                  step >= stepNumber
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {stepNumber === 1 && "Select Type"}
                {stepNumber === 2 && "Verify Details"}
                {stepNumber === 3 && "Confirmation"}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Select Cylinder Type */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                Select Cylinder Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cylinderTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${type.color} rounded-lg p-4 text-white cursor-pointer shadow-md`}
                    onClick={() => selectCylinder(type.name)}
                  >
                    <h3 className="font-bold text-lg">{type.name}</h3>
                    <p className="text-sm opacity-90 mt-2">
                      {type.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Verify Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                Verify Cylinder Details
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <span className="text-indigo-600 text-2xl">ℹ️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      Selected Cylinder: {cylinderType}
                    </h3>
                    <p className="text-gray-600">
                      {
                        cylinderTypes.find((t) => t.name === cylinderType)
                          ?.description
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Identification Marks
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter any numbers or codes on the cylinder"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 0.8 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Identification Complete!
              </h2>
              <p className="text-gray-600 mb-6">
                You've identified the cylinder as{" "}
                <span className="font-semibold">{cylinderType}</span>.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left mb-6">
                <h3 className="font-medium text-blue-800 mb-2">
                  Safety Reminder:
                </h3>
                <p className="text-blue-700 text-sm">
                  Always handle gas cylinders with care. Store upright in a
                  well-ventilated area, keep away from heat sources, and ensure
                  valves are properly closed when not in use.
                </p>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setCylinderType("");
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Identify Another Cylinder
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default IdentificationCylinder;
