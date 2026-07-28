import UserForm from "../../components/users/UserForm";
import AuthLayout from "../../layouts/AuthLayout.jsx";

function CreateUserPage() {
    return (
        <AuthLayout>
            <UserForm />
        </AuthLayout>
    );
}

export default CreateUserPage;