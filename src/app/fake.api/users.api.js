const users = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        login: "smith@gmail.com",
        order: 312,
        status: "Ценитель красоты"
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        login: "lenin@gmail.com",
        order: 120,
        status: "Поставщик аксессуаров"
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        login: "mask@gmail.com",
        order: 98,
        status: "Конкурент минздрава"
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        login: "dog@mail.ru",
        order: 64,
        status: "Рыбак"
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        login: "nightmare@mail.ru",
        order: 34,
        status: "Охотник"
    },
    {
        _id: "67rdca3eeb7f6fgeed471814",
        login: "cat@mail.ru",
        order: 1,
        status: "Ценитель красоты"
    }
]

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Server imitating
export const fetchUsers = () =>
    new Promise((resolve) => {
        setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("users")));
        }, 500);
    });

