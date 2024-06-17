"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs.js"
import axios from "axios";
import toast from "react-hot-toast";


export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState(session?.data?.user?.name || '');
    const [isAdmin,setIsAdmin]=useState(false);
    const [profileFetched,setProfileFetched]=useState(false);
    
    const [image, setImage] = useState();
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            setIsAdmin(session.data.admin);
            setProfileFetched(true);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        const savingPromice=new Promise(async(resolve,reject)=>{
            try {
                await axios.put('/api/profile', {
                    name: userName,
                    image,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                resolve();
            } catch {
                reject();
            }
        });
        await toast.promise(savingPromice,{
            loading:'Saving...',
            success:'Profile saved!',
            error:'Unable to save profile!',

        });
        
    }

    if (session.status === 'loading'|| !profileFetched) {
        return 'Loading';
    }
    if (session.status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length > 0) {
            
            
            const data = new FormData();
            data.append('file', files[0]);
            
            const uploadPromise=new Promise(async(resolve,reject)=>{
                try {
                    const response = await axios.post('/api/upload', data);
                    setImage(response.data.url);
                    resolve();
                    
                } catch (error) {
                    console.error('Error uploading file:', error);
                    reject();
                }
            });
            await toast.promise(uploadPromise,{
                loading:'Uploading...',
                success:'Upload Completed!',
                error:'Unable to upload!'
            });
            
        }
    }
    console.log("hi from page"+ isAdmin);
    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}></UserTabs>
            <div className="max-w-md mx-auto mt-8">
                <div className="flex gap-2 items-center">
                    <div >
                        <div className="p-2 rounded-lg4 relative">
                            <Image className="rounded-lg w-full h-full mb-1" src={image} width={96} height={96} alt="avatar" />
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}></input>
                                <span className="block border rounded-lg p-2 text-center cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" value={userName} placeholder="First and last name" onChange={ev => setUserName(ev.target.value)} />
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
