import { Col, Row, InputNumber, Button, Spin, notification, Modal } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import order1 from "../images/menu/order1.png";
import order2 from "../images/menu/order2.png";
import Product from "../components/productInCart/product";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCard } from "../reducer/product/productSlice";
import { cancelBillUser, doneBillUser, getAllCTHDUser } from "../api/billApi";
import ChiTietHoaDon from "../components/CTHD/ChiTietHoaDon";
import { getKhuyenMaiAction } from "../reducer/admin/khuyenmai/khuyenmaiAction";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchBill } from "../reducer/bill/billAction";
const { Meta } = Card;
const BillDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const billDetail = location.state.billDetail;
  const id = location.state.id;
  console.log(billDetail);
  const [listCTHD, setListCTHD] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [giaKm, setGiaKm] = useState(0);
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [isLoading, setIsLoading] = useState(true);
  const [prevKM, setPrevKM] = useState(0);
  const [cartItems_state, setCarrItems_state] = useState(cartItems);
  const { selectedKhuyenmai, khuyenmais } = useSelector(
    (state) => state.khuyenmai_admin
  );
  const { user } = useSelector((state) => state.user);
  const { detailBill } = useSelector((state) => state.bill);
  const [totalCart, setTotalCart] = useState(0);
  useEffect(() => {
    dispatch(getKhuyenMaiAction());
    // console.log("select", selectedKhuyenmai);
  }, [isLoading]);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const handleClickNavigate = () => {
    navigate("/profile", { state: { default: 2 } });
  };
  const handleClickDeleteBill = () => {
    Modal.confirm({
      title: "C???nh b??o",
      content: "B???n c?? ch???c ch???n mu???n h???y ????n h??ng n??y kh??ng?",
      cancelText: "Cancel",
      onOk: () => {
        handleClickDeleteBill1(id);
      },
    });
  };

  const handleClickDeleteBill1 = async (id) => {
    BillDetail.TrangThai = "???? h???y";
    const res = await cancelBillUser(id);
    dispatch(fetchBill(user.id));
    if (res.status === true) {
      notification["success"]({
        message: "Th??nh c??ng",
        description: "H???y ????n h??ng th??nh c??ng",
      });
    }
  };
  const handleClickDoneBill = async () => {
    await doneBillUser(id);
    dispatch(fetchBill(user.id));
  };
  useEffect(() => {
    const FetchHoaDon = async () => {
      const response = await getAllCTHDUser(billDetail.MaHD);
      setIsLoading(false);
      console.log("hoadonne", response.hoadon);
      setListCTHD(response.hoadon);
      let total = response.hoadon.reduce(
        (accumulator, currentValue) => accumulator + currentValue.ThanhTien,
        0
      );
      setPrevKM(total);
      console.log("total", total);
      console.log("total1", selectedKhuyenmai);
      let giakm = (total * selectedKhuyenmai.phantramKM) / 100;
      setGiaKm(giakm);
      total -= giakm;
      setTotalCart(total + 30000);
    };
    FetchHoaDon();
  }, [khuyenmais]);

  return (
    <div className="container  h-full  max-w-[1024px] mx-auto pb-40 pt-20 ">
      <Title level={2} className="text-black">
        Chi ti???t ????n ?????t
      </Title>

      <Row gutter={35} className="h-full">
        <Col className="h-full mb-10 " span={16}>
          <Row className="w-full h-full border-[0.01rem] py-4 border-solid border-[#CFCFCF]  flex items-center justify-center mb-2">
            <Col span={11}>
              <div className="flex">
                <p>????n ?????t:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  #{billDetail.MaHD}
                </p>
              </div>
              <div className="flex">
                <p>Ng??y Mua:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.ngaythanhtoan}
                </p>
              </div>
              <div className="flex">
                <p>Thanh To??n:</p>
                <p className="ml-3 font-semibold text-[#146d4d]"> COD</p>
              </div>
            </Col>
            <Col span={11}>
              <div className="flex">
                <p>H??? T??n:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.HoTen}
                </p>
              </div>
              <div className="flex">
                <p>S??T:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.SDT}
                </p>
              </div>
              <div className="flex">
                <p>?????a Ch???:</p>
                <p className="ml-3 font-semibold text-[#146d4d]">
                  {billDetail.DiaChiNH}
                </p>
              </div>
            </Col>
            <div className="w-[82%] ">
              <Button
                className={`${
                  detailBill.TrangThai == "Ch??a x??c nh???n" && "bg-[#EC870E]"
                } ${detailBill.TrangThai == "???? h???y" && "bg-[#DD0000]"}
                    ${detailBill.TrangThai == "??ang giao" && "bg-[#FFCC33]"}
                    ${
                      detailBill.TrangThai == "???? giao" && "bg-[#50A625]"
                    }  h-7 w-24 rounded-lg  flex justify-center items-center text-[#fff] text-[0.7rem] font-bold`}
              >
                {detailBill.TrangThai}
              </Button>
            </div>
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
          {isLoading && <Spin indicator={antIcon} />}
          {listCTHD.map((item, index) => {
            return (
              <ChiTietHoaDon
                key={index}
                size={item.Size}
                cartItems={cartItems}
                topping={item.Topping}
                item={item}
                id={item.MaSP}
                HinhAnh={item.HinhAnh}
              />
            );
          })}
        </Col>
        <Col className="h-full " span={8}>
          <div className="w-full px-6 h-[65vh] border-[1px] border-solid border-[#F5F5F6] bg-[#F5F5F6] rounded-2xl ">
            <Title
              className="border-b-[0.01rem] border-solid border-[#C6BDBD] py-3 mt-3"
              level={5}
            >
              ORDER SUMMARY
            </Title>
            <div className="w-full border-b-[0.01rem] pb-16 border-solid border-[#C6BDBD] ">
              <div className="w-full flex mt-10 justify-between ">
                <p className="mb-0">T???ng C???ng</p>
                <p className="mb-0">{prevKM.toLocaleString()} VND</p>
              </div>
              <div className="w-full flex mt-10 justify-between ">
                <p className="mb-0">Ph?? Ship</p>
                <p className="mb-0">30,000 VND</p>
              </div>
              <div className="w-full flex mt-10 justify-between ">
                <p className="mb-0">Khuy???n M??i </p>
                <p className="mb-0">{giaKm.toLocaleString()} VND</p>
              </div>
            </div>
            <div className="w-full flex mt-10 justify-between ">
              <p className="mb-0">TH??NH TI???N</p>
              <p className="mb-0">{totalCart.toLocaleString()} VND</p>
            </div>
          </div>

          <div className="flex w-[90%] mx-auto justify-between mt-4">
            {detailBill.TrangThai === "Ch??a x??c nh???n" && (
              <p
                onClick={handleClickDeleteBill}
                className="text-[#146d4d] cursor-pointer underline-offset-1 underline mb-0"
              >
                H???y ????n h??ng
              </p>
            )}
            {detailBill.TrangThai === "??ang giao" && (
              <p
                onClick={handleClickDoneBill}
                className="text-[#146d4d] cursor-pointer underline-offset-1 underline mb-0"
              >
                ???? nh???n
              </p>
            )}

            <p
              onClick={handleClickNavigate}
              className="text-[#146d4d] cursor-pointer underline-offset-1 underline mb-0"
            >
              Danh s??ch ????n h??ng
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BillDetail;
