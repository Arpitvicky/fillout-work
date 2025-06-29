import { fireEvent, render, screen } from "@testing-library/react";
import { NavList } from "./NavList";
import { NavListProps } from "./types";

const mockPageTabs = [
  { id: "1", label: "Info", href: "/info" },
  { id: "2", label: "Detail", href: "/detail" },
];

const renderNavlist = (overrides: Partial<NavListProps> = {}) => {
  const props: NavListProps = {
    pageTabs: mockPageTabs,
    setPageTabs: jest.fn(),
    activeItemIndex: 0,
    setActiveItemIndex: jest.fn(),
    openSettingsIndex: null,
    setOpenSettingsIndex: jest.fn(),
    addPageHandler: jest.fn(),
    ...overrides,
  };

  return render(<NavList {...props} />);
};

describe("NavList", () => {
  it("renders all nav items", () => {
    renderNavlist();
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Detail")).toBeInTheDocument();
  });

  it("calls setActiveItemIndex on link click", () => {
    const setActiveItemIndex = jest.fn();

    renderNavlist({ setActiveItemIndex });

    const link = screen.getByText("Detail");
    fireEvent.click(link);

    expect(setActiveItemIndex).toHaveBeenCalledWith(1);
  });

  it("calls addPageHandler on '+' button click", () => {
    const addPageHandler = jest.fn();
    renderNavlist({ addPageHandler });

    const plusButtons = screen.getAllByText("+");
    // click '+' button after first item
    fireEvent.click(plusButtons[0]);

    expect(addPageHandler).toHaveBeenCalledWith(0);
  });
});
