import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import './App.css';

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

function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

function App() {
  const [originListImg, setOriginListImg] = useState<IUser[]>([]);
  const [listImg, setListImg] = useState<IUser[]>([]);

  const [branch, setBranch] = useState(EBranch.All);
  const [name, setName] = useState('');

  const list = useMemo(() => {
    if (branch)
      return listImg.filter((item) => item.branch === ListBranch[branch]);
    return listImg;
  }, [branch, listImg]);

  useEffect(() => {
    getImages().then((res) => setOriginListImg(res.data.result));
  }, []);

  useEffect(() => {
    let list = [...originListImg];
    if (name) {
      list = list.filter((item) =>
        removeAccents(item.fullName).includes(removeAccents(name))
      );
    }
    setListImg(list);
  }, [name, listImg, originListImg]);

  return (
    <div className='App'>
      <h1>NCC checkout</h1>
      <div className='header'>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <FormControl fullWidth sx={{ width: 180 }}>
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
          <FormControl fullWidth sx={{ width: 200 }}>
            <TextField
              id='outlined-basic'
              label='Name'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
