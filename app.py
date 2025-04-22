from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Sample user data (replace this with actual database logic)
users = {
    "user@example.com": {
        "password": "password123",  # In real apps, hash the password!
    }
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email in users and users[email]['password'] == password:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # In reality, you'd add the user to a database here
    users[email] = {'name': name, 'password': password}  # Save the user data

    return jsonify({"success": True, "message": "Signup successful"})

if __name__ == "__main__":
    app.run(debug=True)  # Run on http://localhost:5000
