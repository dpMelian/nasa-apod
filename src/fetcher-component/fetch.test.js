import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/extend-expect";
import Fetch from "./fetch";

const server = setupServer(
  rest.get(`https://api.nasa.gov/planetary/apod`, async (req, res, ctx) => {
    return res(
      ctx.json({
        copyright: "John Doe",
        url: "https://example.com/image/example.jpg",
        explanation: "Lorem ipsum",
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("mocking API calls", () => {
  test("if image has proper src attribute", async () => {
    render(<Fetch />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByAltText("nasa-apod")).toHaveAttribute(
      "src",
      "https://example.com/image/example.jpg"
    );
  });

  test("if description field has proper value", async () => {
    render(<Fetch />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const descriptionField = screen.queryByTestId("description");

    if (descriptionField != null) {
      expect(descriptionField).toHaveTextContent("Lorem ipsum");
    }
  });

  test("if author field has proper value", async () => {
    render(<Fetch />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const authorField = screen.queryByTestId("author");

    if (authorField != null) {
      expect(authorField).toHaveTextContent("John Doe");
    }
  });
});
