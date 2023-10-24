"use client";
import { useState } from "react";
import Input from "@/app/components/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button";

const AuthForm = () => {
  // state.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // router.
  const router = useRouter();


  const formSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/users/signin',
      data: formData,
      method: 'POST',
      headers: { 
        xapikey: process.env.XAPI_KEY
      }
    }).then((response)=>{
      router.push('/dashboard')
    }).catch((error)=>{
      console.log('error', error);
      const errorMessage = error?.response?.data?.error;
      if (errorMessage) {
        alert(errorMessage)
      } else {
        alert('Contact Node/Next Developers');
      }
    })
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log('NNNNNN', name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={formSubmit}>
      <Input
        id="email"
        type="email"
        label="Email"
        name="email"
        required={true}
        value={formData["email"]}
        onChange={changeHandler}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        name="password"
        required={true}
        value={formData["password"]}
        onChange={changeHandler}
      />
      <Button label="Login" className="w-1/2 mx-auto mt-2" />
    </form>
  );
};

export default AuthForm;
