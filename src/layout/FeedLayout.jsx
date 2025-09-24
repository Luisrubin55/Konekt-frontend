import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";


function FeedLayout() {

  const {data} = useUser()

  return (
    <>
      <Header 
        user={data}
      />
      <div className="flex fixed">
        <NavBar />
        <main className="ml-20 h-screen overflow-y-auto">
          <Outlet data={data} />
        </main>
      </div>
       <ToastContainer />
    </>
  );
}

export default FeedLayout;
