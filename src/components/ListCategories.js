import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUtensils,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mt=2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mt=2" />;
  if (nama === "Camilan")
    return <FontAwesomeIcon icon={faCheese} className="mt=2" />;
  return <FontAwesomeIcon icon={faCoffee} className="mt=2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoryYangDipilih } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Categori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={categoryYangDipilih === category.nama && "active"}
                style={{ cursor: "pointer" }}
              >
                <h6>
                  <Icon nama={category.nama} />
                  &emsp;{category.nama}
                </h6>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
