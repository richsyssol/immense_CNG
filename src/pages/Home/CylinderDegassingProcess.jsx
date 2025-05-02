import { motion } from "framer-motion";
import { useState } from "react";
import {
  Table,
  Tag,
  Steps,
  Card,
  Statistic,
  Progress,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  Alert,
  Tabs,
} from "antd";
import {
  SafetyCertificateOutlined,
  FileTextOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

const CylinderDegassingProcess = () => {
  const [activeTab, setActiveTab] = useState("identification");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [records, setRecords] = useState([
    {
      key: "1",
      cylinderId: "CYL-2023-001",
      type: "Oxygen",
      status: "Identified",
      degassingStatus: "Not Required",
      date: "2023-05-15",
      technician: "John Doe",
      notes: "Medical grade cylinder",
    },
    {
      key: "2",
      cylinderId: "CYL-2023-002",
      type: "Acetylene",
      status: "Degassed",
      degassingStatus: "Completed",
      date: "2023-05-16",
      technician: "Jane Smith",
      notes: "Required full degassing procedure",
    },
    {
      key: "3",
      cylinderId: "CYL-2023-003",
      type: "Nitrogen",
      status: "Pending Degassing",
      degassingStatus: "In Progress",
      date: "2023-05-17",
      technician: "Mike Johnson",
      notes: "Partial pressure remaining",
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newRecord = {
        key: `${records.length + 1}`,
        cylinderId: `CYL-2023-00${records.length + 1}`,
        type: values.type,
        status: "Identified",
        degassingStatus: "Not Started",
        date: values.date.format("YYYY-MM-DD"),
        technician: values.technician,
        notes: values.notes,
      };
      setRecords([...records, newRecord]);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Cylinder ID",
      dataIndex: "cylinderId",
      key: "cylinderId",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = "";
        switch (type) {
          case "Oxygen":
            color = "blue";
            break;
          case "Acetylene":
            color = "red";
            break;
          case "Nitrogen":
            color = "gray";
            break;
          default:
            color = "green";
        }
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Identified":
            color = "blue";
            break;
          case "Degassed":
            color = "green";
            break;
          case "Pending Degassing":
            color = "orange";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Degassing Status",
      dataIndex: "degassingStatus",
      key: "degassingStatus",
      render: (status) => {
        let color = "";
        let icon = null;
        switch (status) {
          case "Completed":
            color = "green";
            icon = <CheckCircleOutlined />;
            break;
          case "In Progress":
            color = "orange";
            icon = <ExclamationCircleOutlined />;
            break;
          case "Not Required":
            color = "blue";
            break;
          default:
            color = "gray";
        }
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Technician",
      dataIndex: "technician",
      key: "technician",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => console.log("View details", record)}>
          View Details
        </Button>
      ),
    },
  ];

  const degassingSteps = [
    {
      title: "Identification",
      description: "Cylinder type and contents verified",
      icon: <FileTextOutlined />,
    },
    {
      title: "Preparation",
      description: "Area prepared for degassing",
      icon: <SafetyCertificateOutlined />,
    },
    {
      title: "Purging",
      description: "Initial gas purging completed",
      icon: <HistoryOutlined />,
    },
    {
      title: "Testing",
      description: "Residual gas levels tested",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Certification",
      description: "Degassing certified complete",
      icon: <SafetyCertificateOutlined />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Cylinder Identification & Degassing Process
        </motion.h1>
        <p className="text-gray-600 mt-2">
          Comprehensive tracking of cylinder identification and degassing
          procedures
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <Statistic
            title="Total Cylinders"
            value={records.length}
            prefix={<FileTextOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Degassing Completed"
            value={
              records.filter((r) => r.degassingStatus === "Completed").length
            }
            prefix={<CheckCircleOutlined />}
          />
          <Progress
            percent={Math.round(
              (records.filter((r) => r.degassingStatus === "Completed").length /
                records.length) *
                100
            )}
            status="active"
            className="mt-4"
          />
        </Card>
        <Card>
          <Statistic
            title="Pending Actions"
            value={
              records.filter(
                (r) =>
                  r.degassingStatus === "In Progress" ||
                  r.status === "Pending Degassing"
              ).length
            }
            prefix={<ExclamationCircleOutlined />}
          />
        </Card>
      </div>

      <div className="mb-6">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className="mb-4"
        >
          Add New Record
        </Button>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "identification",
              label: "Identification Records",
              children: (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Table
                    columns={columns}
                    dataSource={records}
                    bordered
                    pagination={{ pageSize: 5 }}
                  />
                </motion.div>
              ),
            },
            {
              key: "process",
              label: "Degassing Process",
              children: (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="Standard Degassing Procedure">
                    <Steps current={2} className="mb-8">
                      {degassingSteps.map((step, index) => (
                        <Step
                          key={index}
                          title={step.title}
                          description={step.description}
                          icon={step.icon}
                        />
                      ))}
                    </Steps>

                    <Divider orientation="left">Safety Guidelines</Divider>
                    <Alert
                      message="Critical Safety Information"
                      description="Always follow proper safety protocols when handling gas cylinders. Use appropriate PPE, work in well-ventilated areas, and never attempt to degass cylinders without proper training and equipment."
                      type="warning"
                      showIcon
                      className="mb-4"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card title="Required Equipment">
                        <ul className="list-disc pl-5">
                          <li>Gas detector</li>
                          <li>Proper ventilation system</li>
                          <li>PPE (gloves, goggles, respirator)</li>
                          <li>Pressure relief valves</li>
                          <li>Neutralization chemicals (if applicable)</li>
                        </ul>
                      </Card>
                      <Card title="Common Cylinder Types">
                        <ul className="list-disc pl-5">
                          <li>Oxygen - White</li>
                          <li>Acetylene - Maroon</li>
                          <li>Nitrogen - Black</li>
                          <li>Argon - Dark Green</li>
                          <li>Hydrogen - Red</li>
                        </ul>
                      </Card>
                    </div>
                  </Card>
                </motion.div>
              ),
            },
          ]}
        />
      </div>

      <Modal
        title="Add New Cylinder Record"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label="Cylinder Type"
              rules={[
                { required: true, message: "Please select cylinder type" },
              ]}
            >
              <Select placeholder="Select cylinder type">
                <Option value="Oxygen">Oxygen</Option>
                <Option value="Acetylene">Acetylene</Option>
                <Option value="Nitrogen">Nitrogen</Option>
                <Option value="Argon">Argon</Option>
                <Option value="Hydrogen">Hydrogen</Option>
                <Option value="Carbon Dioxide">Carbon Dioxide</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Identification Date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              name="technician"
              label="Technician Name"
              rules={[
                { required: true, message: "Please enter technician name" },
              ]}
            >
              <Input placeholder="Enter technician name" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Initial Status"
              initialValue="Identified"
            >
              <Select disabled>
                <Option value="Identified">Identified</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="notes" label="Notes">
            <TextArea
              rows={4}
              placeholder="Enter any additional notes about the cylinder"
            />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default CylinderDegassingProcess;
