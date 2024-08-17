import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { deleteCategory, getCategories } from '../../../Utlities/CategoryServices';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';  // Import ConfirmDialog

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
             await getCategories().then(res=>{
                setCategories(res.data);
            }).catch(error=>{
                console.error("Error fetching categories:", error);
            })
    };
    const confirmDeleteCategory = (categoryId) => {
        confirmDialog({
            message: 'Are you sure you want to delete this category?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger ',
            accept: () => handleDeleteCategory(categoryId), 
            reject:'' 
        });
    };
    const handleUpdateCategory = (categoryId) => {
        navigate(`update-category/${categoryId}`);
    };

    const handleDeleteCategory = async (categoryId) => {
           
                await deleteCategory(categoryId).then(()=>{
                    fetchCategories();
                }).catch(error=>{
                    console.error("Error deleting category:", error);
                })
            }
        
    
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-grid p-justify-center">
             <ConfirmDialog />
              <div className="p-col-12 mb-4">
                <span className="p-input-icon-left">
                    <i className="pi pi-search ps-2" />
                    <InputText
                        className='ps-4'
                        placeholder="Search categories..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </span>
            </div>
            {filteredCategories.map((category) => (
                <div key={category.id} className="">
                    <Card
                            title={(category.name).toUpperCase()}
                            className="p-0"
                            style={{ 
                                marginBottom: '20px', 
                                borderRadius: '8px', 
                                boxShadow: '0px 4px 8px #db444435 ' 
                            }}
                        >
                        <div className="">
                            <span style={{ fontWeight: '500'}}>{category.name}</span>
                            <div>
                                <Button
                                    label="Update"
                                    icon="pi pi-pencil"
                                    className="p-2 p-button-warning me-2 mt-3 rounded"
                                    onClick={() => handleUpdateCategory(category.id)}
                                />
                                <Button
                                    label="Delete"
                                    icon="pi pi-trash"
                                    className="p-2 p-button-danger rounded"
                                    onClick={() => confirmDeleteCategory(category.id)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
              {filteredCategories.length === 0 && (
                <div className="p-col-12 text-center">
                    <p>No categories found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
