import React, { useEffect, useState } from "react";
import AddRestaurantModal from "./modals/addResturantModal";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../../config/api";
import toast from "react-hot-toast";

const dummyData = [
  {
    resturantName: "Spice Villa",
    address: "123 MG Road, Bangalore, Karnataka, India",
    lat: "12.9716",
    lon: "77.5946",
    cuisine: "North Indian, Chinese",
    foodType: "veg",
    managerName: "Ravi Kumar",
    managerPhone: "9876543210",
    managerImage: "https://example.com/images/manager1.jpg",
    receptionPhone: "9876501234",
    email: "contact@spicevilla.in",
    images: [
      "https://example.com/images/spicevilla_front.jpg",
      "https://example.com/images/spicevilla_inside.jpg",
      "https://example.com/images/spicevilla_food.jpg",
    ],
    status: "active",
    openingTime: "10:00 AM",
    closingTime: "11:00 PM",
    averageCostForTwo: 800,
    openingStatus: "open",
    resturantType: "dine-in",
    GSTNo: "29ABCDE1234F1Z5",
    FSSAINo: "21518034001234",
    upiId: "spicevilla@upi",
    bankAccNumber: "123456789012",
    ifscCode: "SBIN0001234",
  },
  {
    resturantName: "Coastal Flavours",
    address: "45 Beach Road, Chennai, Tamil Nadu, India",
    lat: "13.0827",
    lon: "80.2707",
    cuisine: "Seafood, South Indian",
    foodType: "non-veg",
    managerName: "Priya Sharma",
    managerPhone: "9876598765",
    managerImage: "https://example.com/images/manager2.jpg",
    receptionPhone: "9876598777",
    email: "info@coastalflavours.in",
    images: [
      "https://example.com/images/coastalflavours_front.jpg",
      "https://example.com/images/coastalflavours_dish.jpg",
      "https://example.com/images/coastalflavours_inside.jpg",
    ],
    status: "inactive",
    openingTime: "11:00 AM",
    closingTime: "10:00 PM",
    averageCostForTwo: 1200,
    openingStatus: "open",
    resturantType: "all",
    GSTNo: "33FGHIJ5678L2Z3",
    FSSAINo: "21518034005678",
    upiId: "coastalflavours@upi",
    bankAccNumber: "987654321098",
    ifscCode: "HDFC0005678",
  },
];

const ManageResturants = () => {
  const [isAddResturantModalOpen, setIsAddResturantModalOpen] = useState(false);
  const [resturants, setResturants] = useState([]);

  const fetchResturants = async () => {
    try {
      const response = await api.get("/admin/getallresturants");
      toast.success(response.data.message);
      setResturants(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
      setResturants(dummyData); // Fallback to dummy data on error
    }
  };
  useEffect(() => {
    if (!isAddResturantModalOpen) fetchResturants();
  }, [isAddResturantModalOpen]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Restaurants</h1>
        <button
          className="btn btn-primary px-4 py-2 rounded"
          onClick={() => setIsAddResturantModalOpen(true)}
        >
          Add New Restaurant
        </button>
      </div>
      <div className="border-base-content/25 w-full overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Manager Name</th>
              <th>Manager Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {resturants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.resturantName}</td>
                <td>{restaurant.managerName}</td>
                <td>{restaurant.managerPhone}</td>
                <td>{restaurant.email}</td>
                <td>
                  <span
                    className={`badge badge-lg ${
                      restaurant.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {restaurant.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-info mr-2">
                    <FaEye />
                  </button>
                  <button className="btn btn-sm btn-warning mr-2">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-error">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddRestaurantModal
        isOpen={isAddResturantModalOpen}
        onClose={() => setIsAddResturantModalOpen(false)}
      />
    </>
  );
};

export default ManageResturants;
