import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
//url 통신 경로 ? query String(옵션)

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const {id} = useParams();
 
  const getProductDetail = async() => {
     let url = `https://my-json-server.typicode.com/OnlyREHA/shopping/products/${id}`;
    let response = await fetch(url);
    let data = await response.json()
    setProduct(data)
    console.log(data)
  }
  useEffect(() => {
    getProductDetail();
  },[])

  return (
    <Container>
      <Row>
        <Col className='product-img' md={7}>
        <img src={product?.img} alt="" />
        </Col>
        <Col className='product-desc'  md={5}>
          <div className='desc_tit'>{product?.title}</div>
          <div>{product?.price} </div>
          <div>{product?.choice? "Conscious choice": ""} </div>

          <Dropdown className='sizeBtn'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
             size
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                product?.size.length>0 &&
                product?.size.map((item) => {
                  return <Dropdown.Item href="#/action-1">{item}</Dropdown.Item>
                })  //map함수는 return 필수
              }
              
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="primary">장바구니 담기</Button>{' '}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail
