import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm type="sign-in" />
    </div>
  );
};

export default SignIn;
