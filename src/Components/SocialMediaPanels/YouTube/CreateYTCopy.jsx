

// HOOKS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getYTAccounts_SP } from "../../../Redux/Slices/SocialAccounts_SP/YTAccountsSlice_SP";

// COMPONENTS
import CreateYTAccount from './CreateYTAccount';

// SERVICES & UTILITES
import { YTAccountsServices } from "../../../Services/ServiceProviderServices";
import Swal from "sweetalert2";

// BOOTSTRAP COMPONENTS & REACT-ICONS
import { Card, Modal } from "react-bootstrap";
import { Toast } from "bootstrap";
import { BsYoutube, BsFillCameraVideoFill } from 'react-icons/bs';
import { TbBellRinging } from "react-icons/tb";
import { AiFillEye } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

// CSS 
import '../../SocialMediaPanels/social.css'

const CreateYTCopy = () => {

	const { register, handleSubmit } = useForm();
  const { YTAccounts_SP } = useSelector((state) => state);
  const Services = new YTAccountsServices();
	const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  // MODAL HANDLERS - ADD NEW YT ACCOUNT
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  // MODAL HANDLERS - EDIT YT ACCOUNT
  const [editShow, setEditShow] = useState(false);
	const handleShowEdit = () => setEditShow(true);
  const handleCloseEdit = () => setEditShow(false);

	// EDIT ACCOUNT
	const editThisYTAccount = (id) => {
		setEditId(id);
		handleShowEdit();
	}


  // SUBMIT FORM FOR EDIT ACCOUNT
  const onSubmit = async (obj ) => {
    const { data } = await Services.UpdateYTAccount( editId, obj );
    console.log(data)

    // ACCOUNT ADDED SUCCESSFULLY
    if (data.messageType === "success") {
      dispatch(getYTAccounts_SP());
      handleCloseEdit();
			setEditId(null);
			let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }

    // IF SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }
  };

  // DELETE CATEGORY
  async function deleteThisYTAccount(id) {
    console.log(id)
    new Swal({
      title: "Delete Account?",
      text: "Are you sure you want to delete this account?",
      icon: "question",
      backdrop: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      confirmButtonColor: "#ec4a58",
      confirmButtonText: "Delete",
      showDenyButton: true,
      denyButtonColor: "#6c757d",
      denyButtonText: "Cancel",
    })
      .then( async (result) => {
        if(result.isConfirmed) {
          const { data } = await Services.DeleteYTAccount(id);
          console.log(data);
          // ACCOUNT DELETED SUCCESSFULLY
          if(data.messageType === "success") {
            dispatch(getYTAccounts_SP());
            let x = new Toast(".toast", { autohide: true, delay: 3000 });
            document.querySelector(".toast").className = "toast align-items-center m-2";
            document.querySelector(".toast").classList.add("bg-success", "text-light");
            document.querySelector(".toast-body").innerText = data.message;
            return x.show();
          }
  
            // IF SOMETHING WENT WRONG
            if(data.messageType !== "success") {
              let x = new Toast(".toast", { autohide: true, delay: 3000 });
              document.querySelector(".toast").className = "toast align-items-center m-2";
              document.querySelector(".toast").classList.add("bg-danger", "text-light");
              document.querySelector(".toast-body").innerText = data.message;
              return x.show();
            }
          }
        })
  
    }

		useEffect(() => {
			dispatch(getYTAccounts_SP());
		}, [dispatch])

  return (
    <>

      {/* FORM SUBMIT COMPONENT */}

      <CreateYTAccount show = {show} handleClose = {handleClose} />

      {/* YOUTUBE ACCOUNTS */}

      <div className="container-fluid">
        <div className="row no-gutters mt-5">
          <div className="col-12 d-flex justify-content-between">
            <h4 className="st-margin ml-2">YouTube</h4>
            <button className="btn btn-primary sb-margin mr-2" onClick={handleShow}>Add New Account</button>
          </div>
          {YTAccounts_SP ? YTAccounts_SP.AllYouTubeAccounts.map((accounts, i) => {
            return <div key={i} className="col-md-6 my-2 px-2">
              <Card className='shadow-1 h-100'>
                <Card.Body className="position-relative">
                  <Card.Title>Account Info:</Card.Title>
                  <div className="row py-3">
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <BsYoutube style={{ width: 24, height: 24, fill: "#ff0000" }} className="me-2" />
                        Channel Name: <span className="fw-semibold fst-italic ms-3">{accounts.channel}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <TbBellRinging style={{ width: 24, height: 24, fill: "#f7bb07" }} className="me-2" />
                        Subscribers: <span className="fw-semibold fst-italic ms-3">{accounts.subscribers}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <BsFillCameraVideoFill style={{ width: 24, height: 24 }} className="me-2" />
                        Videos: <span className="fw-semibold fst-italic ms-3">{accounts.videos}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <AiFillEye style={{ width: 24, height: 24 }} className="me-2" />
                        Views: <span className="fw-semibold fst-italic ms-3">{accounts.views}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <FaLink style={{ width: 24, height: 24 }} className="me-2" />
                        Channel Link: <span className="fw-semibold fst-italic ms-3 l-ht">{accounts.link}</span></p>
                    </div>
                  </div>
                  <div className="text-end mb-2 btn-place">
                    <button className="btn btn-sm btn-primary me-1" onClick={ () => editThisYTAccount(accounts._id) }>
                      <AiFillEdit style={{ width: 20, height: 20 }} /> <span className='exp-btn'>Edit</span>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteThisYTAccount(accounts._id)} >
                      <MdDeleteForever style={{ width: 20, height: 20 }} /> Delete
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          }) : null}
        </div>
      </div>

      {/* EDIT FORM */}
      
      <Modal show={editShow} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-3">
              <input className="form-control" type="text" placeholder="Channel name" name="channel"
                {...register("channel", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Channel link" name="link"
                {...register("link", { required: true })} />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="Subscribers"
                name="subscribers"
                {...register("subscribers", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="No. of Videos"
                name="videos"
                {...register("videos", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="No of total views on channel"
                name="views"
                {...register("views", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => {handleCloseEdit();}} >Close</button>
            <button className="btn btn-primary" type="submit">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CreateYTCopy;