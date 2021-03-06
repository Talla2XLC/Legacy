import React, { Component } from 'react';
import styled from 'styled-components';
import DropdownView from './DropdownView';
import DropdownAction from "../dropdownAction/DropdownAction";
import {ReactComponent as Arrow} from '../../../../assets/Images/sorting/arrow.svg';
import {ReactComponent as Plus} from '../../../../assets/Images/general/plus.svg';
import {connect} from 'react-redux';
import {modalOpen} from '../../../../redux/actions/modalOpen';
import { Link } from  'react-router-dom';
class Sorting extends Component {
  render() {
    const { currentPage, openModalAddAlbum, setGridType, performAction } = this.props;

    const alphabet =
      <div className='sortingItem'>По алфавиту
        <Arrow className='arrow'/>
      </div>;

    const date =
      <div className='sortingItem'>По дате
        <Arrow className='arrow'/>
      </div>;

    const fullness =
      <div className='sortingItem'>По заполненности
        <Arrow className='arrow'/>
      </div>;

    const person =
      <div className='sortingItem'>По человеку
        <Arrow className='arrow'/>
      </div>;

    const addAlbum =
    <button className='sortingBtn' onClick={ openModalAddAlbum }>
      <span className='createAlbum'>Cоздать альбом</span>
      <Plus className='plus'/>
    </button>;
    
    const addPerson =
    <Link to='/addperson'>
      <span className='createPerson'>Cоздать персону</span>
      <Plus className='plus'/>
    </Link>;

    const fetchSorting = page => {
      switch (page) {
        case 'allAlbums':
          return <SortingContainer>
            <div className='left-sorting'>
              {alphabet}
              {date}
              {fullness}
            </div>
            <div className='right-sorting-album'>
              <DropdownView currentPage={page} setGridType={setGridType}/>
              {addAlbum}
            </div>
          </SortingContainer>;
        case 'album':
          return <SortingContainer>
            <div className='left-sorting'>
              {date}
              {person}
            </div>
            <div className='right-sorting-album'>
              <DropdownAction currentPage={page} performAction={performAction} />
              <DropdownView currentPage={page} setGridType={setGridType} />
            </div>
          </SortingContainer>;
        case 'persons':
          return <SortingContainer>
            <div className='left-sorting'>
              {alphabet}
              {date}
              {fullness}
            </div>
            <div className='right-sorting-album'>
              <DropdownView currentPage={page} setGridType={setGridType}/>
              {addPerson}
            </div>
          </SortingContainer>;
        case 'stories':
          return <SortingContainer>
            <div className='left-sorting'>
              {date}
              {person}
            </div>
            <div className='right-sorting-stories'>
              <Link to={'add'}>
                Создать историю
              </Link>
              <Link to={'add'} >
                <Plus className='right-sorting-stories-plus'/>
              </Link>
            </div>
          </SortingContainer>;
        case 'search':
          return <SortingContainer>
            <div className='left-sorting'>
              {alphabet}
              {/* {date}
              {fullness} */}
            </div>
            <div className='right-sorting-album'>
              <DropdownView currentPage={page} setGridType={setGridType}/>
            </div>
          </SortingContainer>;

        default:
          return '';
      }
    };

    return (
      fetchSorting(currentPage)
    );
  }
}

export const SortingContainer = styled.div`
height: 76px;
// z-index: 1;
width: 100%;
position:sticky;
top: 0;
display: flex;
flex-flow: row nowrap;
align-items: center;
background: #F6F6F6;


.left-sorting {
  display: flex;
  flex-flow: row nowrap;
}

.sortingItem {
  margin-right: 20px;
  cursor: pointer;
}

.right-sorting-album {
  display: flex;

  flex-flow: row nowrap;
  margin-left: auto;
}
.right-sorting-stories {
  display: flex;
  
  flex-flow: row nowrap;
  margin-left: auto;
}
.right-sorting-stories > a:first-child {
  color: #3B3E3C;
  margin-right: 12px; 
}

.arrow {
  margin-left: 4px;
}

.createAlbum {
  margin-left: 12px;
}

.sortingBtn {
  color: #3B3E3C;
  background: none;
  border: none;  
  &:focus {
    outline: none;
  }
  &:hover .plus > path{
    fill: #2795FB;
  }
  &:active .plus{
    transform: rotate(45deg);
    > path{
      fill: #278147;
    }
  }
}
.plus {
  margin-left: 12px;
}

.createPerson {
  color: #3B3E3C;
}
`;

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
