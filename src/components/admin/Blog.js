import React from "react";
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
  Popconfirm,
  notification,
} from "antd";
import Title from "antd/lib/typography/Title";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import axios from "axios";
import { createBlog } from "../../api/admin/Blog";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../reducer/user/userAction";
import { useEffect } from "react";
import { getBlogAction } from "../../reducer/admin/blog/blogAction";
import { useNavigate } from "react-router-dom";
import "./blogDetail.css";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const { user, status } = useSelector((state) => state.user);
  const [blogInfo, setBlogInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChangeForm = (e) => {
    setBlogInfo({ ...blogInfo, [e.target.name]: e.target.value });
    console.log(blogInfo);
  };

  useEffect(() => {
    dispatch(getUserProfile());
    setBlogInfo({ ...blogInfo, MaND: user.id, NgayBlog: new Date() });
  }, [status]);
  const onChangeImage = async (e) => {
    // setIsFirst(false);
    console.log(e.target.files[0]);
    const urlImage = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(urlImage);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "themorrii");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dql5y1xex/image/upload",
      formData
    );
    const url = res.data.secure_url;
    setBlogInfo({ ...blogInfo, UrlImage: url });
    console.log(url);
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleCkeditor = (event, editor) => {
    const a = '">';
    const b = '" className="imgBlog" />';
    const data = editor.getData().replaceAll(a, b);

    setBlogInfo({ ...blogInfo, NoiDung: data });
  };

  const handleCreateBlog = async (type) => {
    console.log(blogInfo.TieuDe);
    console.log(blogInfo);
    if (
      selectedImage == null ||
      blogInfo.TieuDe == null ||
      blogInfo.TieuDe == "" ||
      blogInfo.NoiDung == null ||
      blogInfo.NoiDung == "" ||
      blogInfo.MoTa == null ||
      blogInfo.MoTa == ""
    ) {
      notification["error"]({
        message: "Th???t b???i",
        description:
          "B???n ???? t???o blog th???t b???i, vui l??ng nh???p ?????y ????? c??c tr?????ng k??? c??? h??nh ???nh",
      });
    } else {
      const res = await createBlog(blogInfo);
      console.log(res.status);
      if (res.status === true) {
        notification["success"]({
          message: "Th??nh c??ng",
          description: "B???n ???? t???o blog th??nh c??ng",
        });

        navigate("/admin/blog");
        dispatch(getBlogAction());
      }
    }
  };
  return (
    <div className="container w-full mx-auto max-w-[900px] mt-5 ">
      <Title className="font-bold " level={2}>
        Th??m M???i Blog
      </Title>
      <Row className="w-full mb-8 flex items-center my-5">
        <Col span={6} className="">
          <Title className="w-full  my-auto " level={5}>
            ???nh Blog
          </Title>
        </Col>
        <Col span={18}>
          <div className="flex items-center w-full justify-between ">
            {blogInfo.UrlImage && (
              <Image
             
                preview={false}
                className="w-16 h-16"
                src={blogInfo.UrlImage}
                alt="avatar"
              />
            )}

            <p className="mb-0 w-[25rem]">????y s??? l?? ???nh Blog c???a b???n</p>
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
          <Title level={5}>Ti??u ?????</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="TieuDe"
            placeholder="Ti??u ?????"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={blogInfo.TieuDe}
            required
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>M?? t???</Title>
        </Col>
        <Col span={18}>
          <TextArea
            rows={3}
            type="text"
            size="medium"
            name="MoTa"
            placeholder="M?? t???"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={blogInfo.MoTa}
            required
          />
        </Col>
      </Row>
      <Row className="w-full mb-8  items-center ">
        <Col span={6} className="">
          <Title level={5}>N???i Dung</Title>
        </Col>
        <Col span={18}>
          <CKEditor
            editor={ClassicEditor}
            // data="<p>Hello from CKEditor 5!</p>"
            // onReady={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
            // }}
            onChange={(event, editor) => handleCkeditor(event, editor)}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
        </Col>
      </Row>

      <div className="flex h-[40px] justify-end">
        <Button
          onClick={() => handleCreateBlog("success")}
          className="bg-[#146d4d] text-[#fff]"
        >
          T???o Blog
        </Button>
      </div>
    </div>
  );
};

export default Blog;
