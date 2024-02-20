import React, { useRef } from "react";
import { firestore, addDoc, collection } from '../firebase'

export default function Home() {
  const messageRef = useRef()
  const ref = collection(firestore, 'messages')
  
  const handleSave = async(e) => {
    e.preventDefault()

    console.log(messageRef.current.value);

    let data = {
      message: messageRef.current.value
    }

    try {
      addDoc(ref, data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <label htmlFor="">Enter message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}