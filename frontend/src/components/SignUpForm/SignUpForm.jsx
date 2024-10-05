import NavBar from "../NavBar/NavBar";
import Form from "../Form";
import Footer from "../Footer/Footer";

function SignUpForm() {
    return (
        <div>
            <NavBar />
            <Form route="/api/user/register/" method="register" />
            <Footer />
        </div>
    );
}

export default SignUpForm;
