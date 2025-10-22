"use client"


const Login = () => {
 
  
  
  return (
    <div className=" flex justify-center items-center min-h-screen  py-4 px-6">
      <form className="py-4 px-6 flex items-center flex-col bg-red-300 w-full max-w-md border border-gray-200 hover:shadow-md  transition-all duration-300"
  
      >
        <p>Login page </p>
              <div className="flex flex-col gap-6 items-center justify-start">
                {/* <p className="text-lg font-semibold">{mode === `Sign Up` ? "Create account" : "Login"}</p>
                <p>Please {mode === `Sign Up` ? "Create account" : "Login"} to book appointment</p> */}
                    
                {
                  /* mode === "Sign Up" &&  */
                  <input
                    type="text"
                    name="name"
                    /* value={userInfo.name}
                    onChange={handleChange} */
                    placeholder='Full Name'
                    className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    required
                   />
                 }
          
                <input
                  type="email"
                  name="email"
                  /* value={userInfo.email}
                  onChange={handleChange} */
                  placeholder="Email"
                  className="mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                  required
                /> 
                <input 
                  type="password"
                  name="password"
                  /* value={userInfo.password}
                  onChange={handleChange} */
                  placeholder='Password'
                  className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                     required
            />
          <button type="submit"
            onClick={() => router.push('/login')}
            className="py-3  md:mx-10 sm:mx-2 tex-lg  w-full text-blue-500 font-semibold border border-blue-500 rounded-md">
                 
            {/* {
                  mode === `Sign Up` ? "Create account" : "Login "
                  
                  } */} login
                  </button>
                  <div>
                   {/*  {
                    mode === `Sign Up` 
                    ?  <p>Already have an account? <span onClick={() => setMode("Login")} className="cursor-pointer">Log In</span></p>
                    : <p>Create new account ? <span onClick={() => setMode("Sign Up")} className="cursor-pointer">Sign Up</span></p>
                    
                  } */}
                </div>
            </div>
                
              
             
      </form>
    </div>
  )
}

export default Login
