import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {createCategory, getCategories} from "../../functions/category";
import CategoryForm from "../../components/forms/CategoryForm";
import LocalSearch from "../../components/forms/LocalSearch";


const CategoryCreate = () => {
  const { login } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res=await getCategories();
    setCategories(res.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res=await createCategory({ name }, login.token);
    setLoading(false);
    setName("");
    toast.success(`"${res.data.name}" is created`);
    loadCategories();
  };

  
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"><AdminNav /></div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
