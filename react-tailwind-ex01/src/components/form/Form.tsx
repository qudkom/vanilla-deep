import { ChangeEvent, FormEvent, RefObject, useRef, useState } from 'react'
import styles from './Form.module.css'
type FormData = {
  username: string
  email: string
  password: string
}
export default function Form() {
  const inputName: RefObject<HTMLInputElement | null> = useRef(null)
  const inputPwd: RefObject<HTMLInputElement | null> = useRef(null)
  const inputEmail: RefObject<HTMLInputElement | null> = useRef(null)

  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const key = name as keyof typeof formData
    setFormData({ ...formData, [key]: value })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Sign Up</h2>
          <div className={styles.inputItem}>
            <label onClick={() => inputName.current?.focus()}>이름</label>
            <input type='text' name='username' ref={inputName} onChange={handleChange} value={formData.username} />
          </div>
          <div className={styles.inputItem}>
            <label onClick={() => inputPwd.current?.focus()}>비밀번호</label>
            <input type='password' name='password' ref={inputPwd} onChange={handleChange} value={formData.password} />
          </div>
          <div className={styles.inputItem}>
            <label onClick={() => inputEmail.current?.focus()}>이메일</label>
            <input type='email' name='email' ref={inputEmail} onChange={handleChange} value={formData.email} />
          </div>
          <div className={styles.bottomButtons}>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
