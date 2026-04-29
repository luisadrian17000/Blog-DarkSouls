import LoginForm from '../components/LoginForm';
import style from './Login.module.css'

const Login = () => {
    return (
        <div className={style.mainContainer}>
            <LoginForm />
        </div>
    )
}

export default Login;