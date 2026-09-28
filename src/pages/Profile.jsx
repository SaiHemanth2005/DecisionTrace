function Profile() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">ACCOUNT</div>
          <h1>Profile</h1>
          <p>Manage your personal information.</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-large-avatar">H</div>

        <div className="profile-details">
          <div>
            <span>Name</span>
            <strong>Sai Hemanth</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>hemanth@example.com</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>Team Member</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;