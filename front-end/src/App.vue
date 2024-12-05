<template>
  <div id="app">
    <div class="ui inverted segment navbar" v-if="!['/login', '/register'].includes($route.path)">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <div class="item">
            <router-link to="/profile" class="greeting-text">
              Hi, {{ username }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="ui text container">
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    };
  },
  mounted() {
    // Kiểm tra localStorage để lấy tên người dùng
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }
}
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
.greeting-text {
  margin-left: auto;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0 10px; 
}

</style>