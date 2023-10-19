import { render, screen, fireEvent } from "@testing-library/react";
import { mockInterns } from "../__mocks__/MockInternList";
import Attendance from "@/components/Attendance";
import { getInterns } from "../src/services";

jest.mock("../src/services", () => ({
  getInterns: jest.fn(), // Mocking getInterns api from services
  updateAttendance: jest.fn().mockResolvedValueOnce({}), // Mocking updateAttendance api from services
}));

describe("Attendance Component", () => {
  test("calls getInterns on mount", async () => {
    // setting mock intern data for getInterns Api service
    getInterns.mockResolvedValue({ data: mockInterns });

    render(<Attendance />);

    //getInterns should return interns as response
    expect(getInterns).toHaveBeenCalledTimes(1);
  });

  // Checking search input of interns list
  it("render the input search box", async () => {
    render(<Attendance />);
    expect(screen.getByRole("internSearchBox")).toHaveAccessibleName(
      "intern search"
    );
  });

  // Filter of the internslist by search input
  it("filters interns based on search query", async () => {
    const { getByRole, getAllByTestId } = render(<Attendance />);
    const searchInput = getByRole("internSearchBox");
    fireEvent.change(searchInput, { target: { value: "Suraj Jain M" } });

    // Check that the displayed interns are filtered correctly
    expect(mockInterns.some((intern) => intern.name === "Suraj Jain M")).toBe(
      true
    );
  });

  // Checkbox of show all and select all
  it("select checkbox change for select all and show all", () => {
    const { getByTestId } = render(<Attendance />);
    const selectAll = getByTestId("selectAll");
    fireEvent.click(selectAll);
    const showAll = getByTestId("showAll");
    fireEvent.click(showAll);

    expect(selectAll.checked).toBe(false);
    expect(showAll.checked).toBe(false);
  });
});
