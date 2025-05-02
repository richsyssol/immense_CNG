export const CYLINDER_TYPES = [
  {
    value: "Oxygen",
    label: "Oxygen",
    color: "blue",
    description: "Medical and industrial use, supports combustion",
    standardColor: "White",
  },
  {
    value: "Acetylene",
    label: "Acetylene",
    color: "red",
    description: "Used for welding and cutting metals",
    standardColor: "Maroon",
  },
  {
    value: "Nitrogen",
    label: "Nitrogen",
    color: "gray",
    description: "Inert gas for purging and blanketing",
    standardColor: "Black",
  },
  {
    value: "Argon",
    label: "Argon",
    color: "purple",
    description: "Used in welding and lighting",
    standardColor: "Dark Green",
  },
  {
    value: "Hydrogen",
    label: "Hydrogen",
    color: "orange",
    description: "Fuel gas and reducing agent",
    standardColor: "Red",
  },
  {
    value: "Carbon Dioxide",
    label: "Carbon Dioxide",
    color: "green",
    description: "Used in beverages and fire suppression",
    standardColor: "Gray",
  },
];

export const STATUS_OPTIONS = [
  {
    value: "Identified",
    label: "Identified",
    color: "blue",
  },
  {
    value: "Pending Degassing",
    label: "Pending Degassing",
    color: "orange",
  },
  {
    value: "Degassed",
    label: "Degassed",
    color: "green",
  },
  {
    value: "Failed",
    label: "Failed",
    color: "red",
  },
];

export const DEGASSING_STATUS_OPTIONS = [
  {
    value: "Not Started",
    label: "Not Started",
    color: "gray",
  },
  {
    value: "In Progress",
    label: "In Progress",
    color: "orange",
  },
  {
    value: "Completed",
    label: "Completed",
    color: "green",
  },
  {
    value: "Not Required",
    label: "Not Required",
    color: "blue",
  },
];

export const DEGASSING_STEPS = [
  {
    title: "Identification",
    description: "Cylinder type and contents verified",
    icon: "FileTextOutlined",
    statusField: "identificationComplete",
  },
  {
    title: "Preparation",
    description: "Area prepared for degassing",
    icon: "SafetyCertificateOutlined",
    statusField: "preparationComplete",
  },
  {
    title: "Purging",
    description: "Initial gas purging completed",
    icon: "HistoryOutlined",
    statusField: "purgingComplete",
  },
  {
    title: "Testing",
    description: "Residual gas levels tested",
    icon: "CheckCircleOutlined",
    statusField: "testingComplete",
  },
  {
    title: "Certification",
    description: "Degassing certified complete",
    icon: "SafetyCertificateOutlined",
    statusField: "certificationComplete",
  },
];

export const SAFETY_GUIDELINES = [
  "Always wear appropriate PPE (gloves, goggles, respirator)",
  "Work in well-ventilated areas only",
  "Never attempt to degass cylinders without proper training",
  "Use gas detectors to monitor environment",
  "Keep ignition sources away from degassing area",
  "Follow proper lockout/tagout procedures",
  "Have emergency equipment readily available",
];

export const REQUIRED_EQUIPMENT = [
  "Gas detector",
  "Proper ventilation system",
  "PPE (gloves, goggles, respirator)",
  "Pressure relief valves",
  "Neutralization chemicals (if applicable)",
  "Fire extinguisher",
  "Emergency shower/eye wash station",
];

export const TESTING_PARAMETERS = {
  oxygen: { maxPPM: 100, testMethod: "Oxygen analyzer" },
  acetylene: { maxPPM: 50, testMethod: "Combustible gas detector" },
  nitrogen: { maxPPM: 1000, testMethod: "Oxygen deficiency monitor" },
  hydrogen: { maxPPM: 25, testMethod: "Combustible gas detector" },
};

export const DEFAULT_RECORD = {
  cylinderId: "",
  type: "",
  status: "Identified",
  degassingStatus: "Not Started",
  date: new Date().toISOString().split("T")[0],
  technician: "",
  notes: "",
  identificationComplete: false,
  preparationComplete: false,
  purgingComplete: false,
  testingComplete: false,
  certificationComplete: false,
};
