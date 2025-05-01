import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Search, AlertCircle, Loader2 } from 'lucide-react';

// Common symptoms for demonstration
const commonSymptoms = [
  'itching', 'skin rash', 'nodal skin eruptions', 'continuous sneezing', 'shivering', 'chills', 'joint pain',
  'stomach pain', 'acidity', 'ulcers on tongue', 'muscle wasting', 'vomiting', 'burning micturition', 
  'spotting urination', 'fatigue', 'weight gain', 'anxiety', 'cold hands and feet', 'mood swings', 
  'weight loss', 'restlessness', 'lethargy', 'patches in throat', 'irregular sugar level', 'cough', 
  'high fever', 'sunken eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 
  'yellowish skin', 'dark urine', 'nausea', 'loss of appetite', 'pain behind the eyes', 'back pain', 
  'constipation', 'abdominal pain', 'diarrhea', 'mild fever', 'yellow urine', 'yellowing of eyes', 
  'acute liver failure', 'fluid overload', 'swelling of stomach', 'swollen lymph nodes', 'malaise', 
  'blurred and distorted vision', 'phlegm', 'throat irritation', 'redness of eyes', 'sinus pressure', 
  'runny nose', 'congestion', 'chest pain', 'weakness in limbs', 'fast heart rate', 
  'pain during bowel movements', 'pain in anal region', 'bloody stool', 'irritation in anus', 
  'neck pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen legs', 'swollen blood vessels', 
  'puffy face and eyes', 'enlarged thyroid', 'brittle nails', 'swollen extremities', 'excessive hunger', 
  'extra marital contacts', 'drying and tingling lips', 'slurred speech', 'knee pain', 'hip joint pain', 
  'muscle weakness', 'stiff neck', 'swelling joints', 'movement stiffness', 'spinning movements', 
  'loss of balance', 'unsteadiness', 'weakness of one body side', 'loss of smell', 'bladder discomfort', 
  'foul smell of urine', 'continuous feel of urine', 'passage of gases', 'internal itching', 
  'toxic look (typhos)', 'depression', 'irritability', 'muscle pain', 'altered sensorium', 
  'red spots over body', 'belly pain', 'abnormal menstruation', 'dischromic patches', 'watering from eyes', 
  'increased appetite', 'polyuria', 'family history', 'mucoid sputum', 'rusty sputum', 
  'lack of concentration', 'visual disturbances', 'receiving blood transfusion', 
  'receiving unsterile injections', 'coma', 'stomach bleeding', 'distention of abdomen', 
  'history of alcohol consumption', 'blood in sputum', 'prominent veins on calf', 'palpitations', 
  'painful walking', 'pus filled pimples', 'blackheads', 'scarring', 'skin peeling', 
  'silver like dusting', 'small dents in nails', 'inflammatory nails', 'blister', 'red sore around nose', 
  'yellow crust ooze', 'prognosis', 'treatment'
];


function Project() {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSymptoms(value);

    // Filter symptoms for dropdown
    if (value.trim()) {
      const lastSymptom = value.split(',').pop()?.trim().toLowerCase() || '';
      const filtered = commonSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(lastSymptom)
      );
      setFilteredSymptoms(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSymptomSelect = (symptom) => {
    const symptomsArray = symptoms.split(',').map(s => s.trim());
    symptomsArray.pop(); // Remove the last (incomplete) symptom
    setSymptoms([...symptomsArray, symptom].join(', '));
    setShowDropdown(false);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setError('');
    setPrediction('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        symptoms: symptoms.split(',').map((s) => s.trim()),
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError('Error getting prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300 rounded-3xl  p-6"
    >
      <div className="max-w-2xl mx-auto my-30 p-8 bg-gradient-to-br from-indigo-200 to-blue-400 rounded-lg shadow-lg border border-gray-200">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-10 h-10 text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Disease Predictor</h1>
          </div>
          <p className="text-gray-600">Enter your symptoms to get a prediction</p>
        </motion.div>

        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter minimum 3 symptoms to get perfect prediction (comma separated)"
              value={symptoms}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white shadow-sm"
            />
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
              >
                {filteredSymptoms.map((symptom) => (
                  <motion.button
                    key={symptom}
                    whileHover={{ backgroundColor: '#F3F4F6' }}
                    onClick={() => handleSymptomSelect(symptom)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {symptom}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePredict}
          disabled={isLoading || !symptoms.trim()}
          className={`w-full py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 
            ${isLoading || !symptoms.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'} 
            text-white transition-all duration-200`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Get Prediction'
          )}
        </motion.button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}

          {prediction && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-6 bg-blue-100 rounded-lg shadow-md border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Prediction Result</h2>
              <p className="text-gray-600">{prediction}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Project;