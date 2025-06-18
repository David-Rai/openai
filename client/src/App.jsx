import React from 'react'
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const App = () => {
  const inputRef = useRef()
  const [isStart, setIsStart] = useState(false)
  const [prompts, setPrompts] = useState([])

  //handle key down
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  };
  //sending request to the express server
  const handleSend = async () => {
    setIsStart(true)
    const prompt = inputRef.current.value
    console.log(prompt)
    setPrompts([...prompts,prompt])
    const res = await axios.get(`http://localhost:1111/${prompt}`)
    console.log(res.data)
    const data = res.data.replace(/<\/?think>/g, '').trim();
    setPrompts([...prompts,data])
  }

  return (
    <main className='h-screen w-full  bg-[#212121] flex flex-col'>
      {/* Chat section here */}
      <section className='h-[80%] overflow-hidden overflow-y-auto w-full flex items-center justify-center flex-col p-[20px]'>
        {
          isStart ?
            (
              prompts.map((p,i) => {
                return (
                  <div key={i} className='w-full h-auto m-3 text-white'>
                    <p className='w-full text-sm'>
                    {p}
                    </p>
                  </div>
                )
              })
            )
            :
            (
              <h1 className='text-white text-3xl'>What on your mind?</h1>

            )
        }
      </section>

      {/* Promt here */}
      <section className='p-[10px] h-[20%] w-full'>
        <div className=' bg-[#303030] h-full w-full rounded-3xl flex items-center px-2 justify-between'>
          <input type="text" placeholder='Ask anything' ref={inputRef}
          onKeyDown={handleKeyDown}
            className='border-none focus:outline-none w-[90%] p-3 text-gray-100'
          />
          <button className='h-[40px] w-[40px] bg-white flex justify-center items-center rounded-full'>
            <FaArrowUp onClick={handleSend} />
          </button>
        </div>
      </section>
    </main>
  )
}

export default App