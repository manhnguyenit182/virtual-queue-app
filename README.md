# Virtual Queue System - React Native App

Ứng dụng hệ thống hàng đợi ảo được xây dựng với React Native và Firebase Realtime Database.

## Tính năng chính

- **Thêm khách hàng vào hàng đợi**: Nhập tên và số điện thoại
- **Xem danh sách hàng đợi**: Theo dõi real-time
- **Chế độ quản lý**: Gọi khách hàng, cập nhật trạng thái, xóa khỏi hàng đợi
- **Đồng bộ real-time**: Sử dụng Firebase Realtime Database

## Công nghệ sử dụng

- React Native 0.76+
- TypeScript
- Firebase Realtime Database
- Android target platform

## Cài đặt và chạy

### Yêu cầu

- Node.js >= 18
- React Native development environment
- Android Studio và Android SDK
- Firebase project

### Bước 1: Cài đặt dependencies

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Cấu hình Firebase

Tham khảo file [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) để cấu hình Firebase.

### Bước 3: Chạy Metro bundler

### Bước 3: Chạy Metro bundler

```bash
npm start
```

### Bước 4: Chạy app trên Android

Mở terminal mới và chạy:

```bash
npx react-native run-android
```

## Cách sử dụng

### Chế độ khách hàng

1. Nhập tên và số điện thoại
2. Nhấn "Thêm vào hàng đợi"
3. Xem vị trí trong hàng đợi
4. Theo dõi trạng thái real-time

### Chế độ quản lý

1. Nhấn toggle "Chế độ quản lý"
2. Xem danh sách hàng đợi
3. Gọi khách hàng tiếp theo
4. Cập nhật trạng thái "Đã phục vụ"
5. Xóa khách hàng khỏi hàng đợi

## Cấu trúc project

```
src/
├── components/
│   ├── AddToQueue.tsx     # Component thêm khách hàng
│   └── QueueList.tsx      # Component hiển thị hàng đợi
└── services/
    └── FirebaseService.ts # Service kết nối Firebase
```

## Scripts có sẵn

- `npm start` - Khởi động Metro bundler
- `npm run android` - Chạy app trên Android
- `npm run ios` - Chạy app trên iOS
- `npm test` - Chạy tests
- `npm run lint` - Kiểm tra code style

## Troubleshooting

### Metro bundler không khởi động

```bash
npx react-native start --reset-cache
```

### Lỗi build Android

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Lỗi Firebase connection

- Kiểm tra file `google-services.json` có đúng vị trí
- Đảm bảo package name khớp với Firebase project
- Kiểm tra Firebase Realtime Database rules

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
