import Navbar from "@src/components/Navbar";
import DetailBuku from "../../../pages/detailbuku";
import { render } from "@testing-library/react";
import Sidebar from "@src/components/Sidebar";
import { SetStateAction } from "react";

describe ("detailbuku page", () => {
    it("render detailbuku Page", () => {
        const page = render(<DetailBuku bukuJudul={""}/>);
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