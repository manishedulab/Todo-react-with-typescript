import React, { useState } from "react";
import UserApi from "../Services/Interceptor";
import "../index.css"
import { Formik } from "formik";
import * as yup from "yup";

const AddTodo: React.FC = () => {
  const [name, setName] = React.useState<any[]>([]);
  const [loader, setloader] = useState(false);
  const [checker, setchecker] = useState<boolean>(true);
  const [Id, setId] = React.useState<string>("");

  const initialValues = {
    name: "",
    description: "",
  };

  const onSubmit = async (data: unknown) => {
    try {
      const res = await UserApi.post("addtodo", data);
      if (res.data.status === 200) {
        setName([...name, res.data.data]);
        setloader(false);

      }
      else{
        alert("Todo is not added please try again")
      }
    } catch (err) {
      alert("something went wrong while posting todo please try again");
    }
  };
  const validationSchema = yup.object().shape({
    name: yup.string()
    .required("name is required"),
    description: yup
      .string()
      .required("description is required")
      .min(6, " description must be at least 6 characters")
      .max(40, "description  must not exceed 40 characters"),
  });

  React.useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      let data = await UserApi.get(`getdata`);
      if (data.status === 200) {
        setName(data.data.data);
        setloader(false);
      }
      else{
        alert("User data not found");
      }
    } catch (error) {
     alert("Opps! Some error occurred while retrieving the user data")
    }
  };

  const updatetodo = async (id: string) => {
    setId(id);
    setchecker(false);
  };

  const updatedtodos = async (data:unknown) => {
    try {
      const res = await UserApi.put(`updatetodo?id=${Id}`, data);
      if (res.data.status === 200) {
        setName([...name, res.data.data]);
        setloader(false);
        setchecker(true);
      }
    } catch (err) {
      alert("some error occurred while updating")
    }
  };

  // for delete
  const deletetodo = async (id: unknown) => {
    try {
      if (window.confirm("Are you sure you want to delete"))
      {
      let data = await UserApi.delete(`deletetodo?id=${id}`);
      if (data.status === 200) {
        alert("Todo deleted successfully");
      }
    }
      
    } catch (error) {
      alert("some error occurred while deleting")
    }
  };

  const cancelupdate= () => {
    setchecker(true)
  }

  return checker ? (
    <Formik 
    initialValues={initialValues} 
    validationSchema={validationSchema}
    onSubmit={onSubmit}>
      {(formikProps) => (
        <>
          <h1 className="Todo">My Todos</h1>
          <form onSubmit={formikProps.handleSubmit} className="Todo">
            <div>
              <div>
                <label htmlFor="name">Name</label>
                <input  name="name" type="text"
                  id="name"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.name}
                   />
                  {formikProps.errors.name ? (
                    <div className="error"> {formikProps.errors.name} </div>
                  ) : null}
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  name="description"
                  type="text"
                  id="description"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.description}
                /> {formikProps.errors.description ? (
                  <div className="error"> {formikProps.errors.description} </div>
                ) : null}
              </div>
            </div>
            <button className="submit" type="submit"  >Add Todo</button>
          </form>
          <br />
          <div className="">
            <div className="">
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                  {!loader &&
                    name.length > 0 &&
                    name.map((data, index) => (
                      <tr key={index}>
                        <td>{data.title}</td>
                        <td>{data.description}</td>
                        <td>
                          <button onClick={() => updatetodo(data._id)}>
                            <h2>✍</h2>
                          </button>
                          &nbsp;&nbsp;&nbsp;
                          <button onClick={() => deletetodo(data._id)}>
                            
                            <h2>🧺</h2>
                          </button>
                        </td>
                      </tr>
                    ))}
                  {name.length < 0 && <h1>NoData</h1>}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Formik>
  ) : (
    <Formik initialValues={initialValues} onSubmit={updatedtodos}>
      {(formikProps) => (
        <>
        <div className="Todo">
        <h1 >Edit Todo</h1> 
        <h1 className="cross" onClick={cancelupdate}> ❌ </h1>
        </div>
          <form onSubmit={formikProps.handleSubmit} className="Todo">
            <div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  onChange={formikProps.handleChange}
                  value={formikProps.values.name}
                  type="text"
                  id="name"
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.description}
                />
              </div>
            </div>
            <button className="submit">Update Todo</button>
          </form>
        </>
      )}
    </Formik>
  );
};

export default AddTodo;
