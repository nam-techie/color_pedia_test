# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from color_analyzer import analyze_color
# # from music_suggester import suggest_music

# app = Flask(__name__)
# CORS(app)

# @app.route("/analyze", methods=["POST"])
# def analyze():
#     data = request.json
#     color = data.get("color")
#     result = analyze_color(color)
#     return jsonify({"result": result})

# @app.route("/recommend-music", methods=["POST"])
# def recommend_music():
#     data = request.json  # Nhận: {"emotion": "...", "mood": "...", ...}
#     try:
#         response = suggest_music(data)
#         return jsonify({"result": response})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


from flask import Flask, request, jsonify
from flask_cors import CORS
from color_analyzer import analyze_color

app = Flask(__name__)
CORS(app)  # 👈 Thêm dòng này

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    color = data.get("color")
    result = analyze_color(color)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)


