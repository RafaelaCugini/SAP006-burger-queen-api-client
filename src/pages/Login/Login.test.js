import { Login } from './index'
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('tests to Login Page', () => {
    afterEach(cleanup)

    it('pass valid email to test email input field', () => {
        render(<Login />)
        const inputEl = screen.getByTestId("input-email");
        userEvent.type(inputEl, 'test@gmail.com');

        expect(screen.getByTestId("input-email")).toHaveValue('test@gmail.com');
        expect(screen.queryByTestId('errorEmail')).not.toBeInTheDocument();
    })

})