<template>
  <div class="chat-container">
    <Header room="Group Chat" />
    <div class="styled-container">
      <List :users="users" :id="id" :usersname="username" />
      <div class="chat-box p-2">
        <!-- <Messages messages="{messages}" username="{username}" /> -->
        <div v-for="(item, index) in messages" :key="index">
          <p class="text-blue-600">
            user: <span class="text-yellow-600">{{ username }}</span>
          </p>
          <p>message: {{ item.message }}</p>
        </div>

        <input
          type="text"
          placeholder="Type your message"
          v-model="message"
          class="mt-4 border-2 p-4"
        />
        <button class="styled-button mt-4" @click="handleClick">
          <p>Send</p>
          <div>
            <i className="fa fa-paper-plane" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { io } from "socket.io-client";
import Header from "../components/chat/Header.vue";
import List from "../components/chat/List.vue";
// import Messages from '../components/Chat/Messages.vue';
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("Davido");
const id = ref("");
const messages = ref([]);
const message = ref("");
const welcome = ref([]);
// const users = ref([]);
const socket = io("http://localhost:1337"); //Connecting to Socket.io backend
const users = [{ username: "Fredrick" }, { username: "John" }];

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

onMounted(() => {
  setChatRoom();
});

const setChatRoom = () => {};
watchEffect(() => {
  console.log("join successful");
  socket.emit("join", { username: username.value }, (error) => {
    //Sending the username to the backend as the user connects.
    console.log("seing user", username.value);
    if (error) alert(error);
  });

  socket.on("welcome", async (data) => {
    //Getting the welcome message from the backend
    const welcomeMessage = {
      user: data.user,
      message: data.text,
    };
    welcome.value = [welcomeMessage]; //Storing the Welcome Message

    //Fetching all messages from Strapi

    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/messages`
    );
    const responseData = await response.data;
    const arr = [
      welcome.value,
      ...responseData.data.map((one) => one.attributes),
    ];
    console.log("res", responseData);
    messages.value = arr; // Storing all Messages in a state variable
  });

  socket.on("message", async () => {
    //Listening for a message connection
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/messages`
    );
    const responseData = await response.data;
    console.log("res", responseData);
    const arr = [
      welcome.value,
      ...responseData.data.map((one) => one.attributes),
    ];
    messages.value = arr;
  });
});

const sendMessage = () => {
  if (message.value) {
    socket.emit(
      "sendMessage",
      { message: message.value, user: "vanessa" },
      (error) => {
        if (error) alert(error);
      }
    );
    message.value = "";
  } else {
    alert("Message can't be empty");
  }
};

const handleClick = () => {
  sendMessage(message.value);
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f2f2f2;
  padding: 40px;
  margin: 100px auto;
  max-width: 60vw;
  box-shadow: 5px 10px 18px #888888;
  height: 80vh;
}

.styled-container {
  display: flex;
  width: 100%;
  flex: 1;
  border-radius: 8px;
  height: 60%;
  justify-content: space-between;
}

.chat-box {
  width: 60%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.styled-button {
  height: 45px;
  background: #2979ff;
  transition: 0.5s;
  color: #fff;
  font-size: 20px;
}

.styled-button:hover {
  color: #2979ff;
  background: #fff;
}
.styled-button:focus {
  outline: none;
}
</style>
