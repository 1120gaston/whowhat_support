import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import useAuthCheck from '../../../redux/hooks/useAuthCheck'
import ImageUpload from '../../UI/form/ImageUpload'
import BlogIcon from '../../../images/blogIcon.png'
import Header from '../../Shared/Header/Header'
import Footer from '../../Shared/Footer/Footer'
import { create } from '../../../api/api_article'
import auth from '../../auth/authHelper'
import { blogType1 } from '../../../constant'

const AddBlog = () => {

    const { data: userData } = useAuthCheck()
    const { register, handleSubmit } = useForm({})
    const [selectedImage, setSelectedImage] = useState(null)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const jwt = auth.isAuthenticated();
    const onSubmit = async (data) => {
        if (userData && selectedImage) {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('type', data.type)
            formData.append('description', data.description)
            formData.append('file', file)
            await create({ id: jwt.id }, { t: jwt.token }, formData).then((data) => {
                message.success('Pleas wait until approved.')
                data && navigate('/blog')
            });
        }
    }

    return (
        <>
            <Header />
            <DashboardLayout>
                <div className="card mb-5 p-2 shadow-sm">
                    <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12">
                            <div className="form-group mb-2 card-label">
                                <label>Title</label>
                                <input placeholder='Title' {...register("title")} className="form-control" required />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-2 card-label">
                                <label>Description</label>
                                <textarea placeholder='Description' {...register("description")} className="form-control" rows={5} required />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-2 card-label">
                                <label>Section</label>
                                <select style={{ width: '300px', padding: '9px', border: 'solid 1px #ddd', borderRadius: '5px' }} {...register("type")}>
                                    {blogType1.map((title, index) => (
                                        <option key={index} value={title}>{title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className='d-flex gap-2 align-items-center'>
                                <div className="my-3">
                                    <img className='' style={{ maxWidth: '150px' }} src={selectedImage ? selectedImage : BlogIcon} alt="" />
                                </div>
                                <div className="mt-3">
                                    <ImageUpload setFile={setFile} setSelectedImage={setSelectedImage} />
                                </div>
                            </div>
                        </div>
                        <div className='text-center my-3'>
                            <Button htmlType='submit' type="primary" size='large'  >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
            <Footer />
        </>
    )
}

export default AddBlog