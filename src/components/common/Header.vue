<template>
    <header class="app-header">
      <img src="https://i.ibb.co/YQwmNNh/Screen-Shot-Tool-20240729175416.png" alt="Logo" class="logo">
    </header>
  </template>
  
  <script>
  export default {
    name: "AppHeader",
  };
  </script>
  
  <style scoped>
  .app-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #263238; 
    padding: 20px;
    margin-bottom:60px;
  }
  
  .logo {
    max-width: 100px;
    height: auto;
  }
  </style>
  