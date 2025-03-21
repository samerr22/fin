import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaMoneyBillWave, FaClipboardList, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

export default function EUpdate() {

    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
   
    const navigate = useNavigate();

    
    

      const { encomid } = useParams();
  

   

 
  
  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:3000/api/expenses/eget?upId=${encomid}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.find(
            (course) => course._id === encomid
          );
          console.log(selectedE)
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [encomid]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await fetch(`http://localhost:3000/api/expenses/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("sucsses ")
        navigate("");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };


 
 


 

  return (
      <div className="relative w-full h-[800px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
         {/* Overlay for better text visibility */}
         <div className="absolute inset-0 bg-black opacity-60"></div>
     
         <div className="relative z-10 flex items-center justify-center h-full">
             <div className="flex flex-col items-center w-full max-w-md mt-20 space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg opacity-90">
                 <h1 className="text-3xl font-bold text-center text-white">Update Expence</h1>
                 <Link to={`/etable`} className="text-md text-gray-400 hover:text-blue-400 underline">
                     Back
                 </Link>
                 {publishError && <p className="text-red-500 text-sm">{publishError}</p>}
                 <form onSubmit={handleSubmit} className="w-full space-y-4">
                     <div className="flex items-center space-x-2">
                         <FaMoneyBillWave className="text-gray-400" />
                         <input
                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                             type="number"
                             placeholder="Amount"
                             id="amount"
                             onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                             value={formData.amount}
                         />
                     </div>
                    
                     
                     <div className="flex items-center space-x-2">
                         <FaCalendarAlt className="text-gray-400" />
                         <input
                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                             type="date"
                             placeholder="DateSpent"
                             id="dateSpent"
                             onChange={(e) => setFormData({ ...formData, dateSpent: e.target.value })}
                            value={formData.dateSpent}
                         />
                     </div>
                     <div className="flex items-center space-x-2">
                         <FaFileAlt className="text-gray-400" />
                         <select
                             name="category"
                             id="category"
                             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                             value={formData.category}
                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                             required
                         >
                             <option value="" disabled>Category</option>
                             <option value="">select</option>
                             <option value="Salary">Salary</option>
                             <option value="Other">Other</option>
                         </select>
                     </div>
     
                     <div className="flex items-center space-x-2">
                         <FaFileAlt className="text-gray-400" />
                         <select
                             name="paymentMethod"
                             id="paymentMethod"
                             onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                             value={formData.paymentMethod}
                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                             required
                         >
                             <option value="" disabled>paymentMethod</option>
                             <option value="">select</option>
                             <option value="Cash">Cash</option>
                             <option value="Credit Card">Credit Card</option>
                             <option value="Debit Card">Debit Card</option>
                             <option value="Bank Transfer">Bank Transfer</option>
                         </select>
                     </div>
                     <div>
                         <textarea
                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                             placeholder="Notes"
                             id="notes"
                             onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                             value={formData.notes}
                             rows="4"
                         />
                     </div>
     
                   
                     <button
                         type="submit"
                         className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                         Submit
                     </button>
                 </form>
             </div>
         </div>
     </div>
  )
}
