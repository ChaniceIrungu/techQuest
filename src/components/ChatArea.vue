<template>
  <div class="chat-container">
    <Header room="Group Chat" />
    <div class="styled-container">
      <List :users="users" :id="id" :username="username" />
      <div class="chat-box">
        <div class="messages-container" ref="messagesContainer">
          <!-- Messages will be displayed here -->
          <Messages :messages="messages" />
        </div>
        <input
          type="text"
          placeholder="Type your message"
          v-model="message"
          class="mt-2 border-2 p-3"
        />
        <button
          class="styled-button mt-2 bg-fuchsia-500"
          @click.prevent="sendMessage"
        >
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
import Messages from "../components/chat/Messages.vue";
// import Messages from '../components/Chat/Messages.vue';
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const id = ref("");
const messages = ref([]);
const message = ref("");
const welcome = ref({});
const userData = ref({});
// const users = ref([]);
// const socket = io("http://localhost:1337"); //Connecting to Socket.io backend
const socket = io("https://quest-postgress.onrender.com"); //Connecting to Socket.io backend
const users = ref([]);

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

onMounted(() => {
  userData.value = JSON.parse(window.localStorage.getItem("userData"));
  console.log(userData.value.username);
  username.value = userData.value.username;
  setChatRoom();
});

const setChatRoom = () => {};
watchEffect(() => {
  console.log("join successful");
  socket.emit("join", { username: username.value }, (error) => {
    //Sending the username to the backend as the user connects.
    if (error) alert(error);
  });

  socket.on("welcome", async (data) => {
    //Getting the welcome message from the backend
    const welcomeMessage = {
      user: data.user,
      message: data.text,
    };
    welcome.value = welcomeMessage; //Storing the Welcome Message
    let arr = [welcome.value];

    //Fetching all messages from Strapi
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/messages`
    );
    const responseData = await response.data;

    // Storing all Messages in a state variable
    responseData.data.map((one, i) => {
      arr = [...arr, one.attributes];
      return (messages.value = arr);
    });
  });

  //Fetching and storing the users in the users state variable
  socket.on("roomData", async (data) => {
    const activeUsers = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/active-users`
    );

    users.value = activeUsers.data;
  });

  //  we can try check this with a computed property
  socket.on("message", async (data) => {
    // Check if the received message already exists in the messages array
    const messageExists = messages.value.some(
      (msg) => msg.message === data.message && msg.user === data.user
    );
    // If the message doesn't exist, push it to the messages array
    if (!messageExists) {
      messages.value.push(data);
      console.log("responseData", data);
    }
  });
});

const sendMessage = () => {
  if (message.value) {
    socket.emit(
      "sendMessage",
      { message: message.value, user: username.value },

      (error) => {
        if (error) alert(error);
      }
    );
    messages.value.push({ message: message.value, user: username.value });
    message.value = "";
  } else {
    alert("Message can't be empty");
  }
};

const fetchMessages = () => {
  const response = axios.get(`${import.meta.env.VITE_API_ENDPOINT}/messages`);
  const updatedMessages = response.data.data.map((one) => one.attributes);
  // Update the messages array with the latest data from the backend
  messages.value = updatedMessages;
  console.log("Updated messages from backend", updatedMessages);
};

const logout = () => {
  window.localStorage.removeItem("jwt");
  window.localStorage.removeItem("userData");
  window.localStorage.removeItem("bookmarks");
  this.$router.push("/login");
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
  height: 90vh;
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
  transition: 0.5s;
  color: #fff;
  font-size: 20px;
}

.messages-container {
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 80vh; /* Set a max height for the messages container */
  padding: 10px; /* Optional: Add padding for better appearance */
}

.styled-button:hover {
  color: #2979ff;
  background: #fff;
}
.styled-button:focus {
  outline: none;
}
</style>
