import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Home,
  Info,
  Wrench,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
  Check,
  ArrowRight,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Card, Steps, Collapse, Modal } from "antd";
import {
  aboutusimg,
  heroImg,
  img1,
  img10,
  img11,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  logo,
  processImg,
} from "../../assets";
import CNGFixedInfo from "../../components/CNGfixedInfo/CNGFixedInfo";

const { Panel } = Collapse;

// Custom Scroll Container Component
const ScrollContainer = ({ id, children }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="scroll-section"
    >
      {children}
    </motion.div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"
      style={{ width }}
    />
  );
};

// Gallery Component
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      src: img3,
      alt: "CNG Testing Facility",
      category: "facility",
    },
    {
      id: 2,
      src: img2,
      alt: "Certification Process",
      category: "process",
    },
    {
      id: 3,
      src: img7,
      alt: "Safety Equipment",
      category: "equipment",
    },
    {
      id: 4,
      src: img4,
      alt: "Team at Work",
      category: "team",
    },
    {
      id: 5,
      src: img11,
      alt: "Testing Procedure",
      category: "process",
    },
    {
      id: 6,
      src: img10,
      alt: "Certified Cylinders",
      category: "results",
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Filter categories
  const categories = [
    "all",
    ...new Set(galleryImages.map((img) => img.category)),
  ];

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section className="py-16 mt-30 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Gallery</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Explore our testing facility and certification process through
            photos
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
            >
              <Card
                hoverable
                cover={
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-64 w-full object-cover cursor-pointer"
                    onClick={() => openModal(image)}
                  />
                }
                bodyStyle={{ padding: "16px" }}
                className="border-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">{image.alt}</h3>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    {image.category}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        <Modal
          visible={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width="80vw"
          bodyStyle={{ padding: 0 }}
          closeIcon={
            <motion.div
              whileHover={{ rotate: 90 }}
              className="bg-white p-2 rounded-full shadow"
            >
              <X className="text-gray-800" size={20} />
            </motion.div>
          }
        >
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-medium">
                    {selectedImage.alt}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selectedImage.category.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Modal>
      </div>
    </section>
  );
};

