import classes from './Auth.module.css';
import React, { useContext, useEffect, useState } from "react";
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { AuthContext } from '../../context/AuthContext';

const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }
    return (
        <div>
            <div className={classes.cont}>
                <section className={classes.form__container}>
                    <div className={classes.color_1}></div>
                    <div className={classes.color_2}></div>
                    <div className={classes.color_3}></div>
                    <div className={classes.box__login}>
                        <div className={classes.box__square}></div>
                        <div className={classes.box__square}></div>
                        <div className={classes.box__square}></div>
                        <div className={classes.box__square}></div>
                        <div className={classes.box__square}></div>
                        <div className={classes.login__container}>
                            <form className={classes.login__form}>
                                <div className={classes.login__title}>Login Form (markru app)</div>
                                <div className={classes.login__input__container}>
                                    <label className={classes.login__label} htmlFor="email">Email:</label>
                                    <input
                                        id="email"
                                        type='text'
                                        name='email'
                                        placeholder='E-mail'
                                        className={classes.login__input}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className={classes.login__input__container}>
                                    <label className={classes.login__label} htmlFor="password">Password:</label>
                                    <input
                                        id="password"
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        className={classes.login__input}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className={classes.login__input__container}>
                                    <button
                                        className={classes.login__button}
                                        onClick={loginHandler} >
                                        Login
                                    </button>
                                    <button
                                        className={classes.login__button}
                                        onClick={registerHandler}
                                        disabled={loading} >
                                        Registration
                                    </button>
                                </div>
                                <div className={classes.login__input__container, classes.last}>
                                    <input type={'checkbox'} name={'rememberMe'} className={classes.login__checkbox} />
                                    <label htmlFor={'rememberMe'} className={classes.login__forget}>Remember me</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Auth
