/** @format */

import { useState } from "react";
import styled from "styled-components";

const AdminProductForm = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    company: "",
    price: "",
    colors: "",
    image: "",
    description: "",
    category: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the product data
    const productData = {
      ...product,
      price: Number(product.price),
      colors: product.colors.split(","),
    };

    try {
      // Sending the product data to json-server
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        // Reset form state after successful submission
        setProduct({
          id: "",
          name: "",
          company: "",
          price: "",
          colors: "",
          image: "",
          description: "",
          category: "",
          featured: false,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <FormWrapper>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="id"
          placeholder="Product ID"
          value={product.id}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        {/* Brand Dropdown */}
        <Select
          name="company"
          value={product.company}
          onChange={handleChange}
          required
        >
          <option value="">Select Brand</option>
          <option value="Samsung">Samsung</option>
          <option value="Apple">Apple</option>
          <option value="Sony">Sony</option>
          <option value="LG">LG</option>
          <option value="OnePlus">OnePlus</option>
          {/* Add more brands as needed */}
        </Select>

        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        {/* Hex Color Input */}
        <Input
          type="text"
          name="colors"
          placeholder="Colors (comma separated hex codes)"
          value={product.colors}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <Select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Computer">Computer</option>
          <option value="Tablet">Tablet</option>
          <option value="Headphone">Headphone</option>
        </Select>
        <CheckboxLabel>
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
          />
          Featured
        </CheckboxLabel>
        <SubmitButton type="submit">Add Product</SubmitButton>
      </form>
    </FormWrapper>
  );
};

export default AdminProductForm;

// Styled Components
const FormWrapper = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 600;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #555;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;
