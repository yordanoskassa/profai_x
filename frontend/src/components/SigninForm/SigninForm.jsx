import NavBar from "../NavBar/NavBar";
import Form from "../Form";
import Footer from "../Footer/Footer";

function SigninForm() {
    return (
        <div>
            <NavBar /> 
            <Form route="/api/token/" method="login" />
            <Footer />
        </div>
    )
}

export default SigninForm