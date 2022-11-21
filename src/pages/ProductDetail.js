import { Button, Image } from "antd";
import React, { useState } from "react";
import menu1 from "../images/menu/order1.png";
import icon_tea from "../images/menu/tea.jpg";
import SPLQ from "../images/blog/MoriiBlog1.jpeg";
import { Card, Col, Row, Typography, Breadcrumb } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import styled from "styled-components";
const { Meta } = Card;
const Img = styled.img`
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -ms-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  &:hover {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform-y: scale(1.2);
    overflow-y: hidden;
  }
`;
const Input_checkbox = styled.input`
  &:checked ~ label {
    background-color: #146d4d;
    color: #fff;
  }
`;
const ProductDetail = () => {
  const [sizeVuaActive, setSizeVuaActive] = useState(true);
  const [sizeLonActive, setSizeLonActive] = useState(false);
  const [listTopping, setListTopping] = useState([]);
  console.log(listTopping);
  const handleChangeSize = (e) => {
    if (e.target.value === "vua") {
      setSizeVuaActive(true);
      setSizeLonActive(false);
    } else if (e.target.value === "lon") {
      setSizeVuaActive(false);
      setSizeLonActive(true);
    }
  };

  const handleClickTopping = (e) => {
    if (e.target.checked) {
      setListTopping([...listTopping, e.target.value]);
      console.log(listTopping);
    } else {
      setListTopping(listTopping.filter((item) => item !== e.target.value));
      console.log(listTopping);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="mt-20 mb-6">
        <Breadcrumb>
          <Breadcrumb.Item>Menu</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/order">Đồ uống</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Capuchino cà phê trứng</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="  items-center mx-auto ">
        <Row className="w-full pb-10" gutter={35}>
          <Col span={12}>
            <img className="h-[80vh] w-full bg-contain" src={menu1} />
          </Col>
          <Col span={12}>
            <Title level={2}>Capuchino cà phê trứng</Title>
            <Text className="text-[1.8rem] text-[#146d4d]">49.000 đ</Text>
            <Text className="text-[1.2rem]  block">Chọn size (bắt buộc)</Text>
            <div className="flex mt-2">
              <div className="relative h-[2.4rem] w-[7rem] flex items-center border-[0.01rem] rounded-[0.3rem] border-solid  ">
                <input
                  onClick={handleChangeSize}
                  className="hidden  "
                  id="sizeVua"
                  type="radio"
                  name="sizeTraSua"
                  value="vua"
                />
                <label
                  for="sizeVua"
                  className={`cursor-pointer w-full h-full flex ${
                    sizeVuaActive ? "bg-[#146d4d]" : ""
                  }`}
                >
                  <p
                    className={`text-[0.9rem] mx-auto text-center my-auto ${
                      sizeVuaActive ? "bg-[#146d4d] text-[#fff]" : "text-[#000]"
                    }`}
                  >
                    Vừa + 0đ
                  </p>
                </label>
              </div>
              <div className="relative h-[2.4rem] w-[7rem] flex items-center border-[0.01rem] rounded-[0.3rem] border-solid ml-3  ">
                <input
                  onClick={handleChangeSize}
                  className="hidden  "
                  id="sizeLon"
                  type="radio"
                  name="sizeTraSua"
                  value="lon"
                />
                <label
                  for="sizeLon"
                  className={`cursor-pointer w-full h-full flex ${
                    sizeLonActive ? "bg-[#146d4d]" : ""
                  } `}
                >
                  <p
                    className={`text-[0.9rem] mx-auto text-center my-auto ${
                      sizeLonActive ? "bg-[#146d4d] text-[#fff]" : "text-[#000]"
                    }`}
                  >
                    Lớn + 5000đ
                  </p>
                </label>
              </div>
            </div>
            <Text className="text-[1.2rem] mt-4 block">Topping</Text>
            <div className="flex flex-wrap ">
              <div className="relative  flex items-center border-[0.01rem] rounded-[0.3rem] border-solid mr-3  mt-4 ">
                <Input_checkbox
                  onClick={handleClickTopping}
                  className="hidden  "
                  id="trongtin"
                  type="checkbox"
                  name="Topping"
                  value="trongtin"
                />
                <label
                  for="trongtin"
                  className={`cursor-pointer w-full box-border	 block `}
                >
                  <p
                    className={`text-[0.9rem] mx-auto text-center my-auto py-2  px-3 border-[0.01rem] rounded-[0.3rem] border-solid  `}
                  >
                    Pudding Socola Machiato cà phê sữa + 5000đ
                  </p>
                </label>
              </div>
              <div className="relative  flex items-center border-[0.01rem] rounded-[0.3rem] border-solid mr-3  mt-4">
                <Input_checkbox
                  onClick={handleClickTopping}
                  className="hidden  "
                  id="tranchauden"
                  type="checkbox"
                  name="Topping"
                  value="tranchauden"
                />
                <label
                  for="tranchauden"
                  className={`cursor-pointer w-full box-border	 block `}
                >
                  <p
                    className={`text-[0.9rem] mx-auto text-center my-auto py-2  px-3 border-[0.01rem] rounded-[0.3rem] border-solid `}
                  >
                    Trân châu đen + 5000đ
                  </p>
                </label>
              </div>
              <div className="relative  flex items-center border-[0.01rem] rounded-[0.3rem] border-solid mr-3 mt-4 ">
                <Input_checkbox
                  onClick={handleClickTopping}
                  className="hidden  "
                  id="tranchautrang"
                  type="checkbox"
                  name="Topping"
                  value="tranchautrang"
                />
                <label
                  for="tranchautrang"
                  className={`cursor-pointer w-full box-border	 block `}
                >
                  <p
                    className={`text-[0.9rem] mx-auto text-center my-auto py-2  px-3 border-[0.01rem] rounded-[0.3rem] border-solid  
                    `}
                  >
                    Trân châu trắng + 5000đ
                  </p>
                </label>
              </div>
              <Button className="bg-[#146d4d] w-full rounded-md py-[1.3rem] flex justify-center items-center text-[#fff] text-[0.7rem] mt-7 font-bold">
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Col>
        </Row>
        <Row
          className="w-full border-y-[0.01rem] mx-auto  border-solid  h-[25vh] flex items-center"
          gutter={35}
        >
          <Title className="mb-0" level={3}>
            Mô tả sản phẩm
          </Title>
          <Text className="mt-[-2.5rem]">
            Bắt đầu ngày mới với xíu đắng nhẹ của cà phê phin truyền thống kết
            hợp Espresso Ý, kèm chút ngọt ngào từ kem sữa, thêm ấn tượng bởi vị
            dừa lá dứa thơm béo đậm chất Việt Nam. Đặc biệt, nhân đôi độ ngon
            với topping thạch cà phê giòn dai, cùng foam phô mai mềm mịn dễ
            ghiền.
          </Text>
        </Row>
        <Title className="mb-0 mt-4 block" level={3}>
          Sản phẩm liên quan
        </Title>
        <Row gutter={35} className="w-full  mx-auto    ">
          <Col span={6}>
            <Card
              size="large"
              hoverable
              className="  mx-0 my-2 mb-10 mt-6 rounded-lg"
              bordered={true}
              cover={
                <div className="h-[15rem] overflow-hidden ">
                  <Img
                    className=" hover:overflow-hidden "
                    alt="example"
                    src={menu1}
                  />
                </div>
              }
            >
              <Meta
                title={
                  <p className="whitespace-normal mb-0">
                    Sữa tươi chân châu đường đen
                  </p>
                }
                description="30.000đ"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              size="large"
              hoverable
              className="  mx-0 my-2 mb-10 mt-6 rounded-lg"
              bordered={true}
              cover={
                <div className="h-[15rem] overflow-hidden ">
                  <Img
                    className=" hover:overflow-hidden "
                    alt="example"
                    src={menu1}
                  />
                </div>
              }
            >
              <Meta
                title={
                  <p className="whitespace-normal mb-0">
                    Sữa tươi chân châu đường đen
                  </p>
                }
                description="30.000đ"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              size="large"
              hoverable
              className="  mx-0 my-2 mb-10 mt-6 rounded-lg"
              bordered={true}
              cover={
                <div className="h-[15rem] overflow-hidden ">
                  <Img
                    className=" hover:overflow-hidden "
                    alt="example"
                    src={menu1}
                  />
                </div>
              }
            >
              <Meta
                title={
                  <p className="whitespace-normal mb-0">
                    Sữa tươi chân châu đường đen
                  </p>
                }
                description="30.000đ"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              size="large"
              hoverable
              className="  mx-0 my-2 mb-10 mt-6 rounded-lg"
              bordered={true}
              cover={
                <div className="h-[15rem] overflow-hidden ">
                  <Img
                    className=" hover:overflow-hidden "
                    alt="example"
                    src={menu1}
                  />
                </div>
              }
            >
              <Meta
                title={
                  <p className="whitespace-normal mb-0">
                    Sữa tươi chân châu đường đen
                  </p>
                }
                description="30.000đ"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
