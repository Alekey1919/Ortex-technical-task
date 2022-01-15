import { useState } from "react";

const useForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalActive, setModalActive] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username: email, password }),
    });
    console.log(JSON.stringify({ username: email, password }));
  };

  const handleModal = (e) => {
    e.preventDefault();
    setModalActive((curr) => !curr);
  };

  return {
    handleEmailInput,
    handlePasswordInput,
    handleSubmit,
    handleModal,
    modalActive,
  };
};

export default useForm;
