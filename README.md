# Gia Gia TikTok Analytics & Cadence Intelligence (@giagia.vietnam)

Hệ thống phân tích chuyên sâu dữ liệu video, tần suất đăng tải, hiệu suất tương tác (ER%) và chiến lược quà tặng kèm (GWP) từ 903 video TikTok Shop của Gia Gia.

- **Website GitHub Pages:** [https://t-avh.github.io/Giagia-26.9/](https://t-avh.github.io/Giagia-26.9/)
- **Repository:** [https://github.com/t-avh/Giagia-26.9](https://github.com/t-avh/Giagia-26.9)

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages

Dự án đã được cấu hình toàn diện để không bao giờ bị lỗi **404 Not Found** hoặc lỗi đường dẫn trắng trang trên GitHub Pages. Bạn có thể chọn 1 trong 2 cách triển khai dưới đây:

### Cách 1: Tự động hoàn toàn qua GitHub Actions (Khuyên dùng)
Dự án đã có sẵn file workflow `.github/workflows/deploy.yml`. Mỗi khi bạn push code lên nhánh `main` hoặc `master`, GitHub sẽ tự động build và deploy lên GitHub Pages mà không cần chạy lệnh thủ công.

1. Đẩy toàn bộ source code lên GitHub:
   ```bash
   git add .
   git commit -m "Cấu hình hoàn chỉnh cho GitHub Pages"
   git push origin main
   ```
2. Vào repository trên GitHub $\rightarrow$ **Settings** $\rightarrow$ **Pages**:
   - Tại phần **Build and deployment** $\rightarrow$ **Source**: Chọn **GitHub Actions**.
3. GitHub Actions sẽ tự động chạy trong tab **Actions** và trang web sẽ online tại:  
   👉 `https://t-avh.github.io/Giagia-26.9/`

---

### Cách 2: Deploy thủ công bằng thư viện `gh-pages`
1. Mở terminal tại thư mục dự án:
   ```bash
   npm run deploy
   ```
   *Lệnh này sẽ tự động chạy `npm run build` tạo thư mục `dist` và đẩy riêng bản build lên nhánh `gh-pages`.*

2. Vào repository trên GitHub $\rightarrow$ **Settings** $\rightarrow$ **Pages**:
   - Tại phần **Build and deployment** $\rightarrow$ **Source**: Chọn **Deploy from a branch**.
   - **Branch**: Chọn `gh-pages` / thư mục `/(root)`.
   - Nhấn **Save**.
3. Chờ 1–2 phút rồi tải lại trang `https://t-avh.github.io/Giagia-26.9/`.

---

## 🛠️ Toàn Bộ Cấu Hình Đã Được Tối Ưu Cho GitHub Pages

| Thành phần | Đường dẫn | Mục đích |
| :--- | :--- | :--- |
| **Base path** | `vite.config.ts` (`base: '/Giagia-26.9/'`) | Đảm bảo mọi đường dẫn JS, CSS, Font tải chính xác từ subpath của repository. |
| **Bỏ qua Jekyll** | `public/.nojekyll` | Ngăn GitHub Pages ẩn hoặc bỏ qua các thư mục tài nguyên tĩnh của Vite. |
| **Chống lỗi 404 khi F5** | `public/404.html` + `index.html` | Giữ nguyên URL khi reload trang hoặc chuyển hướng SPA trên GitHub Pages. |
| **CI/CD Tự động** | `.github/workflows/deploy.yml` | Tự động đóng gói và xuất bản ứng dụng lên Pages sau mỗi lần `git push`. |
| **Metadata** | `package.json` (`homepage`) | Khai báo tên miền đích cho `gh-pages`. |

---

## 💻 Chạy Thử Nghiệm Tại Local (Development)

```bash
# Cài đặt thư viện
npm install

# Khởi chạy máy chủ phát triển
npm run dev
```
Trang web sẽ chạy tại `http://localhost:3000`.
