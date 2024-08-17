import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row,  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons"


function Wishlist() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => { setProducts(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const twoProducts = products.slice(0, 2);

    return (
        <Container>
            <h1 className="my-4">My Wishlist
            <FontAwesomeIcon className="heart text-danger" icon={faHeart} />
            </h1>
            <Row>
                
                    
                    <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Delete</th>
      {/* <th scope="col">img</th> */}
      <th colSpan={2} scope="col"  className="ps-5">Product Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
  {twoProducts.map((product, index) => (
    <tr key={index}>
       <td> <button className="btn xxbtn "><FontAwesomeIcon className="xx text-danger" icon={faX} />
        </button></td>
      <td><img className="rounded mx-auto d-block pt-2 " style={{width: "100px", height: "100px"}} src={product.image} alt=".."/></td>
      <td>{product.title}</td>
      <td>${product.price}</td>
      <td>{product.category}</td>

      <td>
        <button className="btn btn-success">Add To Cart</button>
      
        

      </td>
      </tr>
         ))}
  </tbody>
</table>
             
            </Row>
        </Container>
    );
}

export default Wishlist;