const ImmenseCNG = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const certificationsRef = useRef(null);
  const contactRef = useRef(null);
  const galleryRef = useRef(null);

  // Smooth scroll function
  const smoothScrollTo = (id, e) => {
    // Prevent default if event is provided (for anchor tags)
    if (e) e.preventDefault();

    const element = document.getElementById(id);
    if (!element) return;

    // Close mobile menu if open
    setMenuOpen(false);

    // Calculate scroll position after menu animation completes
    const calculateAndScroll = () => {
      const header = document.querySelector("nav");
      const headerHeight = header?.offsetHeight || 80; // Default to 80px if header not found

      // Different offsets for mobile/desktop
      const offset =
        window.innerWidth < 768
          ? headerHeight + 10 // Mobile offset
          : headerHeight - 10; // Desktop offset

      const targetPosition = element.offsetTop - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 600; // Animation duration in ms
      let startTime = null;

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      // Easing function for smooth scrolling
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);

      // Update URL without page jump
      if (history.pushState) {
        history.pushState(null, null, `#${id}`);
      } else {
        window.location.hash = `#${id}`;
      }
    };

    // On mobile, wait for menu to close before scrolling
    if (window.innerWidth < 768 && menuOpen) {
      setTimeout(calculateAndScroll, 300);
    } else {
      calculateAndScroll();
    }
  };

  // Handle mobile navigation
  const handleMobileNavClick = (sectionId, e) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      smoothScrollTo(sectionId);
    }, 100); // Small delay to allow menu to close
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(".mobile-menu-container")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        smoothScrollTo(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const testimonials = [
    {
      name: "Sanjay Pawar, Nashik",
      text: "Got my CNG car cylinder tested within a day. Excellent service and genuine staff. Highly recommended!",
      rating: 5,
    },
    {
      name: "Meera Kulkarni, Industrial Client",
      text: "For fleet vehicles, Immense Testing is the most reliable and affordable solution. Certified, quick, and professional.",
      rating: 5,
    },
    {
      name: "Ravindra Shinde, Taxi Operator",
      text: "Professional testing center with all proper approvals. I trust Immense for my vehicle's safety needs!",
      rating: 5,
    },
  ];

  const services = [
    {
      title: "Hydrostatic Pressure Testing",
      description: "Checking cylinder strength and safety under pressure",
    },
    {
      title: "Visual Inspection & Defect Identification",
      description: "Detecting cracks, corrosion, and deformities",
    },
    {
      title: "Cylinder Cleaning and Painting",
      description: "Maintain appearance and prevent corrosion",
    },
    {
      title: "Stamping & Certification",
      description: "Government-mandated stamping after successful testing",
    },
    {
      title: "Documentation Assistance",
      description: "Get complete testing certificates and reports",
    },
    {
      title: "Pickup and Drop-off Service",
      description: "For Bulk Orders",
    },
  ];

  const certifications = [
    "Bureau of Indian Standards (BIS)",
    "Petroleum and Explosives Safety Organization (PESO)",
    "Approved by Ministry of Road Transport and Highways (MoRTH)",
  ];

  const processSteps = [
    {
      title: "Contact Us & Book an Appointment",
      description: "Call or WhatsApp us to schedule a testing slot.",
    },
    {
      title: "Drop Off Your CNG Cylinder",
      description:
        "Visit our center or avail our pick-up service (for bulk orders).",
    },
    {
      title: "Professional Testing & Certification",
      description:
        "Our experts perform thorough testing, cleaning, and certification as per norms.",
    },
    {
      title: "Pickup Your Certified Cylinder",
      description:
        "Get your government-approved testing certificate and use your cylinder worry-free!",
    },
  ];

  //Our Testing Process
  const ProcessImageSection = () => {
    return (
      <section className="py-8 md:py-16 bg-white ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Testing Process
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            <p className="text-base md:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Visual guide to our comprehensive CNG cylinder testing procedure
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center h-[350px] sm:h-[400px] md:h-[700px]" // Increased desktop height to 700px
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card
              className="w-full h-[400px] sm:h-[600px] md:h-[900px] max-w-6xl bg-transparent border-none shadow-none"
              hoverable
            >
              <motion.div
                className="relative w-full h-full flex items-center justify-center p-2 sm:p-4"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={aboutusimg}
                  alt="CNG Testing Process"
                  className="object-cover w-full h-full rounded-xl"
                />
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <ScrollProgress />
      <CNGFixedInfo />
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="flex items-center space-x-6">
              <img
                src={logo}
                alt="Immense CNG Logo"
                className="w-32 h-8 sm:w-40 sm:h-10 object-contain"
              />
            </div>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("home");
              }}
              className="flex items-center text-green-600 font-medium hover:text-green-700 transition"
            >
              <Home className="mr-1" size={18} /> Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("about");
              }}
              className="flex items-center text-gray-600 hover:text-green-600 transition"
            >
              <Info className="mr-1" size={18} /> About
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("services");
              }}
              className="flex items-center text-gray-600 hover:text-green-600 transition"
            >
              <Wrench className="mr-1" size={18} /> Services
            </a>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("process");
              }}
              className="flex items-center text-gray-600 hover:text-green-600 transition"
            >
              <Clock className="mr-1" size={18} /> Process
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("gallery");
              }}
              className="flex items-center text-gray-600 hover:text-green-600 transition"
            >
              <ImageIcon className="mr-1" size={18} /> Gallery
            </a>
            <a
              href="#certifications"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("certifications");
              }}
              className="flex items-center text-gray-600 hover:text-green-600 transition"
            >
              <ShieldCheck className="mr-1" size={18} /> Certifications
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("contact");
              }}
              className="flex items-center text-gray-600 hover:text-green-600 transition"
            >
              <Phone className="mr-1" size={18} /> Contact
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white overflow-hidden"
            >
              <div className="px-4 py-2 flex flex-col space-y-3">
                <a
                  href="#home"
                  onClick={(e) => handleMobileNavClick("home", e)}
                  className="flex items-center text-green-600 font-medium py-2"
                >
                  <Home className="mr-2" size={18} /> Home
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleMobileNavClick("about", e)}
                  className="flex items-center text-gray-600 py-2"
                >
                  <Info className="mr-2" size={18} /> About
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleMobileNavClick("services", e)}
                  className="flex items-center text-gray-600 py-2"
                >
                  <Wrench className="mr-2" size={18} /> Services
                </a>
                <a
                  href="#process"
                  onClick={(e) => handleMobileNavClick("process", e)}
                  className="flex items-center text-gray-600 py-2"
                >
                  <Clock className="mr-2" size={18} /> Process
                </a>
                <a
                  href="#gallery"
                  onClick={(e) => handleMobileNavClick("gallery", e)}
                  className="flex items-center text-gray-600 py-2"
                >
                  <ImageIcon className="mr-2" size={18} /> Gallery
                </a>
                <a
                  href="#certifications"
                  onClick={(e) => handleMobileNavClick("certifications", e)}
                  className="flex items-center text-gray-600 py-2"
                >
                  <ShieldCheck className="mr-2" size={18} /> Certifications
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleMobileNavClick("contact", e)}
                  className="flex items-center text-gray-600 py-2"
                >
                  <Phone className="mr-2" size={18} /> Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <ScrollContainer id="home">
        <section className="relative bg-gradient-to-r from-green-50 to-gray-100 py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Certified CNG Cylinder Testing for Your Safety and Compliance!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                At Immense CNG Cylinder Testing Company, we ensure your CNG
                cylinders are tested, certified, and 100% compliant with Indian
                Government standards. Serving all CNG users across Nashik
                District.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a
                  href="https://wa.me/918657474631" // Replace with your actual WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition flex items-center"
                >
                  Book Your Test Now <ArrowRight className="ml-2" />
                </motion.a>
                <button className="border-2 border-green-600 text-green-600 font-medium py-3 px-6 rounded-lg hover:bg-green-50 transition flex items-center">
                  Learn More <ChevronRight className="ml-2" />
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <ShieldCheck className="text-green-600 mr-2" size={18} />
                  <span className="text-sm">Govt Approved</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check className="text-green-600 mr-2" size={18} />
                  <span className="text-sm">PESO Certified</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Star className="text-green-600 mr-2" size={18} />
                  <span className="text-sm">Safety First</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-200 rounded-full opacity-50"></div>
                <div className="relative bg-white p-4 rounded-xl shadow-xl">
                  <img
                    src={heroImg}
                    alt="CNG Cylinder Testing"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollContainer>

      {/* About Section */}
      <ScrollContainer id="about">
        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                About Us
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              >
                <img
                  src={aboutusimg}
                  alt="About Immense CNG Testing"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2"
              >
                <p className="text-lg text-gray-600 mb-6">
                  At Immense CNG Cylinder Testing Company, we are committed to
                  safety, accuracy, and trust. We are proudly{" "}
                  <span className="font-semibold text-green-600">
                    approved by the Government of India
                  </span>
                  , authorized to conduct CNG cylinder testing under strict
                  compliance with PESO and BIS standards.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our mission is simple —{" "}
                  <span className="font-semibold text-green-600">
                    to ensure the safety of CNG users
                  </span>{" "}
                  by providing precise, professional, and affordable cylinder
                  testing services. Our highly trained team uses advanced
                  technology and strict protocols to guarantee the structural
                  integrity of every cylinder we test.
                </p>
                <p className="text-lg text-gray-600">
                  With Immense, you're not just testing a cylinder — you're
                  ensuring safety for yourself, your family, and your business.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollContainer>
      {/* Services Section */}
      <ScrollContainer id="services">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Services
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Wrench className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 bg-green-600 rounded-xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Why Testing is Important
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Safety Compliance</h4>
                    <p className="text-green-100">
                      Meet Government safety regulations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Insurance Requirement
                    </h4>
                    <p className="text-green-100">
                      Mandatory for insurance claims.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Performance Check</h4>
                    <p className="text-green-100">
                      Prevents leaks, accidents, and failures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Peace of Mind</h4>
                    <p className="text-green-100">
                      Confidence in the safe use of your vehicle or plant
                      equipment.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollContainer>
      {/* Process Image Section */}
      <ScrollContainer id="process">
        <ProcessImageSection />
      </ScrollContainer>
      {/* Gallery Section */}
      <ScrollContainer id="gallery">
        <GallerySection />
      </ScrollContainer>
      {/* Certifications Section */}
      <ScrollContainer id="certifications">
        <section className="py-12 sm:py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Government Certification and Compliance
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto mb-6 sm:mb-8"></div>
            </motion.div>
            {/* Certifications Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6 sm:mb-8 text-center">
                Our Official Certifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: 1,
                    title: "BIS Certification",
                    image: "/certificates/bis-certificate.jpg",
                    description: "Approved by Bureau of Indian Standards",
                  },
                  {
                    id: 2,
                    title: "PESO Approval",
                    image: "/certificates/peso-certificate.jpg",
                    description:
                      "Certified by Petroleum and Explosives Safety Organization",
                  },
                  {
                    id: 3,
                    title: "MoRTH Recognition",
                    image: "/certificates/morth-certificate.jpg",
                    description:
                      "Recognized by Ministry of Road Transport and Highways",
                  },
                  // Add more certificates as needed
                ].map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-48 sm:h-56 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-gray-600 mb-4">{cert.description}</p>
                      {/* <button
                        onClick={() => window.open(cert.image, "_blank")}
                        className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                      >
                        View Full Certificate{" "}
                        <ChevronRight className="ml-1" size={16} />
                      </button> */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Compliance Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full bg-gray-50 px-6 py-6 sm:px-8 sm:py-8 rounded-xl shadow-sm mb-12"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-4 sm:mb-6">
                Our Compliance Standards
              </h3>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white px-5 py-4 sm:px-6 sm:py-4 rounded-lg shadow-sm flex items-center min-w-[200px]"
                  >
                    <ShieldCheck className="text-green-600 mr-3" size={20} />
                    <span className="text-sm sm:text-base">{cert}</span>
                  </motion.div>
                ))}
              </div>

              {/* <p className="text-base sm:text-lg text-gray-600 mb-6">
                We strictly follow all testing procedures prescribed by
                regulatory authorities. Every cylinder tested at Immense comes
                with a{" "}
                <span className="font-semibold text-green-700">
                  valid Government-Recognized Certificate
                </span>
                .
              </p> */}

              <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6 sm:p-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Quality Assurance Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src="/images/quality-check.jpg"
                    alt="Quality Check Process"
                    className="w-full h-auto rounded-lg shadow"
                  />
                </div>
                <div>
                  <ul className="space-y-4">
                    {[
                      "Regular audits by regulatory authorities",
                      "Monthly equipment calibration",
                      "Trained and certified technicians",
                      "Digital record keeping for traceability",
                      "Third-party validation of test results",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div> */}
          </div>
        </section>
      </ScrollContainer>
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Immense?
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Government Approved Testing Center — Officially authorized and certified.",
              "State-of-the-Art Testing Equipment — Modern technology for maximum accuracy.",
              "Experienced and Certified Technicians — Experts with years of practical experience.",
              "Transparent Testing Process — No hidden charges, no delays.",
              "Quick Turnaround Time — Get testing and certification done in minimum time.",
              "Fair and Competitive Pricing — Quality testing at affordable rates.",
              "Pickup and Drop Services Available — For businesses and fleets.",
              "Trust Immense for Reliability, Quality, and Safety.",
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex items-start"
              >
                <Check className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span>{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Customer Testimonials
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < testimonials[activeTestimonial].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <p className="font-semibold text-gray-800">
                  — {testimonials[activeTestimonial].name}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <ScrollContainer id="contact">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Contact Us
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 bg-gray-50 p-8 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Visit Us</h4>
                      <p className="text-gray-600">
                        Plot No 549, Gonde Dumala, Gonde Phata, Behind Indian
                        Oil Petrol Pump, Opposite Shalimar Paints, Mumbai Agra
                        Highway, Nashik, Maharashtra 422403
                      </p>
                      <a
                        href="https://maps.google.com/?q=Plot No 549, Gonde Dumala, Gonde Phata, Nashik, Maharashtra 422403"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 text-sm hover:underline"
                      >
                        View on Map
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Call Us</h4>
                      <a
                        href="tel:+918657474631"
                        className="text-gray-600 hover:underline block"
                      >
                        +91 8657474631
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Email Us</h4>
                      <a
                        href="mailto:info@immensecngtesting.com"
                        className="text-gray-600 hover:underline block"
                      >
                        info@immensecngtesting.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageSquare className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">WhatsApp Us</h4>
                      <p className="text-gray-600">+91 8657474631</p>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://wa.me/918657474631"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition inline-flex items-center"
                      >
                        Start Chat Now{" "}
                        <MessageSquare className="ml-2" size={18} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium text-gray-800 mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/immense.cngcylinder.testingcompany/"
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://www.instagram.com/immense.cng.testing "
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition"
                    >
                      <Linkedin />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Send us a Message
                  </h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const { name, email, phone, message } =
                        Object.fromEntries(formData);

                      // Format message for WhatsApp with proper line breaks
                      const whatsappMessage =
                        `New Inquiry from Website:\n\n` +
                        `*Name:* ${name}\n` +
                        `*Email:* ${email}\n` +
                        `*Phone:* ${phone}\n` +
                        `*Message:* ${message}\n\n` +
                        `_Sent via Immense CNG Website_`;

                      // Encode the message for URL (preserving newlines)
                      const encodedMessage = encodeURIComponent(whatsappMessage)
                        .replace(/%20/g, " ")
                        .replace(/%2A/g, "*")
                        .replace(/%5F/g, "_")
                        .replace(/%0A/g, "%0A"); // Keep newlines as %0A

                      // Open WhatsApp with pre-filled message
                      window.open(
                        `https://wa.me/918657474631?text=${encodedMessage}`,
                        "_blank"
                      );

                      // Optional: Reset form after submission
                      e.target.reset();
                    }}
                  >
                    {/* Form fields remain the same as before */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Enter your name"
                        required
                        minLength={2}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Enter your phone number"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit phone number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Enter your message"
                        required
                        minLength={10}
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={18} />
                      Send via WhatsApp
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 rounded-xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.230799582921!2d73.66918861064684!3d19.83090572776362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebbd9079ce8f%3A0x4185b46ae7489dfd!2sImmense%20Cylinder%20Testing%20Company!5e1!3m2!1sen!2sin!4v1746169455969!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl shadow-md"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </ScrollContainer>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  IC
                </div>
                <span className="text-xl font-bold">Immense CNG Testing</span>
              </div>
              <p className="text-gray-400 mb-4">
                Government approved CNG cylinder testing center serving Nashik
                District with certified, reliable testing services.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/immense.cngcylinder.testingcompany/"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Facebook />
                </a>
                <a
                  href="https://www.instagram.com/immense.cng.testing "
                  className="text-gray-400 hover:text-white transition"
                >
                  <Instagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Linkedin />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("home");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("about");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("services");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("process");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Process
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("gallery");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#certifications"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("certifications");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Certifications
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo("contact");
                    }}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.slice(0, 4).map((service, index) => (
                  <li
                    key={index}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="mt-1 mr-3 flex-shrink-0" size={16} />
                  <span>
                    Plot No 549 , Gonde Dumala , Gonde Phata , Behind Indian Oil
                    Petrol pump Opposite Shalimar Paints , Mumbai Agra Highway
                    Nashik, Maharashtra 422403
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 flex-shrink-0" size={16} />
                  <span>+91 8657474631</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 flex-shrink-0" size={16} />
                  <span>info@immensecngtesting.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Immense CNG Cylinder Testing
              Company. All Rights Reserved.
            </p>
            <p className="mt-2 text-sm">
              Approved by Government of India | PESO Certified | BIS Standards
              Compliant
            </p>
            <p className="text-sm text-gray-600 font-medium">
              Developed by{" "}
              <a
                href="https://www.richsol.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                Rich System Solutions Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImmenseCNG;
