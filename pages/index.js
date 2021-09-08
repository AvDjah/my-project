import Toolbar from "../components/toolbar";
import Highlight from "../components/highlight";
import {useAtom} from "jotai";
import {taskS, groups, idProvide} from "../jotai/atoms";
import Head from "next/head";
import {useState, useEffect} from "react";

export default function App(props) {
 const [tasks, setTasks] = useAtom(taskS);
 const [grouplist, setGroups] = useAtom(groups);
 const [getID, setID] = useAtom(idProvide);
 const [value, setValue] = useState("");
 const [sortOrder, setSortOrder] = useState("A");

 const removeAGroup = (groupid) => {
  setTasks(tasks.filter((task) => task.group !== groupid));
  setGroups(grouplist.filter((gr) => gr.groupid !== groupid));
  localStorage.setItem(
   "hgroups",
   JSON.stringify(grouplist.filter((gr) => gr.groupid !== groupid))
  );
  localStorage.setItem(
   "htasks",
   JSON.stringify(tasks.filter((task) => task.group !== groupid))
  );
 };

 useEffect(() => {
  let x = localStorage.getItem("htasks");
  let y = localStorage.getItem("hgroups");
  let c = localStorage.getItem("hids");
  console.log(y);
  console.log(x);
  console.log(c);
  let prevgroups = JSON.parse(y);
  let prevtasks = JSON.parse(x);
  let ct = parseInt(c);
  console.log(prevgroups, prevtasks, ct);
  if (prevgroups !== null) setGroups(prevgroups);
  else localStorage.setItem("hgroups", JSON.stringify(grouplist));
  if (prevtasks !== null) setTasks(prevtasks);
  else localStorage.setItem("htasks", JSON.stringify(tasks));
  if (ct !== null) setID(ct);
  else localStorage.setItem("hids", getID);
  //    console.log("prev: ", prevgroups, prevtasks);
  //    console.log("x: ", ct);
 }, []);

 const CountSubtasks = (id) => {
  let count = 0;
  tasks.map((task) => {
   if (task.group == id) count++;
  });
  return count;
 };

 const handleDrop = (e, groupid) => {
  let taskid = parseInt(e.dataTransfer.getData("taskid"));
  //   console.log("dropped: ", taskid, " in: ", groupid);
  let newtask = tasks.map((task) => {
   if (taskid === task.id) {
    task.group = groupid;
    // console.log("found: ", task);
   }
   return task;
  });
  setTasks(newtask);
  let temp = JSON.stringify(
   tasks.map((task) => {
    if (taskid === task.id) {
     task.group = groupid;
     //  console.log("found: ", task);
    }
    return task;
   })
  );
  //   localStorage.setItem("hgroups", grouplist);
  localStorage.setItem("htasks", temp);
  //   e.target.classList.remove("ring-4");

  //   console.log("new: ", newtask);
  //   setTasks(
  //    tasks.map((task) => {
  //     if (taskid === task.id) {
  //      task.group = groupid;
  //     }
  //     return task;
  //    })
  //   );
 };

 const countUngroupTasks = () => {
  let c = 0;
  //   console.log(tasks);
  tasks.map((task) => {
   if (task.group === -1) c++;
  });
  // console.log("c: ", c);
  return c;
 };

 return (
  <div>
   <Head>
    <title>Highlights</title>{" "}
   </Head>

   <div className="container mx-auto md:text-4xl text-2xl text-center my-20 ring-2 font-semibold ring-black p-10 font-mono hover:bg-gray-300 transition duration-300 w-2/3 bg-white shadow-xl">
    Highlights
   </div>

   <div>
    <Toolbar></Toolbar>
   </div>
   <div className="mx-auto my-5 text-center md:text-3xl font-sans font-semibold bg-white w-1/3 p-2 ring-2 ring-black text-lg cursor-pointer">
    Ungrouped Tasks
   </div>
   <div
    onDragOver={(e) => {
     e.preventDefault();
     //  console.log("in group: ", -1);
     //  console.log(e);
     // e.target.style.border = "3px solid red";
    }}
    onDrop={(e) => handleDrop(e, -1)}
    className="container mx-auto my-10 center flex flex-row justify-evenly w-4/5 flex-wrap"
   >
    {countUngroupTasks() === 0 ? (
     <div className="text-gray-600 h-16 text-2xl">No Tasks</div>
    ) : (
     tasks.map((task) => {
      if (task.group == -1) {
       return (
        <div key={task.id}>
         <Highlight
          id={task.id}
          color={task.color}
          done={task.done}
          text={task.text}
         ></Highlight>
        </div>
       );
      }
     })
    )}
   </div>
   <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 grid-auto-row">
    {grouplist.map((curr) => {
     let x = CountSubtasks(curr.groupid);
     console.log("g: ", curr.groupid, " x: ", x);
     let span = "span " + (x + 1);

     return (
      <div
       style={{gridRow: span}}
       onDragOver={(e) => {
        e.preventDefault();
        // console.log("in group: ", curr.name);
        // console.log(e);
        // e.target.style.border = "3px solid red";
       }}
       onDragEnter={(e) => {
        // e.target.className += " ring-4 ";
       }}
       onDrop={(e) => handleDrop(e, curr.groupid)}
       key={curr.groupid}
       className="bg-gray-200 p-10 mx-auto rounded-lg w-11/12 relative m-4 shadow-xl ring-1 ring-indigo-300"
      >
       <div className="bg-black text-white hover:bg-white hover:text-red-400 xl:text-lg text-sm absolute top-4 right-4 font-semibold md:p-3 p-2 rounded-md active:bg-gray-200">
        <button
         onClick={() => {
          removeAGroup(curr.groupid);
         }}
        >
         Remove Group
        </button>
       </div>

       <div className="mx-auto md:my-5 mt-8 text-center xl:text-2xl font-sans font-semibold bg-white md:w-1/3 p-2 ring-2 ring-black text-md cursor-pointer w-2/3">
        {curr.name}
       </div>
       <div className="mx-auto my-2 text-center text-xl font-sans container center flex flex-row justify-evenly w-4/5 flex-wrap">
        {CountSubtasks(curr.groupid) == 0
         ? "No tasks"
         : tasks.map((task) => {
            if (task.group == curr.groupid) {
             return (
              <div key={task.id}>
               <Highlight
                keyd={task.id}
                done={task.done}
                id={task.id}
                text={task.text}
                color={task.color}
               ></Highlight>
              </div>
             );
            }
           })}
       </div>
      </div>
     );
    })}
   </div>
   <div className="center mx-auto text-lg text-center m-4">
    <button
     onClick={() => {
      localStorage.clear();
      //Local
      localStorage.setItem("hids", 10);
      localStorage.setItem(
       "htasks",
       JSON.stringify([
        {
         id: 1,
         group: -1,
         text: "Do Homework, then sleeep early.",
         done: 0,
         color: "#32292F",
        },
        {group: 1, text: "Finish Homework", id: 2, done: 1, color: "#1C3A13"},
       ])
      );
      localStorage.setItem(
       "hgroups",
       JSON.stringify([
        {groupid: 1, name: "College Work"},
        {groupid: 2, name: "Meetings"},
       ])
      );
      //Atoms
      setTasks([
       {
        id: 1,
        group: -1,
        text: "Do Homework, then sleeep early.",
        done: 0,
        color: "#32292F",
       },
       {group: 1, text: "Finish Homework", id: 2, done: 1, color: "#1C3A13"},
      ]);
      setGroups([
       {groupid: 1, name: "College Work"},
       {groupid: 2, name: "Meetings"},
      ]);
      setID(10);
      console.log("cleared");
     }}
     className=" bg-black p-4 rounded-lg text-white font-semibold text-center hover:bg-white hover:text-red-600 active:bg-gray-300"
    >
     Set Default Local
    </button>
   </div>
   <div className="center mx-auto text-lg text-center m-4">
    <button
     onClick={() => {
      let temp = tasks.sort((a, b) => {
       if (sortOrder === "A") {
        setSortOrder("D");
        return a.done - b.done;
       } else if (sortOrder === "D") {
        setSortOrder("A");
        return b.done - a.done;
       }
      });
      setTasks(temp);
      console.log(temp);
     }}
     className="bg-black p-4 rounded-lg text-white font-semibold text-center hover:bg-white hover:text-red-600 active:bg-gray-300"
    >
     Sort Data
    </button>
   </div>
   <div className="text-right m-10">Created with ❤️ by Arvind Meena</div>
  </div>
 );
}
