import React, { useEffect, useRef, useState } from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { FaCheck, FaPlus } from 'react-icons/fa';
import FoodServices from '../../services/FoodServices'; // Change to FoodServices
import Modal from '../../components/Modal';
import Food from './Food'; // Integrate the Food component
import CuisineServices from '../../services/CuisineServices'; // Change to CuisineServices
// import Select from 'react-select';
import UserServices from '../../services/UserServices';
import ToastServices from '../../services/ToastServices';
import { FaXmark } from 'react-icons/fa6';
import FirebaseServices from '../../services/FirebaseServices';
// import EditFood from './EditFood';
// import OrderFood from './OrderFood';
// import OrderServices from '../../services/OrderServices';
// import FoodOrder from './FoodOrder';
// import Order from '../../models/Order';
// import WebSocketService from '../../services/WebSocketService';

export default function Properties() {
  const user = UserServices.getUserFromToken();

  const [foods, setFoods] = useState([]);
  const sortOptions = [
    { label: 'Price', value: 'price' },
    { label: 'Area', value: 'area' },
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const ascSortOptions = [
    { label: 'ASC', value: true },
    { label: 'DESC', value: false },
  ];
  const [ascendingSort, setAscendingSort] = useState(ascSortOptions[0]);
  const [cuisineFilterOptions, setCuisineFilterOptions] = useState([{ label: 'All Cuisines', value: '0' }]);
  const [cuisineOption, setCuisineOption] = useState(cuisineFilterOptions[0]);
  const getFoods = () => {
    FoodServices.getAllFoods()
      .then((data) => setFoods(data));
    CuisineServices.getAllCuisine()
      .then((data) => data.cuisines.map((datum) => ({ label: datum.name, value: datum.id })))
      .then((cuisineArr) => setCuisineFilterOptions(cuisineFilterOptions.concat(cuisineArr)));
  };
  const [orders, setOrders] = useState(null);
  const getOrders = () => {
    if (user.role !== 'ADMIN') {
      OrderServices.getAllOrders()
        .then((data) => data.filter((order) => order.status === 'CREATED'))
        .then((createdOrders) => setOrders(new Order(createdOrders)));
    }
  };
  useEffect(() => {
    if (orders) {
      orders.subscribe(user.id);
      console.log(orders);
    }
  }, [orders]);
  useEffect(() => {
    getFoods();
    if (user.role === 'OWNER') {
      WebSocketService.connect();
      getOrders();
    }
    return () => {
      //WebSocketService.disconnect()
    };
  }, []);
  const [foodCards, setFoodCards] = useState([]);
  const doSort = (x, y) => {
    if (ascendingSort.value) {
      if (x < y) {
        return -1;
      } else if (x > y) {
        return 1;
      }
      return 0;
    }
    if (x < y) {
      return 1;
    } else if (x > y) {
      return -1;
    }
    return 0;
  };
  const sortFoodsByPrice = (list) => list.sort((a, b) => doSort(a.price, b.price));
  const sortFoodsByArea = (list) => list.sort((a, b) => doSort(a.area, b.area));

  useEffect(() => {
    let filteredFood;
    if (cuisineOption.value > 0) {
      filteredFood = foods.filter((food) => food.cuisineId === cuisineOption.value);
    } else {
      filteredFood = foods;
    }
    let sortedFood;
    switch (sortOption.value) {
      case 'price':
        sortedFood = sortFoodsByPrice(filteredFood);
        break;
      case 'area':
        sortedFood = sortFoodsByArea(filteredFood);
        break;
      default:
        break;
    }
    setFoodCards(sortedFood.map((food) => <Food key={food.id} food={food} openModal={toggleModal} role={user.role} />));
  }, [foods, cuisineOption, sortOption, ascendingSort]);
  const [modalBody, setModalBody] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modal, setModal] = useState(false);
  const [foodId, setFoodId] = useState(null);
  const [button1, setButton1] = useState(null);
  const [button2, setButton2] = useState(null);
  const toggleModal = (id, body) => {
    setButton1(<FaXmark />);
    setButton2(<FaCheck />);
    setFoodId(id);
    switch (body) {
      case 'DELETE':
        // setModalBody(<DeleteFood />);
        // setModalTitle('Delete Food');
        // childRef.current = null;
        // break;
      case 'CREATE':
        // setModalBody(<CreateFood ref={childRef} />);
        // setModalTitle('Create Food');
        // break;
      case 'EDIT':
        // setModalBody(<EditFood foodId={id} ref={childRef} />);
        // setModalTitle('Edit Food');
        // break;
      case 'ORDER':
        // setModalBody(<OrderFood foodId={id} ownerId={user.id} ref={childRef} />);
        // setModalTitle('Order Food');
        // break;
      case 'DETAIL': {
        // const foodOrders = orders.getOrders().filter((order) => order.foodId === id);
        // console.log(foodOrders);
        // setModalBody(<FoodOrder removeOrder={removeOrder} orders={foodOrders.reverse()} />);
        // setModalTitle('Order History');
        // setButton1(null);
        // setButton2(null);
        // break;
      }
      default:
        null;
        break;
    }
    setModal(!modal);
  };
  const onHandleSubmit = () => {
    // Create or Update
    if (childRef.current) {
      const formData = childRef.current.handleSubmit();
      if (formData.mode === 'CREATE') {
        FirebaseServices.uploadImage(formData.image, '/food/' + formData.name)
          .then((downloadUrl) => {
            formData.imageUrl = downloadUrl;
            FoodServices.createFood(formData)
              .then((data) => {
                ToastServices.Success('Food Created Successfully!!!');
                setFoods([...foods, data]);
              });
          });
      } else if (formData.mode === 'EDIT') {
        if (formData.image) {
          FirebaseServices.uploadImage(formData.image, '/food/' + formData.name);
        }
        FoodServices.updateFood(foodId, formData)
          .then(() => {
            ToastServices.Success('Food Updated Successfully!');
            setFoods(foods.map((food) => {
              if (food.id === formData.id) {
                return formData;
              }
              return food;
            }));
          });
      } else if (formData.mode === 'ORDER') {
        OrderServices.createOrder(formData)
          .then(() => ToastServices.Success('Food order sent successfully!'));
      }
    } else {
      // Delete
      FoodServices.deleteFood(foodId)
        .then(() => {
          ToastServices.Success('Food Deleted Successfully!');
          const newFoods = foods.filter((food) => food.id !== foodId);
          setFoods(newFoods);
        })
        .catch(() => ToastServices.Error('Internal Server Error!'));
    }
    getFoods();
  };
  const childRef = useRef();

  return (
    <>
      <MDBContainer fluid className="px-5 mx-5">
        <h1>Foods</h1>
        <MDBRow className=" my-3">
          {/* ... (unchanged code) */}
        </MDBRow>
        <MDBRow>
          {(foodCards.length > 0) ? foodCards : <h2>No Food Found!</h2>}
        </MDBRow>
      </MDBContainer>
      <Modal
        scrollable
        title={modalTitle}
        accept={onHandleSubmit}
        body={modalBody}
        modal={modal}
        toggleModal={toggleModal}
        button1={button1}
        button2={button2}
      />
    </>
  );
}