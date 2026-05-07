import { db } from "../firebase/config";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";


export const saveOrder = async (order) => {
  await addDoc(collection(db, "orders"), order);
};


export const getOrders = async () => {
  const snapshot = await getDocs(collection(db, "orders"));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};


export const deleteOrder = async (id) => {
  await deleteDoc(doc(db, "orders", id));
};