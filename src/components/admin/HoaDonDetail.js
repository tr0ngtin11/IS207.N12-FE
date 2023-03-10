import { Col, Row, InputNumber, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
// import order1 from "../images/menu/order1.png";
// import order2 from "../images/menu/order2.png";
// import Product from "../components/productInCart/product";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBillUser,
  doneBillUser,
  getAllCTHDUser,
} from "../../api/billApi";
import ChiTietHoaDon from "../CTHD/ChiTietHoaDon";
import { fetchBill } from "../../reducer/bill/billAction";
import { confirmOrder, getAllOrderMAHD } from "../../api/admin/Order";
import { getHoaDon } from "../../api/admin/Hoadon";

const { Meta } = Card;
const HoaDonDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
    const navigate = useNavigate();

    const { bill } = useSelector((state) => state.bill);
    const MaHD = location.state.MaHD;
    const MaKH = location.state.MaKH;
    const [isLoading, setIsLoading] = useState(true);
    const [listCTHD, setListCTHD] = useState([]);
  const [billDetail, setBillDetail] = useState({});
  const [giaKM, setGiaKM] = useState(0);
  //   const [quantityProduct, setQuantityProduct] = useState(1);
  //   var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  //   const [cartItems_state, setCarrItems_state] = useState(cartItems);
  const [totalCart, setTotalCart] = useState(0);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  useEffect(() => {
    const FetchHoaDon = async () => {
      const response = await getAllCTHDUser(MaHD);
      if (billDetail) setIsLoading(false);
      console.log("detailabc", response);
      setListCTHD(response.hoadon);
    };
    FetchHoaDon();
  }, []);

  //   useEffect(() => {
  //     //   dispatch(fetchBill(MaKH));
  //     console.log("billdetail", bill);
  //   }, []);

  useEffect(() => {
    const FetchDonHang = async () => {
      const { hoadon } = await getHoaDon();
      if (listCTHD) setIsLoading(false);
      const hoadonDetail = hoadon.find(
        (item) => parseInt(item.id) === parseInt(MaHD)
      );
      console.log("reseff", hoadonDetail);
      setBillDetail(hoadonDetail);
    };
    FetchDonHang();
  }, [isLoading]);

  const handleClickDeleteBill = async (e) => {
    await cancelBillUser(billDetail.MaHD);
    setIsLoading(true);
  };

  const handleClickPrintBill = async (e) => {
    navigate("/admin/hoadon/hoadonpdf", {
      state: { MaHD: MaHD, TienKM: billDetail.TienKM },
    });
  };
  return (
    <div className="container  h-full  max-w-[1024px] mx-auto pb-40 mt-20 ">
      <Title level={2} className="text-black">
        Chi ti???t ????n ?????t
      </Title>
      {isLoading && <Spin indicator={antIcon} />}
      <Row gutter={35} className="">
        <Col className="h-full mb-10 " span={16}>
          <Row className="w-full h-full border-[0.01rem] py-4 border-solid border-[#CFCFCF]  flex items-center justify-center mb-2">
            <Col span={11}>
              <div className="flex">
                <p>????n ?????t:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.id}
                </p>
              </div>
              <div className="flex">
                <p>Ng??y Mua:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.NgayHD}
                </p>
              </div>
              <div className="flex">
                <p>Thanh To??n:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.isOnline === 1 ? "Online" : "T???i qu??n"}
                </p>
              </div>
            </Col>
            <Col span={11}>
              {billDetail.isOnline === 1 && (
                <>
                  <div className="flex">
                    <p>H??? T??n:</p>
                    <p className="ml-3 font-semibold text-[#146d4d]">
                      {billDetail.hoten}
                    </p>
                  </div>
                  <div className="flex">
                    <p>S??T:</p>
                    <p className="ml-3 font-semibold text-[#146d4d]">
                      {billDetail.sdt}
                    </p>
                  </div>
                  <div className="flex">
                    <p>?????a Ch???:</p>
                    <p className="ml-3 font-semibold text-[#146d4d]">
                      {billDetail.diachi}
                    </p>
                  </div>
                </>
              )}
              {billDetail.isOnline != 1 && (
                <>
                  <div className="flex">
                    <p>T??n Nh??n Vi??n:</p>
                    <p className="ml-3 font-semibold mb-[55px] text-[#146d4d]">
                      Tr???n Tr???ng T??n
                    </p>
                  </div>
                  <div className="flex">
                    <p></p>
                    <p className="ml-3 font-semibold text-[#146d4d]"></p>
                  </div>
                  <div className="flex">
                    <p></p>
                    <p className="ml-3 font-semibold text-[#146d4d]"></p>
                  </div>
                </>
              )}
            </Col>
          </Row>
          <Row className="w-full h-[10vh] border-y-[0.01rem] border-solid border-[#CFCFCF] text-[#ABABAB] flex items-center justify-center ">
            <Col span={12}>S???n ph???m</Col>
            <Col className="flex justify-center" span={6}>
              S??? l?????ng
            </Col>
            <Col className="flex justify-center" span={6}>
              S??? ti???n
            </Col>
          </Row>
          {listCTHD.map((item, index) => {
            return (
              <ChiTietHoaDon
                key={index}
                size={item.Size}
                // cartItems={data}
                topping={item.Topping}
                item={item}
                id={item.MaSP}
                HinhAnh={item.HinhAnh}
              />
            );
          })}
        </Col>
        <Col className="h-full " span={8}>
          <div className="w-full px-6 h-[60vh] border-[1px] border-solid border-[#F5F5F6] bg-[#F5F5F6] rounded-2xl ">
            <Title
              className="border-b-[0.01rem] border-solid border-[#C6BDBD] py-3 mt-3"
              level={5}
            >
              T???NG ????N
            </Title>
            <div className="w-full border-b-[0.01rem] pb-16 border-solid border-[#C6BDBD] ">
              <div className="w-full flex mt-10 justify-between ">
                <p className="mb-0">T???ng C???ng </p>
                <p className="mb-0">
                  {billDetail.TongTien + billDetail.TienKM} VND
                </p>
              </div>

              <div className="w-full flex mt-10 justify-between ">
                <p className="mb-0">{billDetail.TenKM}</p>
              </div>
              <div className="w-full flex mt-3 justify-between ">
                <p className="mb-0"> Khuy???n M??i</p>
                <p className="mb-0">
                  {billDetail.TienKM > 0
                    ? billDetail.TienKM.toLocaleString()
                    : "0"}{" "}
                  VND
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between mt-8">
              <p className="mb-0">Th??nh Ti???n</p>
              <p className="mb-0">
                {billDetail.TongTien > 0
                  ? billDetail.TongTien.toLocaleString()
                  : ""}{" "}
                VND
              </p>
            </div>
          </div>
          <div className="flex w-[90%] mx-auto justify-between mt-4">
            <p
              onClick={handleClickPrintBill}
              className="text-[#146d4d] cursor-pointer underline-offset-1 underline mb-0"
            >
              In h??a ????n
            </p>
            <Link to="/admin/hoadon">
              <p className="text-[#146d4d] cursor-pointer underline-offset-1 underline mb-0">
                Danh s??ch h??a ????n
              </p>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HoaDonDetail;
