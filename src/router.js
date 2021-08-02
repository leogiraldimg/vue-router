import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import Tasks from "./components/todos/TodoItems.vue";
import Notes from "./views/NotesView.vue";
import NotFound from "./components/NotFound.vue";
import TaskAddEdit from "./components/notes/NoteAddEdit.vue";
import { store } from "./store";
import NavbarComponent from "./components/navigation/Navbar.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        console.log("Redirect from ", to);
        return { path: store.getters.startScreen };
      },
    },
    {
      path: "/dashboard",
      component: Dashboard,
      alias: ["/home", "/mydashboard"],
    },
    {
      path: "/tasks",
      components: {
        default: Tasks,
        Navbar: NavbarComponent,
      },
    },
    {
      path: "/notes",
      components: {
        default: Notes,
        Navbar: NavbarComponent,
      },
      children: [
        { path: "new", component: TaskAddEdit, name: "createnote" },
        {
          path:
            "edit/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})?",
          component: TaskAddEdit,
          name: "editnote",
          // props:true,
          // props:{id:''},
          props: (route) => ({ id: route.params.id }),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
