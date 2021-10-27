import ReactDOM from 'react-dom';
import { Input } from './index'
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup)

it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Input />, div)
})

it('render email input', () => {
    render(<Input type="email" data="data-input" />)
    const email = screen.getByTestId('data-input');
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('type', 'email')
})

it('should call onChange when input value is changed', () => {
    const inputPlaceholder = '';
    const onChange = jest.fn()
    render(<Input onChange={onChange} type='email' inputPlaceholder={inputPlaceholder} />)
    const email = screen.getByPlaceholderText(inputPlaceholder);
    fireEvent.change(email, {
        target: {
            value: 'teste123@gmail.com'
        }
    })
    expect(onChange).toHaveBeenCalledTimes(1)
})

it('render password input', () => {
    render(<Input type='password' data="data-input"/>)
    const password = screen.getByTestId('data-input');
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute('type', 'password')
})