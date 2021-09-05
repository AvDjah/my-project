import Toolbar from "../components/toolbar";
import Highlight from "../components/highlight";
import {useAtom} from "jotai";
import {taskS, groups} from "../jotai/atoms";
import Head from "next/head";

export default function App() {
 const [tasks, setTasks] = useAtom(taskS);
 const [grouplist, setGroups] = useAtom(groups);

 const removeAGroup = (groupid) => {
  setTasks(tasks.filter((task) => task.group !== groupid));
  setGroups(grouplist.filter((gr) => gr.groupid !== groupid));
 };

 const CountSubtasks = (id) => {
  let count = 0;
  tasks.map((task) => {
   if (task.group == id) count++;
  });
  return count;
 };

 let c = 0;
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
   <div className="container mx-auto my-10 center flex flex-row justify-evenly w-4/5 flex-wrap">
    {tasks.map((task) => {
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
    })}
   </div>
   <div>
    {grouplist.map((curr) => {
     return (
      <div
       key={++c}
       className="bg-gray-200 p-10 m-10 rounded-lg xl:w-2/3 w-11/12 mx-auto relative  shadow-xl ring-1 ring-indigo-300"
      >
       <div className="bg-black text-white hover:bg-white hover:text-red-400 md:text-lg text-sm absolute top-4 right-4 font-semibold md:p-3 p-2 rounded-md active:bg-gray-200">
        <button
         onClick={() => {
          removeAGroup(curr.groupid);
         }}
        >
         Remove Group
        </button>
       </div>

       <div className="mx-auto md:my-5 mt-8 text-center md:text-3xl font-sans font-semibold bg-white md:w-1/3 p-2 ring-2 ring-black text-lg cursor-pointer w-2/3">
        {curr.name}
       </div>
       <div className="mx-auto my-2 text-center text-xl font-sans container center flex flex-row justify-evenly w-4/5 flex-wrap">
        {CountSubtasks(curr.groupid) == 0
         ? "No tasks"
         : tasks.map((task) => {
            if (task.group == curr.groupid) {
             return (
              <div>
               <Highlight
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
   <div className="text-right m-10">Created with ❤️ by Arvind Meena</div>
  </div>
 );
}
