function Analyses({ analysisResults }) {
    function emojiPicker(probability) {
        if (probability === 0) {
            return "😇"; // Totally Safe
        } else if (probability <= 10) {
            return "🙂"; // Low Risk
        } else if (probability <= 20) {
            return "😐"; // Minimal Suspicion
        } else if (probability <= 30) {
            return "😕"; // Slightly Phishy
        } else if (probability <= 40) {
            return "😬"; // Somewhat Suspicious
        } else if (probability <= 50) {
            return "🐟"; // Moderately Phishy
        } else if (probability <= 60) {
            return "🐠"; // High Risk
        } else if (probability <= 70) {
            return "🐙"; // Very Suspicious
        } else if (probability <= 80) {
            return "🦈"; // Extremely Phishy
        } else if (probability <= 90) {
            return "🐋"; // Highly Dangerous
        } else if (probability <= 100) {
            return "🐳"; // Highly Dangerous
        } else {
            return "🔥"; // Unknown or Invalid Probability
        }
    }
    return (
        <>
            {/* Map analysisResults */}
            {analysisResults.map((result, index) => (
                <div className="pb-4" key={index}>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-sm">
                            phishyness {emojiPicker(result.phishingProbability)}
                            <progress className="progress progress-primary w-100" value={result.phishingProbability} max="100"></progress>    
                        </div>
                        
                        <div className="collapse-content"> 
                                <p className="text-sm pb-2">{result.email}</p>
                                {result.analysis && 
                                    <div className="chat chat-end">
                                        <div className="chat-bubble chat-bubble-accent text-sm">
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