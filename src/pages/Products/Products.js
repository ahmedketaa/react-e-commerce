import axios from "axios"
import { useEffect, useState } from "react"
import Card from "./Card"
import "./home.css"
import CategoryFilter from "./CategoryFilter"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../ReduxToolkit/categorySlice"
// import topone from "../../../public/topne.jpg"




function Home(){

    // const [products, setProduct] = useState([])
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.prods)
     const selectCategory = useSelector((state) => state.products.selectCategory)

useEffect( () =>{
axios.get("https://fakestoreapi.com/products")
.then((res)=> {dispatch(setProducts(res.data));
    console.log(res.data)
})
.catch((err)=>{console.log(err)})
},[dispatch])


const productselected = selectCategory?
products.filter((product)=> product.category === selectCategory):products

const handlAllProduct = () => {
    dispatch(setProducts())
}


    return(
        <>
       <div className="container topimg" ></div>
     <CategoryFilter/>
     <button className="btn btn-dark"  onClick={() => handlAllProduct()}>Show All Products</button>
    
        <div  className="row mt-5 row-cols-1 row-cols-md-4 g-4 d-flex justify-content-evenly ms-5 mx-5">
        {productselected.map((product, index) => (
    <div key={index}>
        <Card
            category={product.category}
            img={product.image}
            title={product.title}
            rating={product.rating.rate}
            price={product.price}
        />
    </div>
))}
       </div>
       
       {/* </div> */}
        </>
    )

}



export default Home

