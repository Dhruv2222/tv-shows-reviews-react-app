import { Link } from "react-router-dom";

function Register() {

    return (
    <>
    
    <h1>Register page</h1>
    <Link to={"/Auth/Login"}>Login</Link>
    
    </>
    );
    
    }
    
    export default Register;