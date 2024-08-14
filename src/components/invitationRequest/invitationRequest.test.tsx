import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Invite from "./index";
import { toast } from "react-toastify";

// Mock the toast function
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("Invite Component", () => {
  it("renders the component correctly", () => {
    render(<Invite />);
    expect(screen.getByText("Heading Label")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Venue")).toBeInTheDocument();
    expect(screen.getByLabelText("Event")).toBeInTheDocument();
    expect(screen.getByText("Invite")).toBeInTheDocument();
  });

  it("displays validation errors when the form is submitted without required fields", async () => {
    render(<Invite />);
    fireEvent.click(screen.getByText("Invite"));

    await waitFor(() => {
      expect(screen.getByText("Name is required*")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Venue is required*")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Event is required*")).toBeInTheDocument();
    });
  });

  it("submits the form and shows a success toast when all fields are filled", async () => {
    render(<Invite />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Option 1" },
    });
    fireEvent.change(screen.getByLabelText("Venue"), {
      target: { value: "Venue 1" },
    });
    fireEvent.change(screen.getByLabelText("Event"), {
      target: { value: "Event 1" },
    });

    fireEvent.click(screen.getByText("Invite"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("msg");
    });
  });

  it("disables the submit button when the form is submitting", async () => {
    render(<Invite />);
    const inviteButton = screen.getByText("Invite");
    fireEvent.click(inviteButton);

    await waitFor(() => {
      expect(inviteButton).toBeDisabled();
    });
  });
});