import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders dashboard title', () => {
    render(<App />);
    expect(screen.getByText(/Developer Dashboard/i)).toBeInTheDocument();
});