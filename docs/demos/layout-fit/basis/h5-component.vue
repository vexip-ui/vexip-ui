<template>
  <div class="h5-component">
    <div class="h5-header">
      <h2>LayoutFit 高级示例</h2>
    </div>
    <!-- 参数展示区域 -->

    <div class="h5-content">
      <div class="description-section">
        <p>适合邪修开发H5</p>
        <p>这是一个自适应布局容器，会根据父容器尺寸自动调整内容大小。</p>
        <p>这里可能是一个用设计稿自动生成的H5页面</p>
        <p>可以使用绝对单位完成页面开发</p>
      </div>
      <div class="params-section">
        <h4>布局参数</h4>
        <div class="param-item">
          <span>窗口宽度:</span>
          <span>{{ windowWidth?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>缩放比例:</span>
          <span>{{ scale?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>实际宽度:</span>
          <span>{{ currentWidth?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>实际高度:</span>
          <span>{{ currentHeight?.toFixed(2) || 'N/A' }}</span>
        </div>
      </div>
      <div class="feature-card">
        <div class="icon">
          📱
        </div>
        <h3>移动优先</h3>
        <p>专为移动设备优化设计</p>
      </div>

      <div class="feature-card">
        <div class="icon">
          🎨
        </div>
        <h3>美观界面</h3>
        <p>现代化UI设计风格</p>
      </div>

      <div class="feature-card">
        <div class="icon">
          ⚡
        </div>
        <h3>快速加载</h3>
        <p>优化性能，流畅体验</p>
      </div>
    </div>

    <div class="h5-footer">
      <button class="action-btn">
        立即体验
      </button>
      <p class="footer-text">
        © 2025 AI生成的固定宽度页面
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  windowWidth?: number,
  scale?: number,
  currentWidth?: number,
  currentHeight?: number,
}

defineProps<Props>()
</script>

<style scoped>
.h5-component {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  padding: 30px;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 10%);
}

.h5-header {
  text-align: center;
}

.h5-header h2 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
}

.h5-header p {
  margin: 0;
  font-size: 14px;
  opacity: 90%;
}

.description-section {
  padding: 15px;
  margin-top: 15px;
  text-align: left;
  background: rgba(255, 255, 255, 5%);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 15%);
  border-radius: 8px;
}

.description-section p {
  margin: 5px 0;
  font-size: 12px;
  line-height: 1.4;
  opacity: 85%;
}

.h5-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
}

.feature-card {
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 10%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 20%);
  border-radius: 12px;
}

.feature-card .icon {
  margin-bottom: 12px;
  font-size: 32px;
}

.feature-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.feature-card p {
  margin: 0;
  font-size: 12px;
  opacity: 80%;
}

.h5-footer {
  margin-top: 30px;
  text-align: center;
}

.action-btn {
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  background: rgba(255, 255, 255, 20%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 30%);
  border-radius: 25px;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 30%);
  transform: translateY(-2px);
}

.footer-text {
  margin: 15px 0 0;
  font-size: 12px;
  opacity: 70%;
}

.params-section {
  padding: 15px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 10%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 20%);
  border-radius: 8px;
}

.params-section h4 {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.param-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 12px;
}

.param-item span:first-child {
  opacity: 80%;
}

.param-item span:last-child {
  font-weight: 500;
}
</style>
