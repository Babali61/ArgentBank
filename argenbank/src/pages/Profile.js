import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../features/user/userSlice';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{profile ? `${profile.firstName} ${profile.lastName}!` : ''}</h1>
        {isEditing ? (
          <div>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;