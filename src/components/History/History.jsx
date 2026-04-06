import { useState, useEffect, useContext } from 'react';
import styles from './History.module.css';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';

const History = () => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoader(true);
            try {
                const result = await axios(`/api/resume/get/${userInfo?._id}`);
                console.log(result.data.resumes);
                setData(result.data.resumes)
            } catch (error) {
                console.log(error);
                alert("something went wrong");
            } finally {
                setLoader(false);
            }
        };

        if (userInfo?._id) {
            fetchUserData();
        }
    }, [userInfo]);
    console.log("data")
    console.log(data)
    return (
        <div className={styles.History}>
            <div className={styles.HistoryCardBlock}>

                {loader && (
                    <>
                        <Skeleton variant="rectangular" width={266} height={200} sx={{ borderRadius: "20px" }} />
                        <Skeleton variant="rectangular" width={266} height={200} sx={{ borderRadius: "20px" }} />
                        <Skeleton variant="rectangular" width={266} height={200} sx={{ borderRadius: "20px" }} />
                        <Skeleton variant="rectangular" width={266} height={200} sx={{ borderRadius: "20px" }} />
                    </>
                )}
                {!loader && data.length === 0 && (
                    <p style={{ textAlign: "center", width: "100%" }}>
                        No History Found
                    </p>
                )}

                {data.map((item) => (
                    <div key={item._id} className={styles.HistoryCard}>
                        <div className={styles.cardPercentage}>{item.score} %</div>
                        <p>Resume Name:{item.resume_name}</p>
                        <p>{item.feedback}</p>
                        <p>{item.createdAt.slice(0, 10)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProtectedHistory = WithAuthHOC(History);

export default ProtectedHistory;

