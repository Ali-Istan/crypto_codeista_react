import React from 'react'
import styles from './Layout.module.css'

function Layout({children}) {
  return (
    <>
    <header className={styles.header} >
      <h1>Crypto App</h1>
      <p><a href='www.coedeista.ir'>CodeIsta</a> | FullStack Developer</p>
    </header>
    {children}
    <footer className={styles.fooetr}>Developed by Ali Istan</footer>
    </>
  )
}

export default Layout