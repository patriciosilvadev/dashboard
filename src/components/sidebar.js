import React, { Component } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeColorMenu } from "../actions/actionsCommon";

import menu from "./menu/menu.json";
import CardInfoMenuUser from "./utils/CardInfoMenuUser";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: "menu",
      menuOpened: ""
    }
  }

  componentDidMount() {
    this.activeMenuDropdown(location.pathname.split("/")[1]);
  }

  _changeTab(tab) {
    this.setState({
      tabActive: tab
    })

  }
  
  activeMenuDropdown(menu) {
    this.setState({
      menuOpened: menu
    })
    
  }

  renderMenu() {
    return (
        <div className={this.state.tabActive == "menu" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            {menu.sidebar.map((opt, index) => {
              return (
                <li key={index} onClick={(evt) => {evt.preventDefault();this.props.changeColorMenu(opt.color)}}>
                  <Link to={opt.link} onClick={() => this.activeMenuDropdown(opt.label.toLowerCase())} activeStyle={{backgroundColor: "rgba(0,0,0,0.06)"}}>
                    {this.props.activedMenu ?
                      <img src={opt.image} className="sub-icon" alt={opt.alt}/>
                    : ""}
                    {opt.label}
                    {!this.props.activedMenu ?
                      <img src={opt.image} className="sub-icon sub-icon-open-menu" alt={opt.alt}/>
                    : ""}
                  </Link>
                  <ul className={this.state.menuOpened == opt.label.toLowerCase() && this.props.activedMenu ? "sidebar-item-dropdown" : "display-none"}>
                    {opt.subItems.map((subOpt, j) => {
                      return (
                        <Link to={subOpt.link} key={j} activeStyle={{fontWeight: "bold"}}>
                          <li>{subOpt.label}</li>
                        </Link>
                      )
                    })}                    
                  </ul>
                </li> 
              )
            })}
                          
          </ul>
        </div>
    )
  }

  renderChat() {
    return (
        <div className={this.state.tabActive == "chat" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li className="sidebar-items">Online</li>
            <li><Link to="/chat" >Jessica<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
            <li><Link to="/chat">Roberta<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
            <li><Link to="/chat">Nayara<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
            
            <li className="sidebar-items">Offline</li>
            <li><Link to="/chat">Bruna<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
          </ul>
        </div>
    )
  }

  renderStats() {
    return (
        <div className={this.state.tabActive == "stats" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li className="sidebar-items">Gráficos</li>
            <li><Link to="/dashboard">Dashboard<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
          </ul>
        </div>
    )
  }

  render() {
      return (      
          <aside>            
            {this.props.activedMenu ? (
                <div>
                  <CardInfoMenuUser />
                  <div className="nav nav-tabs">
                    <li className={this.state.tabActive == "menu" ? "active" : ""} onClick={() => this._changeTab("menu")}>
                      <a href="#menu">
                        <i className="fa fa-picture-o" />
                      </a>
                    </li>

                    <li className={this.state.tabActive == "chat" ? "active" : ""} onClick={() => this._changeTab("chat")}>
                      <a href="#chat">
                        <i className="fa fa-comments-o" />
                      </a>
                    </li>

                    <li className={this.state.tabActive == "stats" ? "active" : ""} onClick={() => this._changeTab("stats")}>
                      <a href="#stats">
                        <i className="fa fa-line-chart" />
                      </a>
                    </li>
                  </div>
                </div>
              ) : ""}

            <div className="tab-content">
              {this.renderMenu()}
              {this.renderChat()}
              {this.renderStats()}
            </div>
          </aside>
      )

  }
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			changeColorMenu
		},
		dispatch);
}

export default connect(null, mapDispatchToProps)(Sidebar);