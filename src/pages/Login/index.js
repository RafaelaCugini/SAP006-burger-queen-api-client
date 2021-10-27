import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '../../components/Button/index.js';
import { Input } from '../../components/Input/index.js';
import { OrderKitchen } from '../../components/OrderKitchen/index.js';
import validation from '../../services/React/validateInfo.js';
import '../../components/Input/index.css';
import './index.css';
import '../Register/responsive.css';

export function Login() {
    const history = useHistory()
    const navigateToRegister = () => {
        history.push('/cadastro');
    }

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        setErrors(validation(values))
        fetch('https://lab-api-bq.herokuapp.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then((json) => {
                const token = json.token
                const id = json.id
                const role = json.role
                localStorage.setItem("usersToken", token);
                localStorage.setItem("role", role)
                if (token !== null && id !== null && role === 'hall') {
                    history.push('/menu')
                } else if (token !== null && id !== null && role === 'kitchen') {
                    history.push('/cozinha')
                }
                <OrderKitchen role={role} />
            })
    }

    return (
        <main className='mainLogin'>
            <div className="logo">
                <h1 className="burger">Burger Pink</h1>
            </div>

            <div className="divInfo">
                <fieldset className="formFieldsetLogin">
                    <h1 className="h1Login">LOGIN</h1>
                    <form className="form-wrapper">
                        <div className="divEmail">
                            <label for='email' className="labelInputs">E-mail </label>
                            <Input
                                data="input-email"
                                type="email"
                                name="email"
                                inputClass="inputEmail"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className='msgErro' data-test-id='errorEmail'>{errors.email}</p>}
                        </div>

                        <div className="divPassword">
                            <label for='password' className="labelInputs"> Password </label>
                            <Input
                                data="input-password"
                                type="password"
                                name="password"
                                inputClass="inputPassword"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="msgErro" data-test-id='errorPassword'>{errors.password}</p>}
                        </div>

                        <Button
                            type="submit"
                            data='submit-btn'
                            className="yellowBtn"
                            id="signInBtn"
                            onClick={handleFormSubmit}
                        >ENTRAR</Button>
                        <p className="isWorker">Employee?</p>

                        <Button
                            type="button"
                            data='signUp-btn'
                            className="redBtn"
                            id="signUpBtn"
                            onClick={navigateToRegister}
                        >REGISTER</Button>

                    </form>
                </fieldset>

                <footer>
                    <p className="pFooter">@ Copyright 2021 |
                         <a href="https://github.com/RafaelaCugini" target="blank"> Rafaela Cugini</a></p>
                </footer>
            </div>
        </main>
    )
}