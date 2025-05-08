import React from "react";
import { Tag } from "antd";
import { motion } from "framer-motion";

const CNGFixedInfo = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
      }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Tag
          style={{
            backgroundColor: "#e6f7ff",
            borderColor: "#13c2c2",
            color: "#08979c",
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
        >
          CNG CYLINDER
        </Tag>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          backgroundColor: "#f6ffed",
          border: "1px solid #52c41a",
          borderRadius: "12px",
          padding: "12px",
          maxWidth: "200px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{ color: "#237804", fontWeight: "bold", marginBottom: "8px" }}
        >
          Our CNG Cylinder Services
        </div>
        <div style={{ color: "#389e0d", fontSize: "14px" }}>
          High-quality, safe, and reliable CNG cylinders for your business
          needs.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CNGFixedInfo;
