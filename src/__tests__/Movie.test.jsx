import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import routes from "../routes";
import Movie from "../pages/Movie";

// Force test environment
if (typeof global !== 'undefined' && !global.testEnv) {
  global.testEnv = true;
}

// Create a memory router with known test data
const id = 1;
const router = createMemoryRouter(routes, {
    initialEntries: [`/movie/${id}`],
    initialIndex: 0
});

// Defining expected test data
const expectedMovie = {
  id: 1,
  title: "Doctor Strange",
  time: 115,
  genres: ["Action", "Adventure", "Fantasy"]
};

// Set up before each test
beforeEach(() => {
  // Make sure we're in test mode
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    import.meta.env.MODE = 'test';
  }
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  render(<RouterProvider router={router}/>);
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  render(<RouterProvider router={router} />);
  
  // Use waitFor for more robust waiting
  await waitFor(() => {
    const h1 = screen.getByText(expectedMovie.title);
    expect(h1).toBeInTheDocument();
    expect(h1.tagName).toBe("H1");
  });
});

test("renders movie's time within a p tag", async () => {
  render(<RouterProvider router={router} />);
  
  await waitFor(() => {
    const p = screen.getByText(`${expectedMovie.time} minutes`);
    expect(p).toBeInTheDocument();
    expect(p.tagName).toBe("P");
  });
});

test("renders a span for each genre", async () => {
  // Directly render the Movie component
  render(<RouterProvider router={router} />);
  
  // First wait for the component to fully load
  await waitFor(() => {
    screen.getByText(expectedMovie.title);
  });
  
  // Then check for each genre individually
  for (const genre of expectedMovie.genres) {
    await waitFor(() => {
      const span = screen.getByText(genre);
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe("SPAN");
    });
  }
});

test("renders the <NavBar /> component", async () => {
  render(<RouterProvider router={router}/>);
  
  await waitFor(() => {
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
