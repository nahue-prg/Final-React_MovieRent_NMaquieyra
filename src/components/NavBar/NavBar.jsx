import React, { useState, useEffect } from "react";
import CartWidget from "../CartWidget/CartWidget.jsx";
import axios from "axios";
import Logo from "../Logo/Logo.jsx";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const toggle = () => setIsOpen(!isOpen);

  /*Obtengo las categorias que va a contener el NavBar */
  const getCategorias = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=af1f89a05a4477a5e6990c32d50ccc1d&language=en-US"
      )
      .then((res) => setCategorias(res.data.genres));
  };

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <div style={{ width: "100%", backgroundColor: "#ffffff00"}} className='bg-dark'>
      <Navbar
        color='dark'
        dark
        expand="lg"
        sticky="true"
        className={`sticky-top ${styles.menuSuperior}`}
        
        style={{ maxWidth: 1300, margin: "auto" }}
      >
        <NavbarToggler onClick={toggle} className={styles.TogglerMobile} />
        <NavbarBrand href="#" className="align-middle">
          <Logo dark={false}></Logo>
        </NavbarBrand>
        <NavItem className={styles.CartMobile}>
          <CartWidget/>
        </NavItem>
        <NavbarToggler onClick={toggle} className={styles.ToglerDesktop} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Categorias
              </DropdownToggle>
              <DropdownMenu center dark>
                  <Link
                    to={`/Peliculas`}
                    style={{ textDecoration: "none", color: "#ccc" }}
                    key={'000001'}
                  >
                    <DropdownItem>Todas</DropdownItem>
                  </Link>
                {categorias.map((categoria) => (
                  <Link
                    to={`/categoria/${categoria.id}`}
                    style={{ textDecoration: "none", color: "#ccc" }}
                    key={categoria.id}
                  >
                    <DropdownItem>{categoria.name}</DropdownItem>
                  </Link>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
            <Link to="/Pagar" style={{ textDecoration: "none", color: "#ccc" }}><NavLink >Comprar</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/Pedidos" style={{ textDecoration: "none", color: "#ccc" }}><NavLink >Mis pedidos</NavLink></Link>
            </NavItem>
          </Nav>
        </Collapse>
        <NavItem className={styles.CartDesktop}>
          <CartWidget number={3} />
        </NavItem>
      </Navbar>
    </div>
  );
}

export default NavBar;
