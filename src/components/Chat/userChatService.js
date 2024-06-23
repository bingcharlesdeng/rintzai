import { db, collection, getDocs, query, where } from '../../firebase/firebase';

const searchUsers = async (searchTerm) => {
  const usersRef = collection(db, 'users');
  const nameQuery = query(
    usersRef,
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff')
  );
  const emailQuery = query(
    usersRef,
    where('email', '>=', searchTerm),
    where('email', '<=', searchTerm + '\uf8ff')
  );
  const handleQuery = query(
    usersRef,
    where('handle', '>=', searchTerm),
    where('handle', '<=', searchTerm + '\uf8ff')
  );

  const [nameSnapshot, emailSnapshot, handleSnapshot] = await Promise.all([
    getDocs(nameQuery),
    getDocs(emailQuery),
    getDocs(handleQuery),
  ]);

  const users = new Set();

  nameSnapshot.forEach((doc) => users.add({ id: doc.id, ...doc.data() }));
  emailSnapshot.forEach((doc) => users.add({ id: doc.id, ...doc.data() }));
  handleSnapshot.forEach((doc) => users.add({ id: doc.id, ...doc.data() }));

  console.log('Search results:', Array.from(users));
  return Array.from(users);
};

export { searchUsers };