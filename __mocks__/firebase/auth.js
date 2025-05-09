console.log("Mock firebase/auth is being used");
export const onAuthStateChanged = jest.fn((auth, callback) => {
  callback({
    uid: "testUID",
    email: "test@example.com",
    displayName: "Test User",
  });
});
export const signOut = jest.fn(() => Promise.resolve());
export const getAuth = jest.fn(() => ({
  // Mock properties or methods you might need
  currentUser: { uid: "testUID" },
}));

export const createUserWithEmailAndPassword = jest.fn(() =>
  Promise.resolve({
    user: {
      uid: "testUID",
      email: "test@example.com",
      displayName: "Test User",
    },
  })
);

export const signInWithEmailAndPassword = jest.fn(() =>
  Promise.resolve({
    user: {
      uid: "testUID",
      email: "test@example.com",
      displayName: "Test User",
    },
  })
);
