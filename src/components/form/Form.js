import React from "react";
import Logo from "../../images/logo.png";
import useForm from "./useForm";

function Form() {
  const {
    handleEmailInput,
    handlePasswordInput,
    handleSubmit,
    modalActive,
    handleModal,
  } = useForm();

  return (
    <form className="form">
      <img src={Logo} alt="Logo" />
      <div className="form-field">
        <label htmlFor="email">
          <i className="fas fa-user"></i>
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleEmailInput}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">
          <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlePasswordInput}
        />
      </div>
      <button className="form-btn" onClick={handleSubmit}>
        Login
      </button>
      <button className="form-btn">Login with Google</button>
      <button className="form-reset-password" onClick={handleModal}>
        Forgot my password
      </button>

      <div className={`modal ${modalActive && "active"}`}>
        <div className="modal-body">
          <div className="form-field">
            <label htmlFor="emial-reset">Email</label>
            <input type="email" placeholder="..." />
          </div>
          <button>Send recovery instructions</button>
          <button onClick={handleModal}>Go back to login</button>
        </div>
      </div>
    </form>
  );
}

export default Form;
