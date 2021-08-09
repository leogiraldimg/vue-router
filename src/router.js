import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import Tasks from "./components/todos/TodoItems.vue";
import Notes from "./views/NotesView.vue";
import NotFound from "./components/NotFound.vue";
import NoteAddEdit from "./views/AddEditNoteView.vue";
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
      name: "dashboard",
      component: Dashboard,
      meta: { transition: "zoom-down", title: "Dashboard" },
    },
    {
      path: "/tasks",
      name: "tasks",
      components: {
        default: Tasks,
        Navbar: NavbarComponent,
      },
      meta: {
        title: "Tasks",
      },
    },
    {
      path: "/notes",
      name: "notes",
      components: {
        default: Notes,
        Navbar: NavbarComponent,
      },
      meta: {
        title: "Notes",
        requiresMic: true,
      },
      children: [
        {
          path: "new",
          name: "newnote",
          component: NoteAddEdit,
          meta: {
            onClose: () => router.push({ name: "notes" }),
          },
        },
        {
          beforeEnter: () => {
            console.log("Before Note Edit Enter (Per-Route)");
          },
          name: "editnote",
          meta: {
            onClose: () => router.push({ name: "notes" }),
          },
          path:
            "edit/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})?",
          component: NoteAddEdit,
          props: (route) => ({ id: route.params.id }),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    console.log(to);
    console.log(from);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition || { top: 0, left: 0 });
      }, 1000);
    });
  },
});

router.beforeEach(() => {
  console.log("Before Each (Global)");
});

router.beforeResolve(async (to) => {
  console.log("before Resolve (Global)");
  if (to.meta.requiresMic) {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      alert("Cannot proceed without allowing acces to mic. Enable access and reload the page.");
      return false;
    }
  }
});

router.afterEach((to) => {
  console.log("After Each (Global)");
  document.title = "Globomantics: " + to.meta.title;
  to.meta.transition = to.matched.length === 1 ? "bounce-right" : "bounce-left";
});

export default router;
