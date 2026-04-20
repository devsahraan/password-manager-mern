import { useEffect, useState } from "react";
import PostModel from "../components/PostModel";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const [showModel, setModel] = useState(false);
  const [showLoading, setLoading] = useState(false);
  let [postData, setPostData] = useState([]);
  let [isLogin , setIsLogin] = useState(false);

  const isLogined =() =>{
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/login", { replace: true });
    }
  }

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
          postValues.username = "";
          postValues.email = "";
          postValues.password = "";
          toggleModel();
          getPosts();
        })
        .catch((error) => console.error(error));
    }
  };

  let getPosts = () => {
    setPostData([]);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userId: userId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/user/getPosts", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (data.posts.length > 0) {
          setPostData(data.posts);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPosts();
    isLogined();
  }, []);

  return (
    <>
      <button
        className="bg-orange-500 text-white p-2 rounded m-3"
        onClick={toggleModel}
      >
        New Password
      </button>
      <PostModel
        loading={showLoading}
        show={showModel}
        toggle={toggleModel}
        values={postValues}
        onChange={handleInputChange}
        onSave={newPost}
      />
      <div>
        <div class="relative overflow-x-auto shadow-md w-[70%] m-auto">
          <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
            <thead class="text-xs text-black uppercase bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 font-bold">
                  Username
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Password
                </th>

                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {postData.length > 0 ? postData.map((post, index) => { 
                return (
                  <tr key={index} class=" border-b border-black-400">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-black whitespace-nowrap "
                    >
                      {post.username}
                    </th>
                    <td class="px-6 py-4 text-black font-medium">{post.email}</td>
                    <td class="px-6 py-4 text-black font-medium">{post.password}</td>
                    <td class="px-1 py-1">
                     
                        <button className="bg-blue-500 mr-2 text-white w-16 h-[30px] rounded-sm hover:bg-blue-600 transition-all duration-300">
                          Edit
                        </button>
                        <button className="bg-red-500 text-white w-16 h-[30px] rounded-sm hover:bg-red-600 transition-all duration-300">
                          Delete
                        </button>
                    </td>
                  </tr>
                );
              }) : <tr>
                <td  colSpan={4} className="text-black font-semibold text-lg text-center pt-2 pb-2">No Data Found</td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
