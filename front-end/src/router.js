import { createRouter, createWebHistory } from 'vue-router';

import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Login from './views/Login.vue'; 
import Register from './views/Register.vue'; 
import Profile from './views/Profile.vue'; 

const routes = [
  {
    path: '/',
    redirect: '/words'
  },
  {
    path: '/words',
    name: 'words',
    component: Words
  },
  {
    path: '/words/new',
    name: 'new-word',
    component: New
  },
  {
    path: '/words/:id',
    name: 'show',
    component: Show
  },
  {
    path: '/words/:id/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/login', // Route mới cho login
    name: 'login',
    component: Login
  },
  {
    path: '/register', // Route mới cho register
    name: 'register',
    component: Register
  },
  {
    path: '/profile',  // Thêm route cho profile page
    name: 'profile',
    component: Profile  
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
});

export default router;
