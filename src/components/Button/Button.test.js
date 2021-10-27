import { render, /*screen,*/ fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button/index.js';
import '@testing-library/jest-dom/extend-expect';


afterEach(cleanup)
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div)
})

it('render button correctly', () => {
    const text = "Entrar"
    const { getByTestId } = render(<Button>{text}</Button>)
    expect(getByTestId('button')).toHaveTextContent('Entrar');
})

it('should call a function when clicked', () => {
    const func = jest.fn();
    const { queryByTestId } = render(<Button onClick={func} data='btn'/>)
    fireEvent.click(queryByTestId('btn'))
    expect(func).toHaveBeenCalledTimes(1);
});