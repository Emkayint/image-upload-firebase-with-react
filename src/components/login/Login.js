import {
  ref, 
  uploadBytes,
  listAll,
  // list,
  getDownloadURL
} from "firebase/storage"

import { useEffect, useState } from "react"
import { storage } from "../../firebase"

function Login(){

  const [imgUpload, setImgUpload] = useState(null)
  const [imgUrls, setImgUrls] = useState([])
  const imageListRef = ref(storage, "images")
  const imageListRefOne = ref(storage, "image/719331117");
  const httpRef = ref(
    storage,
    "gs://chatty-96432.appspot.com/images/123"
  );
  console.log(imgUpload)

  const uploadImg = () => {
    if (imgUpload == null) return;
    const imageRef = ref(storage, `profile-picture/719331117`);
    uploadBytes(imageRef, imgUpload)
    .then( snapshot => {
      getDownloadURL(snapshot.ref)
      .then((url) => {
        setImgUrls(prev => [...prev, url])
      })
    })
  }

  useEffect(() => {
    listAll(imageListRef).then(res => {
      // console.log(res)
      res.items.forEach(item => {
          getDownloadURL(item).then(url => {
            // console.log("url" , url)
            setImgUrls(prev => [...prev, url])
          })
        })
    })
  }, [])

  const [imageToDisaplay, setImageToDisplay] = useState('')
  useEffect(() => {
    getDownloadURL(imageListRefOne)
      .then((url) => setImageToDisplay(<img src={url} alt="image not found" />))
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, [])

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImgUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImg}> Upload Image</button>
      {imageToDisaplay}
    </div>
  )

}

export default Login

  // const [imageToDisaplay, setImageToDisplay] = useState("");
  // useEffect(() => {
  //   getDownloadURL(imageListRefOne)
  //     .then((url) => setImageToDisplay(<img src={url} alt="image not found" />))
  //     .catch((error) => {
  //       switch (error.code) {
  //         case "storage/object-not-found":
  //           break;
  //         case "storage/unauthorized":
  //           break;
  //         case "storage/canceled":
  //           break;
  //         case "storage/unknown":
  //           break;
  //       }
  //     });
  // }, []);