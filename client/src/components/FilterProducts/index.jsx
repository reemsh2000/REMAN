import { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'antd';
import axios from 'axios';

import Categories from './Categories';
import MinPrice from './MinPrice';
import MaxPrice from './MaxPrice';
import RateStars from './RateStars';
import Name from './Name';
import FilterButton from './FilterButton';

import 'antd/dist/antd.min.css';
import './style.css';

import { ControlFilled } from '@ant-design/icons';

const FilterProducts = () => {
  const [filterRequest, setFilterRequest] = useState({});
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const { MaxPrice, MinPrice, Name, Category, Rate } = filterRequest;
    axios.get('http://localhost:5000/products', {
      params: {
        name: Name,
        category : Category,
        maxPrice: MaxPrice,
        minPrice: minPrice,
        rate:Rate
      },
    }).then((response) => {
      response.data.length >= 1 ? 
    })
  }, [filterRequest]);

  const onFinish = (values) => {
    values['MinPrice'] = minPrice;
    values['MaxPrice'] = maxPrice;
    setFilterRequest(values);
  };

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => setIsModalVisible(false);

  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <section className="filter-section">
        <Button
          className="FilterButton"
          icon={<ControlFilled />}
          size="large"
          onClick={showModal}
        >
          Filter
        </Button>
      </section>
      <Modal
        visible={isModalVisible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form onFinish={onFinish}>
          <Name />
          <Categories />
          <MinPrice setMinPrice={setMinPrice} minPrice={minPrice} />
          <MaxPrice
            setMaxPrice={setMaxPrice}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
          <RateStars />
          <FilterButton handleCancel={handleCancel} />
        </Form>
      </Modal>
    </>
  );
};

export default FilterProducts;
