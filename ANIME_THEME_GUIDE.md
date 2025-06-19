# 新海诚动漫风格主题配置指南

这个博客主题已经被改造为具有新海诚动漫风格的半透明玻璃形态设计。

## 主要特性

### 🎨 视觉效果
- **半透明玻璃效果**: 所有卡片、头部和页脚都使用玻璃形态设计
- **新海诚风格配色**: 天空蓝、夕阳橙、云朵白等色调
- **流畅动画**: 悬停效果和过渡动画
- **响应式设计**: 适配所有设备尺寸

### 🖼️ 背景配置

在 `data/siteMetadata.js` 中，你可以配置三种背景类型：

#### 1. 渐变背景
```javascript
background: {
  type: 'gradient',
  lightGradient: '你的浅色主题渐变',
  darkGradient: '你的深色主题渐变',
}
```

#### 2. 图片背景 (当前配置)
```javascript
background: {
  type: 'image',
  lightImage: '/background.jpg',
  darkImage: '/background.jpg',
}
```

#### 3. 视频背景
```javascript
background: {
  type: 'video',
  lightVideo: '/path/to/light/video.mp4',
  darkVideo: '/path/to/dark/video.mp4',
}
```

## 自定义背景图片

### 推荐的图片要求
- **尺寸**: 至少 1920x1080 像素
- **格式**: JPG, PNG, WebP
- **风格**: 新海诚动漫风格（天空、云朵、自然风景）
- **色调**: 柔和、梦幻的色彩

### 添加自定义背景
1. 将你的背景图片放在 `public/` 目录下
2. 修改 `data/siteMetadata.js` 中的背景配置
3. 重启开发服务器

### 示例配置
```javascript
background: {
  type: 'image',
  lightImage: '/my-custom-sky.jpg',
  darkImage: '/my-custom-night.jpg',
}
```

## 主题颜色

### 主色调 (天空蓝)
- `primary-50` 到 `primary-950`: 从浅到深的天空蓝色调

### 灰色调 (暖色调)
- `gray-50` 到 `gray-950`: 带有暖色调的灰色系

## 玻璃效果类

### 基础玻璃效果
- `.glass`: 基础半透明玻璃效果
- `.glass-strong`: 更强的玻璃效果
- `.glass-dark`: 深色玻璃效果

### 专用玻璃效果
- `.card-glass`: 卡片专用玻璃效果
- `.header-glass`: 头部专用玻璃效果

## 使用建议

### 最佳实践
1. **背景选择**: 选择色彩柔和、对比度适中的背景
2. **可读性**: 确保文字在背景上清晰可读
3. **性能**: 大尺寸图片会影响加载速度，建议压缩
4. **主题一致性**: 浅色和深色主题的背景应该风格一致

### 推荐的新海诚风格元素
- 天空和云朵
- 日出/日落场景
- 城市天际线
- 自然风景
- 柔和的光线效果

## 故障排除

### 背景不显示
1. 检查图片路径是否正确
2. 确认图片文件存在于 `public/` 目录
3. 检查浏览器控制台是否有错误

### 性能问题
1. 压缩大尺寸图片
2. 使用 WebP 格式获得更好的压缩率
3. 考虑使用 CDN 加载图片

### 可读性问题
1. 调整玻璃效果的透明度
2. 为文字添加文字阴影
3. 选择对比度更好的背景

## 开发

如果你想进一步自定义样式，主要的 CSS 文件位于：
- `css/tailwind.css`: 主要样式和颜色定义
- `components/Background.tsx`: 背景组件逻辑

享受你的新海诚风格博客吧！ ✨ 