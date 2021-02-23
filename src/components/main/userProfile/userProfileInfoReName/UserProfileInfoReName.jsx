import React, { Component } from "react";
import "./UserProfileInfoReName.sass";
import axios from "axios";
import { connect } from "react-redux";

import { fetchUserFullName } from "../../../../redux/actions/actionUserFullName";

class UserProfileInfoReName extends Component {
  state = {
    newUserState: {
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      gender: this.props.currentUser.gender,
      city: this.props.currentUser.city,
      birthday: this.props.currentUser.birthday,
      birthday_day: this.props.currentUser.birthday
        ? this.props.currentUser.birthday.substr(8, 2)
        : "",
      birthday_month: this.props.currentUser.birthday
        ? this.props.currentUser.birthday.substr(5, 2)
        : "",
      birthday_year: this.props.currentUser.birthday
        ? this.props.currentUser.birthday.substr(0, 4)
        : "",
    },
  };

  checkGender = (e) => {
    e.persist();
    this.setState((prevState) => ({
      newUserState: {
        ...prevState.newUserState,
        gender: e.target.id,
      },
    }));
  };

  handleSetEditing(status) {
    this.props.setEditing(status);
  }

  handleInput = (e) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      newUserState: {
        ...prevState.newUserState,
        [name]: value,
      },
    }));
  };

  commitUserInfo = () => {
    const {
      first_name,
      last_name,
      email,
      gender,
      city,
      birthday_day,
      birthday_month,
      birthday_year,
    } = this.state.newUserState;
    const { getUserInfo } = this.props;
    const birthday =
      birthday_year && birthday_month && birthday_day
        ? birthday_year + "-" + birthday_month + "-" + birthday_day
        : "";

    const token = localStorage.getItem("token");

    const newData = {};

    if (first_name && first_name !== this.props.currentUser.first_name)
      newData.first_name = first_name;
    if (last_name && last_name !== this.props.currentUser.last_name)
      newData.last_name = last_name;
    if (email && email !== this.props.currentUser.email) newData.email = email;
    if (gender && gender !== this.props.currentUser.gender)
      newData.gender = gender;
    if (city && city !== this.props.currentUser.city) newData.city = city;
    if (birthday && birthday !== this.props.currentUser.birthday)
      newData.birthday = birthday;

    Object.keys(newData).length
      ? axios
          .post("http://api.memory-lane.ml/db/setAccount", newData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.result) {
              // res.status === 200
              this.handleSetEditing(false);
              getUserInfo();
            } else {
              // res.status !== 200
              console.error(res.data.error);
              alert(`${res.data.error}`);
            }
          })
          .catch((error) => console.error(error))
      : this.handleSetEditing(false);
  };

  render() {
    return (
      <div className="UserProfileInfoReName__form">
        <div className="UserProfileInfoReName__form-item">
          <label htmlFor="UserProfileInfoReName__form-name">Имя: </label>
          <input
            id="UserProfileInfoReName__form-name"
            type="text"
            name="first_name"
            placeholder="Иван"
            value={this.state.newUserState.first_name}
            onChange={this.handleInput}
          />
        </div>
        <div className="UserProfileInfoReName__form-item">
          <label htmlFor="UserProfileInfoReName__form-Username">
            {" "}
            Фамилия:{" "}
          </label>
          <input
            id="UserProfileInfoReName__form-Username"
            type="text"
            name="last_name"
            placeholder="Иванов"
            value={this.state.newUserState.last_name ?? ""}
            onChange={this.handleInput}
          />
        </div>
        <div className=" UserProfileInfoReName__form-item UserProfileInfoReName__form-date">
          <label>Дата рождения: </label>
          <div className="UserProfileInfoReName__form-groups">
            <div>
              <label>
                <input
                  type="text"
                  placeholder="дд"
                  name="birthday_day"
                  size="1"
                  maxLength="2"
                  value={this.state.newUserState.birthday_day ?? ""}
                  onChange={this.handleInput}
                />
                <span />
              </label>
            </div>
            <div>
              <label>
                <input
                  type="text"
                  placeholder="мм"
                  name="birthday_month"
                  size="1"
                  maxLength="2"
                  value={this.state.newUserState.birthday_month ?? ""}
                  onChange={this.handleInput}
                />
                <span />
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="гггг"
                name="birthday_year"
                size="3"
                maxLength="4"
                value={this.state.newUserState.birthday_year ?? ""}
                onChange={this.handleInput}
              />
            </div>
          </div>
        </div>
        <div className="UserProfileInfoReName__form-item">
          <label htmlFor="UserProfileInfoReName__form-city"> Город:</label>
          <input
            id="UserProfileInfoReName__form-city"
            type="text"
            name="city"
            placeholder="Санкт-Петербург"
            value={this.state.newUserState.city}
            onChange={this.handleInput}
          />
        </div>
        <div className="UserProfileInfoReName__form-item">
          <label htmlFor="UserProfileInfoReName__form-email">
            {" "}
            Эл. почта:{" "}
          </label>
          <input
            id="UserProfileInfoReName__form-email"
            type="email"
            name="email"
            value={this.state.newUserState.email}
            onChange={this.handleInput}
          />
        </div>
        <div className="UserProfileInfoReName__form-item">
          <div> Пол:</div>
          <div className="UserProfileInfoReName__form-gender">
            <label className="UserProfileInfoReName__checkbox">
              <span className="UserProfileInfoReName__checkbox-text">
                {" "}
                мужской{" "}
              </span>
              <input
                id="male"
                type="radio"
                checked={this.state.newUserState.gender === "male"}
                onChange={this.checkGender}
              />
            </label>
            <label className="UserProfileInfoReName__checkbox">
              <span className="UserProfileInfoReName__checkbox-text">
                {" "}
                женский{" "}
              </span>
              <input
                id="female"
                type="radio"
                checked={this.state.newUserState.gender === "female"}
                onChange={this.checkGender}
              />
            </label>
            <label className="UserProfileInfoReName__checkbox">
              <span className="UserProfileInfoReName__checkbox-text">
                {" "}
                не указан{" "}
              </span>
              <input
                id="none"
                type="radio"
                checked={this.state.newUserState.gender === "none"}
                onChange={this.checkGender}
              />
            </label>
          </div>
        </div>
        <button
          className="UserProfileInfoReName__form-btn"
          onClick={this.commitUserInfo}
        >
          <span>Сохранить</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(fetchUserFullName());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileInfoReName);
