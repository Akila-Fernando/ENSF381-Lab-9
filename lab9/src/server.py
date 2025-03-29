from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

users = [
    {"username": "alice", "password": "password123"},
    {"username": "bob", "password": "secure456"},
    {"username": "charlie", "password": "qwerty789"},
    {"username": "diana", "password": "hunter2"},
    {"username": "eve", "password": "passpass"},
    {"username": "frank", "password": "letmein"},
    {"username": "grace", "password": "trustno1"},
    {"username": "heidi", "password": "admin123"},
    {"username": "ivan", "password": "welcome1"},
    {"username": "judy", "password": "password1"}
]

@app.route('/validate_login', methods=['POST'])
def validate_login():
     data = request.get_json()
     entered_username = data.get('username')
     entered_password = data.get('password')

     for user in users:
          if user['username'] == entered_username and user['password'] == entered_password:
               return jsonify({"success": True, "message": "Login Successfull"})
          
     return jsonify({"success": False, "message": "Invalid username or password"})

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
        model = joblib.load("random_forest_model.pkl") 
        
        data = request.json 
        
        cats = True if 'pets' in data and data['pets'] else False 
        dogs = True if 'pets' in data and data['pets'] else False 
        
        sample_data = [ 
        data['city'], 
        data['province'], 
        float(data['latitude']), 
        float(data['longitude']), 
        data['lease_term'], 
        data['type'], 
        float(data['beds']), 
        float(data['baths']), 
        float(data['sq_feet']), 
        data['furnishing'], 
        data['smoking'], 
        cats, 
        dogs 
        ] 
        
        sample_df = pd.DataFrame([sample_data], columns=[ 
        'city', 'province', 'latitude', 'longitude', 'lease_term', 
        'type', 'beds', 'baths', 'sq_feet', 'furnishing', 
        'smoking', 'cats', 'dogs' 
        ]) 
        
        predicted_price = model.predict(sample_df) 
        
        return jsonify({"predicted_price": float(predicted_price[0])})

if __name__ == '__main__':
  app.run(debug=True)