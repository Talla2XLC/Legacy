import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "./UserFormStyle.sass";
import { ButtonContainer } from "../generalUi/Button";

import RegistrationModal from "./UserRegistrationModal";

import { ReactComponent as FormVK } from "../../../assets/Images/forms/form_vk.svg";
import { ReactComponent as FormFB } from "../../../assets/Images/forms/form_fb.svg";
import { ReactComponent as FormG } from "../../../assets/Images/forms/form_g.svg";
import { ReactComponent as FormIns } from "../../../assets/Images/forms/form_ins.svg";
import { ReactComponent as EyeClosed } from "../../../assets/Images/forms/eye_closed.svg";
import { ReactComponent as EyeOpen } from "../../../assets/Images/forms/eye_open.svg";

import axios from "axios";

export default class UserRegistration extends Component {
  state = {
    email: "",
    password: "",
    openEye: false,
    formErrors: {
      email: "",
      password: {
        message1: "",
        message2: "",
        message3: "",
      },
    },
    formErrorStyle: {
      email: "",
      password: {
        messageStatus1: "",
        messageStatus2: "",
        messageStatus3: "",
        inputStatus: "",
      },
    },
    emailValid: false,
    passwordValid: false,
    formValid: false,
    isOpen: false,
    modalOpened: false,
    hasRegistred: false,
  };

