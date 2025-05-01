from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

app = Flask(__name__)
CORS(app)

# ✅ Load from Hugging Face
model_name = "Simha10/healmate-model"
print(f"Loading model from Hugging Face: {model_name}")
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)
print("Model loaded.")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    input_text = ' '.join(symptoms)
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    with torch.no_grad():
        output_ids = model.generate(input_ids)
        output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return jsonify({"prediction": output_text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)





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