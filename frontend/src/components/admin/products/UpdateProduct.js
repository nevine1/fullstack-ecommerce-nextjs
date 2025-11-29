"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from 'next/image'
const UpdateProduct = () => {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  
  const getProductData = async () => {
    const res = await axios.get(`${backUrl}/api/products/get-product/${id}`);
    if (res.data.success) {
      setProduct(res.data.data);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  
  const handleUpdate = async () => {
    const form = new FormData();

    form.append("name", product.name);
    form.append("category", product.category);
    form.append("description", product.description);
    form.append("brandName", product.brandName || "");
    form.append("price", product.price || "");
    form.append("sellingPrice", product.sellingPrice);
    form.append("size", product.size || "");
    form.append("weight", product.weight || "");

    if (newImages.length > 0) {
      newImages.forEach((file) => form.append("images", file));
    }

    const res = await axios.put(
      `${backUrl}/api/products/update-product/${id}`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.success) alert("Product updated!");
  };

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-8 shadow-lg rounded-xl border">
      <h2 className="text-3xl font-bold mb-6">Update Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

       
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            className="border p-2 rounded w-full"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

 
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            className="border p-2 rounded w-full"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Brand Name</label>
          <input
            className="border p-2 rounded w-full"
            value={product.brandName || ""}
            onChange={(e) =>
              setProduct({ ...product, brandName: e.target.value })
            }
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Original Price</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={product.price || ""}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Selling Price</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={product.sellingPrice}
            onChange={(e) =>
              setProduct({ ...product, sellingPrice: e.target.value })
            }
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Size</label>
          <input
            className="border p-2 rounded w-full"
            value={product.size || ""}
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
          />
        </div>

      
        <div>
          <label className="block font-semibold mb-1">Weight</label>
          <input
            className="border p-2 rounded w-full"
            value={product.weight || ""}
            onChange={(e) =>
              setProduct({ ...product, weight: e.target.value })
            }
          />
        </div>

      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="border p-3 rounded w-full"
          rows={4}
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>

      {/* fetch existing images */}
      <div className="mt-6">
        <label className="block font-semibold mb-2">Existing Images</label>
        <div className="flex flex-wrap gap-3">
          {product.images?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="product image"
              width={100}
              height={100}
              className="w-24 h-24 rounded object-cover border shadow"
            />
          ))}
        </div>
      </div>

    
      <div className="mt-6">
        <label className="block font-semibold mb-1">Upload New Images</label>
        <input
          type="file"
          multiple
          className="border p-2 rounded w-full"
          onChange={(e) => setNewImages([...e.target.files])}
        />
      </div>

     
      <button
        onClick={handleUpdate}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
