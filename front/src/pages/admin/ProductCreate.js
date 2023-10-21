import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"
import { createProduct } from "../../functions/product";
import ProductCreateForm from "../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { getProducts } from "../../functions/product";

const ProductCreate = () => {
  const { login } = useSelector((state) => ({ ...state }));
  const [cats, setCats] = useState([]);
  //const [subs, setSubs] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [product,setProduct]=useState({});
  const [products,setProducts]=useState([]);
  const [isCatSelected,setIsCatSelected]=useState(false);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    setLoading(true);
    loadCategories();
    //loadSubs();
    loadProducts();
    setLoading(false);
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCats(res.data));
  
  // const loadSubs = () =>
  //   getSubs.then((res) => setSubs(res.data));  

  const loadProducts=()=>{
    getProducts().then((res)=>setProducts(res.data));
  }

  const loadSubOptions = (catid) =>
    getCategorySubs(catid).then((res) => setSubOptions(res.data));
  
    const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(product, login.token)
      .then((res) => {
        window.alert(`"${res.data.name}" is created`);
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    setProduct({ ...product, catid: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    loadSubOptions(e.target.value);
    setIsCatSelected(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"><AdminNav /></div>
        <div className="col-md-10">
         {loading ? (<LoadingOutlined className="text-danger h1" />) 
            : (<h4>Product create</h4>)}
                <hr />
              <ProductCreateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setProduct={setProduct}
                product={product}
                handleCatagoryChange={handleCatagoryChange}
                subOptions={subOptions}
                isCatSelected={isCatSelected}
                categories={cats}
                products={products}/>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
