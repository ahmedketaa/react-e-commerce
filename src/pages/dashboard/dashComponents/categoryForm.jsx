import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getCategoryById, addCategory, updateCategory } from '../../../Utlities/CategoryServices';
import { Toast } from 'primereact/toast';

const CategoryForm = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const toast = useRef(null);

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId]);

    const showToast=(detail)=>{
        toast.current.show({ severity: 'success', summary: 'Success', detail: detail, life: 3000 });

    }
    const fetchCategory = async (id) => {
        
            await getCategoryById(id).then(response=>{
                setName(response.data.name);
                }
            ).catch (error=> {
            console.error("Error fetching category:", error);
            })};

    const handleSubmit = async () => {
        const categoryData = { name };
        try {
            if (categoryId) {
                await updateCategory(categoryId, categoryData);
              showToast('Category updated successfully')
            } else {
                await addCategory(categoryData);
                showToast('Category added successfully')
                setName("")
            }
            setTimeout(()=>{
                navigate('../')
            } ,2000);

        } catch (error) {
            console.error("Error saving category:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save category', life: 3000 });
        }
    };

    return (
        <div className="container d-flex flex-column gap-3 mt-5 shadow-lg p-5">
            <Toast ref={toast} />
            <h2>{categoryId ? 'Update Category' : 'Add Category'}</h2>
            <div className="p-field">
                <label className='me-3' htmlFor="name">Category Name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="p-mt-3 d-flex gap-3">
                <Button style={{borderRadius:"8px"}} label={categoryId ? 'Update' : 'Add'} icon="pi pi-check" onClick={handleSubmit} />
                <Button style={{borderRadius:"8px"}} label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" onClick={() => navigate('/categories')} />
            </div>
        </div>
    );
};

export default CategoryForm;
