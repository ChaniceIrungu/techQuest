<template>
  <div class="main-container flex justify-center flex-col">
    <p v-show="error" class="text-sm text-red-500 flex items-center">
      {{ errorMsg }}
    </p>
    <form>
      <div class="box-container">
        <h2 class="heading">Sign Up</h2>
        <div class="form-fields">
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            placeholder="User Name"
          />
        </div>
        <div class="form-fields">
          <input
            id="email"
            name="email"
            type="text"
            v-model="email"
            placeholder="Email Address"
          />
        </div>
        <div class="form-fields">
          <input
            id="password"
            name="password"
            v-model="password"
            type="text"
            placeholder="Password"
          />
        </div>
        <!-- Loader -->
        <LoadingAnimation v-if="isSaving" message="Saving" />
        <div class="form-fields">
          <button
            class="signIn"
            name="commit"
            type="submit"
            @click="registerUser"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
    <div class="footer text-red-500">
      <p>Don't have an account? <a href="/signup"> Create one now</a></p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref(false);
const isSaving = ref(false);
const errorMsg = ref(`An Error occurred, please try again`);

const registrationUrl = `${
  import.meta.env.VITE_API_ENDPOINT
}/auth/local/register`;
const confirmationUrl = `${
  import.meta.env.VITE_API_ENDPOINT
}/auth/email-confirmation`;

const registerUser = async (e) => {
  isSaving.value = true;
  const userData = {
    username: name.value,
    password: password.value,
    email: email.value,
  };

  try {
    // register user
    e.preventDefault();
    // const responseData = await axios.post(registrationUrl, userData);
    const responseData = await axios.post(registrationUrl, userData);
    console.log("Successful registration");
    router.push("/login");
  } catch (e) {
    setError(error);
    email.value = "";
  } finally {
    isSaving.value = false;
    // error.value = false;
  }

  // try {
  //   // send confirmation email
  //   await axios.post(confirmationUrl, { email: userData.email });
  //   router.push("/chat");
  // } catch (error) {
  //   setError(error);
  //   setSubmitting(false);
  // } finally {
  //   // Handle success.
  //   console.log("Your user received an email");
  //   //  router.push("/chat");
  // }
};

const setError = (err) => {
  error.value = true;
  errorMsg.value = err.response.data.error.message;
};

const clearData = () => {
  error.value = false;
  email.value = "";
  password.value = "";
};

// const logout = () => {
//     unsetToken();
//   };
</script>

<style>
/* body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: #0069ff;
  } */
/* Style the tab */
/* .tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  } */
/* Style the buttons inside the tab */
/* .tab a {
    background-color: inherit;
    float: right;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
    text-decoration: none;
    border: 1px solid;
  } */
/* Change background color of buttons on hover */
/* .tab a:hover {
    background-color: #ddd;
  } */
/* Create an active/current tablink class */
/* .tab a.active {
    background-color: #ccc;
  } */
/* Style the tab content */
/* .tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
  } */
/* .loginsuccess-container {
    padding: 20px;
    margin: 0 auto;
    width: 80%;
    box-shadow: beige;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    word-break: break-all;
  } */
.main-container {
  /* margin-top: 10%; */
}
.box-container {
  padding: 20px;
  margin: 0 auto;
  width: 400px;
  box-shadow: beige;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}

.heading {
  text-align: center;
  font-weight: 300;
  color: #444;
  margin: 0 auto 45px;
  font-size: 35px;
  line-height: 38px;
  text-transform: none;
  letter-spacing: 0;
}
.form-fields,
.form-fields button {
  width: 100%;
  margin: 5px 0;
  line-height: 28px;
  border-radius: 5px;
}
.form-fields input {
  width: 100%;
  line-height: 40px;
  border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  background: #fff;
  padding: 0 5px;
  font-size: 14px;
}
.signIn {
  padding: 10px 32px;
  color: white;
  font-size: 16px;
  font-weight: 400;
  background: #15cd72;
  text-align: center;
  cursor: pointer;
  height: auto;
  -webkit-appearance: none;
}
.createaccount {
  padding: 15px;
  background-color: #0069ff;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  height: 48px;
  line-height: 48px;
  padding: 0 32px;
  text-align: center;
  border-radius: 5px;
}
.center {
  text-align: center;
}
.login-choice span {
  color: #5b6987;
  display: -ms-grid;
  display: grid;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -ms-grid-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-gap: 19px;
}
.login-choice span:after,
.login-choice span:before {
  content: "";
  border-top: 1px solid #e5e8ed;
}
.signup-buttons {
  margin-top: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
}
.facebook-signup,
.google-signup {
  color: #031b4e;
  background: #f2f8ff;
  border: 1px solid rgba(0, 105, 255, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  margin-top: 0;
  width: 47.5%;
  padding: 15px;
  text-align: center;
  position: inherit;
}
.signup-buttons a {
  vertical-align: middle;
  text-decoration: none;
}
.signup-buttons svg {
  left: 16px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.footer,
.footer a {
  text-align: center;
  /* color: #fff; */
}
</style>
