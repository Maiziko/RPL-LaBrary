import ModalListPeminjaman from "@src/components/ModalListPeminjaman";
import { render } from "@testing-library/react";
import { SetStateAction } from "react";

describe ("detailbuku page", () => {
    it("render detailbuku Page", () => {
        const page = render(<ModalListPeminjaman isOpen={false} onClose={function (): void {
            throw new Error("Function not implemented.");
        } } selectedBooks={[]} returnDate={""}/>);
        expect(page).toMatchSnapshot();
    });
});