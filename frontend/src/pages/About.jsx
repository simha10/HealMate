import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Brain, Users } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-4rem)]  bg-gradient-to-r from-blue-300 to-violet-300 rounded-3xl py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About HealMate</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HealMate is an innovative disease prediction system that leverages advanced AI 
            to help users understand potential health conditions based on their symptoms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, accurate, and quick health insights through AI-powered 
              disease prediction, empowering users to make informed decisions about their health.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To revolutionize preliminary health assessment through technology, making it 
              more accessible and efficient for everyone.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: <Brain className="h-8 w-8 text-indigo-600" />,
              title: 'AI-Powered',
              description: 'Advanced machine learning algorithms for accurate predictions'
            },
            {
              icon: <Shield className="h-8 w-8 text-indigo-600" />,
              title: 'Secure',
              description: 'Your health data is protected with enterprise-grade security'
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-indigo-600" />,
              title: 'Accurate',
              description: 'High accuracy rate in preliminary disease prediction'
            },
            {
              icon: <Users className="h-8 w-8 text-indigo-600" />,
              title: 'User-Centric',
              description: 'Designed with user experience as the top priority'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;