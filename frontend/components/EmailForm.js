"use client";

import { useEffect, useState } from 'react';

function EmailForm({ analysisResults, setAnalysisResults }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(analysisResults);
    }, [analysisResults]);

    const handleButtonClick = async () => {
        try {
            const sentEmail = email;
            const response = await fetch('http://localhost:8000/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "text": email })
            });

            if (response.ok) {
                // Handle successful response
                console.log('Email sent successfully');
                const result = await response.json();
                console.log(result);
                setAnalysisResults(prevResults => [
                    {
                        "email": sentEmail, 
                        "phishingProbability": result.phishingProbability,
                        "analysis": result.analysis
                    }, 
                    ...prevResults
                ]);
            } else {
                // Handle error response
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    const handleTextareaChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div>
            <label className="form-control pb-4">
                <div className="label">
                    <span className="label-text">enter a phishy email</span>
                </div>
                <textarea className="textarea textarea-bordered h-24" placeholder="phishy email" value={email} onChange={handleTextareaChange}></textarea>
            </label>
            <div className="pb-4">
                <button className="btn" onClick={handleButtonClick}>
                    <span className="loading loading-spinner"></span>
                    analyzing
                </button>
            </div>
        </div>
    );
}

export default EmailForm;