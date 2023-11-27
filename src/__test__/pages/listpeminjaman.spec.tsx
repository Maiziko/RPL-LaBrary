import ListPeminjaman from "../../../pages/listpeminjaman";
import Navbar from "@src/components/Navbar";
import Sidebar from "@src/components/Sidebar";
import ModalListPeminjaman from "@src/components/ModalListPeminjaman";
import { render } from "@testing-library/react";
import { SetStateAction } from "react";

describe ("koleksibuku page", () => {
    it("render koleksibuku Page", () => {
        const page = render(<ListPeminjaman/>);
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
    it("render ModalListPeminjaman Page", () => {
        const page = render(<ModalListPeminjaman isOpen={false} onClose={function (): void {
            throw new Error("Function not implemented.");
        } } selectedBooks={[]} returnDate={""}/>);
        expect(page).toMatchSnapshot();
    });
});