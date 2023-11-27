import KoleksiBuku from "../../../pages/koleksibuku";
import Navbar from "@src/components/Navbar";
import Sidebar from "@src/components/Sidebar";
import { render } from "@testing-library/react";
import { SetStateAction } from "react";

describe ("koleksibuku page", () => {
    it("render koleksibuku Page", () => {
        const page = render(<KoleksiBuku/>);
        expect(page).toMatchSnapshot();
    });
    it("render Navbar", () => {
        const page = render(<Navbar setSearchValue={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
        } }/>);
        expect(page).toMatchSnapshot();
    });
    it("render Sidebar Page", () => {
        const page = render(<Sidebar/>);
        expect(page).toMatchSnapshot();
    });
});