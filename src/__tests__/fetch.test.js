import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';

import Fetch from '../fetcher-component/fetch';

describe('Fetch', () => {
    test('renders Fetch component', () => {
        render(<Fetch />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    test('creates Fetch snapshot', () => {
        render(<Fetch />);

        expect(screen.getByText('Loading...')).toMatchSnapshot();
    });
    test('awaits for fetch', async () => {
        render(<Fetch />);

        await waitForElement(() => screen.getByText(/Date/));

        expect(screen.getByText(/Date/)).toMatchSnapshot();
    })
});