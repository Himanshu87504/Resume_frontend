import React from 'react'
import styles from './Dashboard.module.css'
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/axios';
import Skeleton from '@mui/material/Skeleton';

const Dashboard = () => {
    const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");

    const [result, setResult] = useState(null);

    const { userInfo } = useContext(AuthContext);

    console.log(userInfo);
    const handleOnChange = (e) => {

        const file = e.target.files?.[0];
        setResumeFile(file);
        setUploadFileText(file.name);
    };

    const handelupload = async () => {
        if (!jobDesc || !resumeFile) {
            alert("please fill job description $ upload Resume")
            return
        }

        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("job_desc", jobDesc);
        formData.append("user", userInfo?._id);
        setLoading(true)



        setResult(null);
        try {
            const result = await axios.post('/api/resume/addResume', formData);
            setResult(result.data.data)

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.DashboardLeft}>
                <div className={styles.DashboardHeader}>
                    <div className={styles.DashboardHeaderTitle}>Smart Resume Screening</div>

                    <div className={styles.DashboardLargeTitle}>Resume Match Score</div>
                </div>

                <div className={styles.alertInfo}>
                    <div>🔔 Important Instructions:</div>
                    <div className={styles.dashboardInstruction}>
                        <div>📋 please paste the complete job description in the "Job Description" filed before submitting </div>
                        <div>📄 Only PDF Formate (. pdf) resumes are accepted.</div>
                    </div>

                </div>
                <div className={styles.DashboardUploadResume}>
                    <div className={styles.DashboardResumeBlock}>
                        {uploadFiletext}
                    </div>
                    <div className={styles.DashboardInputField}>
                        <label htmlFor="inputField" className={styles.analyzeAIBtn}>Upload Resume</label>
                        <input
                            type="file"
                            accept=".pdf"
                            id="inputField"
                            onChange={handleOnChange}
                        />

                    </div>

                </div>

                <div className={styles.jobDesc}>
                    <textarea className={styles.textArea} onChange={(e) => { setJobDesc(e.target.value) }} placeholder='paste Your Job Description' rows={10} cols={50} ></textarea>
                    <div className={styles.AnalyzeBtn} onClick={handelupload}>Analyze</div>

                </div>
            </div>

            <div className={styles.DashboardRight}>
                <div className={styles.DashboardRightTopCard}>
                    <div>Analyze With AI</div>

                    {userInfo?.photoUrl && (
                        <img
                            className={styles.profileImg}
                            src={userInfo?.photoUrl}
                            alt="profile"
                            referrerPolicy="no-referrer"
                            style={{ width: 60, height: 60, borderRadius: "50%" }}
                        />
                    )}

                    <h4>Resume-scorer</h4>
                </div>
                {
                    result && <div className={styles.DashboardRightTopCard}>
                        <div>Result</div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
                            <h1>{result?.score}</h1>
                            <CreditScoreIcon sx={{ fontSize: 22 }} />
                        </div>

                        <div className={styles.feedback}>
                            <h3>Feedback</h3>
                            <p>{result?.feedback}</p>
                        </div>

                    </div>
                }

                {
                    loading && <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
                }

            </div>
        </div>
    )
}

export default WithAuthHOC(Dashboard)