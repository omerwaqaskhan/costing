
import RegisterForm from "../components/RegisterForm"

function Register() {

    return (
        <div className="pt-[75px]">
            <RegisterForm route="users/register" method="register" />
        </div>
    )
}

export default Register