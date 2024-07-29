<template>
    <footer class="app-footer">
      <img src="https://i.ibb.co/YQwmNNh/Screen-Shot-Tool-20240729175416.png" alt="Logo" class="logo">
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter",
  };
  </script>
  
  <style scoped>
  .app-footer {
    display: flex;
    justify-content: start;
    align-items: start;
    background-color: #263238;
    padding: 20px;
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  
  .logo {
    max-width: 100px; 
    height: auto;
  }
  </style>
  