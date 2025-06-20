import { useState } from "react";
import PostModel from "../components/PostModel";
import { ToastContainer, toast } from "react-toastify";


function Dashboard() {
  const [showModel, setModel] = useState(false);
  const [showLoading, setLoading] = useState(false);

  const [postValues, setPostVal] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPostVal({ ...postValues, [name]: value });
  };

  const toggleModel = () => {
    setModel(!showModel);
  };

  const userId = localStorage.getItem("id");
  console.log(userId);

  let showError = (message) => {
    toast.error(message);
  };

  let showSuccess = (message) => {
    toast.success(message);
  };

  const toggleLoading = (value) => {
    setLoading(value);
  };

  const newPost = () => {
    toggleLoading(true);
    if (postValues.email != "") {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        uid: userId,
        username: postValues.username,
        email: postValues.email,
        password: postValues.password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/user/addPost", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          showSuccess("Post Added");
          toggleLoading(false);
          postValues.username="";
          postValues.email="";
          postValues.password="";
          toggleModel();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <button
        className="bg-black text-white p-2 rounded m-3"
        onClick={toggleModel}
      >
        Click
      </button>
      <PostModel
        loading={showLoading}
        show={showModel}
        toggle={toggleModel}
        values={postValues}
        onChange={handleInputChange}
        onSave={newPost}
      />
    </>
  );
}

export default Dashboard;
