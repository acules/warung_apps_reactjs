import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import { numberWithCommas } from "../utils/utils";

export default class TotalBayar extends Component {
    submitTotalBayar = (TotalBayar) => {
        const pesanan = {
            total_bayar:TotalBayar,
            menus:this.props.keranggjangs
        }
        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')  
        })
    }

  render() {
    const Total = this.props.keranggjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-right mr-9">
                Rp. {numberWithCommas(Total)}
              </strong>
            </h4>
            <Button
              variant="primary"
              block
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.submitTotalBayar(TotalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
