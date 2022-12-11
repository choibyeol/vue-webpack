<template>
  <Hello />
</template>

<script>
import Hello from "~/components/Hello";

export default {
  components: {
    Hello,
  },
  data() {
    return {
      msg: "Hello Vue!",
    };
  },
};
</script>
