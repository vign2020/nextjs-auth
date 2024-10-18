"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { FormEvent } from 'react'

import { useRouter } from 'next/router'

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";


import Image from "next/image";
import axios from 'axios'
import bcrypt from 'bcrypt'


// import violet from '../../public/assets/violet.png'

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    passwordConfirm : z.string()
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  )

export default function Login() {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm : ""
  
    },
  });



  // const create_login = async (email : string , password : string)=>{
  //   try{
  //     const result = xx_1634_auth_test.create({
  //       email : email,
  //       password : password
  //     })
  //     return result;
  //   }
  //   catch(e) {
  //     console.log(e)
  //   }
 
  // }
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('hello world!')
    console.log({ values });


    try {
      // const hashedPassword = await bcrypt.hash(values.password , 10);

      //WRITE LOGIC TO CHECK IF USER ALREADY EXITS : LATER

      const result = await axios.post(
          "http://localhost:1521/addUser",
          {
              email: values.email,
              password: values.password
          }
       
      );
      console.log(result);
  } 
    catch(e) {
      console.log(e)
    }
   

  //   await dbConnect()

  //   try{
  //   const newUser = new UserData({
  //       name : 'Vignesh',
  //       email : 'vign2020@gmail.com',
  //       password : 'asdfasdf'
  //   })
  //   const saveUserdata = await newUser.save();
  // }
  // catch(e) {
  //   console.log(e)
  // }
   
   
  }

  return (
    <>
    

    <main className="flex min-h-screen flex-row items-start justify-between gap-5">
 
  <div className="relative w-1/2 bg-cover bg-center bg-no-repeat border-2 h-screen bg-[#cf3ecf] flex flex-col justify-center ">

  
 <Image
    src="/images/violet.png"
    alt="image of a surreal forest"
    fill={true}
    className="absolute top-0 left-0 w-full h-full object-cover z-0 mix-blend-darken" 
  />

    <div className="relative z-10 p-4 text-white bg-opacity-50 ">

      <div className="">
        <h1 className="text-3xl font-bold mb-4">Welcome to</h1>
        <h1 className="text-6xl font-bold mb-4 font-Pacifico">Skill Click</h1>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores sunt in
      corrupti mollitia maxime labore veritatis, voluptates cumque impedit,
      architecto repellendus quis, omnis saepe. Ducimus nostrum esse totam ullam
      inventorimpedit! Repudiandae nostrum ad a nulla veritatis, deleniti doloribus 
    </p>

      </div>
     

    </div>

  </div>

  {/* Right Side: Login form */}
  <div className="w-1/2 bg-gray-50 p-8 border rounded-md h-screen flex flex-col justify-center items-center">
    <h1 className="text-3xl font-bold mb-6">Register</h1>
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {/* Email Address */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Email address" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Confirm */}
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password confirm</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password confirm"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  </div>
</main>
        
    </>
  );


  };
