import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    'https://ims-api.nccsoft.vn/api/services/app/FaceId/GetListImage'
  );
};

enum EBranch {
  All,
  HN1,
  HN2,
  ĐN,
  SG1,
  SG2,
  Vinh,
}

const ListBranch = ['All', 'HN1', 'HN2', 'ĐN', 'SG1', 'SG2', 'Vinh'];

function App() {
  const [listImg, setListImg] = useState<IUser[]>([]);

  const [branch, setBranch] = useState(EBranch.All);

  const list = useMemo(() => {
    if (branch)
      return listImg.filter((item) => item.branch === ListBranch[branch]);
    return listImg;
  }, [branch, listImg]);

  useEffect(() => {
    getImages().then((res) => setListImg(res.data.result));
  }, []);

  return (
    <div className='App'>
      <div className='header'>
        <Box sx={{ width: 150 }}>
          <FormControl fullWidth>
            <InputLabel id='branch'>Branch</InputLabel>
            <Select
              labelId='branch'
              value={branch}
              label='Branch'
              onChange={(e) => setBranch(+e.target.value)}
            >
              {ListBranch.map((item, index) => (
                <MenuItem value={index}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className='content'>
        {list.map((item, index) => (
          <div className='box'>
            <img
              key={index}
              src={item.img}
              alt='index'
              width={256}
              // height={252}
            />
            <p className='text name'>{item.fullName}</p>
            <p className='text'>
              {item.branch} - {item.type}
            </p>
            <p className='text'>{item.checkInAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
