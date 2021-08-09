<template>
  <div>
    <NoteAddEdit ref="noteeditor" v-bind="$props" @close="navigateBack" />
  </div>
</template>
<script>
import router from "../router";
import NoteAddEdit from "../components/notes/NoteAddEdit.vue";
export default {
  components: {
    NoteAddEdit,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  beforeRouteEnter() {
    console.log("Before notes edit entered (In-component)");
  },
  beforeRouteLeave() {
    console.log("Before notes edit leave (In-Component)");
    if (this.$refs.noteeditor.hasChanges()) {
      const discardChanges = window.confirm(
        "Do you really want to leave? You have some changes that you havent saved yet."
      );
      if (!discardChanges) return false;
    }
  },
  beforeRouteUpdate() {
    console.log("Before Notes edit updated (In-Component)");
  },
  methods: {
    navigateBack() {
      console.log("curentroute", router.currentRoute.value);
      router.currentRoute.value.meta.onClose();
      // router.push({name:router.currentRoute.value.meta.onCloseRedirect})
    },
  },
};
</script>
