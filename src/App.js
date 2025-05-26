import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("bazaarItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("bazaarItems", JSON.stringify(items));
  }, [items]);

  const handleAddOrEdit = () => {
    if (!name.trim() || !price) return;
    const newItem = { name, price: parseFloat(price) };

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setName("");
    setPrice("");
  };

  const handleEdit = (index) => {
    setName(items[index].name);
    setPrice(items[index].price);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const styles = {
    container: {
      maxWidth: 600,
      margin: "auto",
      padding: 20,
      fontFamily: "sans-serif",
      backgroundColor: darkMode ? "#222" : "#f9f9f9",
      color: darkMode ? "#fff" : "#000",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 20,
    },
    input: {
      padding: 10,
      fontSize: 16,
    },
    button: {
      padding: "10px 16px",
      fontSize: 16,
      cursor: "pointer",
    },
    itemList: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: `1px solid ${darkMode ? "#444" : "#ccc"}`,
    },
    total: {
      marginTop: 20,
      fontWeight: "bold",
    },
    smallBtn: {
      marginLeft: 8,
      padding: "4px 8px",
      fontSize: 14,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🛒 বাজার লিস্ট</h1>
        <button onClick={toggleDarkMode} style={styles.button}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="পণ্যের নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="দাম"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddOrEdit} style={styles.button}>
          {editIndex !== null ? "✏️ আপডেট করুন" : "➕ যোগ করুন"}
        </button>
      </div>

      <ul style={styles.itemList}>
        {items.map((item, index) => (
          <li key={index} style={styles.item}>
            {item.name} - {item.price.toFixed(2)} টাকা
            <div>
              <button
                onClick={() => handleEdit(index)}
                style={{ ...styles.smallBtn, backgroundColor: "#ffc107" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{ ...styles.smallBtn, backgroundColor: "#dc3545", color: "#fff" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div style={styles.total}>মোট খরচ: {total.toFixed(2)} টাকা</div>
    </div>
  );
}

export default App;
