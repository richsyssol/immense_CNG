import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white text-center py-6 mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} AM/NS Cylinder Re-Testing System
        </p>
        <p className="text-xs mt-1">Maintained by Cylinder VIC</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
