
const  LoginForm=({setPhone,handleSubmit})=> 
    <form onSubmit={handleSubmit}>
        <input type="phone" 
            className="form-control" 
            maxLength={11} 
            style={{ width: 150 }} 
            onChange={(e)=>setPhone(e.target.value)} 
            placeholder="0917xxxxxx" autoFocus />
        <button type="submit" className="btn btn-raised">Send</button>
    </form>
    

export default LoginForm;