import { Link } from "react-router-dom";

function Login() {

return (
<>

<h1>Login page</h1>
<Link to={"/Auth/Register"}>Register</Link>

</>
);

}

export default Login;