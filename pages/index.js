import db from '../db/clientApp';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  doc,
} from '@firebase/firestore';

export default function Home() {
  const [cats, setCats] = useState([]);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  console.log(cats);
  useEffect(
    () =>
      onSnapshot(collection(db, 'fakeValues'), (snapshot) => {
        setCats(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  const newCat = async () => {
    const name = prompt("Enter kitty's name:");
    const color = prompt("Enter kitty's color:");
    const favoriteFood = prompt("Enter kitty's favorite food:");

    const collectionRef = collection(db, 'fakeValues');
    const payload = {
      name,
      color,
      imageUrl:
        'https://cf.ltkcdn.net/cats/images/orig/246632-1600x1067-Calico-Kitten-Crouching.jpg',
      favoriteFood,
    };
    await addDoc(collectionRef, payload);
  };

  const editCat = async (id, imageUrl) => {
    const name = prompt('Enter new name');
    const color = prompt('Enter new color:');
    const favoriteFood = prompt('Enter new favorite food');

    const docRef = doc(db, 'fakeValues', id);
    const payload = { name, color, favoriteFood, imageUrl };
    setDoc(docRef, payload);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Head>
        <title>Whiska's Kitty Daycare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full h-full flex-1 px-20 text-center bg-gradient-to-tr from-blue-300 via-green-300 to-pink-400">
        <h1 className="text-6xl font-bold">
          Welcome to <p className="text-blue-600">Whiska's Kitty Daycare</p>
        </h1>

        <button
          className="flex bg-red-200 w-20 h-10 rounded-full items-center justify-center border-2 border-black hover:bg-white transform transition duration-700 m-5"
          onClick={newCat}
        >
          New Cat
        </button>

        <div className="flex flex-wrap items-center justify-around max-w-5xl mt-6 sm:w-full ">
          {cats.map((cat) => {
            return (
              <div
                key={cat.id}
                className="flex flex-1 min-w-md max-w-md min-h-full h-60 max-h-full  px-20 shadow-lg rounded-lg m-10 items-center hover:border-blue-400 border-2 transition duration-700 bg-white"
              >
                <div className="flex w-full flex-1 flex-grow">
                  <div>
                    {' '}
                    <span className="font-bold">Name:</span> {cat.name} <br />
                    <span className="font-bold">Color:</span> {cat.color} <br />
                    <span className="font-bold">Favorite Food:</span>{' '}
                    {cat.favoriteFood} <br />
                  </div>
                  <div>
                    <Image
                      loader={myLoader}
                      src={
                        cat.imageUrl
                          ? cat.imageUrl
                          : 'https://media.newyorker.com/photos/59095c67ebe912338a37455d/master/w_1600,c_limit/Stokes-Hello-Kitty2.jpg'
                      }
                      width={300}
                      height={300}
                    ></Image>
                  </div>
                </div>

                <div className="flex flex-shrink">
                  {' '}
                  <button
                    className="flex flex-none flex-shrink w-20 h-20 rounded-full bg-blue-300 p-3 max-w-xs max-h-xs mx-auto text-white text-center items-center justify-center hover:bg-green-300 hover:text-red-500 transition duration-700"
                    onClick={() => editCat(cat.id, cat.imageUrl)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-white">
        Powered by &nbsp;
        <span className="text-red-400 font-mono">
          a bunch of little hampsters on a wheel 🐹
        </span>
      </footer>
    </div>
  );
}
