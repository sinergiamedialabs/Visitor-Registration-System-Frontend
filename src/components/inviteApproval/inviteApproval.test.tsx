import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InviteApproval } from "./index";
import { useInviteDetailsQuery, useVisitRequestMutation } from "../../services/invite";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Mock necessary dependencies
jest.mock("../../services/invite");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("InviteApproval Component", () => {
  const inviteDetailsMock = {
    data: {
      status: false,
      event: {
        name: "Sample Event",
        eventDate: "2023-08-19",
      },
      venue: {
        name: "Sample Venue",
        address: "1234 Sample Address",
      },
      user: {
        fullName: "John Doe",
      },
    },
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useInviteDetailsQuery as jest.Mock).mockReturnValue({
      data: inviteDetailsMock,
      error: null,
      isLoading: false,
    });
    (useVisitRequestMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: true }),
      { isLoading: false },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders invite details correctly", async () => {
    render(<InviteApproval />);
    expect(screen.getByText("Do you wish to accept the invitation?")).toBeInTheDocument();
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("Sample Venue")).toBeInTheDocument();
    expect(screen.getByText("1234 Sample Address")).toBeInTheDocument();
    expect(screen.getByText("19-08-2023")).toBeInTheDocument();
  });

  test("shows loader when data is loading", () => {
    (useInviteDetailsQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
    });
    render(<InviteApproval />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("calls visitRequest mutation with isAccepted: true and generates a barcode on 'Yes' click", async () => {
    const mockVisitRequest = jest.fn().mockResolvedValue({ data: true });
    (useVisitRequestMutation as jest.Mock).mockReturnValue([mockVisitRequest, { isLoading: false }]);

    render(<InviteApproval />);
    fireEvent.click(screen.getByText("Yes"));

    await waitFor(() => {
      expect(mockVisitRequest).toHaveBeenCalledWith({
        invitees_id: 1,
        barCode: expect.any(String),
        isAccepted: true,
      });
    });

    expect(toast.success).toHaveBeenCalledWith("Barcode generated successfully.");
  });

  test("calls visitRequest mutation with isAccepted: false on 'No' click", async () => {
    const mockVisitRequest = jest.fn().mockResolvedValue({ data: true });
    (useVisitRequestMutation as jest.Mock).mockReturnValue([mockVisitRequest, { isLoading: false }]);

    render(<InviteApproval />);
    fireEvent.click(screen.getByText("No"));

    await waitFor(() => {
      expect(mockVisitRequest).toHaveBeenCalledWith({
        invitees_id: 1,
        barCode: "",
        isAccepted: false,
      });
    });

    expect(toast.success).toHaveBeenCalledWith("Response submitted successfully.");
  });

  test("disables buttons and shows rejection message after clicking 'No'", async () => {
    render(<InviteApproval />);
    const noButton = screen.getByText("No");

    fireEvent.click(noButton);

    await waitFor(() => {
        // Since `getByText` throws if the element is not found, this will wait until it is present
        expect(screen.getByText("Invitation Rejected.")).toBeInTheDocument();
      });
  });
});