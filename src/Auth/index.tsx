import { Navigate, Route, Routes } from "react-router";
// import Nav from "../Nav";
// import Assignment3 from "./a3";
// import Assignment4 from "./a4";
// import store from "./store";
// import { Provider } from "react-redux";
import Login from "./Login";
import Register from "./Register";

function Auth() {
  return (
    // <Provider store={store}>
    <div>
      <Routes>
        <Route path="/"
         element={<Navigate to="Login" />}/>
         <Route path="Login"
         element={<Login />}/>
        <Route path="Register"
         element={<Register />}/>
      </Routes>
    </div>
    // </Provider>
  );
 
}
export default Auth;
