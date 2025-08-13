# 🏥 Healthcare Virtual Queue System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.80.2-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange.svg)
![HeroUI](https://img.shields.io/badge/HeroUI-2.8.2-purple.svg)

_Hệ thống quản lý hàng đợi y tế chuyên nghiệp với giao diện glassmorphism hiện đại_

</div>

---

## 📖 Tổng quan

**Healthcare Virtual Queue System** là hệ thống quản lý hàng đợi y tế toàn diện, gồm hai thành phần chính:

- **🌐 Web Application**: Giao diện quản lý cho nhân viên y tế (Next.js + HeroUI)
- **📱 Mobile Application**: Ứng dụng đăng ký cho bệnh nhân (React Native + GluestackUI)
- **🔥 Backend**: Firebase Realtime Database + Authentication

Hệ thống được thiết kế với giao diện glassmorphism hiện đại, đồng bộ dữ liệu real-time và tối ưu trải nghiệm người dùng.

### ✨ Tính năng chính

#### 🌐 Web Application (Management Portal)

- 🔐 **Xác thực**: Đăng nhập bảo mật với Firebase Auth
- 📊 **Dashboard**: Quản lý hàng đợi với glassmorphism design
- 📈 **Thống kê**: Hiển thị số lượng chờ, hoàn thành real-time
- 🔍 **Tìm kiếm**: Lọc bệnh nhân theo tên, số điện thoại
- 📺 **Display Screen**: Màn hình hiển thị số hiện tại cho bệnh nhân
- ⚡ **Điều khiển**: Chuyển số kế tiếp, reset hệ thống

#### 📱 Mobile Application (Patient App)

- 📝 **Đăng ký**: Form nhập thông tin bệnh nhân và lấy số thứ tự
- 🔢 **Theo dõi**: Hiển thị số thứ tự và vị trí trong hàng đợi
- 🔄 **Real-time**: Cập nhật tức thì từ Firebase
- 🚫 **Bảo mật**: Khóa navigation sau khi đăng ký (tránh gian lận)
- 📱 **UI/UX**: Giao diện thân thiện với GluestackUI

## � Công nghệ sử dụng

### Web Stack

| Công nghệ     | Version  | Mục đích                |
| ------------- | -------- | ----------------------- |
| Next.js       | 15.4.6   | React framework với SSR |
| HeroUI        | 2.8.2    | UI component library    |
| Tailwind CSS  | Latest   | Styling framework       |
| Framer Motion | 12.23.12 | Animations              |
| Firebase      | 12.0.0   | Backend services        |

### Mobile Stack

| Công nghệ        | Version | Mục đích                 |
| ---------------- | ------- | ------------------------ |
| React Native     | 0.80.2  | Cross-platform framework |
| GluestackUI      | 1.1.73  | Native UI components     |
| React Navigation | 6.1.9   | Navigation system        |
| Firebase         | Latest  | Real-time database       |

## 🚀 Cài đặt và thiết lập

### Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **Git**
- **Firebase project** với Authentication + Realtime Database

### Bước 1: Clone repository

```bash
git clone https://github.com/manhnguyenit182/virtual-queue-app.git
cd virtual-queue-app
```

### Bước 2: Cấu hình Firebase

1. Tạo Firebase project tại [Firebase Console](https://console.firebase.google.com)
2. Kích hoạt **Authentication** (Email/Password) và **Realtime Database**
3. Cấu hình Database Rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "queue": {
      ".indexOn": ["timestamp", "status"]
    },
    "current": { ".read": true },
    "lastNumber": { ".read": true }
  }
}
```

4. Tạo tài khoản admin đầu tiên trong Authentication
5. Lấy Firebase config và cập nhật vào project

### Bước 3: Web Application

```bash
cd doc-queue
npm install

# Cập nhật Firebase config trong lib/firebase.ts
npm run dev
# Mở http://localhost:3000
```

### Bước 4: Mobile Application

```bash
cd queue-app
npm install

# Thêm Firebase config files:
# - Android: google-services.json vào android/app/
# - iOS: GoogleService-Info.plist vào ios/

