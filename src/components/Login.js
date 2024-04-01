import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleLoginRedux } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitErrorHandler } from 'react-hook-form';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)

    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)


    const navigate = useNavigate()

    const dispatch = useDispatch()

        const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Missing email or password!")
        }
        dispatch(handleLoginRedux(email, password))
    }

    const handleKeyDown = (e) => {
        if (e && e.key === "Enter") {
            handleLogin()
        }
    }

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }
    }, [account])

    return (
        <div className='login-container col-12 col-sm-4'>
            <div className='title'>Log in</div>
            <div className='text'>
                <div>Email or username</div>
                <div>Login with phone</div>
            </div>
            <input
                type='text'
                placeholder='Email or username...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                tabIndex
            />
            <div className='last-input'>
                <input
                    type={isShowPass === true ? "text" : "password"}
                    placeholder='Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}

                />
                <i
                    className={isShowPass === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPass(!isShowPass)}
                ></i>
            </div>
            <div className='forgot-pass'>Forgot password?</div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
                &nbsp; Login
            </button>
            <div className='back'>
                <i className='fa-solid fa-angles-left'></i>&nbsp; Go back
            </div>
        </div>
    )
}

export default Login