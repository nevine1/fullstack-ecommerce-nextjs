
import AllCategories from "@/components/categories/AllCategories";
import { useSelector } from "react-redux";
import FilteredCategories from "@/components/categories/FilteredCategories";
const page = () => {

    return (
        <div>
            {/* <AllCategories /> */}
            {/* filtered categories */}
            <FilteredCategories />
        </div>
    )
}

export default page; 