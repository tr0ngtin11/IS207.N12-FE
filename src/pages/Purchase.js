import { Col, Input, Row, Radio, Button, message } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PurchaseApi } from "../api/PurchaseApi";
import COD from "../images/payment/COD.jpg";
import momo from "../images/payment/momo.jpg";
import paypal from "../images/payment/paypal.jpg";
import { getUserProfile } from "../reducer/user/userAction";

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var arrayInput = [];
  const totalCart = location.state.totalCart;
  const giaKM = location.state.giaKM;
  const prevKm = location.state.prevKm;
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var listMail = cartItems.map((item) => item.name);
  const { user, status, updateStatus, isLoading } = useSelector(
    (state) => state.user
  );
  const { selectedKhuyenmai, khuyenmais } = useSelector(
    (state) => state.khuyenmai_admin
  );
  const [templateParams, setTemplateParams] = useState({
    MaKH: user.id,
    username_mail: user.email,
    list_Order: listMail.toString(),
  });
  cartItems.map((item) => {
    if (selectedKhuyenmai) {
      var maKm = selectedKhuyenmai.id;
    }
    arrayInput.push({
      MaSP: item.id,
      SoLuong: item.quantity,
      Size: item.size,
      MaPL: 1,
      MaKM: maKm,
      Topping: item.topping,
    });
  });
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState("");
  const [valuePayment, setValuePayment] = useState("COD");
  const onChangePayment = (e) => {
    setValuePayment(e.target.value);
  };

  const handleChangeForm = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log(userInfo);
  };
  
  const handleChangeNote = (e) => {
    setUserInfo({ ...userInfo, ghichu: e.target.value });
  };

  useEffect(() => {
    console.log("usserne", user);
    setUserInfo(user);
  }, [status]);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [isAuthenticated, status]);

  const handleClickPurchase = async () => {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(userInfo.sdt) == false) {
      message.error("Số điện thoại không hợp lệ");
      return;
    }
    var formData = {
      MaKH: user.id,
      list: arrayInput,
      SDT: userInfo.sdt,
      DiaChi: userInfo.diachi,
      GhiChu: userInfo.ghichu,
    };
    // const formDataJSON = JSON.stringify(formData);
    console.log(formData);
    await PurchaseApi(formData);
    localStorage.removeItem("cartItems");
    navigate("/profile", { state: { default: 2 } });
    emailjs
      .send(
        "service_bnk4p9n",
        "template_a1j1bot",
        templateParams,
        "G2m-hpF_YM594u7IJ"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          message.success("Gửi Email thành công");
          // navigate("/code-validation");
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
    // window.location.reload();
  };

  return (
    <div className="container max-w-[1024px] h-full py-20 mx-auto flex  ">
      <Col
        span={14}
        className="border-r-[1px] border-solid border-[#CFCFCF] pr-[40px]"
      >
        <Title level={2}>THÔNG TIN GIAO HÀNG</Title>
        <Input
          type="text"
          size="medium"
          name="hoten"
          placeholder="Họ tên"
          className="rounded-md py-2 my-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeForm(e)}
          value={userInfo.hoten}
          required
        />
        <Input
          type="text"
          size="medium"
          name="sdt"
          placeholder="Số điện thoại"
          className="rounded-md py-2 mb-3  placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeForm(e)}
          value={userInfo.sdt}
          required
        />
        <Input
          type="email"
          size="medium"
          name="email"
          placeholder="Email"
          className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeForm(e)}
          value={userInfo.email}
          required
          disabled
        />
        <Input
          type="text"
          size="medium"
          name="diachi"
          placeholder="Địa chỉ"
          className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeForm(e)}
          value={userInfo.diachi}
          required
        />
        {/* <Row gutter={10}>
          <Col span={8}>
            <Input
              type="text"
              size="medium"
              name="Provice"
              placeholder="Tỉnh/Thành phố"
              className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
              //   onChange={(e) => handleChangeForm(e)}
              //   value={userInfo.email}
              required
            />
          </Col>
          <Col span={8}>
            <Input
              type="text"
              size="medium"
              name="Provice"
              placeholder="Quận/Huyện"
              className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
              //   onChange={(e) => handleChangeForm(e)}
              //   value={userInfo.email}
              required
            />
          </Col>
          <Col span={8}>
            <Input
              type="text"
              size="medium"
              name="Provice"
              placeholder="Phường/Xã"
              className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
              //   onChange={(e) => handleChangeForm(e)}
              //   value={userInfo.email}
              required
            />
          </Col>
        </Row> */}
        <Input
          type="text"
          size="medium"
          name="ghichu"
          placeholder="Note (Không bắt buộc)"
          className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeNote(e)}
          value={userInfo.ghichu}
          required
        />

        <Title className="mt-10" level={2}>
          PHƯƠNG THỨC THANH TOÁN
        </Title>
        <div>
          <div className="flex items-center border-solid border-[#CFCFCF] border-[1px] rounded-md py-2 cursor-pointer mb-4">
            <input
              id="COD"
              type="radio"
              name="payment"
              value="COD"
              className="mx-6 checked:accent-[#146d4d]  "
              // checked
            />
            <label className="flex items-center cursor-pointer" for="COD">
              <img className="w-4 h-4" src={COD} />
              <p className="mb-0 mx-6 font-semibold">COD</p>
            </label>
          </div>
          <div className="flex items-center border-solid border-[#CFCFCF] border-[1px] rounded-md py-2 cursor-pointer mb-4">
            <input
              id="MOMO"
              type="radio"
              name="payment"
              value="MOMO"
              className="mx-6 checked:accent-[#146d4d]  "
            />
            <label className="flex items-center cursor-pointer" for="MOMO">
              <img className="w-4 h-4" src={momo} />
              <p className="mb-0 mx-6 font-semibold">Momo</p>
            </label>
          </div>
          <div className="flex items-center border-solid border-[#CFCFCF] border-[1px] rounded-md py-2 cursor-pointer mb-4">
            <input
              id="PAYPAL"
              type="radio"
              name="payment"
              value="PAYPAL"
              className="mx-6 checked:accent-[#146d4d]  "
            />
            <label className="flex items-center cursor-pointer" for="PAYPAL">
              <img className="w-4 h-4" src={paypal} />
              <p className="mb-0 mx-6 font-semibold">Paypal</p>
            </label>
          </div>
        </div>
      </Col>
      <Col className="h-full pl-[40px]" span={10}>
        <div className="w-full px-6 h-[82vh] border-[1px] border-solid border-[#F5F5F6] bg-[#F5F5F6] rounded-2xl ">
          <Title
            className="border-b-[0.01rem] border-solid border-[#C6BDBD] py-3 mt-3"
            level={5}
          >
            TỔNG ĐƠN
          </Title>
          <div className="w-full border-b-[0.01rem] pb-16 border-solid border-[#C6BDBD] ">
            <div className="w-full flex mt-10 justify-between ">
              <p>Tổng Cộng</p>
              <p>{prevKm.toLocaleString()} VND</p>
            </div>
            <div className="w-full flex mt-10 justify-between ">
              <p>Phí Ship</p>
              <p>30,000 VND</p>
            </div>
            <div className="w-full flex mt-10 justify-between ">
              <p>Khuyến Mãi</p>
              <p>{giaKM.toLocaleString()}VND</p>
            </div>
          </div>
          <div className="w-full flex mt-10 justify-between ">
            <p>TỔNG CỘNG</p>
            <p>{(totalCart + 30000).toLocaleString()} VND</p>
          </div>
          <Button
            onClick={handleClickPurchase}
            className="bg-[#146d4d] w-full rounded-md py-[1rem] flex justify-center items-center text-[#fff] text-[0.8rem] font-bold"
          >
            ĐẶT GIAO
          </Button>
        </div>
      </Col>
    </div>
  );
};

export default Purchase;
