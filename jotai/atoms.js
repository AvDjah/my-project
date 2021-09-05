import {atom} from "jotai";

export const taskS = atom([
 {
  id: 1,
  group: -1,
  text: "Do Homework, then sleeep early.",
  done: 0,
  color: "#32292F",
 },
 {group: 1, text: "Finish Homework", id: 2, done: 1, color: "#1C3A13"},
]);

export const taskId = atom(3);
export const groupId = atom(3);

export const groups = atom([
 {groupid: 1, name: "College Work"},
 {groupid: 2, name: "Meetings"},
]);
