import { useState } from 'react'
import styles from './Modal.module.css'
export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  // 모달 열기/닫기 함수
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <div className={styles.modalBox}>
        <button onClick={openModal} className={styles.btnOpen}>
          Open Modal
        </button>

        {isOpen && (
          <div className={styles.modalWrapper} onClick={closeModal}>
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()} // 클릭 시 모달 외부를 클릭해도 모달이 닫히지 않게
            >
              <h2 className={styles.title}>모달 제목</h2>
              <p className={styles.content}>여기에 모달 내용이 들어갑니다.</p>
              <button onClick={closeModal} className={styles.btnClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
