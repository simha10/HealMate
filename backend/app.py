from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for API route
# Update origins to your frontend domain (e.g., "https://healmate.vercel.app")
CORS(app, resources={r"/predict": {"origins": "*"}})

# Hugging Face model name (already hosted on HF Hub)
MODEL_NAME = "Simha10/healmate-model"

# Load model and tokenizer only once when server starts
try:
    print("Loading model and tokenizer from Hugging Face Hub...")
    tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
    model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME)
    print("Model loaded successfully!")
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    raise RuntimeError("Could not load model or tokenizer.") from e


@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint to predict treatment based on symptoms
    """
    data = request.json
    symptoms = data.get("symptoms", [])

    # Validate input
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400
    if not isinstance(symptoms, list) or not all(isinstance(s, str) for s in symptoms):
        return jsonify({"error": "Symptoms must be a list of strings"}), 400
    if len(' '.join(symptoms)) > 512:  # Prevent abuse with very large inputs
        return jsonify({"error": "Input too long"}), 400

    # Prepare input for T5 model
    input_text = ' '.join(symptoms)
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    try:
        # Generate prediction
        with torch.no_grad():
            output_ids = model.generate(input_ids, max_length=200)
            output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

        return jsonify({"prediction": output_text})
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route('/', methods=['GET'])
def health_check():
    """
    Simple route to verify the backend is working
    """
    return jsonify({"message": "HealMate backend is up and running!"})


if __name__ == '__main__':
    # Render dynamically assigns the PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
