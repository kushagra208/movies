'use client'
import { useAuth } from '@/auth/context/AuthContext'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getData } from './api/api';
import Link from 'next/link';
import Loading from './loading';

export default function Home() {
  const { currentUser, loading , addData , logout } = useAuth();
  const router = useRouter();
  const [data , setData] = useState(null);
  const src = "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg";
  useEffect(() => {
    if(!currentUser) {
      router.push("/login");
    }
    async function getMoviesData() {
      const data = await getData();
      setData(data);
    }
    getMoviesData();
  },[])

  useEffect(() => {}, [data]);

  return (
    !currentUser ? <Loading /> : <div className={styles.container}>
      <div className = {styles.navbarContainer} style={{width: "100vw", height: "80px", display: "flex" , alignItems: "center" , justifyContent: "space-between"}} >
        <div className={styles.logo}>Logo</div>
        <div className={styles.userProfile}>
          <Image loader={() => currentUser.photoURL} alt = "ProfilePhoto" src = {currentUser.photoURL} width={50} height={50} className={styles.profilePhoto} />
          <p className={styles.userName}>{currentUser.displayName}</p>
          <button className={styles.btn} onClick={() => {
            router.push("/login");
            logout();
            }}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>Logout</button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Top 100 Movies</h1>
        <div className={styles.grid}>
          { data && data.map((el, index) => (
            <div key = {index} className={styles.card}>
            <div className={styles.cardFront}>
              <Image loader = {() => el.image } src = {el.image} alt = {el.title} width={300} height={400} />
            </div>
            <div className={styles.cardBack}>
              <h2>{el.title}</h2>
              <p>Genre: {el.genre}</p>
              <p>Director: {el.director}</p>
              <p>Ratings: {el.rating}</p>
              <p>Year of Release: {el.year}</p>
              <p>Trailer: <Link href={el.trailer}>{el.title}</Link></p>
              <button onClick = {() => addData(el)}>Save</button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}
