import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constans";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "kerangjangs")
      .then((res) => {
        const kerangjangs = res.data;
        kerangjangs.map(function(item){
            return axios
                .delete(API_URL+"kerangjangs/"+item.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log("Error ya", error);
      });
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/happy.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terima kasih telah memesan !</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
