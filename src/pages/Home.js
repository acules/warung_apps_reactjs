import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ListCategories, Hasil, Menus } from "../components";
import { API_URL } from "../utils/constans";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan",
      kerangjangs: [],
    };
  }

  componentDidMount() {
    axios
      // .get(API_URL + "products") Menampilkan makanan ALL
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "kerangjangs")
      .then((res) => {
        const kerangjangs = res.data;
        this.setState({ kerangjangs });
      })
      .catch((error) => {
        console.log("Error ya", error);
      });
  }

  // Coding untuk update otomatis ketika terjadi perubahan data
  componentDidUpdate(prevState) {
    if (this.state.kerangjangs !== prevState.kerangjangs) {
      axios
        .get(API_URL + "kerangjangs")
        .then((res) => {
          const kerangjangs = res.data;
          this.setState({ kerangjangs });
        })
        .catch((error) => {
          console.log("Error ya", error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "kerangjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "kerangjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error ya", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "kerangjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error ya", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error ya", error);
      });
  };

  render() {
    const { menus, categoryYangDipilih, kerangjangs } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoryYangDipilih={categoryYangDipilih}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranggjangs={kerangjangs} {...this.props}/>
            </Row>
          </Container>
        </div>
    );
  }
}
