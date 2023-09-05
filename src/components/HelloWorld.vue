<!-- <script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script> -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "2",
      gender: "3",
      question1: "",
      question2: "",
      question3: "",
      response1: "",
      response2: "",
      response3: "",
      lang: "en",
      QuestionNum1: 1,
      QuestionNum2: 2,
      button: "Start Survey",
      checkbox: { box1: "", box2: "", box3: "" },
      page: 0,
      page0: "view",
      page1: "hid",
      page2: "hid",
      page3: "hid",
      page4: "hid",
    };
  },
  methods: {
    async getsurvey(value) {
      let Tasks = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/api/surveys?locale=` + value
      );
      this.question1 = Tasks.data.data[0]["attributes"];
      this.question2 = Tasks.data.data[this.QuestionNum1]["attributes"];
      this.question3 = Tasks.data.data[this.QuestionNum2]["attributes"];
      this.QuestionNum1 += 2;
      this.QuestionNum2 += 2;
    },
    load(value) {
      this.getsurvey(value);
    },
    updateBox(box, value) {
      if (box === "1") {
        if (this.checkbox.box1 === value) {
          value = "";
        }
        this.checkbox.box1 = value;
      } else if (box === "2") {
        if (this.checkbox.box2 === value) {
          value = "";
        }
        this.checkbox.box2 = value;
      } else if (box === "3") {
        if (this.checkbox.box3 === value) {
          value = "";
        }
        this.checkbox.box3 = value;
      }
    },
    async addTask(quest, valu) {
      let res = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/api/responses/`,
        {
          data: {
            Email: this.email,
            surveyQuestion: quest,
            surveyResponse: valu,
          },
        }
      );
    },
    next() {
      if (this.page === 0) {
        this.page0 = "hid";
        this.page1 = "view";
        this.page++;
        this.button = "Next Question";
      } else if (this.page === 1) {
        this.page1 = "hid";
        this.page2 = "view";
        this.page++;
        this.button = "Next Question";
      } else if (this.page === 2) {
        this.page2 = "hid";
        this.page3 = "view";
        this.page++;
        this.button = "Submit";
      } else if (this.page === 3) {
        this.page3 = "hid";
        this.page4 = "view";
        this.page = 4;
        this.button = "New Survey";
        this.addTask(this.question1.question, this.response1);
        this.addTask(this.question2.question, this.response2);
        this.addTask(this.question3.question, this.response3);
        this.getsurvey(this.lang);
      } else if (this.page === 4) {
        this.page4 = "hid";
        this.page2 = "view";
        this.page = 2;
        this.button = "Next Question";
      }
    },
  },
};
</script>

<!-- 
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template> -->

<style scoped></style>
