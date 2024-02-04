"use client";

import { useEffect, useState } from 'react';

function EmailForm({ analysisResults, setAnalysisResults }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(analysisResults);
    }, [analysisResults]);

    const handleButtonClick = async () => {
        setLoading(true);
        try {
            const sentEmail = email;
            const response = await fetch('http://localhost:8000/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.API_KEY
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
        } finally {
            setLoading(false);
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
                <textarea 
                    className="textarea textarea-bordered textarea-sm h-60" 
                    placeholder="phishy email" 
                    value={email} 
                    onChange={handleTextareaChange}
                ></textarea>
            </label>
            <div className="pb-4">
                {loading ? (
                    <button className="btn" disabled="disabled">
                        analyzing
                        <span className="loading loading-spinner"></span>
                    </button>
                ) : (
                    <button className="btn" onClick={handleButtonClick}>
                        analyze 🔎
                    </button>
                )}
            </div>
        </div>
    );
}

export default EmailForm;