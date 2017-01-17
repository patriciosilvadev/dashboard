import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Nav, NavItem, NavDropdown, MenuItem, Navbar, Header, Collapse} from "react-bootstrap"

import { logoTopo } from "../constants/imagensAssertiva";
import { logOut } from "../actions/index";


class MenuSuperior extends Component {

  render() {
      return (
		<Navbar style={{backgroundColor:"#5B3494"}} inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<img src="../../public/assertiva/assertiva-top-index-inverse.png" alt="Assertiva" />
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>
					<NavDropdown title="Relatórios" id="basic-nav-dropdown">
						<MenuItem>
							<Link to="/editar">Consultas</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">Venda+</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">Base Certa</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">SMS</Link>
						</MenuItem>
						<MenuItem divider />
						<MenuItem>
							<Link to="/editar">Outros</Link>
						</MenuItem>
					</NavDropdown>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<MenuItem>
							<Link to="/editar">Ajuda</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">Atualizar dados</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">Contato</Link>
						</MenuItem>
						<MenuItem divider />
						<MenuItem>
							<Link to="/login" onClick={this.props.logOut}>Sair</Link>
						</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
      )
  }
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { logOut })(MenuSuperior);
