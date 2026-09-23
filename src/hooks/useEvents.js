import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [savedEvents, setSavedEvents] = useState(new Set());

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // For now, fetch all events (in a real app you might only fetch published)
      const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);

      if (user) {
        const savesQ = query(collection(db, 'eventSaves'), where('uid', '==', user.uid));
        const savesSnap = await getDocs(savesQ);
        const saves = new Set(savesSnap.docs.map(doc => doc.data().eventId));
        setSavedEvents(saves);
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const saveEvent = async (eventId) => {
    if (!user) return;
    try {
      const saveId = `${user.uid}_${eventId}`;
      await setDoc(doc(db, 'eventSaves', saveId), {
        uid: user.uid,
        eventId,
        createdAt: new Date().toISOString()
      });
      setSavedEvents(prev => new Set([...prev, eventId]));
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const unsaveEvent = async (eventId) => {
    if (!user) return;
    try {
      const saveId = `${user.uid}_${eventId}`;
      await deleteDoc(doc(db, 'eventSaves', saveId));
      setSavedEvents(prev => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    } catch (err) {
      console.error("Error unsaving event:", err);
    }
  };

  return { events, loading, error, fetchEvents, saveEvent, unsaveEvent, savedEvents };
}
