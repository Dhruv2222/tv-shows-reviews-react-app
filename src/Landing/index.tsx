import { Navigate, Route, Routes } from "react-router";
import LandingPage from "./LandingPage";
// import Nav from "../Nav";
// import Assignment3 from "./a3";
// import Assignment4 from "./a4";
// import store from "./store";
// import { Provider } from "react-redux";


function Landing() {
  return (
    // <Provider store={store}>
    <div>
      <Routes>
         <Route path="LandingPage"
         element={<LandingPage/>}/>
      </Routes>
    </div>
    // </Provider>
  );
 
}
export default Landing;
