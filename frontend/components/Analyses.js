function Analyses({ analysisResults }) {
    return (
        <>
            

            {/* Map analysisResults */}
            {analysisResults.map((result, index) => (
                <div className="pb-4">
                    <div key={index} className="collapse bg-base-200">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-sm">
                        phishyness
                        <progress className="progress progress-primary w-100" value={result.phishingProbability} max="100"></progress>
                        
                    </div>
                    
                    <div className="collapse-content"> 
                        
                            <p className="text-sm pb-2">{result.email}</p>
                            {result.analysis && 
                                <div className="chat chat-end">
                                    <div className="chat-bubble chat-bubble-info text-sm">
                                        {result.analysis}
                                    </div>
                                </div>
                            }
                            </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Analyses;