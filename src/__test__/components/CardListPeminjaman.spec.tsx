import CardListPeminjaman from "@src/components/CardListPeminjaman";
import { render } from "@testing-library/react";
import { SetStateAction } from "react";

describe ("detailbuku page", () => {
    it("render detailbuku Page", () => {
        const page = render(<CardListPeminjaman/>);
        expect(page).toMatchSnapshot();
    });
});