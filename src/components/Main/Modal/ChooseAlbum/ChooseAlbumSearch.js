import React, { Component } from 'react';
import { ReactComponent as IconSearch } from './svg/searchIcon.svg';
import { ReactComponent as FilterSearch } from './svg/searchIcon.svg';
import styled from 'styled-components';

import './ChooseAlbumSearch.sass';

export default class ChooseAlbumSearch extends Component {

  render() {
    return (
      <>
        <div className='search'>
          <button className='search__submit'>
            <IconSearch />
          </button>
          <input
            className='search__input'
            type='search'
            placeholder='Поиск альбомов'
          />
          {/* <button className='search__filter'>
            <FilterSearch />
          </button> */}
        </div>
      </>
    );
  };
}
