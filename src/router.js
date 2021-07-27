import { createRouter, createWebHashHistory } from "vue-router";

import Dashboard from "@/components/Dashboard.vue";
import Tasks from "@/components/todos/TodoItems.vue";
import NotFound from "@/components/NotFound.vue";
import NotesView from "@/views/NotesView.vue";
import NoteAddEdit from "@/components/notes/NoteAddEdit.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/dashboard", component: Dashboard },
    { path: "/tasks", component: Tasks },
    {
      path: "/notes",
      component: NotesView,
      children: [
        { path: "new", component: NoteAddEdit },
        { path: "edit/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})?", component: NoteAddEdit },
      ],
    },
    { path: "/:pathMatch(.*)", component: NotFound },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
