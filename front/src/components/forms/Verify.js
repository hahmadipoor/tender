
const  VerifyForm=({setCode,handleSubmit})=> 
    <form onSubmit={handleSubmit}>
        <input type="string" 
            className="form-control" 
            maxLength={7} 
            style={{ width: 150 }} 
            onChange={(e)=>setCode(e.target.value)} 
            placeholder="123456" 
            autoFocus />
        <button type="submit" className="btn btn-raised">Send</button>
    </form>
    

export default VerifyForm;