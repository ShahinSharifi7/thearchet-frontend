<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-box">
      <!-- Dialog Header -->
      <header class="dialog-header">
        <h2 class="text-lg font-bold text-gray-900">
          <slot name="title"></slot>
        </h2>
        <button @click="$emit('close')" class="close-btn">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </header>

      <!-- Dialog Content -->
      <div class="dialog-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogComponent",
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.2s ease-in-out;
}

.dialog-box {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.2s ease-in-out;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #555;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.close-btn:hover {
  color: #c00000;
}

.dialog-content {
  font-size: 1rem;
  color: #333;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
