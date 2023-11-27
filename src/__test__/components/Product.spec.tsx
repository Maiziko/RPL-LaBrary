import Product from "@src/components/Product";
import { render } from "@testing-library/react";
import { SetStateAction } from "react";

describe ("detailbuku page", () => {
    it("render detailbuku Page", () => {
        const page = render(<Product id={0} name={""} price={0} quantity={0} onAddToCart={function (id: number): void {
            throw new Error("Function not implemented.");
        } }/>);
        expect(page).toMatchSnapshot();
    });
});