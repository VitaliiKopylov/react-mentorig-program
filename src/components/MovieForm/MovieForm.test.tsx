import { render } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe('MovieForm component', () => {
  it('should render empty form initially when no form data provided', () => {
    render(<MovieForm />);
  })
})