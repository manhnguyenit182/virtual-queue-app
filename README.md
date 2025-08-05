# 🎫 Virtual Queue App

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.80.2-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

_Ứng dụng quản lý hàng đợi ảo đơn giản và hiệu quả_

[Cài đặt](#-cài-đặt) • [Sử dụng](#-cách-sử-dụng) • [Cấu trúc](#-cấu-trúc-dự-án) • [Contributing](#-contributing)

</div>

---

## 📱 Giới thiệu

**Virtual Queue App** là một ứng dụng React Native được thiết kế để quản lý hàng đợi ảo một cách hiệu quả. Ứng dụng cho phép khách hàng lấy số thứ tự và theo dõi vị trí của mình trong hàng đợi theo thời gian thực.

### ✨ Tính năng chính

- 📝 **Lấy số thứ tự**: Nhập thông tin cá nhân để nhận số thứ tự duy nhất
- 🔢 **Hiển thị thông tin**: Xem số thứ tự và vị trí hiện tại trong hàng đợi
- 🚫 **Bảo mật cao**: Không thể quay lại sau khi lấy số, tránh gian lận
- 🔥 **Đồng bộ thời gian thực**: Cập nhật trạng thái tức thì với Firebase Realtime Database
- 📱 **Giao diện đẹp**: Sử dụng GluestackUI components
- 🎯 **Đơn giản**: Navigation system tối ưu, không phức tạp

## 🛠 Công nghệ sử dụng

| Công nghệ                  | Version | Mục đích                 |
| -------------------------- | ------- | ------------------------ |
| React Native               | 0.80.2  | Mobile framework         |
| TypeScript                 | 5.9.2   | Type safety              |
| Firebase Realtime Database | Latest  | Backend & real-time sync |
| GluestackUI                | 1.1.73  | UI component library     |
| Custom Navigation          | -       | Simple navigation system |

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **React Native CLI**
- **Android Studio** (cho Android development)
- **Xcode** (cho iOS development)
- **Firebase Project** với Realtime Database

### Bước 1: Clone repository

```bash
git clone https://github.com/manhnguyenit182/virtual-queue-app.git
cd virtual-queue-app
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình Firebase

1. Tạo Firebase project tại [Firebase Console](https://console.firebase.google.com)
2. Kích hoạt **Realtime Database**
3. Cấu hình Database Rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "queue": {
      ".indexOn": ["timestamp", "status"]
    }
  }
}
```

4. Tải `google-services.json` và đặt vào `android/app/`
5. Tải `GoogleService-Info.plist` và đặt vào `ios/`

### Bước 4: Chạy ứng dụng

#### Android

```bash
# Start Metro Bundler
npm start

# Run Android (terminal mới)
npm run android
```

#### iOS

```bash
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Run iOS
npm run ios
```

## 📱 Cách sử dụng

### 1. Lấy số thứ tự

- Nhập **họ tên** (2-50 ký tự)
- Nhập **số điện thoại** (10-11 số)
- Ấn **"Thêm vào hàng đợi"**

### 2. Xem thông tin

- Xem **số thứ tự** được cấp
- Theo dõi **vị trí hiện tại** trong hàng đợi
- **Không thể quay lại** - đảm bảo tính công bằng

## 📊 Database Schema

```json
{
  "queue": {
    "0": {
      "name": "Nguyen Van A",
      "phone": "0123456789",
      "timestamp": 1642567890123,
      "status": "waiting"
    },
    "1": {
      "name": "Le Thi B",
      "phone": "0987654321",
      "timestamp": 1642567895123,
      "status": "waiting"
    }
  },
  "current": 0, // Số hiện tại đang được phục vụ
  "lastNumber": 1 // Số cuối cùng được tạo
}
```

## 🎯 Luồng hoạt động

```
[Nhập thông tin] → [Validation] → [Thêm vào Firebase] → [Hiển thị số thứ tự] → [Khóa điều hướng]
```

1. **Input**: Người dùng nhập tên và số điện thoại
2. **Validation**: Kiểm tra dữ liệu hợp lệ
3. **Firebase**: Thêm vào database và lấy số thứ tự
4. **Display**: Hiển thị số và vị trí hiện tại
5. **Lock**: Khóa navigation, không cho phép thêm người mới

## 📝 Available Scripts

| Script            | Mô tả                      |
| ----------------- | -------------------------- |
| `npm start`       | Khởi động Metro Bundler    |
| `npm run android` | Build và chạy trên Android |
| `npm run ios`     | Build và chạy trên iOS     |
| `npm run lint`    | Kiểm tra code style        |
| `npm test`        | Chạy unit tests            |

## 👨‍💻 Author

**Manh Nguyen**

- GitHub: [@manhnguyenit182](https://github.com/manhnguyenit182)
- Email: manhnguyenit182@gmail.com

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - Amazing mobile framework
- [Firebase](https://firebase.google.com/) - Reliable backend services
- [GluestackUI](https://gluestack.io/) - Beautiful UI components

## ⭐ Thanks you

Cảm ơn bạn đã quan tâm. Nếu có bất kỳ câu hỏi nào, hãy liên hệ hoặc để lại phản hồi.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/manhnguyenit182">Manh Nguyen</a></p>
  <p>© 2025 Virtual Queue App. All rights reserved.</p>
</div>
