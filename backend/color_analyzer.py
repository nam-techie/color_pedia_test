import pandas as pd
from deep_translator import GoogleTranslator

# Load dữ liệu một lần khi khởi động
df = pd.read_parquet("color_pedia.parquet")

def hex_to_rgb(hex_code: str):
    hex_code = hex_code.strip("#")
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def find_closest_color(hex_input: str):
    try:
        r, g, b = hex_to_rgb(hex_input)
    except:
        return None, None
    df["distance"] = ((df["R"] - r)**2 + (df["G"] - g)**2 + (df["B"] - b)**2)**0.5
    closest = df.nsmallest(1, "distance").iloc[0]
    return closest, closest["distance"]

def vi(text):
    try:
        return GoogleTranslator(source='auto', target='vi').translate(text)
    except:
        return text  # fallback nếu lỗi dịch

def analyze_color(user_input: str):
    user_input = user_input.strip().lower()
    match_name = df[df["Color Name"].str.lower() == user_input]
    match_hex = df[df["HEX Code"].str.lower() == user_input]
    result = pd.concat([match_name, match_hex])

    if not result.empty:
        row = result.iloc[0]
        note = ""
    else:
        row, _ = find_closest_color(user_input)
        if row is None:
            return f"❌ Định dạng màu không hợp lệ: '{user_input}'"
        note = f"⚠️ Không tìm thấy màu '{user_input}' trong cơ sở dữ liệu.\n👉 Màu gần nhất là:\n"

    # --- Dữ liệu tiếng Anh gốc ---
    english = f"""
🎨 Color: {row['Color Name']} ({row['HEX Code']})
📂 Category: {row['Category']}
🔮 Personality: {row['Personality']}
💭 Emotion: {row['Emotion']}
😌 Mood: {row['Mood']}
🔗 Symbolism: {row['Symbolism']}
🧠 Description: {row['Description']}
📦 Use Case: {row['Use Case']}
🔑 Keywords: {row['Keywords']}
"""

    # --- Dữ liệu dịch sang tiếng Việt ---
    vietnamese = f"""
🎨 Màu: {vi(row['Color Name'])} ({row['HEX Code']})
📂 Nhóm màu: {vi(row['Category'])}
🔮 Tính cách: {vi(row['Personality'])}
💭 Cảm xúc: {vi(row['Emotion'])}
😌 Tâm trạng: {vi(row['Mood'])}
🔗 Biểu tượng: {vi(row['Symbolism'])}
🧠 Mô tả: {vi(row['Description'])}
📦 Ứng dụng: {vi(row['Use Case'])}
🔑 Từ khoá: {vi(row['Keywords'])}
"""

    return f"""{note}
🔤 English:{english}

🌐 Vietnamese:{vietnamese}
"""
