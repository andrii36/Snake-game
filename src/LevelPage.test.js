import { fireEvent, render, screen } from "@testing-library/react";
import LevelPage from "./LevelPage";

describe('LevelPage component renders correctly', () => {
    
    it('matches snapshot', () => {
        const {asFragment} = render(<LevelPage/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders all elements', () => {
        render(<LevelPage/>);
        const component = screen.getByTestId('level_page_wrapper');
        expect(component.querySelectorAll('h3')).toHaveLength(1);
        expect(component.querySelectorAll('button')).toHaveLength(3);
    });

    it('click on button works properly', () => {
        const fn = jest.fn();
        render(<LevelPage showGameComponent={fn}/>);
        const component = screen.getByTestId('level_page_wrapper');
        fireEvent.click(component.querySelector('button'));
        expect(fn).toHaveBeenCalled();
    });
});