npm start
npm run android  # hoặc npm run ios
```

## 📊 Cấu trúc Database

```json
{
  "queue": {
    "0": {
      "name": "Nguyễn Văn A",
      "phone": "0123456789",
      "timestamp": 1642567890123,
      "status": "waiting"
    },
    "1": {
      "name": "Lê Thị B",
      "phone": "0987654321",
      "timestamp": 1642567895123,
      "status": "current"
    }
  },
  "current": 1, // Số hiện tại đang được phục vụ
  "lastNumber": 1 // Số cuối cùng được tạo
}
```

### Status Values

- `waiting`: Đang chờ đợi
- `current`: Đang được phục vụ
- `completed`: Đã hoàn thành

## 🔧 Development

### Available Scripts

**Web App (`doc-queue/`)**

```bash
npm run dev     # Development server
npm run build   # Production build
npm start       # Start production
npm run lint    # Code linting
```

**Mobile App (`queue-app/`)**

```bash
npm start       # Metro bundler
npm run android # Run Android
npm run ios     # Run iOS (macOS only)
npm test        # Run tests
npm run lint    # ESLint check
```

### Project Structure

```
virtual-queue-app/
├── doc-queue/                    # Next.js Web Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── manage/           # Management dashboard
│   │   │   ├── screen/           # Display screen
│   │   │   └── page.tsx          # Login page
│   │   ├── components/
│   │   │   └── LoginForm.tsx     # Login component
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx   # Auth context
│   │   └── lib/
│   │       └── firebase.ts       # Firebase config
│   └── public/                   # Static assets
└── queue-app/                    # React Native Mobile App
    ├── src/
    │   ├── components/
    │   │   ├── AddToQueue.tsx    # Registration form
    │   │   ├── Header.tsx        # App header
    │   │   └── QueueNumberSimple.tsx # Queue display
    │   └── services/
    │       └── FirebaseService.ts # Firebase service
    ├── App.tsx                   # Main app component
    ├── android/                  # Android specific
    └── ios/                      # iOS specific
```

### Tính năng chi tiết

#### Web App Routes

- `/` - Trang đăng nhập với glassmorphism design
- `/manage` - Dashboard quản lý hàng đợi với real-time table
- `/screen` - Màn hình hiển thị số hiện tại (cho bệnh nhân xem)

#### Mobile App Flow

1. **Landing Screen**: Form nhập tên và số điện thoại
2. **Validation**: Kiểm tra dữ liệu hợp lệ
3. **Firebase Integration**: Thêm vào database và nhận số thứ tự
4. **Queue Display**: Hiển thị số được cấp và vị trí hiện tại
5. **Lock Navigation**: Không cho phép quay lại (đảm bảo tính công bằng)

## 🚀 Deployment

### Web Application

#### Vercel (Recommended)

```bash
npm i -g vercel
cd doc-queue
vercel
```

#### Manual Build

```bash
cd doc-queue
npm run build
# Upload build files to hosting service
```

### Mobile Application

#### Android APK

```bash
cd queue-app/android
./gradlew assembleRelease
# APK tại: android/app/build/outputs/apk/release/
```

#### iOS (macOS only)

```bash
cd queue-app/ios
open VirtualQueueApp.xcworkspace
# Build và archive qua Xcode
```

## 🐛 Troubleshooting

### Common Issues

- **Firebase connection**: Kiểm tra API keys và network
- **Metro bundler**: Clear cache với `npx react-native start --reset-cache`
- **Android build**: Clean build với `cd android && ./gradlew clean`
- **Authentication**: Verify Firebase Auth configuration

### Development Tips

- Sử dụng React DevTools cho web debugging
- Dùng Flipper cho React Native debugging
- Check Firebase Console để monitor real-time changes
- Use `adb logcat` cho Android logs

## 👨‍💻 Author

**Manh Nguyen**

- GitHub: [@manhnguyenit182](https://github.com/manhnguyenit182)
- Email: manhnguyenit182@gmail.com

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/manhnguyenit182">Manh Nguyen</a></p>
  <p>© 2025 Healthcare Virtual Queue System</p>
</div>

### Mobile App

```bash
cd queue-app
npm install
npm start
npm run android  # hoặc npm run ios
```

### Firebase Setup

1. Tạo Firebase project
2. Bật Authentication (Email/Password) và Realtime Database
3. Cấu hình Database Rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "current": { ".read": true },
    "lastNumber": { ".read": true }
  }
}
```

4. Thêm config vào `lib/firebase.ts` (web) và platform files (mobile)

## 📊 Cấu trúc Database

```json
{
  "queue": {
    "0": {
      "name": "Nguyễn Văn A",
      "phone": "0123456789",
      "timestamp": 1642567890123,
      "status": "waiting" // waiting | current | completed
    }
  },
  "current": 0, // Số hiện tại đang phục vụ
  "lastNumber": 0 // Số cuối cùng được tạo
}
```

## 🛠 Development

### Available Scripts

**Web App (`doc-queue/`)**

```bash
npm run dev     # Development server
npm run build   # Production build
npm start       # Start production
```

**Mobile App (`queue-app/`)**

```bash
npm start       # Metro bundler
npm run android # Run Android
npm run ios     # Run iOS
```

### Project Structure

```
├── doc-queue/           # Next.js Web App
│   ├── src/app/
│   │   ├── manage/      # Management dashboard
│   │   └── screen/      # Display screen
│   ├── components/      # React components
│   └── lib/firebase.ts  # Firebase config
└── queue-app/           # React Native Mobile App
    ├── src/components/  # RN components
    └── App.tsx          # Main app
```

## 🚀 Deployment

### Web (Vercel)

```bash
cd doc-queue
vercel
```

### Mobile (Android APK)

```bash
cd queue-app/android
./gradlew assembleRelease
```

## 👨‍💻 Author

**Manh Nguyen**

- GitHub: [@manhnguyenit182](https://github.com/manhnguyenit182)
- Email: manhnguyenit182@gmail.com

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/manhnguyenit182">Manh Nguyen</a></p>
</div>
