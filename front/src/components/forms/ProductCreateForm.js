import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, setProduct, product, handleCatagoryChange, subOptions, isCatSelected, categories}) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" className="form-control" onChange={(e)=>{handleChange(e);} } />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" className="form-control" onChange={handleCatagoryChange}>
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {isCatSelected && (
        <div>
          <label>Sub Categories</label>
          <Select style={{ width: "100%" }} placeholder="Please select" value={subOptions.value} 
            onChange={(value) => setProduct({ ...product, subid: value })}>
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;
