import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function RegistrationForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/authentication/register", data);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" name="email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <div>
        <label>Username</label>
        <input type="text" name="username" ref={register({ required: true })} />
        {errors.username && <span>This field is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
