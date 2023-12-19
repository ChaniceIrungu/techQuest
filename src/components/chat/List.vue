<template>
  <div class="styled-list">
    <div class="flex gap-2 mb-4 mt-2">
      <span class="bg-green-500 w-4 h-4 rounded-full self-center"></span>
      <h4 class="w-full text-xl font-bold">Active Users</h4>
    </div>

    <!-- <div
      class="rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]"
    >
      <span
        class="bg-green-500 w-4 h-4 rounded-full mt-0.5 inline-block"
      ></span>
      <h4 class="w-full text-xl font-bold mb-4 ml-4">Active Users</h4>
    </div> -->

    <div class=" ">
      <div v-for="(user, index) in users" :key="index" class="">
        <div class="flex pb-4">
          <img
            class="w-10 h-10 mr-4 rounded-full ring-2 ring-gray-300"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />

          <h4 class="text-2xl text-blue-600">{{ user.username }}</h4>
        </div>
      </div>
    </div>

    <!-- <AntdList :item-layout="itemLayout" :dataSource="users">
        <template v-slot:renderItem="user">
          <AntdList-Item>
            <AntdList-Item-Meta
              :avatar="getUserAvatar()"
              :title="getUserLink(user.username)"
            />
          </AntdList-Item>
        </template>
      </AntdList> -->
  </div>
</template>
<script setup>
//   import { List as AntdList, Avatar } from "ant-design-vue";
//   import styled from 'vue3-styled-components';
import { ref, onMounted, watchEffect } from "vue";

const { users } = defineProps(["users"]);
const itemLayout = "horizontal";

//   const getUserAvatar = () => (
//     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//   );

//   const getUserLink = (username) => (
//     <a href="https://ant.design">{username}</a>
//   );

//   const StyledList = styled(AntdList)`
//     margin-right: 10px;
//     flex: 0 0 35%;
//     padding: 20px;

//     .ant-list-item-meta-content {
//       flex-grow: 0;
//     }

//     h4 {
//       font-size: 25px;
//     }

//     a {
//       color: #097ef0;
//     }
//   `;

//   const ListHeading = styled.div`
//     color: #757591;
//     font-size: 20px;
//     font-style: oblique;
//     border-bottom: 1px solid #757591;
//   `;
</script>
