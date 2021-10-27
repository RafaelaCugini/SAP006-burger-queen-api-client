import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/index.js';
import '../../components/Button/index.css';
import '../../components/Input/index.css';
import { Input } from '../../components/Input/index.js'
import validation from '../../services/React/validateInfo';
import React, { useState } from 'react';
import './index.css';
import './responsive.css';


export function Register() {

    const history = useHistory()

    const navigateToLogin = () => {
        history.push('/login');
    }

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: "",
        password: "",
        role: "",
        restaurant: "testeBurger"
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

        fetch('https://lab-api-bq.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)

        })
            .then(res => res.json())
            .then((json) => {
                const token = json.token
                const role = json.role
                localStorage.setItem("usersToken", token);
                localStorage.setItem("role", role)
                if (json.id !== undefined && role === "hall") {
                    history.push('/menu')
                } else if (json.id !== undefined && role === "kitchen") {
                    history.push('/cozinha')
                }
            })
    }

    return (
        <main>
            <Button type="button" className="backHome"
                onClick={navigateToLogin}>← Back Home</Button>
            <div className="logo">
                <h1 className="burger">Burger Pink</h1>
            </div>
            <div className="divRegister">
                <fieldset className="formFieldsetLogin">
                    <h1 className="h1Register"> REGISTRATION</h1>
                    <form className="formRegister">
                        <label for='email' className="labelInputs">E-mail </label>
                        <Input
                            type="email"
                            name="email"
                            inputClass="inputEmail"
                            value={values.email}
                            onChange={handleChange}
                        /> 
                        {errors.email && <p className="msgErro">{errors.email}</p>}

                        <label for='password' className="labelInputs"> Password </label>
                        <Input
                            type="password"
                            name="password"
                            inputClass="inputPassword"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="msgErro">{errors.password}</p>}

                        <div className="radioBtn">
                            <div className="radioBtn1">
                                <label className="roleLabel">
                                    <input type="radio" name="role" value="hall"
                                        onChange={handleChange}
                                    />
                                    &nbsp;Hall
                                </label>
                            </div>

                            <div className="radioBtn2">
                                <label className="roleLabel">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="kitchen"
                                        onChange={handleChange}
                                    />
                                    &nbsp;Kitchen
                                </label>
                            </div>
                        </div>
                        {errors.role && <p className="msgErro">{errors.role}</p>}

                        <Button type="submit"
                            className="orangeBtn"
                            id="registerBtn"
                            onClick={handleFormSubmit}>REGISTER</Button>
                    </form>
                </fieldset>
            </div>
            <footer>
                <p className="pFooter">copyright@2021 |
                Criated by <a href="https://github.com/RafaelaCugini" target="blank">Rafaela Cugini</a></p>
            </footer>
        </main>
    )
}