import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';


const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query,setQuery] = useSearchParams();


  const getProducts = async() => {
    const searchQuery = query.get("q")||"";
    console.log(searchQuery)
    //let url = `http://localhost:3004/products?q=${searchQuery}`;
    let url = ` https://my-json-server.typicode.com/OnlyREHA/shopping/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
   
    setProductList(data)
  }

  useEffect(() => {
    
    getProducts();
  },[query])  //배열이 비어있을 경우에는 setProducts가 한번만 실행

  return (
  <div>
      <Container>
        <Row>
          {
            productList.map((menu) =>(
              <Col lg = {3} >
                <ProductCard key={menu.id} item = {menu}/>
              </Col>
              )
            )
          }
            
        </Row>
      </Container>
  </div>
  );
  
};

export default ProductAll
