import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../functions/category";
import { createSub, getSubs } from "../../functions/sub";
import CategoryForm from "../../components/forms/CategoryForm";

const SubCreate = () => {
  const { login } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = async () =>{
    const res=await getCategories();
    setCategories(res.data);
    return; 
  }

  const loadSubs = async (catId) =>{
      const res=await getSubs(catId);
      console.log(res);
      setSubs(res.data);
      return;
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res=await createSub({ name, parentId: selectedCatId }, login.token)
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
      await loadSubs(selectedCatId);
    }catch(err){
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleCatChange=async (catId)=>{
    setSelectedCatId(catId); 
    await loadSubs(catId);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"><AdminNav /></div>
        <div className="col">
          {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Create sub category</h4>)}

          <div className="form-group">
            <label>Parent category</label>
            <select name="category" className="form-control" onChange={(e) => handleCatChange(e.target.value)}>
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          {subs.map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
