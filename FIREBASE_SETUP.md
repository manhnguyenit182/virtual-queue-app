# Firebase Configuration for Android

## Bước 1: Tạo project Firebase

1. Truy cập https://console.firebase.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Thêm app Android với package name: `com.virtualqueueapp`

## Bước 2: Tải file google-services.json

1. Sau khi tạo app Android, tải file `google-services.json`
2. Đặt file này vào thư mục `android/app/`

## Bước 3: Cấu hình Realtime Database

1. Trong Firebase Console, mở Realtime Database
2. Tạo database trong chế độ test
3. Cập nhật quy tắc bảo mật (rules):

```json
{
  "rules": {
    "queue": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Bước 4: Build và chạy app

```bash
# Cài đặt dependencies
npm install

# Chạy Metro bundler
npx react-native start

# Build và chạy trên Android (terminal khác)
npx react-native run-android
```

## Cấu trúc dữ liệu Realtime Database

```
queue/
  ├── -uniqueId1/
  │   ├── id: "uniqueId1"
  │   ├── name: "Nguyễn Văn A"
  │   ├── phoneNumber: "0123456789"
  │   ├── timestamp: 1691234567890
  │   └── status: "waiting"
  └── -uniqueId2/
      ├── id: "uniqueId2"
      ├── name: "Trần Thị B"
      ├── phoneNumber: "0987654321"
      ├── timestamp: 1691234567900
      └── status: "called"
```
