import * as React from "react";
import "./App.css";
import { BiSearch } from "react-icons/bi";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus, FiEye, FiTrash2 } from "react-icons/fi";

let list = [
  {
    id: 1,
    name: "Learn React.js",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consequatur, tempora voluptas optio assumenda soluta voluptatibus impedit rerum? Vero, deserunt?",
    todo: [
      {
        is_done: true,
        work: "Learn the basic",
      },
      {
        is_done: false,
        work: "Deepening the concept",
      },
      {
        is_done: false,
        work: "Simple implementation",
      },
    ],
  },
  {
    id: 2,
    name: "Study for exams",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consequatur, tempora voluptas optio assumenda soluta voluptatibus impedit rerum? Vero, deserunt?",
    todo: [
      {
        is_done: true,
        work: "Read the power point",
      },
      {
        is_done: true,
        work: "Scanning the material from book",
      },
      {
        is_done: true,
        work: "Try to do some exercise",
      },
    ],
  },
];

function App() {
  const [active, setActive] = React.useState(1);
  const [name, setName] = React.useState();
  const { control, register, watch } = useForm({
    mode: "onTouched",
  });

  const watchTodoList = watch("todolist");
  const { fields, append, remove } = useFieldArray({
    name: "todolist",
    shouldUnregister: true,
    control: control,
  });
  return (
    <main className="h-screen">
      <div className="dashboard-layout flex gap-8 h-full overflow-y-clip">
        <div className="w-3/5 space-y-6 px-4 py-12 overflow-y-auto">
          <div className="relative">
            <input
              type="search"
              placeholder="Find your task"
              className="w-full px-4 py-2 ring-1 ring-[#c7c7c7] shadow-sm rounded-lg focus:outline focus:outline-slate-400"
            />
            <BiSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl">Your List</h2>
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                  })
                }
                className="p-2 rounded-md shadow"
              >
                <FiPlus />
              </button>
            </div>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id + index} className="relative">
                  <input
                    id={`name.${index}`}
                    name={`todolist[${index}].name`}
                    type="text"
                    defaultValue={field.name}
                    {...register(`todolist.${index}.name`)}
                    className={`bg-[#fafafa] px-5 py-3 rounded-md border flex justify-between items-center cursor-pointer hover:bg-slate-100 w-full focus:outline-slate-500`}
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-x-2">
                    <button
                      type="button"
                      onClick={() => setName(watchTodoList[index].name)}
                      className="p-2 shadow bg-slate-500 text-white rounded-md"
                    >
                      <FiEye />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 shadow bg-red-500 text-white rounded-md"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f8fbfc] w-full p-12 space-y-8">
          <div className="space-y-4">
            <h2 className="font-semibold text-2xl">{name}</h2>
            <hr />
            <div className="space-y-1">
              <h3 className="font-medium">Details :</h3>
              <p>{list[active - 1].desc}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">To do&apos;s</h3>
            <ul className="space-y-2 w-1/2">
              {list[active - 1].todo.map(({ is_done, work }, index) => (
                <li
                  key={index + work}
                  className="flex justify-between items-center gap-x-2 px-4 py-2.5 shadow bg-white"
                >
                  <label>{work}</label>
                  <input id={work} type="checkbox" defaultChecked={is_done} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
