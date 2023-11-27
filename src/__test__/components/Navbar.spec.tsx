import Navbar from "@src/components/Navbar";
import { render } from "@testing-library/react";
import { SetStateAction } from "react";

describe ("detailbuku page", () => {
    it("render detailbuku Page", () => {
        const page = render(<Navbar setSearchValue={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
        } }/>);
        expect(page).toMatchSnapshot();
    });
});