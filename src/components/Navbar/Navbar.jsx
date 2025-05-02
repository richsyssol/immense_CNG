import React from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Home", key: "home" },
    { label: "Process", key: "process" },
    { label: "Certificates", key: "certificates" },
    { label: "Admin", key: "admin" },
  ];

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Cylinder Re-Test</div>

        <div className="hidden md:block">
          <Menu mode="horizontal" items={items} className="border-none" />
        </div>

        <div className="md:hidden">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
            className="border-none shadow-none"
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
          >
            <Menu mode="vertical" items={items} />
          </Drawer>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
