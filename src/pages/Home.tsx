/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState, useContext} from "react";
import CategoryBox from "../components/CategoryBox";
import { CategoryContext } from "../context/categoryContext";
import VideogamesDetail from "../components/VideogamesDetail";

const Home = () => {
    const { category, setCategory } = useContext(CategoryContext);
    return(
        <>
            <CategoryBox/>
            <VideogamesDetail/>
        </>
    
    )
}

export default Home;