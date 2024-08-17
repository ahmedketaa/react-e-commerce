import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faMicrochip, faPerson, faPersonDress } from "@fortawesome/free-solid-svg-icons"
import './CategoryFilter.css'
import { useDispatch } from "react-redux";
import { setSelectCategory } from "../../ReduxToolkit/categorySlice";



function CategoryFilter(){

    const dispatch = useDispatch()
    const handlecategory = (e) =>{
        dispatch(setSelectCategory(e.target.value))
    }
    
return(

    <>
    <h2 className="mt-5 ms-5">Browse By Category</h2>
    
    <div className="text-center mt-5 ">
   
<input type="radio" className="btn-check" name="categoty" id="option1" value="women's clothing" onChange={(e)=> handlecategory(e)} autocomplete="off" />
<label className="  iconBtn" for="option1">    <FontAwesomeIcon className="star  radioIcon" icon={faPersonDress} />
<p className="text parg">Women's Cloth</p>
</label>

<input type="radio" className="btn-check" name="categoty" id="option2" value="men's clothing" onChange={(e)=> handlecategory(e)} autocomplete="off"/>
<label className="  iconBtn" for="option2">    <FontAwesomeIcon className="star  radioIcon" icon={faPerson} />
<p className="text parg">Men's Cloth</p>
</label>

<input type="radio" className="btn-check" name="categoty" id="option3" value="jewelery" onChange={(e)=> handlecategory(e)} autocomplete="off" />
<label className="  iconBtn" for="option3">    <FontAwesomeIcon className="star  radioIcon" icon={faGem} />
<p className="text parg">Jewelery</p>
</label>

<input type="radio" className="btn-check" name="categoty" id="option4"  value="electronics" onChange={(e)=> handlecategory(e)}  autocomplete="off"/>
<label className="  iconBtn" for="option4">    <FontAwesomeIcon className="star radioIcon" icon={faMicrochip} />
<p className="text parg">Electronics</p>
</label>
</div>
<hr className="w-75 m-auto mt-5"/>
    </>
)

}

export default CategoryFilter