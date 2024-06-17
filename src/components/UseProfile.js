import axios from "axios";
import { useEffect, useState } from "react";

export function useProfile(){
    const [data, setData] = useState(false);
    const[ loading,setLoading]=useState(true);


    useEffect(() => {
        setLoading(true);
        axios.get('/api/profile')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, []);
    return{loading,data};
}