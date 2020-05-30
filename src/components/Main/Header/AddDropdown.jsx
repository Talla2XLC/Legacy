import React, { Component } from 'react';
import { ReactComponent as IconAddSection } from './svg/addIcon.svg';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {modalOpen} from '../../../actions/modalOpen';

class AddDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  
  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }


  render() {
    return (<>
      <IconAddSection onClick={this.showMenu}/>
      {
        this.state.showMenu
          ? (

            <DropdownList>
              <Link to='/albums/add' className='dropdownLink'> <button className='dropdownButton'>Загрузить фото</button> </Link>
              <span className='dropdownLink'> <button className='dropdownButton' onClick={this.props.openModalAddAlbum}>Создать альбом</button> </span>
              <Link to='/stories/add' className='dropdownLink'> <button className='dropdownButton'>Добавить историю</button> </Link>
              <Link to='/4/4' className='dropdownLink'> <button className='dropdownButton'>Добавить интервью</button> </Link>
              <Link to='/persons/add/' className='dropdownLink'> <button className='dropdownButton'>Добавить персону</button> </Link>
            </DropdownList>
          )
          : null
      }
    </>
    );
  }
}

const DropdownList = styled.div`
position: absolute;
display: flex;
flex-flow: column nowrap;
justify-content: flex-start;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
border-radius: 10px;
padding: 12px;
background: #FFFFFF;
.dropdownLink {
  padding: 5px;
  box-sizing: border-box;
  text-align: left;
}
.dropdownButton {
  padding: 0;
}
.dropdownLink:hover {
  background: #F3F0F0;
}

`;

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalAddAlbum: () => {
      dispatch(modalOpen('addAlbum'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDropdown);
