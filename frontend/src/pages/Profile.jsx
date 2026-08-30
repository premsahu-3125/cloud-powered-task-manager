import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p className="page-subtitle">Your account details.</p>
      <div className="card" style={{ maxWidth: 480 }}>
        {user ? (
          <>
            <div className="form-field">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="form-field">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="form-field">
              <label>Member since</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </>
        ) : (
          <p className="page-subtitle">Loading...</p>
        )}
      </div>
    </div>
  );
}
