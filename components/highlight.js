import randomColor from "randomcolor";
import {taskS, groups} from "../jotai/atoms";
import {useAtom} from "jotai";
import _ from "lodash";
import {Menu, MenuButton, MenuList, MenuItem, Button} from "@chakra-ui/react";
import {useState} from "react";
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
 useDisclosure,
 Textarea,
} from "@chakra-ui/react";
import ReactToolTip from "react-tooltip";

export default function Highlight(props) {
 const [tasks, setTasks] = useAtom(taskS);
 const [groupitems, setGroups] = useAtom(groups);
 const [selectedGroup, setSelectedGroup] = useState(-1);
 const [value, setValue] = useState("");
 const {isOpen, onOpen, onClose} = useDisclosure();

 const changeDoneStatus = (id) => {
  setTasks(
   tasks.map((task) => {
    if (task.id === id) {
     if (task.done === 0) task.done = 1;
     else task.done = 0;
    }
    return task;
   })
  );
 };

 const handleChange = (event) => setValue(event.target.value);

 const changetaskText = (id) => {
  setTasks(
   tasks.filter((task) => {
    if (task.id === id) {
     task.text = value;
    }
    return task;
   })
  );
 };

 const removeTask = (id) => {
  console.log("remove: ", id);
  let temp = tasks.filter((task) => task.id !== id);
  //   _.remove(temp, {id: id});
  console.log(temp);
  setTasks(temp);
 };

 const selectorGroup = (taskid, groupid) => {
  setSelectedGroup(groupid);
  setTasks(
   tasks.map((task) => {
    if (task.id === taskid) {
     task.group = groupid;
    }
    return task;
   })
  );
  console.log(selectedGroup);
 };

 const changeGroup = () => {};

 const btn =
  "transition duration-300 bg-gray-600 px-2 font-bold py-1 rounded-lg m-2 active:bg-white active:text-black";

 return (
  <div
   style={{backgroundColor: props.color}}
   className="rounded-lg text-lg text-white p-8  font-semibold text-center flex place-content-between flex-col h-72  flex-wrap m-4 flex-none w-64 items-between relative"
  >
   <>
    <Modal isOpen={isOpen} onClose={onClose}>
     <ModalOverlay />
     <ModalContent>
      <ModalHeader>Edit Task</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
       <Textarea
        value={value}
        onChange={handleChange}
        placeholder="Enter here"
       ></Textarea>
      </ModalBody>

      <ModalFooter>
       <Button colorScheme="blue" mr={3} onClick={onClose}>
        Close
       </Button>
       <Button
        onClick={() => {
         changetaskText(props.id);
         onClose();
        }}
        variant="ghost"
       >
        Edit
       </Button>
      </ModalFooter>
     </ModalContent>
    </Modal>
   </>
   <div className="absolute -right-6 -top-6 text-black">
    {props.done === 1 ? (
     <button
      onClick={() => {
       changeDoneStatus(props.id);
      }}
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-12 w-12"
       fill="white"
       viewBox="0 0 24 24"
       stroke="green"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
       />
      </svg>
     </button>
    ) : (
     <button
      onClick={() => {
       changeDoneStatus(props.id);
      }}
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-12 w-12"
       fill="white"
       viewBox="0 0 24 24"
       stroke="orange"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
       />
      </svg>
     </button>
    )}
   </div>
   <div className="overflow-hidden h-3/4 cursor-pointer">
    <a data-tip={props.text}>{props.text}</a>
    <ReactToolTip
     place="bottom"
     effect="solid"
     type="info"
     multiline={true}
    ></ReactToolTip>
   </div>
   <div className="flex flex-row justify-evenly bg-gray-600 rounded-lg ring-2 text-black ring-white w-full">
    <Menu>
     <MenuButton>
      {/* <button className={btn + " text-green-500"}> */}
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 w-6"
       fill="none"
       viewBox="0 0 24 24"
       stroke="white"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
       />
      </svg>
      {/* </button> */}
     </MenuButton>
     <MenuList>
      <MenuItem
       onClick={() => {
        setSelectedGroup(-1);
        console.log(selectedGroup);
        setTasks(
         tasks.map((task) => {
          if (task.id === props.id) {
           task.group = -1;
          }
          return task;
         })
        );
       }}
      >
       None
      </MenuItem>
      {groupitems.map((gr) => {
       return (
        <MenuItem
         onClick={() => {
          selectorGroup(props.id, gr.groupid);
         }}
        >
         {gr.name}
        </MenuItem>
       );
      })}
     </MenuList>
    </Menu>

    <button
     onClick={() => {
      removeTask(props.id);
     }}
     className={btn + " text-red-500"}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M6 18L18 6M6 6l12 12"
      />
     </svg>
    </button>
    <button
     onClick={() => {
      setValue(props.text);
      onOpen();
     }}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="yellow"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
     </svg>
    </button>
   </div>
  </div>
 );
}