  handleInput = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      this.handleValidateField(name, value);
    });
  };

  handleValidateField = (fieldName, value) => {
    let { emailValid, passwordValid } = this.state;
    const fieldValidationErrors = this.state.formErrors;
    const fieldErrorStyle = this.state.formErrorStyle;

    const isMax = value.length >= 8;
    const isCapital = value.match(/(?=.*?[A-Z])/);
    const oneDigit = value.match(/(?=.*?[0-9])/);

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "Неверно введён email";

        if (emailValid) {
          fieldErrorStyle.email = "";
        }

        break;

      case "password":
        passwordValid = false;

        isMax
          ? (fieldErrorStyle.password.messageStatus1 = "text_color_green")
          : (fieldErrorStyle.password.messageStatus1 = "");
        isCapital
          ? (fieldErrorStyle.password.messageStatus2 = "text_color_green")
          : (fieldErrorStyle.password.messageStatus2 = "");
        oneDigit
          ? (fieldErrorStyle.password.messageStatus3 = "text_color_green")
          : (fieldErrorStyle.password.messageStatus3 = "");

        if (isMax && isCapital && oneDigit) {
          fieldErrorStyle.password.inputStatus = "";
          passwordValid = true;
        }

        break;

      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        formErrorStyle: fieldErrorStyle,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  };

  clickValidateField = (name) => {
    const { email, password } = this.state;
    let { emailValid, passwordValid } = this.state;
    const fieldValidationErrors = this.state.formErrors;
    const fieldErrorStyle = this.state.formErrorStyle;
    const isMax = name.length >= 8;
    const isCapital = name.match(/(?=.*?[A-Z])/);
    const oneDigit = name.match(/(?=.*?[0-9])/);

    if (name === email) {
      emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (emailValid) {
        fieldErrorStyle.email = "";
        return true;
      }
      fieldErrorStyle.email = "status_error";

      this.setState(
        {
          formErrorStyle: fieldErrorStyle,
          emailValid: emailValid,
        },
        this.validateForm
      );
    }

    if (name === password) {
      passwordValid = false;

      if (!isMax) {
        fieldErrorStyle.password.messageStatus1 = "text_color_error";
        fieldErrorStyle.password.inputStatus = "status_error";
      }
      if (!isCapital) {
        fieldErrorStyle.password.messageStatus2 = "text_color_error";
        fieldErrorStyle.password.inputStatus = "status_error";
      }
      if (!oneDigit) {
        fieldErrorStyle.password.messageStatus3 = "text_color_error";
        fieldErrorStyle.password.inputStatus = "status_error";
      }

      this.setState(
        {
          formErrors: fieldValidationErrors,
          formErrorStyle: fieldErrorStyle,
          passwordValid: passwordValid,
        },
        this.validateForm
      );

      if (isMax && isCapital && oneDigit) {
        passwordValid = true;
        return true;
      } else return false;
    }
  };

  validateForm = () => {
    const { emailValid, passwordValid } = this.state;

    this.setState({ formValid: emailValid && passwordValid });
  };

  handleCancel = () =>
    this.setState({ modalOpened: false, hasRegistred: true });

  registerUser = (e) => {
    const { email, password } = this.state;
    const isEmailValid = this.clickValidateField(email);
    const isPasswordValid = this.clickValidateField(password);

    if (isEmailValid && isPasswordValid) {
      axios
        .post(
          "http://api.memory-lane.ml/user/registration",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.result) {
            // res.status === 200
            this.setState({ modalOpened: true });
          } else {
            // res.status !== 200
            // console.error(res.data.error);
            console.error(res.data);
            console.error(res);
          }
        })
        .catch((error) => console.error(error));
    }
    e.preventDefault();
  };

  render() {
    const {
      email,
      password,
      formErrorStyle,
      modalOpened,
      hasRegistred,
      openEye,
    } = this.state;

    if (hasRegistred) return <Redirect from="/register/" to="/auth" />;

    return (
      <div className="container-form">
        <div className="formWrapper">
          <div className="formWrapperItem__titleContainer">
            <h2 className="titleContainerItem__title">Регистрация</h2>
          </div>

          <div className="formContainerItem__icons">
            <div className="container__icons">
              <a className="socials-icon" href="https://vk.com/">
                <FormVK />
              </a>
              <a className="socials-icon" href="https://www.instagram.com/">
                <FormIns />
              </a>
              <a className="socials-icon" href="https://ru-ru.facebook.com/">
                <FormFB />
              </a>
              <a className="socials-icon" href="https://www.google.com/">
                <FormG />
              </a>
            </div>
            <div className="formContainerItem__message">
              Присоединиться через соц. сети
            </div>
          </div>

          <div className="form-or">
            <hr />
            или
            <hr />
          </div>

          <fieldset className="formContainerItem__form">
            <div>
              <label>Эл. почта</label>
              <input
                className={formErrorStyle.email}
                name="email"
                type="email"
                placeholder="Введите электронную почту"
                value={email}
                onChange={this.handleInput}
                required
              />
            </div>

            <div className="form-password">
              <label>Пароль</label>
              <input
                id="password"
                className={formErrorStyle.password.inputStatus}
                name="password"
                type={openEye ? "text" : "password"}
                placeholder="Придумайте пароль"
                onChange={this.handleInput}
                value={password}
                autoComplete="current-password"
                required
              />
              <button
                className="btn-show_closed"
                onClick={() => this.setState({ openEye: !openEye })}
              >
                {openEye ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>

            <ul className="c-validation-message">
              <li
                className={
                  "validation-message__text " +
                  formErrorStyle.password.messageStatus1
                }
              >
                Ваш пароль должен быть от 8 символов длиной
              </li>
              <li
                className={
                  "validation-message__text " +
                  formErrorStyle.password.messageStatus2
                }
              >
                Пароль должен содержать минимум одну заглавную букву
              </li>
              <li
                className={
                  "validation-message__text " +
                  formErrorStyle.password.messageStatus3
                }
              >
                Пароль должен содержать минимум одну цифру
              </li>
            </ul>

            <ButtonContainer
              className="btn-registry"
              type="submit"
              onClick={this.registerUser}
            >
              Зарегистрироваться
            </ButtonContainer>

            <div className="c-privacy-agreement">
              <span>
                Нажимая на кнопку, Вы соглашаетесь с политикой
                конфиденциальности
              </span>
            </div>
          </fieldset>
          <div className="c-registration__link">
            <Link className="registration__link" to="/auth">
              Войти в систему
            </Link>
          </div>
          {/* Change messages in modal window according to server response */}
          <RegistrationModal
            title="registration successful"
            modalOpened={modalOpened}
            onCancel={this.handleCancel}
          >
            <h1>Поздравляем!</h1>
            <p>
              Вы почти зарегистрированы в memory-lane!
              <br />
              На почту отправлено письмо для подтверждения e-mail
            </p>
          </RegistrationModal>
        </div>
      </div>
    );
  }
}
