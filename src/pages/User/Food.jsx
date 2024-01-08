import React, { useEffect, useState, useRef } from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import FoodComponent from '../../components/FoodComponent';
import FoodServices from '../../services/FoodServices';
import UserServices from '../../services/UserServices';
import Modal from '../../components/Modal';
import Select from 'react-select';
import './Food.css'; 
// import ToastServices from '../../services/ToastServices';

function Food({ cuisine }) {
  const user=UserServices.getUserFromToken();

  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foods, setFoods] = useState([]);
  const sortOptions = [
    { label: 'Price', value: 'price' },
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const ascSortOptions = [
    { label: 'ASC', value: true },
    { label: 'DESC', value: false },
  ];
  const [ascendingSort, setAscendingSort] = useState(ascSortOptions[0]);


  useEffect(() => {
    const fetchFoodByCuisine = async () => {
      const response = await FoodServices.getFoodByCuisineId(cuisine.id);
      setFoodItems(response.foods);
    };

    fetchFoodByCuisine();
  }, [cuisine.id]);

  const [modalBody, setModalBody] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modal, setModal] = useState(false);
  const [foodId, setFoodId] = useState(null);
  const [button1, setButton1] = useState(null);
  const [button2, setButton2] = useState(null);
  const childRef = useRef();

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

  const sortFoodsByPrice = (list) => list.slice().sort((a, b) => doSort(a.price, b.price));

  const sortFoodsByArea = (list) => list.slice().sort((a, b) => doSort(a.area, b.area));

  useEffect(() => {
    let sortedFood;
    // let filteredFood;
   

    switch (sortOption.value) {
      case 'price':
        sortedFood = sortFoodsByPrice(foodItems);
        break;

      default:
        break;
    }

    setFoodCards(
      sortedFood.map((food) => (
        <FoodComponent key={food.id} food={food} openModal={toggleModal} role={user.role} />
      ))
    );
  }, [foodItems,sortOption, ascendingSort]);

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
      case 'DETAIL':
        // const foodOrders = orders.getOrders().filter((order) => order.foodId === id);
        // console.log(foodOrders);
        // setModalBody(<FoodOrder removeOrder={removeOrder} orders={foodOrders.reverse()} />);
        // setModalTitle('Order History');
        // setButton1(null);
        // setButton2(null);
        // break;
      default:
        null;
        break;
    }

    setModal(!modal);
  };

  const onHandleSubmit = () => {
    // Implementation of onHandleSubmit function remains the same
  };
  return (
    <>
      <MDBRow className="my-3">
        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-end">
            <Select options={sortOptions} defaultValue={sortOptions[0]} onChange={setSortOption} className="me-3" />
            <Select options={ascSortOptions} defaultValue={ascSortOptions[0]} onChange={setAscendingSort} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-5">
          <MDBCol size="1">
            {user.role === 'Seller' ? (
              <MDBBtn onClick={() => toggleModal(0, 'CREATE')} className="mx-2 py-3 mb-3" color="primary">
                <FaPlus size={18} />
              </MDBBtn>
            ) : (
              <></>
            )}
          </MDBCol>
        </MDBRow>
      </MDBRow>

      <div>
        <h2>{cuisine.cuisineName} Foods</h2>
        <div className="food-card-container-horizontal">{foodCards}</div>
      </div>
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

export default Food;
