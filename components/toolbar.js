import {taskS, groups, counts} from "../jotai/atoms";
import {useAtom} from "jotai";
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
 Button,
 Input,
} from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/react";
import {useState} from "react";
import {Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import randomColor from "randomcolor";

let count = 10;

export default function Toolbar(options) {
 const [tasks, setTasks] = useAtom(taskS);
 const [counter, setCounts] = useAtom(counts);
 const [selectedGroup, setSelectedGroup] = useState(-1);
 const [groupname, setgroupname] = useState("");
 const [groupitems, setGroups] = useAtom(groups);
 const {isOpen, onOpen, onClose} = useDisclosure();
 const [adder, setadder] = useState("task");
 const [value, setValue] = useState("");
 const handleChange = (event) => setValue(event.target.value);

 const [value2, setValue2] = useState("");
 const handleChange2 = (event) => setValue2(event.target.value);

 const addTask = (e) => {
  //   setTasks([...tasks, {group: 1, text: "Another"}]);
  setadder("task");
  onOpen();
 };

 const selectorGroup = (id, name) => {
  setSelectedGroup(id);
  setgroupname(name);
 };

 const onAddTaskHandle = (group, name) => {
  if (name != "") {
   let a = counter.groups;
   let b = counter.tasks;
   setCounts({group: a, tasks: b + 1});
   console.log(counter.tasks);
   let newcolor = randomColor({luminosity: "dark"});
   console.log("color: ", newcolor);
   setTasks([
    ...tasks,
    {id: counter.tasks, group: group, text: name, done: 0, color: newcolor},
   ]);
  }
  setValue("");
  onClose();
 };

 const onAddGroupHandler = (name) => {
  if (name != "") {
   let a = counter.groups;
   let b = counter.tasks;
   setCounts({group: a + 1, tasks: b});
   setGroups([...groupitems, {groupid: counter.groups, name: name}]);
  }
  setValue2("");
  onClose();
 };

 const BasicMenu = () => {
  return (
   <Menu>
    <MenuButton as={Button}>
     {selectedGroup == -1 ? "Select Group" : groupname}
    </MenuButton>
    <MenuList>
     <MenuItem
      onClick={() => {
       setSelectedGroup(-1);
      }}
     >
      None
     </MenuItem>
     {groupitems.map((gr) => {
      return (
       <MenuItem
        onClick={() => {
         selectorGroup(gr.groupid, gr.name);
        }}
       >
        {gr.name}
       </MenuItem>
      );
     })}
     {/* <MenuItem>Download</MenuItem>
       <MenuItem>Create a Copy</MenuItem>
       <MenuItem>Mark as Draft</MenuItem>
       <MenuItem>Delete</MenuItem>
       <MenuItem>Attend a Workshop</MenuItem> */}
    </MenuList>
   </Menu>
  );
 };

 const addGroup = (e) => {
  setadder("group");
  onOpen();
 };

 return (
  <div className="flex flex-row justify-center">
   <div>
    <button
     onClick={addTask}
     className="bg-black p-4 m-4 transition duration-500 ease-in-out text-white font-medium text-lg rounded-xl hover:bg-white hover:text-black active:bg-gray-400 ring-2 ring-black"
    >
     Create Highlight
    </button>
   </div>
   <div>
    <button
     onClick={addGroup}
     className="bg-black p-4 m-4 transition duration-300 ease-in-out text-white font-medium text-lg rounded-xl hover:bg-white hover:text-black active:bg-gray-400  ring-2 ring-black "
    >
     Create New Bucket
    </button>
   </div>
   <div>
    <>
     <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
       <ModalHeader>
        {adder == "tasks" ? "Add Highlight" : "Add Bucket"}
       </ModalHeader>
       <ModalCloseButton />
       <ModalBody>
        {adder == "task" ? (
         <div>
          <Input
           value={value}
           onChange={handleChange}
           className="my-2"
           placeholder="Enter Task Name"
          ></Input>
          <BasicMenu></BasicMenu>
         </div>
        ) : (
         <div>
          <div className="font-sans my-2 text-lg font-semibold">
           Create Group
          </div>
          <Input
           value={value2}
           onChange={handleChange2}
           className="my-2"
           placeholder="Enter Group"
          ></Input>
         </div>
        )}
        {console.log(adder)}
       </ModalBody>

       <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
         Close
        </Button>
        <Button
         variant="ghost"
         onClick={() => {
          if (adder == "task") onAddTaskHandle(selectedGroup, value);
          else onAddGroupHandler(value2);
         }}
        >
         Add
        </Button>
       </ModalFooter>
      </ModalContent>
     </Modal>
    </>
   </div>
  </div>
 );
}
