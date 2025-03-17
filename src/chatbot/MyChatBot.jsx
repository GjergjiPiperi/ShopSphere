import ChatBot from "react-chatbotify";
import { useState } from "react";
import CashOutModal from "../components/CashOutModal";

const MyChatBot = ({ products }) => {
  const [form, setForm] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  const productNames = products.map((product) => product.title);
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_age",
    },
    ask_age: {
      message: (params) =>
        `Nice to meet you ${params.userInput}, what is your age?`,
      function: (params) => setForm({ ...form, age: params.userInput }),
      path: "ask_clothes",
    },
    ask_clothes: {
      message: "Would you like to see our variety of products?",

      options: ["Yes", "No"],
      chatDisabled: true,
      function: (params) => {
        if (params.userInput === "No") {
          return "end";
        }
      },
      path: "ask_choice",
    },
    ask_choice: {
      message: "Select at least 2 products that you need currently:",
      checkboxes: { items: productNames, min: 2 },
      chatDisabled: true,
      function: (params) => {
        setForm({ ...form, product_choices: params.userInput });
      },
      path: "ask_again",
    },
    ask_again: {
      message: "Would you like to see more?",
      options: ["Yes", "No"],
      chatDisabled: true,
      function: (params) => {
        setForm({ ...form, more_products: params.userInput });

        if (params.userInput === "No") {
          flow.ask_again.path = "end"; // Redirect to end
        } else {
          flow.ask_again.path = "ask_choice_again"; // Continue flow
        }
      },

      path: "ask_choice_again",
    },
    ask_choice_again: {
      message: "Ok, what else would you like to add",
      checkboxes: { items: productNames, min: 5 },
      chatDisabled: true,
      function: (params) => {
        setForm({ ...form, product_choices: params.userInput });
      },
      path: "end",
    },
    end: {
      message: "Thank you for your interest, we will get back to you shortly!",
      component: (
        <div style={formStyle}>
          <p>Name: {form.name}</p>
          <p>Age: {form.age}</p>

          <p>Product Choices: {form.product_choices}</p>
          <CashOutModal />
        </div>
      ),
      options: ["New Application"],
      chatDisabled: true,
      path: "start",
    },
    settings: {
      position: "bottom-right",
      hideWhenNotLoggedIn: false,
      avatar: "https://react-chatbotify.com/images/logo.png",

      header: {
        title: "ShopBot",
      },
      closeButton: true, // ✅ Enabled Close Button
      onClose: () => setIsOpen(false), // ✅ Handle Close Action
    },
  };
  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {isOpen && <ChatBot flow={flow} />}
      {!isOpen && <button onClick={() => setIsOpen(true)}>Open Chatbot</button>}
    </div>
  );
};

export default MyChatBot;
