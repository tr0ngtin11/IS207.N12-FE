import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  Radio,
  Row,
  Upload,
  Spin,
  message,
} from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import {
  getUserProfile,
  updateUserProfile,
} from "../../reducer/user/userAction";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, updateStatus, isLoading } = useSelector(
    (state) => state.user
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log(user);
  const [selectedImage, setSelectedImage] = useState(user.urlavt);
  const [userInfo, setUserInfo] = useState("");

  // const [gender, setGender] = useState(0);
  const handleChangeForm = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log(userInfo);
  };

  const onChangeImage = (e) => {
    console.log(e.target.files[0]);
    const urlImage = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(urlImage);
    setUserInfo({
      ...userInfo,
      urlavt: urlImage,
    });
    console.log(urlImage);
  };

  const handleChangeGender = (e) => {
    const gt = e.target.value == "nu" ? 1 : 0;
    setUserInfo({ ...userInfo, [e.target.name]: gt });
    console.log(userInfo);
  };
  const handleSubmitUpdateProfile = () => {
    console.log(userInfo);
    dispatch(updateUserProfile(userInfo, user.id));
    if (isLoading == false) message.success("Cập nhật thông tin thành công");
  };
  const handleChangeBirthDay = (e) => {
    setUserInfo({ ...userInfo, ngsinh: e.target.value });
  };

  useEffect(() => {
    setUserInfo(user);
  }, [status]);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [isAuthenticated, status]);
  return (
    <div className="w-full h-[135vh]  ">
      {isLoading && (
        <LoadingOutlined
          style={{
            fontSize: 20,
          }}
          spin
        />
      )}
      <div className="flex items-center mb-6 w-full  ">
        <Avatar
          src={
            <Image
              preview={false}
              className="w-36 h-36"
              src={userInfo.urlavt}
              alt="avatar"
            />
          }
          className="w-36 h-36 mr-8"
        />
        <div className="w-full">
          <Title className=" " level={3}>
            PROFILE
          </Title>

          {/* <input
            // className="hidden"
            type="file"
            name="myImage"
            onChange={(e) => onChangeImage(e)}
          /> */}

          <div className="flex w-full justify-between">
            <Title className=" " level={5}>
              Update your photo and personal details.
            </Title>

            <Button
              onClick={handleSubmitUpdateProfile}
              className="w-24 h-8 rounded-lg text-white bg-[#146d4d] hover:bg-[#FF5A5F] flex items-center justify-center"
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Họ và tên</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="hoten"
            placeholder="Họ tên"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={userInfo.hoten}
            required
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Email</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="email"
            placeholder="Email"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={user.email}
            disabled
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center my-5">
        <Col span={6} className="">
          <Title className="w-full  my-auto " level={5}>
            Ảnh đại diện
          </Title>
        </Col>
        <Col span={18}>
          <div className="flex items-center w-full justify-between ">
            <Avatar
              src={
                <Image
                  preview={false}
                  className="w-16 h-16"
                  src={userInfo.urlavt}
                  alt="avatar"
                />
              }
              className="w-16 h-16 "
            />
            <p className="mb-0 w-[25rem]">
              This will be displayed on your profile.
            </p>
            <input
              className="w-[16rem] pl-5 "
              type="file"
              name="urlavt"
              onChange={(e) => onChangeImage(e)}
            />
          </div>
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Số điện thoại</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="sdt"
            placeholder="Số điện thoại"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={userInfo.sdt}
            required
          />
        </Col>
      </Row>

      <Row className="w-full mb-8 flex items-center  ">
        <Col span={6} className="">
          <Title level={5}>Giới tính</Title>
        </Col>
        <Col span={18}>
          <div className="flex items-center w-ful ">
            {userInfo.gioitinh == 0 ? (
              <input
                onClick={(e) => handleChangeGender(e)}
                id="nam"
                type="radio"
                name="gioitinh"
                value="nam"
                className=" mr-1 accent-[#146d4d] w-4 h-4  "
                checked
              />
            ) : (
              <input
                onClick={(e) => handleChangeGender(e)}
                id="nam"
                type="radio"
                name="gioitinh"
                value="nam"
                className=" mr-1 accent-[#146d4d] w-4 h-4  "
              />
            )}
            <label for="nam">Nam</label>
            {userInfo.gioitinh == 0 ? (
              <input
                onClick={(e) => handleChangeGender(e)}
                id="nu"
                type="radio"
                name="gioitinh"
                value="nu"
                className="ml-10 mr-1 accent-[#146d4d] w-4 h-4 "
              />
            ) : (
              <input
                onClick={(e) => handleChangeGender(e)}
                id="nu"
                type="radio"
                name="gioitinh"
                value="nu"
                className="ml-10 mr-1 accent-[#146d4d] w-4 h-4 "
                checked
              />
            )}

            <label for="nu">Nữ</label>
          </div>
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Ngày sinh</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="ngsinh"
            placeholder="27/12/2003"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeBirthDay(e)}
            value={userInfo?.ngsinh}
            required
          />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
