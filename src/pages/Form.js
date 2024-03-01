import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { addData, fetchData, getFileUrl, uploadFile } from '../services/firebase/firebase.utils';

import Loader from '../components/Loader';

function Form() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (selectedFile && selectedCategory) {
            setUploading(true);

            const fileName = selectedFile.name + v4();
            const fileRef = await uploadFile('songs', fileName, selectedFile);
            const fileUrl = await getFileUrl(fileRef);

            await addData('songs', {
                categoryId: selectedCategory,
                name: selectedFile.name,
                url: fileUrl,
                isActive: true,
            });

            setUploading(false);

            alert('File uploaded successfully');
        } else {
            alert('Please select a file and a category');
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, loading } = await fetchData('categories');
            setCategories(data);
            setLoading(loading);
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='container'>
            <form>
                <div className='mb-3'>
                    <label className='form-label'>Category</label>
                    <select className='form-select' value={selectedCategory} onChange={handleCategoryChange}>
                        <option hidden>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>File</label>
                    <input className='form-control' type='file' onChange={handleFileChange} />
                </div>
                <div className='mb-3 d-flex gap-1'>
                    <button className='btn btn-success' onClick={handleUpload} disabled={uploading}>
                        Upload File
                    </button>
                    <Link className='btn btn-primary' to='/'>
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Form;
