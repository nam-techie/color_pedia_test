# 🎨 AI Color Personality Analyzer

Ứng dụng web phân tích tính cách từ màu sắc sử dụng công nghệ AI và machine learning. Khám phá ý nghĩa sâu sắc, tính cách và cảm xúc ẩn giấu trong từng màu sắc yêu thích của bạn.

![Demo App](https://via.placeholder.com/800x400/6366f1/ffffff?text=AI+Color+Personality+Analyzer)

## ✨ Tính năng nổi bật

- 🎨 **Color Picker thông minh** - Chọn màu trực quan với HexColorPicker
- 🔮 **Phân tích AI** - Phân tích tính cách, cảm xúc và ý nghĩa từ màu sắc
- 🌐 **Đa ngôn ngữ** - Hỗ trợ tiếng Anh và tiếng Việt
- 🎭 **Bảng màu thông minh** - Tự động tạo bảng màu hài hòa
- 📚 **Lịch sử màu sắc** - Lưu trữ và quản lý màu đã phân tích
- 🌙 **Dark/Light mode** - Chuyển đổi giao diện theo sở thích
- 📱 **Responsive design** - Tối ưu cho mọi thiết bị
- ✨ **Animations mượt mà** - Giao diện sinh động với Framer Motion

## 🏗️ Kiến trúc hệ thống

```
color_pedia_test/
├── backend/                 # Flask API Server
│   ├── app.py              # Main Flask application
│   ├── color_analyzer.py   # Core color analysis logic
│   ├── main.py            # CLI interface
│   ├── color_pedia.parquet # Color dataset
│   └── requirements.txt    # Python dependencies
├── frontend/               # React Web Application  
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── components/    # React components
│   │   └── *.css         # Styling files
│   ├── public/           # Static assets
│   └── package.json      # Node.js dependencies
└── .github/workflows/    # CI/CD pipelines
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- **Python 3.8+**
- **Node.js 16+** 
- **npm hoặc yarn**
- **Git**

### 1. Clone repository
```bash
git clone <repository-url>
cd color_pedia_test
```

### 2. Cài đặt Backend (Flask)

```bash
# Di chuyển vào thư mục backend
cd backend

# Tạo virtual environment (khuyến nghị)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate     # Windows

# Cài đặt dependencies
pip install -r requirements.txt

# Tải dataset (nếu chưa có)
# Tải file color_pedia.parquet từ:
# https://huggingface.co/datasets/boltuix/color-pedia/blob/main/color_pedia.parquet
# Đặt vào thư mục backend/
```

### 3. Cài đặt Frontend (React)

```bash
# Di chuyển vào thư mục frontend
cd ../frontend

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### 4. Chạy ứng dụng

#### Chạy Backend (Terminal 1)
```bash
cd backend
python app.py
# Server sẽ chạy tại: http://localhost:5000
```

#### Chạy Frontend (Terminal 2)  
```bash
cd frontend
npm start
# hoặc 
yarn start
# Ứng dụng web sẽ mở tại: http://localhost:3000
```

## 📖 Hướng dẫn sử dụng

### 1. Chọn màu sắc
- Sử dụng **Color Picker** để chọn màu yêu thích
- Hoặc nhấn **🔄 Random** để chọn màu ngẫu nhiên
- Copy mã hex bằng cách click vào mã màu

### 2. Phân tích màu sắc
- Nhấn nút **⚡ Phân tích màu sắc**
- Chờ AI phân tích (khoảng 1-2 giây)
- Xem kết quả phân tích chi tiết

### 3. Khám phá thêm
- Xem **bảng màu gợi ý** được tạo tự động
- Duyệt **lịch sử màu** đã phân tích
- Chuyển đổi **theme sáng/tối**

## 🔧 API Documentation

### POST `/analyze`
Phân tích màu sắc và trả về thông tin chi tiết.

**Request:**
```json
{
  "color": "#6366f1"
}
```

**Response:**
```json
{
  "result": "🎨 Màu: Indigo (#6366f1)\n📂 Nhóm màu: Blue\n🔮 Tính cách: Creative, Intuitive\n💭 Cảm xúc: Calm, Focused\n😌 Tâm trạng: Peaceful\n🔗 Biểu tượng: Wisdom, Spirituality\n🧠 Mô tả: A deep purple-blue that inspires creativity\n📦 Ứng dụng: Design, Meditation\n🔑 Từ khoá: wisdom, intuition, creativity"
}
```

## 🛠️ Development

### Scripts có sẵn

#### Frontend
```bash
npm start          # Chạy development server
npm run build      # Build production
npm test           # Chạy tests
npm run lint       # Kiểm tra code style
npm run format     # Format code với Prettier
```

#### Backend
```bash
python app.py      # Chạy Flask server
python main.py     # Chạy CLI interface
```

### Cấu trúc dữ liệu Color Dataset

Dataset chứa các trường thông tin:
- **Color Name**: Tên màu (ví dụ: "Deep Ocean Blue")
- **HEX Code**: Mã hex (#1e3a8a)
- **R, G, B**: Giá trị RGB
- **Category**: Nhóm màu (Blue, Red, Green...)
- **Personality**: Tính cách liên quan
- **Emotion**: Cảm xúc
- **Mood**: Tâm trạng
- **Symbolism**: Biểu tượng
- **Description**: Mô tả chi tiết
- **Use Case**: Trường hợp sử dụng
- **Keywords**: Từ khóa

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test                    # Chạy unit tests
npm run test:coverage      # Test với coverage report
npm run test:e2e          # End-to-end tests
```

### Backend Testing
```bash
cd backend
python -m pytest          # Chạy Python tests
python -m pytest --cov    # Test với coverage
```

## 🚢 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build Docker image (nếu có)
docker build -t color-analyzer .
docker run -p 3000:3000 -p 5000:5000 color-analyzer
```

### Environment Variables
Tạo file `.env` trong thư mục gốc:
```env
# Backend
FLASK_ENV=production
FLASK_DEBUG=False
DATABASE_URL=your_database_url

# Frontend  
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=production
```

## 🐛 Troubleshooting

### Lỗi thường gặp

#### 1. "CORS error" khi gọi API
```bash
# Đảm bảo backend đang chạy tại port 5000
cd backend
python app.py
```

#### 2. "Module not found" khi chạy backend
```bash
# Cài đặt lại dependencies
pip install -r requirements.txt
```

#### 3. "color_pedia.parquet not found"
```bash
# Tải dataset từ HuggingFace
wget https://huggingface.co/datasets/boltuix/color-pedia/resolve/main/color_pedia.parquet
mv color_pedia.parquet backend/
```

#### 4. Frontend không kết nối được backend
- Kiểm tra backend đang chạy tại `http://localhost:5000`
- Kiểm tra CORS được cấu hình đúng trong `app.py`
- Kiểm tra firewall/antivirus không block port 5000

### Debug mode
```bash
# Backend debug
cd backend
export FLASK_DEBUG=1  # Linux/Mac
set FLASK_DEBUG=1     # Windows
python app.py

# Frontend debug
cd frontend
npm start             # Tự động có hot reload
```

## 🤝 Contributing

1. Fork repository này
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

### Code Style Guidelines
- **Frontend**: ESLint + Prettier
- **Backend**: PEP 8 + Black formatter
- **Commits**: Conventional Commits format

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [HuggingFace Color Pedia Dataset](https://huggingface.co/datasets/boltuix/color-pedia)
- [React Colorful](https://github.com/omgovich/react-colorful)
- [Framer Motion](https://www.framer.com/motion/)
- [Flask](https://flask.palletsprojects.com/)
- [Deep Translator](https://github.com/nidhaloff/deep-translator)

## 📞 Liên hệ

- **Author**: Your Name
- **Email**: your.email@example.com
- **Project Link**: [https://github.com/username/color-pedia-test](https://github.com/username/color-pedia-test)

---

Made with ❤️ and 🎨 by [Your Name]
