

import * as data from "../helpers/default_dataA.json"
import * as main_page from "../locators/main_page.json"
import * as dashboard from "../locators/dashboadr.json" 

describe ('Покемоны большой тест ', function () {
  
             it('Позитивная прорверка авторизации', function () {
                 cy.visit('/');//Захожу на сайт
                cy.get(main_page.Login).type(data.login);// В поле логин ввожу корректный логин
                cy.get(main_page.Password).type(data.password);//В поле пароль ввожу корректный пароль
                cy.get(main_page.Enter_button).click();// Нажимаю на кнопку "войти", 
                cy.get('.header__btn_active').visit ('https://pokemonbattle.ru/'); // Проверяю, что после авторизации попадаю на страницу покемонов
        })
            it ('Негативная прорверка авторизации', function () {
                 cy.visit('/');//Захожу на сайт
                 cy.get(main_page.Login).type(data.login);// В поле логин ввожу корректный логин
                 cy.get(main_page.Password).type('Alena111');//В поле пароль ввожу некорректный  пароль
                 cy.get(main_page.Enter_button).click();// Нажимаю на кнопку "войти"
                 cy.get(':nth-child(2) > .auth__error').contains('Неверные логин или пароль'); // Проверяю, что в ответ получаю сообщение 
            })
            it ('Проверка валидации', function () {
                cy.visit('/');//Захожу на сайт
                cy.get(main_page.Login).type('trubitsyna.alenamail.ru');// В поле логин ввожу  логин без @
                cy.get(main_page.Password).type(data.password);//В поле пароль ввожу корректный пароль
                cy.get(main_page.Enter_button).click();// Нажимаю на кнопку "войти", 
                cy.get(':nth-child(1) > .auth__error').contains('Введите почту');//Проверяю, что валидация некорректнa
            })
            it ('Проверка перехода на страницу тренеров', function () {
                cy.visit('/');//Захожу на сайт
                cy.get(':nth-child(1) > .auth__input').type(data.login);// В поле логин ввожу корректный логин 
                cy.get('#password').type(data.password);//В поле пароль ввожу корректный пароль
                cy.get('.auth__button').click();// Нажимаю на кнопку "войти", 
                cy.get('.header__container > .header__id').visit('https://pokemonbattle.ru/trainer/7408');//Проверяю, что опция перехода на id тренера работает 
                cy.get(dashboard.trainer_page_button).click().visit('https://pokemonbattle.ru/trainer/7408');// Перехожу на страницу тренера
            })
            it ('Позитивная проверка покупки автара', function () { 
                
                cy.visit('/');//Захожу на сайт
                cy.get(main_page.Login).type(data.login);// В поле логин ввожу корректный логин 
                cy.get(main_page.Password).type(data.password);//В поле пароль ввожу корректный пароль
                cy.get(main_page.Enter_button).click();// Нажимаю на кнопку "войти", 
                cy.get('.header__container > .header__id').visit('https://pokemonbattle.ru/trainer/7408');//Проверяю, что опция перехода на id тренера работает 
                cy.get(dashboard.trainer_page_button).click().visit('https://pokemonbattle.ru/trainer/7408');// Перехожу на страницу тренера
                cy.get('[href="/shop"]').click().visit('https://pokemonbattle.ru/shop');//Проверяю переход в магазин аватаров
                cy.get(':nth-child(9) > .shop__button').click().visit('https://pokemonbattle.ru/payment/6');//Выбираю понравившийся аватар,нажимаю кнопку купить
                cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111 1111 1111 1111')//Вводу номер действующей карты
                cy.get(':nth-child(1) > .pay_base-input-v2').type('12/24'); // Ввожу корректный срок действия карты
                cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');//Ввожу корректный cvv код 
                cy.get('.k_input_name').type('NAME');// Ввожу корректное имя держателя карты
                cy.get('.pay-btn').click();//Нажимаю кнопку Оплатить 
                cy.get('#cardnumber').type('56456').click();//Ввожу корректный код пуш-сообщения
                cy.get('.payment__submit-button').click()//Нажимаю кнопку отправить 
                cy.get('.payment__padding').contains('Покупка прошла успешно');//Получаю сообщение об успешной оплате
                cy.get('.payment__adv').contains('Вернуться в магазин').contains('https://pokemonbattle.ru/shop'); // Нажимаю кнопку вернуться в магазин  
            })
            it ('Негативная  проверка покупки автара (Некорректные платежные данные сard number)', function () { 
                
                cy.visit('/');//Захожу на сайт
                cy.get(':nth-child(1) > .auth__input').type(data.login);// В поле логин ввожу корректный логин 
                cy.get('#password').type(data.password);//В поле пароль ввожу корректный пароль
                cy.get('.auth__button').click();// Нажимаю на кнопку "войти", 
                cy.get('.header__container > .header__id').visit('https://pokemonbattle.ru/trainer/7408');//Проверяю, что опция перехода на id тренера работает 
                cy.get(dashboard.trainer_page_button).click().visit('https://pokemonbattle.ru/trainer/7408');// Перехожу на страницу тренера
                cy.get('[href="/shop"]').click().visit('https://pokemonbattle.ru/shop');//Проверяю переход в магазин аватаров
                cy.get(':nth-child(9) > .shop__button').click().visit('https://pokemonbattle.ru/payment/6');//Выбираю понравившийся аватар,нажимаю кнопку купить
                cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111 1111 1111 1112')//Ввожу НЕКОРРЕКТНЫЙ номер карты
                cy.get(':nth-child(1) > .pay_base-input-v2').type('12/24'); //Ввожу корректный срок действия карты 
                cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');//Ввожу корректный CVV код
                cy.get('.pay__payform-v2 > :nth-child(2) > .pay__mistake-v2').contains('Неверный номер карты');// Проверяю, что сайт выдает ошибку
                cy.get('.pay-btn').click();//Проверяю, что кнопка сайта неактивна
            }) 
            it ('Негативная  проверка покупки автара (Некорректные платежные данные cvv)', function () { 
               
                cy.visit('/');//Захожу на сайт
                cy.get(main_page.Login).type(data.login);// В поле логин ввожу корректный логин 
                cy.get(main_page.Password).type(data.password);//В поле пароль ввожу корректный пароль
                cy.get(main_page).click();// Нажимаю на кнопку "войти", 
                cy.get('.header__container > .header__id').visit('https://pokemonbattle.ru/trainer/7408');//Проверяю, что опция перехода на id тренера работает 
                cy.get(dashboard.trainer_page_button).click().visit('https://pokemonbattle.ru/trainer/7408');// Перехожу на страницу тренера
                cy.get('[href="/shop"]').click().visit('https://pokemonbattle.ru/shop');//Проверяю переход в магазин аватаров
                cy.get(':nth-child(9) > .shop__button').click().visit('https://pokemonbattle.ru/payment/6');//Выбираю понравившийся аватар,нажимаю кнопку купить
                cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111 1111 1111 1111')//Ввожу корректный номер карты
                cy.get(':nth-child(1) > .pay_base-input-v2').type('12/24'); //Ввожу корректный срок действия карты 
                cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('000');//Ввожу НЕКОРРЕКТНЫЙ CVV код
                cy.get('.pay-inputs-box > :nth-child(2) > .pay__mistake-v2').contains('Неверный код');//Проверяю, что получаю сообщение "Неверный код"
                cy.get('.pay-btn').click();//Проверяю, что кнопка сайта неактивна
            })
        })
