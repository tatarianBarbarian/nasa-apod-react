import { describe, it } from "vitest";
import { Viewer } from "../Viewer";
import { render, screen } from '@testing-library/react';

describe('<Viewer />', () => {
    it('given correct data, should try render image', () => {
        const data = {
            url: '/src/mock/img/1.jpg', 
            hdurl: '/src/mock/img/1_hd.jpg', 
            media_type: 'image'
        };

        const {container} = render(<Viewer data={data} />);

        expect(container).toMatchSnapshot();
    })

    it('given error, should render message with error text', () => {
        const error = new Error('Error text!');
        render(<Viewer error={error} />)
        const message = screen.getByText(/error text/i);
        
        expect(message).toBeVisible();
        expect(message.textContent).toMatchInlineSnapshot('"Error text!"');
    })

    it('given unsopprted media type, should render message about it', () => {
        const data = {
            media_type: 'other'
        };
        render(<Viewer data={data} />)
        const message = screen.getByText(/unsupported/i);

        expect(message).toBeVisible();
        expect(message.textContent).toMatchInlineSnapshot('"Unsupported media type, try another day"');
    })
})
