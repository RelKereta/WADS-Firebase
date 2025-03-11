import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const TodoList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      query(collection(db, "todos"), where("userId", "==", user.uid)), 
      (snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addTask = async () => {
    if (task.trim()) {
      await addDoc(collection(db, "todos"), { text: task, userId: user.uid, completed: false });
      setTask("");
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const toggleComplete = async (id, completed) => {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
  };

  const editTask = async (id, newText) => {
    const updatedText = prompt("Edit Task:", newText);
    if (updatedText !== null) {
      await updateDoc(doc(db, "todos", id), { text: updatedText });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">To-Do List</h2>
      <input
        type="text"
        placeholder="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-2">
        Add
      </button>

      <button
        onClick={() => setShowCompleted(!showCompleted)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md w-full"
      >
        {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
      </button>

      <ul className="mt-4">
        {tasks
          .filter((task) => (showCompleted ? task.completed : true))
          .map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-md text-black"
            >
              <span className={task.completed ? "line-through text-gray-400" : ""}>
                {task.text}
              </span>
              <div className="space-x-2">
                <button onClick={() => toggleComplete(task.id, task.completed)} className="text-green-500">
                  ✔
                </button>
                <button onClick={() => editTask(task.id, task.text)} className="text-yellow-500">
                  ✏
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                  🗑
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList; // ✅ Ensure this line exists
