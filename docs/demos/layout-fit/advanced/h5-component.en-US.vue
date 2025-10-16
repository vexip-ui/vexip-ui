<template>
  <div class="h5-component">
    <div class="h5-header">
      <h2>LayoutFit Advanced Example</h2>
    </div>
    <!-- Parameter display area -->

    <div class="h5-content">
      <div class="feature-card" style="text-align: left">
        <p>Suitable for H5 development</p>
        <p>
          This is an adaptive layout container that automatically adjusts content size based on
          parent container dimensions.
        </p>
        <p>This might be an H5 page automatically generated from design drafts</p>
        <p>Can use absolute units for page development</p>
      </div>
      <div class="feature-card">
        <h4>Layout Parameters</h4>

        <div class="param-item">
          <span>Scale Ratio:</span>
          <span>{{ scale?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>Window Width:</span>
          <span>{{ windowWidth?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>Design Width:</span>
          <span>{{ designWidth?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>Actual Width:</span>
          <span>{{ currentWidth?.toFixed(2) || 'N/A' }}</span>
        </div>
        <div class="param-item">
          <span>Actual Height:</span>
          <span>{{ currentHeight?.toFixed(2) || 'N/A' }}</span>
        </div>
      </div>
      <div class="feature-card">
        <div class="icon">
          📱
        </div>
        <h3>Mobile First</h3>
        <p>Optimized design for mobile devices</p>
      </div>

      <div class="feature-card">
        <div class="icon">
          🎨
        </div>
        <h3>Beautiful Interface</h3>
        <p>Modern UI design style</p>
      </div>

      <div class="feature-card">
        <div class="icon">
          ⚡
        </div>
        <h3>Fast Loading</h3>
        <p>Optimized performance, smooth experience</p>
      </div>
    </div>

    <div class="h5-footer">
      <button class="action-btn">
        Try Now
      </button>
      <p class="footer-text">
        © 2025 AI-generated fixed-width page
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
  designWidth?: number,
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
