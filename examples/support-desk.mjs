import {
  BinarySearchTree,
  Deque,
  DisjointSet,
  DoublyLinkedList,
  Graph,
  HashTable,
  LinkedList,
  MaxHeap,
  MinHeap,
  PriorityQueue,
  Queue,
  Stack,
  Trie,
} from "../dist/index.js";

const arrivals = new Queue();
const activeById = new HashTable();
const ticketsById = new BinarySearchTree((left, right) => left.id.localeCompare(right.id));
const triage = new PriorityQueue((left, right) => right.severity - left.severity);
const availableAgents = new Deque();
const assignmentHistory = new Stack();
const recentAssignments = new LinkedList();
const eventLog = new DoublyLinkedList();
const nextDeadlines = new MinHeap();
const highestSeverity = new MaxHeap();
const topicSearch = new Trie();
const officeRoutes = new Graph();
const affectedSystems = new DisjointSet();

for (const agent of ["Ari", "Bo", "Cam"]) availableAgents.pushBack(agent);

officeRoutes.addEdge("helpdesk", "library");
officeRoutes.addEdge("library", "lab");
officeRoutes.addEdge("lab", "server-room");
officeRoutes.addEdge("helpdesk", "dorm");

for (const system of ["lab-wifi", "lab-printer", "account-login"]) {
  affectedSystems.add(system);
}
affectedSystems.union("lab-wifi", "lab-printer");

const newTickets = [
  {
    id: "HD-103",
    topic: "printer",
    severity: 2,
    dueInMinutes: 30,
    system: "lab-printer",
    status: "open",
  },
  {
    id: "HD-101",
    topic: "network",
    severity: 5,
    dueInMinutes: 10,
    system: "lab-wifi",
    status: "open",
  },
  {
    id: "HD-102",
    topic: "account",
    severity: 3,
    dueInMinutes: 20,
    system: "account-login",
    status: "open",
  },
];

for (const ticket of newTickets) {
  arrivals.enqueue(ticket);
  activeById.set(ticket.id, ticket);
  ticketsById.insert(ticket);
  nextDeadlines.insert(ticket.dueInMinutes);
  highestSeverity.insert(ticket.severity);
  topicSearch.insert(ticket.topic);
}

while (!arrivals.isEmpty()) triage.enqueue(arrivals.dequeue());

while (!triage.isEmpty()) {
  const ticket = triage.dequeue();
  if (!ticket) continue;

  const agent = availableAgents.popFront();
  if (!agent) throw new Error("No support agents are available");
  availableAgents.pushBack(agent);

  const previousState = { status: ticket.status, assignee: ticket.assignee };
  ticket.status = "assigned";
  ticket.assignee = agent;
  assignmentHistory.push({ ticket, previousState });
  recentAssignments.append(ticket.id);
  eventLog.append(`${ticket.id} assigned to ${agent}`);
}

console.log("Assignments (highest severity first):", recentAssignments.toArray());
console.log("First assignment event:", eventLog.get(0));
console.log(
  "Tickets in ID order:",
  ticketsById.inOrderTraversal().map((ticket) => ticket.id),
);
console.log("Next deadline in minutes:", nextDeadlines.peek());
console.log("Highest severity:", highestSeverity.peek());
console.log("Topics matching 'net':", topicSearch.wordsWithPrefix("net"));
console.log("Helpdesk can reach server room:", officeRoutes.hasPath("helpdesk", "server-room"));
console.log(
  "Printer and Wi-Fi share an incident group:",
  affectedSystems.connected("lab-printer", "lab-wifi"),
);
console.log("HD-101 lookup status:", activeById.get("HD-101")?.status);

const lastAssignment = assignmentHistory.pop();
if (lastAssignment) {
  lastAssignment.ticket.status = lastAssignment.previousState.status;
  lastAssignment.ticket.assignee = lastAssignment.previousState.assignee;
  eventLog.append(`${lastAssignment.ticket.id} assignment undone`);
}

console.log("Undo restored ticket status:", activeById.get("HD-103")?.status);
console.log("Event count after undo:", eventLog.size);
