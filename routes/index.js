import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../src/components/pages/Home/index.vue";
import Register from "../src/components/pages/Register.vue";
import ForgotPassword from "../src/components/pages/Forgot-Password.vue";
import Login from "../src/components/pages/Login.vue";
import AdminLogin from "../src/components/pages/AdminLogin.vue";
import Dashboard from "../src/components/template/Dashboard";
import Products from "../src/components/organisms/Products/index.vue";
// import DashHome from '../src/components/organisms/Dashboard/index.vue'
import AddProduct from "../src/components/organisms/Products/AddProduct/index.vue";
import Product from "../src/components/organisms/Products/Product/index.vue";
import MyProduct from "../src/components/organisms/Products/MyProduct/index.vue";
import ProductsLogout from "../src/components/organisms/Products/ProductsLogout.vue";
import EditProduct from "../src/components/organisms/Products/EditProduct/index.vue";
import AllProducts from "../src/components/organisms/Products/AllProducts/index.vue";
import AllUsers from "../src/components/organisms/User/AllUsers/index.vue";
import UserConfig from "../src/components/organisms/User/index.vue";
import Favorites from "../src/components/organisms/Favorites/index.vue";
import User from "../src/components/organisms/User/User.vue";
import BuyProduct from "../src/components/organisms/Products/BuyProduct/index.vue";
import Purchases from "../src/components/organisms/Purchases/index.vue";
import Checkout from "../src/components/organisms/Purchases/Checkout.vue";
import paymentSuccess from "../src/components/organisms/Purchases/PaymentSuccess.vue";
import ViewLiveBids from "../src/components/organisms/Purchases/LiveBids/ViewLiveBids.vue";
import LiveBid from "../src/components/organisms/Purchases/LiveBids/LiveBid.vue";
import Follow from "../src/components/organisms/Follow/index.vue";
import SendMessage from "../src/components/organisms/Message/SendMessages.vue";
import MyMessage from "../src/components/organisms/Message/MyMessages.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products", component: ProductsLogout },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/admin", component: AdminLogin },
  { path: "/forgot-password", component: ForgotPassword, name: "forgot-password" },
  {
    path: "/payment-success/:purchaseId",
    name: "paymentSuccess",
    component: paymentSuccess,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: [
      { path: "/", component: Products },
      { path: "/add-product", component: AddProduct },
      { path: "/product/:id", component: Product },
      { path: "/my-product", component: MyProduct },
      { path: "/my-product/:id", component: EditProduct, name: "my-product" },
      { path: "/user-config/:id", component: UserConfig },
      { path: "/user/:id", component: User },
      { path: "/favorites", name: "favorites", component: Favorites },
      { path: "/buy-product/:id", component: BuyProduct },
      { path: "/purchases", component: Purchases },
      { path: "/live-bids", component: ViewLiveBids },
      { path: "/live/:liveId", component: LiveBid },
      { path: "/follows", component: Follow },
      { path: "/send-message/:id", component: SendMessage },
      { path: "/admin/all-products", component: AllProducts },
      { path: "/admin/all-users", component: AllUsers },
      { path: "/admin/purchases/:id", component: Purchases },
      { path: "/messages", component: MyMessage },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
