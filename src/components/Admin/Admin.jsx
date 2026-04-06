import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { Skeleton } from '@mui/material';
import axios from '../../utils/axios';

const Admin = () => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoader(true);
            try {
                const result = await axios(`/api/resume/get/admin`);
                setData(result.data.resumes);
            } catch (error) {
                console.log(error);
                alert("something went wrong");
            } finally {
                setLoader(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className={styles.Admin}>
            <div className={styles.AdminBlock}>

                {/* ✅ Loader */}
                {loader && (
                    <>
                        <Skeleton variant="rectangular" width={266} height={400} sx={{ borderRadius: "20px" }} />
                        <Skeleton variant="rectangular" width={266} height={400} sx={{ borderRadius: "20px" }} />
                    </>
                )}


                {!loader && data.map((item) => (
                    <div key={item._id} className={styles.AdminCard}>
                        <h2>{item?.user?.name}</h2>
                        <p style={{ color: "blue" }}>
                            {item.user?.email}
                        </p>
                        <h3>Score: {item.score}%</h3>
                        <p>
                            {item.feedback}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Admin;