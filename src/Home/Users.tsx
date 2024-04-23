import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import {
  BsTrash3Fill,
  BsPlusCircleFill,
  BsFillCheckCircleFill,
  BsPencil,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user: User) => {
    console.log(user);
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const [role, setRole] = useState("USER");
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };

  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    favorite_show: "",
    // firstName: "",
    // lastName: "",
    role: "USER",
  });
  //   const createUser = async () => {
  //     try {
  //       const newUser = await client.createUser(user);
  //       setUsers([newUser, ...users]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {/* <table className="table m-4">
        <tbody className="p-3">
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button onClick={() => deleteUser(user)}>
                  <BsTrash3Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="container">
        <div className="row p-3">
          {users.map((user: any) => (
            <div key={user._id} className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">
                    {user.firstName} {user.lastName}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    <BsTrash3Fill /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
