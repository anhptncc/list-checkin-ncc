import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface IUser {
  branch: string;
  checkInAt: string;
  emailAddress: string;
  fullName: string;
  img: string;
  type: string;
}

const getImages = () => {
  return axios.get(
    'https://ims-api.nccsoft.vn/api/services/app/FaceId/GetListImage',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    }
  );
};

function App() {
  const [listImg, setListImg] = useState<IUser[]>([]);

  useEffect(() => {
    getImages().then((res) => setListImg(res.data.result));
  }, []);
  return (
    <div className='App'>
      {listImg.map((item, index) => (
        <div className='box'>
          <img key={index} src={item.img} alt='index' />
          <p className='text name'>{item.fullName}</p>
          <p className='text'>
            {item.branch} - {item.type}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
