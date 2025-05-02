from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import os

app = Flask(__name__)
# Enable CORS, restrict to frontend URL in production
CORS(app, resources={r"/predict": {"origins": "*"}})  # Replace "*" with Vercel URL after deployment

# Load the trained model from Hugging Face Hub
model_name = "Simha10/healmate-model"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400
    
    # Validate input (e.g., ensure symptoms are strings and not too long)
    if not all(isinstance(s, str) for s in symptoms):
        return jsonify({"error": "Symptoms must be strings"}), 400
    if len(' '.join(symptoms)) > 512:  # Arbitrary limit to prevent abuse
        return jsonify({"error": "Input too long"}), 400

    input_text = ' '.join(symptoms)
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    try:
        with torch.no_grad():
            output_ids = model.generate(input_ids, max_length=200)  # Limit output length
            output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        return jsonify({"prediction": output_text})
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == '__main__':
    # Use Render-assigned PORT if available, otherwise default to 5000 for local
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)  # Removed debug=True




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from transformers import T5Tokenizer, T5ForConditionalGeneration
# import torch

# app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend communication

# # Load the trained model
# tokenizer = T5Tokenizer.from_pretrained(r"D:\HealMate\backend\t5_disease_treatment_model")
# model = T5ForConditionalGeneration.from_pretrained(r"D:\HealMate\backend\t5_disease_treatment_model")

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json
#     symptoms = data.get("symptoms", [])

#     if not symptoms:
#         return jsonify({"error": "No symptoms provided"}), 400

#     input_text = ' '.join(symptoms)
#     input_ids = tokenizer.encode(input_text, return_tensors="pt")

#     with torch.no_grad():
#         output_ids = model.generate(input_ids)
#         output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

#     return jsonify({"prediction": output_text})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)