import axios from "axios";
import { useEffect, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";

function Home() {
 

  return (
   <div className="pt-28">
   <MainSlider />
   <CategorySlider />
   <RecentProducts />
   
   </div>
  );
}

export default Home;
