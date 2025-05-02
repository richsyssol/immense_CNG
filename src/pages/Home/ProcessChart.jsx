import React from "react";
import { Card, Row, Col } from "antd";
import { motion } from "framer-motion";
import steps from "../../constants/processchart";
// Cylinder Testing Steps

const ProcessChart = () => {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cylinder Re-Testing Process Chart
      </motion.h2>

      <Row gutter={[16, 16]}>
        {steps.map((step, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card
                hoverable
                className="h-full shadow-md border border-blue-100 rounded-xl"
              >
                <div className="text-blue-800 font-semibold">
                  {index + 1}. {step}
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProcessChart;
