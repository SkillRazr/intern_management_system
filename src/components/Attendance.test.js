import { render, screen } from "@testing-library/react";
import Attendance from "./Attendance";

// Mock inters
// const mockInterns = [
//   {
//     name: 'Yagyaraj',
//     email: 'yagyaraj@email.com'
//   },
//   {
//     name: 'rishab',
//     email: 'rishab@email.com'
//   }
// ]

// // Mock API responses
// jest.mock('../services', () => ({
//   getInterns: jest.fn(() => Promise.resolve({
//     data: mockInterns
//   })),
//   updateAttendance: jest.fn()
// }));

describe("attendence component ui", () => {
  render(<Attendance />);
});

test("render a interns list components", () => {
  const component = render(<Attendance />);
  console.log(component);

  const checkInternList = component.getAllByTestId("internlist");

  expect(checkInternList).toBeInTheDocument();

  // console.log(component);
});

// describe("Attendance component", () => {
//   it("renders intern list on each render", async () => {
//     render(<Attendance />);
//     await waitFor(() => {
//       expect(screen.getByText("John Doe")).toBeInTheDocument();
//     });
//   });

//   it("filters list on search", async () => {
//     render(<Attendance />);

//     fireEvent.change(screen.getByRole("textbox"), {
//       target: { value: "john" },
//     });

//     expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
//     expect(screen.getByText("John Doe")).toBeInTheDocument();
//   });

//   it("selects intern on checkbox click", async () => {
//     render(<Attendance />);

//     const checkboxes = await screen.findAllByRole("checkbox");
//     fireEvent.click(checkboxes[0]);

//     expect(checkboxes[0]).toBeChecked();
//   });

//   it("calls update API on proceed", async () => {
//     render(<Attendance />);

//     // select interns
//     // click mark absence
//     // click proceed

//     expect(updateAttendance).toHaveBeenCalled();
//   });

//   it("shows success message on success", async () => {
//     render(<Attendance />);

//     // select interns
//     // click proceed

//     updateAttendance.mockResolvedValueOnce({ status: 1 });

//     await waitFor(() => {
//       expect(toast.success).toHaveBeenCalled();
//     });
//   });

//   it("shows error on failure", async () => {
//     render(<Attendance />);

//     // select interns
//     // click proceed

//     updateAttendance.mockResolvedValueOnce({ status: 0 });

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalled();
//     });
//   });
// });
