"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    
    const { loading: profileLoading, data: profileData } = useProfile();

    useEffect(() => {
        
        fetchCategories();
        }, []);
        
        async function fetchCategories() {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
    if (profileLoading) {
        return "Loading user info...";
    }

    if (!profileData.admin) {
        return "Not an admin";
    }

    async function handleNewCategorySubmit(ev) {
        ev.preventDefault();

        if (!newCategoryName.trim()) {
            toast.error('Category name cannot be empty');
            return;
        }

        const creationPromise = axios.post('/api/categories', {
            name: newCategoryName
        });

        toast.promise(creationPromise, {
            loading: 'Creating your new category...',
            success: 'Category created!',
            error: 'Unable to create category',
        });

        try {
            await creationPromise;
            fetchCategories();
            setNewCategoryName('');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={profileData.admin} />
            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div className="mt-8 flex gap-2 items-end">
                    <div className="grow">
                        <label htmlFor="categoryName">New category name</label>
                        <input 
                            id="categoryName"
                            type="text" 
                            value={newCategoryName} 
                            onChange={ev => setNewCategoryName(ev.target.value)} 
                        />
                    </div>
                    <div className="pb-2">
                        <button className="" type="submit">Create</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 test-sm text-gray-500">Edit category:</h2>
                {categories?.length>0 && categories.map(category => (
                    <button className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1">
                        <span key={category.id}>{category.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}
