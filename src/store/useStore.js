import create from "zustand";

// const inspectorsArray = [
//   {
//     name: "Kovács Béla",
//     address: {
//       city: "Budapest",
//       street: "Löveg u.",
//       houseNumber: 2,
//       postCode: 1112,
//     },
//   },
//   {
//     name: "Tarjagos Zafó",
//     address: {
//       city: "Budapest",
//       street: "Péterhegyi köz",
//       houseNumber: 1,
//       postCode: 1112,
//     },
//   },
//   {
//     name: "Zsíros B. Ödön",
//     address: {
//       city: "Budapest",
//       street: "Angyalka u.",
//       houseNumber: 1,
//       postCode: 1112,
//     },
//   },
// ];

const useStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user) => {
    set(() => ({ currentUser: user }));
  },
  
  inspectors: [],
  choosenInspector: null,
  setInspector: (inspector) => {
    set(() => ({ choosenInspector: inspector }));
  },

  isModalOpen: false,
  setIsModalOpen: (isOpen) => {
    set(() => ({ isModalOpen: isOpen }));
  },
}));

export default useStore;
