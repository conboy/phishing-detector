function EmailForm() {
    return (
        <div className="px-6">
            <label className="form-control pb-4">
                <div className="label">
                    <span className="label-text">enter a phishy email</span>
                </div>
                <textarea className="textarea textarea-bordered h-24" placeholder="phishy email"></textarea>
            </label>
            <button className="btn">
                <span className="loading loading-spinner"></span>
                analyzing
            </button>
        </div>
    );
}

export default EmailForm;