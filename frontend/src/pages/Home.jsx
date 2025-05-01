import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import About from './About';
import Project from './Project';


const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-4rem)] max-w-full bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-block p-4 bg-indigo-100 rounded-full mb-8"
          >
            <Bot className="h-12 w-12 text-indigo-600" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl mb-6">
            Your Personal Health Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the future of healthcare with our AI-powered disease prediction system.
            Simply input your symptoms, and let our advanced algorithm guide you towards understanding
            your potential health conditions.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/project"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
            >
              Explore HealMate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              title: 'Quick & Accurate',
              description: 'Get instant predictions based on your symptoms using advanced AI algorithms.'
            },
            {
              title: 'User-Friendly',
              description: 'Simple interface designed for easy symptom input and clear results.'
            },
            {
              title: 'Privacy First',
              description: 'Your health data is handled with utmost privacy and security.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[calc(100vh-4rem)] max-w-full bg-transparent py-12 px-4 sm:px-6 lg:px-8"
      >
        <About />
        <Project />
      </motion.div>

    </motion.div>
  );
};

export default Home;