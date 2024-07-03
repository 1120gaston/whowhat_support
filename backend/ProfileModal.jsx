import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

import { styles } from "../../styles"
import SkillButtons from "./SkillButtons"
import PurpleButton from '../../components/button/PurpleButton'
import { updateProfile } from '../../actions/profileAction'
import { topicTitles } from '../../constants'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default function ProfileModal() {

  const [open, setOpen] = useState(false)
  const [toggle, setToggle] = useState([false, false, false, false, false, false])
  const [data, setData] = useState({
    name: "",
    telephone: '',
    telegram: '',
    email: "",
    topic: "",
    file: [],
    description: "",
    type: "",
  })

  const ProfileData = [
    {
      title: 'name',
      type: 'text',
      placeholder: 'ваше имя'
    },
    {
      title: 'telephone',
      type: 'number',
      placeholder: 'ваш телефон',
    },
    {
      title: 'telegram',
      text: 'text',
      placeholder: 'ваш telegram',
    },
    {
      title: 'email',
      email: 'eamil',
      placeholder: 'ваш email',
    },
  ]

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleChange = (event, name) => {
    let values = event.target.value
    setData({ ...data, [name]: values })
  }

  const handleFileChange = (event) => {
    setData({ ...data, ['file']: event.target.files[0].name })
  }



  const handleSend = () => {
    let pretopic = [];
    {
      toggle.map((item, index) => {
        if (item === true) {
          pretopic.push(topicTitles[index])
        }

      })
      setData({ ...data, ['topic']: pretopic })
      setToggle([false, false, false, false, false, false])
    }
    let formdata = new FormData()
    formdata.append('name', data.name)
    formdata.append('telephone', data.telephone)
    formdata.append('telegram', data.telegram)
    formdata.append('email', data.email)
    formdata.append('topic', pretopic)
    formdata.append('file', data.file)
    formdata.append('description', data.description)
    sessionStorage.setItem('userFile', data.file)
    sessionStorage.setItem('userEmail', data.email)
    updateProfile(formdata, '6615ae5732bbf27ec9e0095d')
    setOpen(false)
  }
  const [loading, setLoading] = useState(false)



  return (
    <React.Fragment>
      <div onClick={handleOpen}>
        <PurpleButton title='Lorem ipsum' className='purpleButton' />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <div className={`${styles.Title5} pt-10`}>оставьть ваш запрос</div>
          <p className={`${styles.text4} text-info`}>Lorem ipsum dolor sit amet, consectetuer</p>
        </DialogTitle>

        <DialogContent className='w-[600px]'>
          <div className={styles.text1}>тема</div>
          <SkillButtons
            toggle={toggle}
            setToggle={setToggle}
          />

          <label className='flex flex-col'>
            <h6 className='text-[18px] font-bold cursor-pointer pt-5 pb-3'>Василий Петров</h6>
            <textarea
              rows={6}
              name='description'
              onChange={(event) => handleChange(event, 'description')}
              placeholder='текстовое описание'
              className='bg-third py-4 px-6 placeholder:text-secondary text-tertiary rounded-lg outline-none border-none font-medium w-[80%]'
            />
          </label>

          <div className='flex pt-3 justify-round items-center'>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              onChange={handleFileChange}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <div className='pl-5'>{data.file}</div>
          </div>

          <div>
            <h6 className='text-[18px] font-bold cursor-pointer pt-5 pb-3'>контактные данные</h6>
            <div>
              {
                ProfileData.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      id={item.title}
                      className='w-[45%]'
                      name={item.title}
                      label={item.title}
                      type={item.type}
                      placeholder={item.placeholder}
                      variant="outlined"
                      onChange={(event) => handleChange(event, item.title)}
                    />
                  )
                })
              }
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <div className='shadow-md shadow-primary' onClick={handleSend}>
            <PurpleButton title={loading ? "Sending..." : "Send"} />
          </div>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  )
}
