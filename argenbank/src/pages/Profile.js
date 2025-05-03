import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../features/user/userSlice';

function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [initialFirstName, setInitialFirstName] = useState('');
  const [initialLastName, setInitialLastName] = useState('');
  const [updateError, setUpdateError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setInitialFirstName(profile.firstName);
      setInitialLastName(profile.lastName);
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      setUpdateError(`Erreur: ${error}`);
    }
  }, [error]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setUpdateError(null);
      const resultAction = await dispatch(updateUserProfile({ firstName, lastName }));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        setInitialFirstName(firstName);
        setInitialLastName(lastName);
        setUpdateError(null);
      } else {
        setUpdateError('Échec de la mise à jour du profil. Veuillez réessayer.');
      }
    } catch (err) {
      setUpdateError('Une erreur est survenue lors de la mise à jour du profil.');
      console.error('Erreur de mise à jour :', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(initialFirstName);
    setLastName(initialLastName);
    setUpdateError(null);
  };

  if (isLoading && !profile) {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>Chargement du profil...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="main bg-dark">
      <div className="header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
        <h1 style={{ color: '#222', marginBottom: '30px' }}>Welcome back</h1>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <input
            className='input-profile'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isSaving || isLoading}
            placeholder="Prénom"
          />
          <input
            className='input-profile'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isSaving || isLoading}
            placeholder="Nom"
          />
        </div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
          <button
            className='button-profile'
            onClick={handleSave}
            disabled={isSaving || isLoading}
          >
            {isSaving ? 'Sauvegarde...' : 'Save'}
          </button>
          <button
            className='button-profile'
            onClick={handleCancel}
            disabled={isSaving || isLoading}
          >
            Cancel
          </button>
        </div>
        {updateError && <p className="error-text" style={{ color: '#d32f2f', marginTop: '8px' }}>{updateError}</p>}
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