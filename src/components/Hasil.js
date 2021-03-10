import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }

  handleShow = (menukeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menukeranjang,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { keranggjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranggjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranggjangs.map((menukeranjang) => (
              <ListGroup.Item
                key={menukeranjang.id}
                onClick={() => this.handleShow(menukeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {menukeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menukeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menukeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menukeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

           <ModalKeranjang handleClose={this.handleClose} {...this.state} />

          </ListGroup>
        )}
        <TotalBayar keranggjangs={keranggjangs} {...this.props} />
      </Col>
    );
  }
}
