export const statuses = [
    { _id: "67rdca3eeb7f6hgeed471818", onEnglish: "Connoisseur of beauty", value: "Ценитель красоты", type: 'status', text: "Ценитель красоты" },
    { _id: "67rdca3eeb7f6jgeed471820", onEnglish: "Accessories Supplier", value: "Поставщик аксессуаров", type: 'status', text: "Поставщик аксессуаров" },
    { _id: "67rdca3eeb7f6jgeed471814", onEnglish: "Competitor of Ministryhealth", value: "Конкурент минздрава", type: 'status', text: "Конкурент минздрава" },
    { _id: "67rdca3eeb7f6jgeed471824", onEnglish: "Fisherman", value: "Рыбак", type: 'status', text: "Рыбак" },
    { _id: "67rdca3eeb7f6jgeed471829", onEnglish: "Hunter", value: "Охотник", type: 'status', text: "Охотник" }
];

const fetchStatuses = () =>
    new Promise((resolve) => {
        setTimeout(function () {
            resolve(statuses);
        }, 500);
    });

export default fetchStatuses

