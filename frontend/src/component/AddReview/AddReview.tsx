import React, { useState, useEffect, useRef } from "react";
import { postReview } from "../../apis/post";
import AWS from "aws-sdk";
const AddReview = ({ setAddopen }: any) => {
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:45e19d2c-8bdf-45c9-9fab-92c064129863", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  const [content, setContent] = useState<string>("");
  const [photo, setPhoto] = useState<string | Blob>("");
  const [file, setFile] = useState<File>();
  const closeModal = () => {
    setAddopen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setAddopen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });
  const onImgChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const clickAdd = () => {
    postReview(
      {
        content: content,
      },
      localStorage.getItem("username"),
      localStorage.getItem("pants_id")
    )
      .then((response) => {
        const fileName: number = response.id;
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: "stylestargram",
            Key: `review${fileName}`,
            Body: file,
          },
        });
        const promise = upload.promise();

        promise.then(
          function (data) {
            alert("이미지 업로드에 성공했습니다.");
          },
          function (err) {
            return alert(err.message);
          }
        );
        console.log("success");
        setAddopen(false);
      })
      .catch(() => {
        alert("잘못된 접근입니다");
      });
  };
  const onContentChange = (e: any) => {
    setContent(e.target.value);
  };
  return (
    <div className="outer">
      <div ref={modalRef} className="container">
        <p>Add Review</p>
        <div className="leftcontent">
          <div>
            <input
              type="file"
              id="upload"
              className="image-upload"
              onChange={onImgChange}
            />
            <label htmlFor="upload" className="image-upload-wrapper"></label>
          </div>
        </div>
        <div className="rightcontent">
          <textarea
            className="reviewcontent"
            onChange={onContentChange}
          ></textarea>
          <button id="submit" onClick={clickAdd}>
            Add
          </button>
          <button id="change" onClick={closeModal}>
            back
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddReview;
// 해야하는 것 content나 현시간 입력 받아서 setNewreview에 저장
